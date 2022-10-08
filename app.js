// const { MongoClient } = require("mongodb");

// // Replace the uri string with your connection string.
// const uri = "mongodb://localhost:27017";
// // "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

// const client = new MongoClient(uri);

// async function run() {
//   try {
//     const database = client.db("fruitsDB");
//     const movies = database.collection("movies");

//     // Query for a movie that has the title 'Back to the Future'
//     const query = { title: "Back to the Future" };
//     const movie = await movies.findOne(query);

//     // console.log(movie);

//     console.log("Connected successfully to server");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

const { MongoClient } = require("mongodb");

// Connection URI

const uri = "mongodb://localhost:27017";
//const uri = "mongodb+srv://sample-hostname:27017/?maxPoolSize=20&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    const db = client.db("fruitsDB");

    const collection = db.collection("fruits");
    const doc = [
      {
        name: "Apple",
        score: 8,
        review: "Great fruit",
      },
      {
        name: "Orange",
        score: 6,
        review: "Mom sold that",
      },
      {
        name: "Banana",
        score: 9,
        review: "The best",
      },
    ];
    const insertManyResult = await collection.insertMany(doc);

    // Establish and verify connection
    // await client.db("admin").command({ ping: 1 });
    let ids = insertManyResult.insertedIds;
    console.log(`${insertManyResult.insertedCount} documents were inserted.`);
    for (let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
    }

    const findResult = await collection.find({});
    await findResult.forEach(console.dir);
    // console.log(findResult);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
