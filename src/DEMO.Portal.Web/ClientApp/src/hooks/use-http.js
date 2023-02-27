import { useReducer, useCallback } from 'react';
import { t } from '../localization/i18n';

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      httpResponse: null,
      httpError: null,
      isHttpLoading: true,
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      httpResponse: action.responseData,
      httpError: null,
      isHttpLoading: false,
    };
  }

  if (action.type === 'ERROR') {
    return {
      httpResponse: null,
      httpError: action.errorMessage,
      isHttpLoading: false,
    };
  }

  return state;
}

function useHttp(requestFunction, startWithLoading = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    isHttpLoading: startWithLoading ? true : null,
    httpResponse: null,
    httpError: null,
  });

  const sendRequest = useCallback(
    async function (requestData) {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        if(error.name !== "AbortError") {
          dispatch({
            type: 'ERROR',
            errorMessage: error.message || t("serverError"),
          });
        }
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
