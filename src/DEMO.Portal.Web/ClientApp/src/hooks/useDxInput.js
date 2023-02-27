import { useCallback, useState } from 'react';

export function useDxInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  //toto volání použije DX komponenta při onValueChanged 
  const onInputChange = useCallback((e) => {
    setValue(e.value);
  }, []);

  //toto volání použiju, pokud potřebuju ručně nastavit hodnotu
  const setInputValue = useCallback((data) => {
    setValue(data);
  }, []);

  const inputProps = {
    value: value,
    onValueChanged: onInputChange,
    setInputValue: setInputValue
  };

  return inputProps;
}
