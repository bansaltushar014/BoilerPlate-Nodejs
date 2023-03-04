const express = require("express");
const mongoose = require("mongoose");
const Student = require("./models/students");
const app = express();
const port = process.env.PORT || 8000;

// ** Set the URL ** 
// const uri = "<URL>"

// mongoose.connect(uri, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Connection established!");
// }).catch((e) => {
//     console.log("Connection Failure!");
// })


app.use(express.json());
// create a new students
app.get("/students", (req, res) => {
    res.send("Get API Successful!");
});

app.post("/students", (req, res) => {
    res.send("Post API Successful!");

    // const user = new Student(req.body);
    // user.save().then(() => {
    //     console.log("success");
    //     res.status(201).send(user);
    // }).catch((e) => {
    //     console.log("error" + e);
    //     res.status(400).send(e);
    // })
})

app.listen(port, () => {
    console.log((`connection is setup at ${port}`));
})