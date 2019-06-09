const express = import('express');
const router = express.Router();

router.post('/', (req, res, next) => {
    const user = req.body.user;
    res.status(200).send({
        result: {
            message: "Recieved user",
            user,
        }
    })
})

module.exports = router;