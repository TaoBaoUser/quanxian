const Router = require("koa-router");
const userController = require("../controllers/userController");

const router = new Router();
router.prefix("/users");

router.post("/finduser", userController.findUser);
router.post("/findrole", userController.findRole);
router.post("/adduser", userController.addUser);
router.get("/findalluser", userController.findAllUser3);

module.exports = router;
