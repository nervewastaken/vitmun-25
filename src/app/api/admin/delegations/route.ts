import { NextResponse, NextRequest } from "next/server";
import clientPromise from "../../../../../lib/mongodb";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req: NextRequest) {
  try {
    // Authenticate the user
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json({ error: "Bad Auth!" }, { status: 401 });
    }

    // Fetch data from MongoDB
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("delegation");

    const data = await collection.find({}).toArray(); // Fetch all documents from the collection

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error fetching data:", error);

    // Safely handle the `unknown` error type
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}