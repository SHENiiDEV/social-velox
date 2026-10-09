import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { App } from '@inertiajs/react';
import { createServer } from 'vite';

const server = await createServer({
  server: { middlewareMode: true, watch: null, ws: false },
  appType: 'custom',
});
after(() => server.close());

async function renderPage(path, props = {}) {
  const { default: Component } = await server.ssrLoadModule(path);
  return renderToStaticMarkup(React.createElement(App, {
    initialPage: {
      component: path,
      url: '/terms',
      version: null,
      props: { auth: { user: null }, company: { name: 'Example Operator', email: 'help@example.com' }, errors: {}, ...props },
    },
    initialComponent: Component,
    resolveComponent: () => Component,
  }));
}

test('terms explain social coins, consumer rights and eligibility without document checks', async () => {
  const html = await renderPage('/resources/js/Pages/Static/Terms.jsx', { excludedCountries: ['Sudan', 'Zimbabwe'] });
  assert.match(html, /Social Coins/);
  assert.match(html, /SC have no cash value/);
  assert.match(html, /We do not require identity documents/);
  assert.match(html, /mandatory consumer rights/);
  assert.match(html, /Sudan · Zimbabwe/);
  assert.match(html, /Example Operator/);
  assert.match(html, /mailto:help@example.com/);
  assert.match(html, /aria-label="Terms contents"/);
  assert.match(html, /href="#purchases"/);
  assert.match(html, /id="purchases"/);
  assert.doesNotMatch(html, /kyc-aml|KYC|AML|sweepstakes|Protocol Audit|Compliance Standard/i);
});

test('privacy and support no longer advertise customer verification', async () => {
  const privacy = await renderPage('/resources/js/Pages/Static/Privacy.jsx');
  const support = await renderPage('/resources/js/Pages/Support.jsx');
  assert.doesNotMatch(privacy, /age verification|AML screening|kyc-aml/i);
  assert.doesNotMatch(support, /account verification|account_verification|kyc-aml/i);
  assert.match(support, /Account Settings &amp; Security/);
});

test('registration associates the email label with its input', async () => {
  const { default: AuthModal } = await server.ssrLoadModule('/resources/js/Components/AuthModal.jsx');
  function RegistrationPage() {
    return React.createElement(AuthModal, { isOpen: true, initialTab: 'register', onClose() {} });
  }
  const html = renderToStaticMarkup(React.createElement(App, {
    initialPage: { component: 'Registration', url: '/', version: null, props: { errors: {} } },
    initialComponent: RegistrationPage,
    resolveComponent: () => RegistrationPage,
  }));
  assert.match(html, /for="register-email"/);
  assert.match(html, /id="register-email"/);
  assert.match(html, /aria-invalid="false"/);
});
