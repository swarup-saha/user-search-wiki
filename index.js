const express = require('express');
const bodyparser = require('body-parser');
const cokieParser = require('cookie-parser');

const { v4: uuidv4 } = require('uuid');
const Login = require('./mongodb/login');

const Like = require('./mongodb/like');
require('./mongodb/mongoose')


const Regist = require('./mongodb/regist')
const path = require('path');
const cookieParser = require('cookie-parser');



const app = express();
const direcname = path.join(__dirname, './public');

app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.json())
const port = process.env.PORT || 3000;

// recorded to your database
app.use('/dummy_page_link/:cat', function (req, res, next) {
    // const originalUrl = req.originalUrl;
    // console.log('Request Type:', req.originalUrl);

    let path = req.originalUrl.split("/")[req.originalUrl.split("/").length - 1];

    const cookieID = req.cookies.id;

    const time = new Date().getTime();

    const user = new Login({ path, cookieID, time });

    user.save().then((result) => {
        console.log(" result got");
    }).catch((err) => {
        console.log("err");
    });

    next()
})

app.use(express.static(direcname));


// default html run
app.get('', async (req, res) => {
    res.send('login');
});

// register work
app.post('/register', async (req, res) => {

    const { name, email, password } = req.body;

    const uui = uuidv4();
    try {
        const response = await Regist.create({ name, email, password, uui });
       res.send({status:200})
    } catch (error) {
        console.log("you have a error")
    }
})

// login work
app.post('/login', async (req, res) => {

    const userdetail = await Regist.find(req.body);

    if (userdetail[0].email == req.body.email && userdetail[0].password == req.body.password) {

        res.cookie('id', userdetail[0].uui, { maxAge: 360000 + Date.now(), path: '/', httpOnly: false });
        res.json({ status: 200 })
        

    } else {
        res.json({ err: 404 })
    }

})

// like saved and check
app.post('/likePath', async (req, res) => {

    const cookieID = req.cookies.id;
    const like = req.body.like;
    // console.log("like::", req.body)

    const user = await Like.find({ cookieID, like });

    if (user.length === 0) {
        const like_save = new Like({ cookieID, like });
        like_save.save().then((result) => {
            console.log("saved successfully");
        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.send({ status: 'completed already' })
    }

})


// delete like  from database
app.post('/likeDelete', async (req, res) => {

    const cookieID = req.cookies.id;
    const like = req.body.like;
    console.log("like::", req.body, cookieID)

    const user = await Like.find({ cookieID, like });
    if (user.length === 0) {
        console.log("nothing find in user account");
    } else {
        const like_delete = Like.deleteOne({ cookieID, like });
        like_delete.then((result) => {
            console.log("delete successfully");
            res.send({status:200})
        }).catch((err) => {
            console.log(err);
        })
    }

})

// logout work
app.post('/log', (req, res) => {
    console.log(req.cookies);
    res.clearCookie('id');
    res.redirect('/');
    console.log(req.cookies);
})

//page load work
app.post('/loading', async (req, res) => {
    const cookieID = req.cookies.id;
    let like = req.body.like;
    const searches = await Like.find({ cookieID, like });
    if (searches.length === 0) {
        console.log("loading not found");
    } else {
        res.json({ status: 200 })
    }
})


// admin work
app.post('/admin', async (req, res) => {

    const admin = { email: 'bap@gmail.com', password: '12345678' }

    if (admin.email == req.body.email && admin.password == req.body.password) {
        const user = await Login.find({});

        let n = user.length;
        let count = 1, compare = 0, mostuse;

        for (let i = 0; i < n; i++) {

            for (let j = i; j < n; j++) {
                if (user[i].path === user[j].path) { compare++; }
                if (count < compare) {
                    count = compare;
                    mostuse = user[i].path;
                }
            }
            compare = 0;
        }
        res.send(mostuse);
    }
})

// listen server
app.listen(port, () => {
    console.log("serer port is ok   " + port);

})
