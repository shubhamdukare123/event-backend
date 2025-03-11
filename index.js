// const express = require("express");
// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(express.json());

// const mongoose = require("mongoose");
// mongoose.connect(`mongodb+srv://pratik:JcI9yaNTEyJeOkKT@cluster0.5v0di.mongodb.net/mydbs`, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));







// app.get("/", (req, res) => {
//   res.send("Hello, Shubham");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// });

require("dotenv").config(); // Load .env file
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Event = require("./models/Event");


const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.log(MONGO_URI)
  console.error("❌ MONGO_URI is missing. Check your .env file.");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ DB Connection Error:", err));

//post api

app.post("/events", async (req, res) => {
    try {
      const { name, date, location } = req.body;
      const newEvent = new Event({ name, date, location });
  
      await newEvent.save();
      res.status(201).json({ message: "Event created successfully!", event: newEvent });
    } catch (error) {
      res.status(500).json({ message: "Error creating event", error });
    }
  });
  

//get api

  app.get("/events", async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ message: "Error fetching events", error });
    }
  });
  





app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

