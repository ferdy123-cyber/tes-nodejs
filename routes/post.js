const { Router } = require("express");
const { add, get } = require("../database/controllers/post");

const { Authorization } = require("../middleware/authorization");

const router = Router();

router.post("/add", Authorization, add);
router.get("/get", Authorization, get);

module.exports = router;
