module.exports = async function addRecord(myColl, record) {
  const result = await myColl.insertOne(record);
  console.log(`A document was inserted with the _id: ${result.insertedId}`,
  );
}