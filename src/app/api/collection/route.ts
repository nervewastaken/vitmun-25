import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("test");

    const data = await collection.find({}).toArray();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from MongoDB" },
      { status: 500 }
    );
  }
}
