const express = require('express');
const router = express.Router();

router.post('/home',(req,res)=>{
    res.status('200').send('home')
})


module.exports = router;