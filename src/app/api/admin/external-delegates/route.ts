import clientPromise from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  // Get authentication details
  const { userId } = getAuth(req);

  // If not authenticated, return a 401 Unauthorized response
  if (!userId) {
    return NextResponse.json({ error: "Bad auth!" }, { status: 401 });
  }

  try {
    // Proceed with database operations
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("external");

    const data = await collection.find({}).toArray();
    return NextResponse.json({ data });
  } catch (error) {
    // Handle errors gracefully
    return NextResponse.json(
      { error: "Failed to fetch data from the database" },
      { status: 500 }
    );
  }
}