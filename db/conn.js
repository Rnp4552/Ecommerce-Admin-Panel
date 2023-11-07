const mongoose = require("mongoose");

mongoose.set("strictQuery",true);

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log("Database is connected");
}).catch((e) => {
    console.log(e);
});

