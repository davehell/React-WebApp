import { formatMessage } from 'devextreme/localization';

/**
 * Přeloží zadaný kód. Pokud pro kód neexistuje překlad, tak místo překladu vrací kód.
 * @param {string} code kód z překladovky
 * @param {array} args případné argumenty vkládané do přeložené řetězce
 * @returns string
 */
export function t(code, args) {
  let text = "";
  if(args) {
    text = formatMessage(code, args);
  }
  else {
    text = formatMessage(code);
  }
  return text ? text : code;
}