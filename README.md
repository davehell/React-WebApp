# DEMO Portal

## Požadavky
- Node.js (https://nodejs.org/en/) - JavaScript runtime prostředí

## První spuštění
- naklonovat repozitář
- `cd src\DEMO.Portal.Web\ClientApp`
- `npm install` - stáhne potřebné balíčky
- nastavit ConnectionString (viz níže)
- `npm start` - rozběhne lokální webový server

### ConnectionString
- Výchozí je v souboru  `src\DEMO.Portal.Web\ClientApp\public\config.js`
- Pokud si chci nastavit jiný, tak je potřeba vytvořit soubor `src\DEMO.Portal.Web\ClientApp\.env.local` s jedním řádkem:
`REACT_APP_ODATA_URL=http://localhost:17000/odata/`

### VisualStudio Code
- v adresáři `src\DEMO.Portal.Web\ClientApp` je připraven .workspace soubor pro otevření ve VS

## Release
- `cd src\DEMO.Portal.Web\ClientApp`
- `npm install`
- v souboru `public\config.js` nastavit url OData služby `ODATA_Production`. Je tam i `ODATA_Debug`, ale ta se nikde nepoužívá.
- `npm run build`
- obsah adresáře `build` zkopírovat na web server

## Použité knihovny
- vzhled stránky (CSS): [Bootstrap](https://getbootstrap.com/docs/5.2/getting-started/introduction/)
- UI komponenty: [DevExpress](https://js.devexpress.com/Documentation/ApiReference/UI_Components/)
- ikony (máme zaplacenou PRO licenci): [Font Awesome](https://fontawesome.com/search)


# Debugger
- Visual Studio Code + [Chrome Debugger Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
- Then add the block below to your `launch.json` file and put it inside the `.vscode` folder in your app’s root directory.

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceRoot}/src",
      "userDataDir": "${workspaceRoot}/.vscode/chrome",
      "sourceMapPathOverrides": {
        "webpack:///src/*": "${webRoot}/*"
      }
    }
  ]
}
```
