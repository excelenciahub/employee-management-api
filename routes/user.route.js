const router = require("express").Router();
const { validate } = require("express-validation");
const { addUserValidation, updateUserValidation } = require("../validations/user.validation");

const userController = require("../controllers/user.controller");

router.get("/", userController.findAll);
router.get("/:id", userController.findById);
router.post("/", validate(addUserValidation), userController.add);
router.put("/", validate(updateUserValidation), userController.update);
router.delete("/:id", userController.delete);

module.exports = router;