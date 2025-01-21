import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to the .env.local file.");
}

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/delegateinfo";
let client;
let clientPromise;

//test
// Function to ensure collections are created
async function ensureCollections(client) {
  const db = client.db("delegateinfo"); // Database name
  const collections = await db.listCollections().toArray();

  const existingCollectionNames = collections.map((col) => col.name);

  const requiredCollections = ["external", "internal", "delegations"];

  // Create collections if they do not exist
  for (const collectionName of requiredCollections) {
    if (!existingCollectionNames.includes(collectionName)) {
      await db.createCollection(collectionName);
      console.log(`Collection '${collectionName}' created.`);
    }
  }
}

// Check the environment
if (process.env.NODE_ENV === "development") {
  // Use a global variable to persist the client instance during hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect().then((connectedClient) => {
      ensureCollections(connectedClient); // Ensure collections exist after connecting
      return connectedClient;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client instance
  client = new MongoClient(uri);
  clientPromise = client.connect().then((connectedClient) => {
    ensureCollections(connectedClient); // Ensure collections exist after connecting
    return connectedClient;
  });
}

export default clientPromise;