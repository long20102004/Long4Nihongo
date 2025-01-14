import { MongoClient } from "mongodb";

async function testConnection() {
  const uri = "mongodb://localhost:27017/japanese_learning"; // Replace with your connection string if different
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB");

    const db = client.db("japanese_learning");

    // Test query: Count documents in each collection
    const collections = ["lessons", "vocabulary", "questions", "words"];

    for (const collectionName of collections) {
      const count = await db.collection(collectionName).countDocuments();
      console.log(`Number of documents in ${collectionName}: ${count}`);
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await client.close();
    console.log("MongoDB connection closed");
  }
}

testConnection();
