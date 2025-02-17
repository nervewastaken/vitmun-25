import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  // Get authentication details

  // If not authenticated, return a 401 Unauthorized response

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
