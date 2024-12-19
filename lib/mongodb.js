import { MongoClient, ServerApiVersion } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to the .env.local file.");
}

const uri = process.env.MONGODB_URI;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
};

// Initialize the MongoDB client
let client;
let clientPromise;

// Check the environment
if (process.env.NODE_ENV === "development") {
  // Use a global variable to persist the client instance during hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new client instance
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
