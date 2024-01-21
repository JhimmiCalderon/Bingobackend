const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("lobby")
})

module.exports = router;