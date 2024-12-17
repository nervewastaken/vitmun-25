import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  // Get authentication details
  const { userId } = getAuth(req);

  // If not authenticated, return a 401 Unauthorized response
  if (!userId) {
    return NextResponse.json({ error: "Bad auth!" }, { status: 401 });
  }

  try {
    // Parse request body
    const { type, id, allotment_committee, allotment_portfolio, paid } =
      await req.json();

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("delegateallotments");

    // Determine the correct collection based on the type
    const collection = db.collection(
      type === "external" ? "external" : "internal"
    );

    // Update the document
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          allotment_committee,
          allotment_portfolio,
          paid,
        },
      }
    );

    // Return success response
    return NextResponse.json({ success: result.modifiedCount > 0 });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error updating document:", error);
    return NextResponse.json(
      { error: "Failed to update the document" },
      { status: 500 }
    );
  }
}
