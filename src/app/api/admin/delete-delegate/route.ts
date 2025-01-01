import { ObjectId } from "mongodb";
import clientPromise from "../../../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function DELETE(req: NextRequest) {
  // Get authentication details
  const { userId } = getAuth(req);

  // If not authenticated, return a 401 Unauthorized response
  if (!userId) {
    return NextResponse.json({ error: "Bad auth!" }, { status: 401 });
  }

  try {
    // Parse the query parameters
    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");

    // Validate the request parameters
    if (!type || !id) {
      return NextResponse.json(
        { error: "Missing 'type' or 'id' parameter" },
        { status: 400 }
      );
    }

    // Connect to the database
    const client = await clientPromise;
    const db = client.db("delegateallotments");

    // Determine the correct collection based on the type
    const collection = db.collection(
      type === "external" ? "external" : "internal"
    );

    // Delete the document
    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    // Return success response
    if (result.deletedCount > 0) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Delegate not found or already deleted" },
        { status: 404 }
      );
    }
  } catch (error) {
    // Handle errors gracefully
    console.error("Error deleting document:", error);
    return NextResponse.json(
      { error: "Failed to delete the document" },
      { status: 500 }
    );
  }
}