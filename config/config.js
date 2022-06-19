const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// tells mongoose what database we want to connect to. If env var MONNGODB_URI exists it will use that. Otherwise it will use "mongodb://localhost:27017/pizza-hunt"
// the second argument is a set of config options that mongoose asks for more info on

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/pizza-hunt", {
    // userNewUrlParser: true,
    useUnifiedTopology: true
});


// use this to log mongo queries being executed!

mongoose.set("debug", true);


app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));