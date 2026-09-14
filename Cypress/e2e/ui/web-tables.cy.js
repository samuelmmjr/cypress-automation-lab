import webTablesPage from '../../support/pages/web-tables.page';

describe('Web Tables', () => {
  it('cria, edita e remove um registro identificado pelo e-mail', () => {
    const record = {
      firstName: 'Samuel',
      lastName: 'Melo',
      email: `qa.${Date.now()}@example.com`,
      age: 30,
      salary: 5000,
      department: 'QA',
    };

    webTablesPage.visit();
    webTablesPage.addRecord(record);
    webTablesPage.editDepartment(record.email, 'Quality Assurance');
    webTablesPage.deleteRecord(record.email);
  });
});
