const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("match")
})

module.exports = router;