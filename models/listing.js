const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const ListingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
          filename:String,
          url:{
            type: String,
        default:"https://unsplash.com/photos/lake-and-mountains-in-alpine-valley-XbeNe7UfWIo",
        set :(v)=> v==="" ? "https://unsplash.com/photos/lake-and-mountains-in-alpine-valley-XbeNe7UfWIo": v,
    }
} ,
    price:Number,
    location:String,
    country:String,
    reviews:[{
        type:Schema.Types.ObjectId,
        ref:"Review",
    },
]
});
ListingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    }
});

const Listing = mongoose.model("Listing",ListingSchema);
module.exports = Listing;