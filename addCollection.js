module.exports = async function addCollection(myColl, docs) {
  try {
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
