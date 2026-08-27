const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");


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
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("app is working");
})

//index route
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
});
//new route
app.get("/listings/new",async(req,res)=>{
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id",async(req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
     res.render("listings/show.ejs",{listing});
})
//create route
app.post("/listings",async(req,res)=>{
   const newListing =  new Listing(req.body.listing);
    await newListing.save();
   res.redirect("/listings");
});
//edit route
app.get("/listings/:id/edit",async(req,res)=>{
        let {id} = req.params;
        const listing = await Listing.findById(id);
        res.render("/listings/edit.ejs",{listing});
});
// app.get("/textListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title:"My New Villa",
//         description:"by the beach",
//         price:1200,
//         location:"Calongute,goa",
//         country:"India",

//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successfully send");
// }); 

app.listen(8080,()=>{
    console.log("app is listening on port 8080");
});