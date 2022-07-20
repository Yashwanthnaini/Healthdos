require("dotenv").config();
const mongoose = require("mongoose");
const express = require('express');
const app = express();
const swaggerUi = require("swagger-ui-express"),
swaggerDocument = require("./swagger.json");


mongoose.connect(process.env.MONGO_PROD_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success.");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });


require("./src/validation")();
require("./src/prodMidWare")(app);
require("./src/routes")(app);

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

const port = process.env.PORT || 3000;
app.listen(port , () =>{
    console.log(`server listening on port ${port} `);
})