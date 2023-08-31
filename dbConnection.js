const mongoose = require("mongoose");

// const mongoURI = "mongodb://127.0.0.1:27017/iNoteBook";

const mongoURI = process.env.MONGO_URL;
const connectToMongo = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("Connected to Mongo Successfully");
    }
  );
};

module.exports = connectToMongo;
