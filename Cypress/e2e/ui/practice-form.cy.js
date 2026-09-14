import practiceFormPage from '../../support/pages/practice-form.page';

describe('Practice Form', () => {
  it('preenche o formulário e valida os dados enviados', () => {
    practiceFormPage.visit();
    const formData = practiceFormPage.fillWithRandomData();
    practiceFormPage.submit();
    practiceFormPage.validateSubmission(formData);
  });
});
