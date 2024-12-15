import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("delegation");

    const result = await collection.insertOne({
      organisationName: body.organisationName,
      headDelegate: body.headDelegate,
      email: body.email,
      contactNumber: body.contactNumber,
      delegationStrength: parseInt(body.delegationStrength),
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
