import React, { createContext, useContext, useCallback } from 'react';
import { useAuth } from '../contexts/auth';
import { url as ODataUrl, webApiUrl } from '../lib/odata';
import { getHttpHeaders, handleServerResponse } from '../lib/common';

function AjaxProvider(props) {
    const { authorization } = useAuth();

    //pozn. všechny Callbacky musí mít v závislostech "token", jinak by se po přihlášení pod jiným uživatelem
    //v metodách stále pracovalo s jejich původní hodnotou. Bez uvedení závislostí se totiž Callback vytvoří jen jednou a pak už se neaktualizuje.
    const request = useCallback(async (method, url, data, contentType = "application/json") => {
        let msg = "";

        const settings = {
            method: method,
            contentType: contentType,
            cache: "no-store",
            headers: getHttpHeaders(authorization, contentType)
        };
        // sekce "body" nesmí být v GET požadavku
        if (data) {
            settings["body"] = JSON.stringify(data);
        }

        const response = await fetch(url, settings);

        //pokud se nejedná o json, tak s odpovědí dále nic nedělat a rovnou ji vrátit
        if(contentType !== "application/json") {
            return response;
        }

        if(!response.ok) {
            try {
                const body = await response.json();
                msg = handleServerResponse(body);
            }
            catch(r) {
                msg = response.status + " " + response.statusText;
            }

            throw new Error(msg);
        }

        try {
            return await response.json();
        }
        catch(e) {
            //např. když POST vrací prázdnou odpověď, což není validní json.
            return response;
        }
    }, [authorization]);

    const ajaxGet = useCallback(async (entity) => {
        let url = ODataUrl + entity;
        let response = await request("GET", url, null);
        return response;
    //React Hook useCallback has an unnecessary dependency: 'authorization'.
    //To není pravda - tato závislost zde musí být, jinak by se při odeslání požadavku neprojevilo případné přihlášení/odhlášení
    //a v hlavičkách by se posílala pořád stará hodnota.
    //Ideálně by se "authorization" mělo předávat do volání "request"
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorization, request]);

    const ajaxCreate = useCallback(async (entity, data) => {
        let url = ODataUrl + entity;
        let response = await request("POST", url, data);
        return response;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorization, request]);

    const ajaxUpdate = useCallback(async (entity, id, data) => {
        let url = ODataUrl + entity + "(" + id + ")";
        let response = await request("PATCH", url, data);
        return response;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorization, request]);

    const ajaxDelete = useCallback(async (entity, id) => {
        let url = ODataUrl + entity + "(" + id + ")";
        let response = await request("DELETE", url, null);
        return response;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorization, request]);

    const ajaxAction = useCallback(async (entity, id, action, data, method, contentType = "application/json") => {
        let idString = "";
        if(id) {
            idString = "(" + id + ")";
        }
        let url = ODataUrl + entity + idString + "/" + action;
        let response = await request(method, url, data, contentType);
        return response;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorization, request]);

    const ajaxRequest = useCallback(async (method, url, data, contentType = "application/json") => {
        let response = await request(method, webApiUrl + url, data, contentType);
        return response;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authorization, request]);

    return (
        <AjaxContext.Provider value={{ ajaxUpdate, ajaxCreate, ajaxDelete, ajaxAction, ajaxGet, ajaxRequest }} {...props} />
    );
}

const AjaxContext = createContext({});
const useAjax = () => useContext(AjaxContext);

export { AjaxProvider, useAjax }
