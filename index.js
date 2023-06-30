const { MongoClient, ServerApiVersion } = require("mongodb");
const addCollection = require("./addCollection"); 
require('dotenv').config();

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
//      .then(()=> {
        await addCollection(client.db("ByteCloud"));
        //await addAppointment(client.db("ByteCloud"));
//    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

async function addAppointment(myDB) {
  //const myDB = client.db("myDB");
  const myColl = myDB.collection("pizzaMenu");
  const doc = { name: "Neapolitan pizza", shape: "round" };
  const result = await myColl.insertOne(doc);
  console.log(`A document was inserted with the _id: ${result.insertedId}`,
  );
}



/*

const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb+srv://nerv:r7EIwBcBihfJvqYk@cluster0.cov4yvg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('ByteCloud');
    const movies = database.collection('appointments');
    // Query for a movie that has the title 'Back to the Future'
    const query = {
      "patient": 101,
      "doctor": 202,
      "hour": 2
    };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/