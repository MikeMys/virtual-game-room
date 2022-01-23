const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://Shopnil09:418y%2A%25@418y.w1aui.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"; 

    const client = new MongoClient(uri);

    try {
        await client.connect();
        
        await createListing(client, {
            username: "Shopnil",
            password: "password"
        })

        await createListing(client, {
            username: "Brayden",
            password: "password2"
        })

        await createListing(client, {
            username: "Mike",
            password: "password3"
        })

        await createListing(client, {
            username: "Chris",
            password: "password4"
        })

        await createListing(client, {
            username: "Julian",
            password: "password5"
        })

        await createListing(client, {
            username: "Michael",
            password: "password6"
        })

        await findOneListingByName(client, "Shopnil", "password");
        await findOneListingByName(client, "Brayden", "password2");
        await findOneListingByName(client, "Julian", "password5");
        await findOneListingByName(client, "Team3", "password8");
        
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function createListing(client, newListing) {
    //adds newListing document to database
    await client.db("infoDB").collection("users").insertOne(newListing);
    //prints newest document that was added to database
    const myDoc = await client.db("infoDB").collection("users").findOne(newListing);
    //printing the document added to console (optional)
    console.log(myDoc);
}

async function findOneListingByName(client, name, pass) {
   const result = await client.db("infoDB").collection("users").findOne({username: name, password: pass});
    
   if(result) {
       console.log("The account for " + name + " exists");
       //console.log(result);
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