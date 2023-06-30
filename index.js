const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();
const addCollection = require("./addCollection"); 
const addRecord = require("./addRecord"); 
const fs = require('fs');

const collectionData = require("./data/collectionData.json");

const MONGODB_URI = process.env.MONGODB_URI;

// Replace the placeholder with your Atlas connection string
const uri = MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
);
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("ByteCloud").command({ ping: 1 })
    await addCollection(client.db("ByteCloud").collection("appointments"), collectionData);
    await addRecord(client.db("ByteCloud").collection("appointments"), { "patient": 101, "doctor": 202, "hour": 9 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
