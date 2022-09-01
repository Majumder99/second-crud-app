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

    // createListing(client, {
    //   item: "jetshoes",
    //   price: 500,
    //   quantity: 50,
    //   date: "2020-22-09",
    // });

    //insert mulitple datas
    // await createMultipleListing(client, [
    //   {
    //     name: "mahim",
    //     age: 20,
    //     city: "mirpur",
    //   },
    //   {
    //     name: "zafrul",
    //     age: 22,
    //     city: "bogra",
    //   },
    //   {
    //     name: "pial",
    //     age: 23,
    //     city: "dinajpur",
    //   },
    // ]);

    //find one data
    //     await findOneListingByName(client, "pial");

    //Update one
    await updateListingByName(client, "pial", { name: "rony" });
  } catch (e) {
    console.error(e);
  } finally {
    setTimeout(() => {
      client.close();
    }, 1500);
  }
};

main().catch(console.error);

const listDatabases = async (client) => {
  const dataBaseslist = await client.db().admin().listDatabases(); //show all databases
  console.log("Databases");
  dataBaseslist.databases.forEach((db) => {
    console.log(`-${db.name}`);
  });
};

//CREATE
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

//READ
const findOneListingByName = async (client, nameOfListing) => {
  const result = await client
    .db("sourav")
    .collection("majumder")
    .findOne({ name: nameOfListing });

  if (result) {
    console.log(
      `Found a listing in the collection with the name '${nameOfListing}'`
    );
    console.log(result);
  } else {
    console.log(`No listin found with the name of '${nameOfListing}'`);
  }
};

//UPDATE
const updateListingByName = async (
  client,
  nameOfListing,
  updateListingByName
) => {
  const result = await client
    .db("sourav")
    .collection("majumder")
    .updateOne({ name: nameOfListing }, { $set: updateListingByName });
  console.log(`${result.matchedCount} document(s) matched the query criteria`);
  console.log(`${result.modifiedCount} documents was/were updated`);
};
