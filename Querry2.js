const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('ieeevisTweets');
    const tweets = database.collection('tweet');

    const getUsers = [
        {$group : {
        _id : "$user.screen_name",
        followers : {$first : "$user.followers_count"}
        }},
        {$sort : {followers : -1}},
        {$limit : 10}]

    const top = await tweets.aggregate(getUsers).toArray();

    for(var i = 0; i < top.length; i++) {
        console.log(top[i]);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);