import browserWindowsPage from '../../support/pages/browser-windows.page';

describe('Browser Windows', () => {
  it('aciona a abertura de uma nova janela e valida a página de destino', () => {
    browserWindowsPage.visit();
    browserWindowsPage.openNewWindow();
    browserWindowsPage.validateOpenedPage();
  });
});
