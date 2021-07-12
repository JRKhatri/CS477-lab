const express = require("express")
const userController = require("../controller/userController")
const router = express.Router();

router.post('/login', userController.login)  // to check in 
router.use(userController.authorize)  // after login in to check if authorize to use certain fun(e.g delete, update)

module.exports = router;