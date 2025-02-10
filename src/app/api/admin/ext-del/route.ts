import clientPromise from "../../../../../lib/mongodb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log(req);
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("external");

    // Fetch only delegates where all other fields are null
    const data = await collection
      .find({
        participant_name: { $exists: true },
        contact_number: { $exists: true },
        allotment_committee: { $exists: true },
        allotment_portfolio: { $exists: true },
        email_id: { $exists: true },
      })
      .toArray();

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Database fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from the database" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("external");

    const newDelegate = {
      participant_name: body.participant_name,
      email_id: body.email_id,
      contact_number: body.contact_number,
      allotment_committee: body.allotment_committee,
      allotment_portfolio: body.allotment_portfolio,
      paid: true, // Default to true
      gender: null,
      organisation_name: null,
      accommodation: null,
      committee_preferences: null,
      experience: null,
      registration_number: null,
    };

    await collection.insertOne(newDelegate);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error inserting delegate:", error);
    return NextResponse.json(
      { error: "Failed to add delegate" },
      { status: 500 }
    );
  }
}