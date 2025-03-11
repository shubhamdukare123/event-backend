// const express = require('express')
// const app = express()
// const port = 3000

// const mongoose = require("mongoose");
// const { Cat } = require('./model');
// console.log("Hello"); 

// //Routes





// //mongodb connection
// const connectDB = async()=> {
//     await mongoose.connect(`mongodb+srv://pratik:JcI9yaNTEyJeOkKT@cluster0.5v0di.mongodb.net/mydbs`);
//     console.log(`the db is connect with ${mongoose.connection.host}`);
// }

// connectDB();



// // //get request handle
// // app.post('/user', async  (req, res) => {
// //   //const cat = new Cat({
// //     //name: 'juli'
// //   //})

// //   const user = new User[{
// //     Name: 'Himanshu'
// //   },
// // {
// //   name:"Subham"
// // },{

// // }]

// //   const data = await cat.save()
// //   res.send(data)
// // })

// // app.listen(port, () => 
// //   console.log(`Example app listening on port ${port}`)
// // })


// app.get('/username', async(req, res) =>{

//   const cat = await Cat.insertMany([
    
//     {
//     name: "Shubham"
//   },

//   {name: "Himanshu"},
//   {name: "Rohit"},


// ]);


// for(let i = 0;i<3;i++){
//   const data = await cat[i].name;
//   res.send(data);
//   console.log(data);
// }
// //console.log(res.send);


// });


// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })



const express = require('express');
const mongoose = require("mongoose");
const { Cat } = require('./model');

const app = express();
const port = 3000;

// MongoDB connection
const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://pratik:JcI9yaNTEyJeOkKT@cluster0.5v0di.mongodb.net/mydbs`);
    console.log(`The DB is connected with ${mongoose.connection.host}`);
};
connectDB();

app.get('/username', async (req, res) => {
    try {
        // Insert multiple documents into the collection
        const cats = await Cat.insertMany([
            { name: "Shubham",
              event: [
                {eventName: "Marriage",
                  eventDetails: {
                    date: "13",
                    location: "Pune"
                  }

                  

                }
              ]


             },
            { name: "Himanshu" },
            { name: "Rohit" }
        ]);


        //await cats.save();
        // Extract names from the inserted documents
        const names = cats.map(cat => cat.name);

        //const data = names.save();

        res.json({ data });
        console.log(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
