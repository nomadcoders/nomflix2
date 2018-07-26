const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGO || "mongodb://localhost:27017/nomflix-chat",
  { useNewUrlParser: true }
);

const db = mongoose.connection;

const handleError = () => console.log(`❌ Error Connecting to the Database`);
const handleOpen = () => console.log(`✅ Connected to the DB`);

db.on("error", handleError);
db.once("open", handleOpen);
