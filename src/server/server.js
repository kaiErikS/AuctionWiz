const app = require("./app.js");
const server = require("http").Server(app);

const port = 8080;

app.listen(port, () => {
  console.log("Started server on port " + port);
});

module.exports = { port };
