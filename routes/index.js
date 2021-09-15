const router = require("express").Router();

const authRoutes = require("./auth.route");
const userRoutes = require("./user.route");

const basicAuth = require("../helpers/basic-auth");

router.use("/auth", authRoutes);
router.use("/user", basicAuth, userRoutes);

module.exports = router;