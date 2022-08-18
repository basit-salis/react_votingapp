const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const {
    body,
    validationResult
} = require('express-validator');
const connection = require('../config/db.config');

router.post('/createUser', async (req, res) => {
    let {
        username,
        password
    } = req.body;

    
    password = await bcrypt.hash(password, 10)
    const createUser = `INSERT INTO users(_USERNAME, _PASSWORD, IP) VALUES('${username}','${password}','${req.ip}')`;
    connection.query(createUser, (err, response) => {
        if (err) throw err;

        res.status('200').send('user created')
    })

})

router.post('/signinUser',
    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({
        min: 5
    }),
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            username,
            password
        } = req.body;

        try {

            if (username && password) {
                const getEmails = `SELECT * FROM USERS WHERE '${username}' = _USERNAME`;
                connection.query(getEmails, async (err, response) => {
                    if (err) throw err;

                    let dbPass = response[0]._PASSWORD
                    let compare = await bcrypt.compare(password, dbPass);
                    if (compare) {
                        res.status('200').send(`logged in`)
                    } else {
                        res.send(`password does not match`)

                    }
                })
            }

        } catch (error) {
            console.log('error')

        }
    })


module.exports = router;