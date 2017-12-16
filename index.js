const app = require('./server');
const { PORT } = require('./config');

app.listen(PORT, (err) => {
  if (err) console.error({
    message: err
  });
  console.log(`Listening on port ${ PORT }...`);
});
