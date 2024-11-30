import clientPromise from "../../lib/mongodb";

export default async function Home() {
  try {
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("test");

    const data = await collection.find({}).toArray();

    return (
      <div>
        <h1>Data from MongoDB:</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  } catch (error) {
    return <div>{error.message}</div>;
  }
}