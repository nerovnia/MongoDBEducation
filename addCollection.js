module.exports = async function addCollection(myDB) {
  //const myDB = client.db("ByteCloud");
  const myColl = myDB.collection("appointments");
  try {
    const docs = [
      { "patient": 101, "doctor": 202, "hour": 9 },
      { "patient": 106, "doctor": 205, "hour": 13 },
      { "patient": 104, "doctor": 208, "hour": 17 },
      { "patient": 109, "doctor": 206, "hour": 10 },
      { "patient": 107, "doctor": 210, "hour": 12 },
      { "patient": 102, "doctor": 207, "hour": 14 },
      { "patient": 103, "doctor": 201, "hour": 11 },
      { "patient": 105, "doctor": 203, "hour": 16 },
      { "patient": 108, "doctor": 204, "hour": 8 },
      { "patient": 110, "doctor": 209, "hour": 15 }
    ];
    const insertManyresult = await myColl.insertMany(docs);
    let ids = insertManyresult.insertedIds;
    console.log(`${insertManyresult.insertedCount} documents were inserted.`);
    for (let id of Object.values(ids)) {
      console.log(`Inserted a document with id ${id}`);
    }
  } catch(e) {
    console.log(`A MongoBulkWriteException occurred, but there are successfully processed documents.`);
    let ids = e.result.result.insertedIds;
    for (let id of Object.values(ids)) {
      console.log(`Processed a document with id ${id._id}`);
    }
    console.log(`Number of documents inserted: ${e.result.result.nInserted}`);
  }
}
