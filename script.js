const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://Me:<password>@royalflush.cs7u3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri);

    try {
        await client.connect();

        await findOneListingByName(client, "Shopnil", "Bruh");

        //await listDatabases(client);
        
        await createListing(client, {
            username: "Shopnil",
            password: "Bruh"
        })
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createListing(client, newListing) {
    //adds newListing document to database
    await client.db("User").collection("data").insertOne(newListing);
    //prints newest document that was added to database
    const myDoc = await client.db("User").collection("data").findOne(newListing);
    //printing the document added to console (optional)
    console.log(myDoc);
}

async function findOneListingByName(client, name, pass) {
   const result = await client.db("User").collection("data").findOne({username: name, password: pass});
    
   if(result) {
       console.log("The account for " + name + " exists");
       console.log(result);
   } else {
    console.log("The account for " + name + " does not exist");
}
}


async function listDatabases(client) {
    const databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}
