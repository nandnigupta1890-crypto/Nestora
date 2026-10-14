const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

let MONGO_URL = "mongodb://127.0.0.1:27017/Nestora";

main()
.then(()=>{
    console.log("CONNECTED TO DB");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,
        owner:'6acb1e2b68fc8aa1c47db94a'}));
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
};
initDB();
