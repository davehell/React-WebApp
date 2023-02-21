// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from 'cypress/react18'
import { AuthProvider } from '../../src/contexts/auth'
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.softblue.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

Cypress.Commands.add('mount', (component, options = {}) => {
  const wrapped = <AuthProvider>
    {component}
  </AuthProvider>
  return mount(wrapped, {});
})

// Example use:
// cy.mount(<MyComponent />)