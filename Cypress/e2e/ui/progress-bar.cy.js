import progressBarPage from '../../support/pages/progress-bar.page';

describe('Progress Bar', () => {
  it('interrompe o progresso antes de 25%, conclui e faz reset', () => {
    progressBarPage.visit();
    progressBarPage.start();
    progressBarPage.stopBefore25Percent();
    progressBarPage.validateStoppedBefore25Percent();
    progressBarPage.resumeAndWaitUntilComplete();
    progressBarPage.reset();
  });
});
