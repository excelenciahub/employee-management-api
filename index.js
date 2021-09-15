require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { validate, ValidationError, Joi } = require('express-validation')

const routes = require("./routes");
const db = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;

db.sequelize.sync().then(() => {
    console.log("DB connect successfully!!!");
}, error => {
    console.log("Error: ", error)
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.use("/api/v1", routes);

app.use(function (err, req, res, next) {
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).send({ status: false, message: err.details.body[0].message })
        // return res.status(err.statusCode).json(err)
    }

    return res.status(500).json(err)
})


app.listen(PORT, () => {
    console.log(`Application running on ${PORT}`);
});