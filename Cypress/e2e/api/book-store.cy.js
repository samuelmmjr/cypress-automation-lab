describe('Book Store API', () => {
  it('cria um usuário, autentica, reserva livros e valida a coleção', () => {
    const credentials = {
      userName: `qa_${Date.now()}`,
      password: 'QaLab123!',
    };

    let userId;
    let token;
    let selectedBooks;

    cy.request('POST', '/Account/v1/User', credentials)
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property('userID').and.not.be.empty;
        expect(response.body.username).to.eq(credentials.userName);

        userId = response.body.userID;
        return cy.request('POST', '/Account/v1/GenerateToken', credentials);
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.status).to.eq('Success');
        expect(response.body.token).to.be.a('string').and.not.be.empty;

        token = response.body.token;
        return cy.request('GET', '/BookStore/v1/Books');
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.books).to.be.an('array').and.have.length.greaterThan(1);

        selectedBooks = response.body.books.slice(0, 2).map(({ isbn }) => ({ isbn }));

        return cy.request({
          method: 'POST',
          url: '/BookStore/v1/Books',
          headers: { Authorization: `Bearer ${token}` },
          body: {
            userId,
            collectionOfIsbns: selectedBooks,
          },
        });
      })
      .then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.books).to.deep.equal(selectedBooks);

        return cy.request({
          method: 'GET',
          url: `/Account/v1/User/${userId}`,
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.username).to.eq(credentials.userName);
        expect(response.body.books).to.have.length(2);
        expect(response.body.books.map(({ isbn }) => isbn)).to.deep.equal(
          selectedBooks.map(({ isbn }) => isbn)
        );
      })
      .then(() => {
        return cy.request({
          method: 'DELETE',
          url: `/Account/v1/User/${userId}`,
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then((response) => {
        expect(response.status).to.eq(204);
      });
  });
});
