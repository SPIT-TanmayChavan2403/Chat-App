const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userSchema = require('./models/userModel');
const HelperFunc = require('./helperFunctions');
const fileUpload = require("express-fileupload");

// Routers
const imageRouter = require('./routes/imageRoutes');
const accountRouter = require('./routes/accountRoutes');

const m = new HelperFunc();

const app = express();
mongoose.set('strictQuery', true);

const URL = 'mongodb+srv://tanmay:2022510005@cluster0.lbhju4i.mongodb.net/chatApp?retryWrites=true&w=majority'
// const URL = "mongodb://localhost:4000/tanmay"
mongoose.connect(URL)
.then(res => console.log('Connected successfully!'))
.catch(err => console.log('ERROR...', err));

app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(imageRouter);    // Router
app.use(accountRouter); // Router

app.post('/getUserList', (req, res)=>{
    userSchema.find({username: req.body.username}, (error, data) =>{
        if (error){
            res.json({status: "FAIL", msg:"Failed to fetch data"})
        }else{
            if (data[0].users){
                res.json({status:"PASS", msg:Object.keys(data[0].users)});
            } else {
                res.json({status:"PASS", msg:[]});
            }
        }
    })
})

app.post('/getChats', (req, res) => {
    const {user, friend} = req.body;

    userSchema.findOne({username: user},{[`users.${friend}`]: 1, _id: 0}, (error, data) => {
        if (error)        {
            res.json({msg: "Couldn't find data"}).end();
        } else {
            userSchema.findOne(
                {username: friend},
                { "socketId": 1 },
                (error, response) =>{
                    if (error){
                        console.log('Failed while getting socketId');
                    } else {
                        res.json({msg: data.users[friend], status: response.socketId.length != 0})
                    }
                }
            )

        }
    })
    
})

app.post("/saveUser", (req, res) =>{
    const {user, friend} = req.body;
    userSchema.findOne({username: friend}, (error, data)=>{
        if (data){
            userSchema.updateOne(
                {username: user},
                {
                    $set:{
                        [`users.${friend}`]: ["INNIT"]
                    }
                },
                {
                    upsert: true
                }
                , (error, data) => {
                    if (error){
                        res.json({status: "FAIL", msg:"Friend not added"}).end();
                    } else{
                        res.json({status: "PASS", msg:"Friend added successfully"}).end();
                    }
                })
        } else {
            res.json({status: "FAIL", msg:"Friend not found, please invite your friend on BuzzyChat. "}).end();
        }
    })
})

app.post('/login', async(req, res) => {
    const {username, password} = req.body;
    const database = userSchema();
    
    database.username = username;
    database.password = password;
    try{
        const user = await userSchema.login(username, password);
        res.json({status: "PASS", msg: "Logged in successfully...", username, data: user});
    } catch(err){
        database.about = "Enjoy your life being Otaku!";
        database.profileUrl = "../../../assets/avatar.jpg";
        database.save((error) => {
            if (error){
                msg = m.extractError(error);
                res.status(500).json({status: "FAIL",msg}).end();
            } else{
                res.status(200).json({status: "PASS", msg: "Registered successfully...", username})
            }
        });
    }
})


app.post('/saveSocketID', (req, res) => {
    const {socketId, user} = req.body;
    console.log('Saving... ', socketId, ' ', user);
})

app.get('/', (req, res) => {
    res.send('Server is up and running...');
})

app.listen("5000", () => {
    console.log('Listening on port 5000');
})




















let users = [];

const io = require('socket.io')(3000, {
    cors:{
        origin: ["http://localhost:4200"]
    }
});

io.on('connection', socket => {
    database = userSchema(); // Initialize the database object.

    // When user disconnects this event is triggered and socketId is removed from database.
    socket.on('disconnect', function () {
        userSchema.updateOne(
            {username: socket.username},
            { // Will set the socket id for the matched user(filter).
                $set:{
                    socketId: ""
                }
            },
            { // Will add new field to the user instead of replacing the old values with "socketId"
                upsert: true
            },
            (error, res) => { // Callback function which will be executed when the data is updated or failed to update
                if (error){
                    console.log('Error while saving socket ID', error);
                }else {
                    console.log('Socket Id saved successfully for the user.');
                }
            }
        )
        console.log('User ', socket.id, ' disconnected');
    });

    socket.emit("firstEmit", socket.id);

    socket.on('saveSocketId', (req) => {
        socket["username"] = req.username;
        userSchema.updateOne(
            {username: req.username}, // Filter
            { // Will set the socket id for the matched user(filter).
                $set:{
                    socketId: req.id
                }
            },
            { // Will add new field to the user instead of replacing the old values with "socketId"
                upsert: true
            },
            (error, res) => { // Callback function which will be executed when the data is updated or failed to update
                if (error){
                    console.log('Error while saving socket ID', error);
                }else {
                    console.log('Socket Id saved successfully for the user.');
                }
            }
        )
    })

    socket.on("sendMessage",  (req) => {
        userSchema.find(
            {username: req.receiver},
            {"socketId": 1, _id: 0},
            (error, data) => {
                if(error){
                    console.log('Error while retrieving socketId of ', req.receiver);
                } else {
                    socket.to(data[0].socketId).emit("messageReceived" , req.message);
                    userSchema.updateOne(
                        {username: req.sender},
                        {$push:{[`users.${req.receiver}`]: "TO/" + req.message}}
                        ,(error, data) => {
                            if (error) console.log("Error while saving sender's message")
                            else console.log('Successfully Saved senders message');
                    })
                    userSchema.updateOne(
                        {username: req.receiver},
                        {$push:{[`users.${req.sender}`]: "FROM/" + req.message}}
                        ,(error, data) => {
                            if (error) console.log("Error while saving sender's message")
                            else console.log('Successfully Saved receivers message');
                    })
                }
            }
        )

    });
})


// Whatever data is being send save it in the database.
