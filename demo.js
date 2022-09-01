const { MongoClient } = require("mongodb");

const main = async () => {
  const uri =
    "mongodb+srv://root:root@cluster0.yizcs.mongodb.net/?retryWrites=true&w=majority";

  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    // await listDatabases(client);
    //to insert one data
    createListing(client, {
      item: "jetshoes",
      price: 500,
      quantity: 50,
      date: "2020-22-09",
    });
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};

main().catch(console.error);

const createListing = async (client, newListing) => {
  const result = await client
    .db("sourav")
    .collection("majumder")
    .insertOne(newListing);
  console.log(`New listing created with following id: ${result.insertedId}`);
};

const createMultipleListing = async (client, newListings) => {
  const result = await client
    .db("sourav")
    .collection("majumder")
    .insertMany(newListings);
  console.log(
    `${result.insertedCount} new listings created with the following id(s):`
  );
  console.log(result.insertedIds);
};

const listDatabases = async (client) => {
  const dataBaseslist = await client.db().admin().listDatabases(); //show all databases
  console.log("Databases");
  dataBaseslist.databases.forEach((db) => {
    console.log(`-${db.name}`);
  });
};
