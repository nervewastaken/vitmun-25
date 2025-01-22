import { MongoClient } from "mongodb";

// Validate environment variables
if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to the .env.local file.");
}

const uri = process.env.MONGODB_URI;
let client;
let clientPromise;

// Function to ensure collections are created
async function ensureCollections(client) {
  const db = client.db("delegateinfo"); // Database name
  const collections = await db.listCollections().toArray();
  const existingCollectionNames = collections.map((col) => col.name);

  const requiredCollections = ["external", "internal", "delegations"];
  for (const collectionName of requiredCollections) {
    if (!existingCollectionNames.includes(collectionName)) {
      await db.createCollection(collectionName);
      console.log(`Collection '${collectionName}' created.`);
    }
  }
}

// Initialize MongoDB connection
if (process.env.NODE_ENV === "development") {
  // Use a global variable to persist the client during hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect().then((connectedClient) => {
      ensureCollections(connectedClient);
      return connectedClient;
    });
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client instance
  client = new MongoClient(uri);
  clientPromise = client.connect().then((connectedClient) => {
    ensureCollections(connectedClient);
    return connectedClient;
  });
}

export default clientPromise;
