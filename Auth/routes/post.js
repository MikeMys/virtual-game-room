const router = require('express').Router(); 
const verify = require('./verifyToken'); 

router.get('/', verify, (req, res) => { //add a middleware after the '/' - created a private route
    res.json({ 
        posts: { 
            title: "First Post", 
            description: "Random data that should not be accessed without being logged in"
        }
    }); 
});

module.exports = router; 