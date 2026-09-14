import sortablePage from '../../support/pages/sortable.page';

describe('Sortable', () => {
  it('valida a ordem padrão exibida na lista', () => {
    sortablePage.visit();
    sortablePage.validateDefaultListOrder();
  });
});
