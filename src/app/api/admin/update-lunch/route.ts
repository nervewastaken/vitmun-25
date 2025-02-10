import clientPromise from "../../../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Connect to MongoDB
    console.log(req.headers);
    const client = await clientPromise;
    const db = client.db("delegateallotments");

    // Update the `lunch` field to `false` for all documents in internal & external collections
    const internalUpdate = await db.collection("internal").updateMany({}, { $set: { lunch: false } });
    const externalUpdate = await db.collection("external").updateMany({}, { $set: { lunch: false } });

    return NextResponse.json({
      success: true,
      message: "Lunch status reset for all delegates.",
      internalUpdated: internalUpdate.modifiedCount,
      externalUpdated: externalUpdate.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating lunch status:", error);
    return NextResponse.json({ success: false, error: "Failed to reset lunch status" }, { status: 500 });
  }
}