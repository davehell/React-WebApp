
/**
 * Access Control List
 * @param {object Person} who Přihlášená osoba
 * @param {string} action Název akce, pro kterou se kontroluje přístup
 * @param {*} resource Objekt ke kterému je požadován přístup (např. Id osoby)
 * @returns bool
 */
export function hasAccess(who, action, resource = null) {
    if(!who || !action) {
      return false;
    }

    return false;
}

