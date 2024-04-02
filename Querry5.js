const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('ieeevisTweets');
    const tweets = database.collection('tweet');
    const users = database.createCollection('Users');
    const tweetsNoUser = database.createCollection('Tweets_Only');

    //I used chatGPT to help with this problem

    (await users).insertMany(tweets.aggregate([
      { $group: { _id: "$user.id", userDoc: { $first: "$user" } } },
      { $replaceRoot: { newRoot: "$userDoc" } }
  ]));

  tweets.find().forEach(tweet => {tweet.userId = tweet.user.id;
  delete tweet.user;
  db.tweetsNoUser.insertOne(tweet);})
    
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);