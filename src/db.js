import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not set");
}

// Reuse client across hot reloads in development
let client;
let db;

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable to preserve connection across HMR
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

db = client.db("sport-nest");

export { client, db };