const express = require('express');
const path = require('path');
require('dotenv').config();
const port = process.env.APP_PORT;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const prizesRoutes = require('./routes/prizesRouter');
const laureatesRoutes = require('./routes/laureatesRouter');
const pugRoutes = require('./routes/pugRouter');


const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`))

const swaggerOption = {
    swaggerDefinition: (swaggerJsdoc.Options = {
        info: {
            title: "my-notes app",
            description: "API documentation",
            contact: {
                name: "Argjentin Korbi",
            },
            servers: ["http://localhost:3000/"],
        },
    }),
    apis: ["app.js", "./routes/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOption);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/prizes', prizesRoutes);
app.use('/laureates', laureatesRoutes);
app.use('/', pugRoutes);

app.set('views', `${__dirname}/views/`)
app.set('view engine', 'pug')


// app.all("*",(req, res) => {
//   res.status(404).send(`<h1 style="color: red">ERROR 404: PAGE NOT FOUND</h1>`)
//   throw new Error(`Requested URL ${req.path} not found !`);
// })


app.listen(port, () => {
    console.log("Le serveur ecoute sur le port : " + port);
});