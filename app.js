//require the Mongoose package (after running >npm i mongoose in Hyper to install it)
const mongoose = require('mongoose');  

//connect to MongoDB by specifying port to access MongoDB server
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/fruitsDB');
}


// create a SCHEMA that sets out the fields each document will have and their datatypes
const fruitSchema = new mongoose.Schema ({
	name: {
    type: String,
    required: [true, "No name specified"]
  },
	rating: {
    type: Number,
    min: 1,
    max: 10
  },
	review: String
});

//create a MODEL
const Fruit = mongoose.model("Fruit", fruitSchema);

//create a DOCUMENT
const fruit = new Fruit ({
  name: "Peach",
  review: "Pretty Good !"
});

//save the document
// fruit.save();

//**CHALLENGE: Set up a people database with one document and two fields**//
const personSchema = new mongoose.Schema ({
	name: String,
	age: Number,
  favouriteFruit: fruitSchema
});

const Person =mongoose.model("Person", personSchema);

Person.updateOne({ name: "John"}, {favouriteFruit: fruit}, function(err){
  if(err) console.log(err);
  else console.log("Updated");
});

// const kiwi = new Fruit ({
//   name: "Kiwi",
//   rating: 8,
//   review: "Pretty Awesome !"
// });

// const orange = new Fruit ({
//   name: "Orange",
//   rating: 5,
//   review: "Sour it is!"
// });

// const banana = new Fruit ({
//   name: "Banana",
//   rating: 6,
//   review: "Nice one !"
// });

// Fruit.insertMany([kiwi, orange, banana], function(err){
//   if(err) console.log(err);
//   else console.log("Successful !");
// });


// Fruit.updateOne({ _id: "61d0278c3d0a947b8a1636d1"}, {rating: 5}, function(err){
//   if(err) console.log(err);
//   else console.log("Update Successful !");
// })

// Fruit.deleteOne({ name: "Peach" }, function(err){
//   if(err) console.log(err);
//   else console.log("Deleted");
// });

// Person.deleteMany({ name: "John"}, function(err){
//   if(err) console.log(err);
//    else console.log("Deleted");
// });

Fruit.find(function(err, fruits){
  if(err) console.log(err);
  else
  {

    //  mongoose.connection.close();

    fruits.forEach(function(fruit){
    console.log(fruit.name);
  });
  }
});