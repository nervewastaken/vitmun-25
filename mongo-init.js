// Connect to the 'admin' database
db = db.getSiblingDB("admin");

// Create the root user with full privileges
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME, // Root username
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD, // Root password
  roles: [{ role: "root", db: "admin" }],
});

print("Root user created successfully.");

// Switch to the target database (delegateinfo)
db = db.getSiblingDB("delegateinfo");

// List of required collections
const collections = ["external", "internal", "delegations"];

// Ensure collections exist
collections.forEach((collectionName) => {
  if (!db.getCollectionNames().includes(collectionName)) {
    db.createCollection(collectionName);
    print(`Collection '${collectionName}' created.`);
  }
});

print("Database and collections setup completed successfully.");