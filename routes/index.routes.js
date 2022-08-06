const router = require("express").Router();
const authRoutes = require("./auth.routes");
const contactRoutes = require ("./contacts.route")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/contact",contactRoutes);

module.exports = router;
