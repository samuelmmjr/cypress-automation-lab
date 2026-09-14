Cypress.Commands.add('removeDemoQaAds', () => {
  cy.get('body').then(($body) => {
    $body.find('#fixedban').remove();
    $body.find('iframe[id^="google_ads_iframe"]').remove();
  });
});
