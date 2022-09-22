const companyV1Router = require('./company.v1.route');
const companyV2Router = require('./company.v2.route');

function route(app) {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.use('/api/v1/company', companyV1Router);

  app.use('/api/v2/company', companyV2Router);
}

module.exports = route;