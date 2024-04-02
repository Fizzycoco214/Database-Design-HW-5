const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db('ieeevisTweets');
    const tweets = database.collection('tweet');


    const retweetQuerry = {retweeted_status : {$eq : null}};
    const replyQuerry = {in_reply_to_user_id : {$eq : null}};
    const count = await tweets.countDocuments({$and : [retweetQuerry, replyQuerry]});

    console.log(count);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);