const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// tells mongoose what database we want to connect to. If env var MONNGODB_URI exists it will use that. Otherwise it will use "mongodb://localhost:27017/social-network-api"
// the second argument is a set of config options that mongoose asks for more info on

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/social-network-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


// use this to log mongo queries being executed!

mongoose.set("debug", true);


app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));