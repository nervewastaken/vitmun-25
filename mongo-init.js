// Connect to the 'admin' database
db = db.getSiblingDB("admin");

// Check if the root user already exists
if (!db.getUsers().some(user => user.user === process.env.MONGO_INITDB_ROOT_USERNAME)) {
  // Create the root user with full privileges
  db.createUser({
    user: process.env.MONGO_INITDB_ROOT_USERNAME, // Root username
    pwd: process.env.MONGO_INITDB_ROOT_PASSWORD, // Root password
    roles: [{ role: "root", db: "admin" }],
  });
  print("Root user created successfully.");
} else {
  print("Root user already exists. No changes made.");
}

// Switch to the target database (delegateinfo)
db = db.getSiblingDB("delegateinfo");

// List of required collections
const collections = ["external", "internal", "delegations"];

// Ensure collections exist
collections.forEach((collectionName) => {
  const existingCollections = db.getCollectionNames();
  if (!existingCollections.includes(collectionName)) {
    db.createCollection(collectionName);
    print(`Collection '${collectionName}' created.`);
  } else {
    print(`Collection '${collectionName}' already exists. No changes made.`);
  }
});

print("Database and collections setup completed successfully.");