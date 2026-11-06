import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGODB_DB || "bazardor";

if (!uri) {
  console.warn("Notice: 'MONGO_URI' is not set. Ensure database environment variables are configured.");
}

let client;
let clientPromise;

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClient) {
      global._mongoClient = new MongoClient(uri);
      global._mongoClientPromise = global._mongoClient.connect();
    }
    client = global._mongoClient;
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
} else {
  client = new MongoClient("mongodb://localhost:27017/bazardor");
  clientPromise = Promise.resolve(client);
}

const db = client.db(dbName);

export { client, clientPromise, db };
export default client;

