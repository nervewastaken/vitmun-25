import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("external");

    // Parse form data from request body
    const formData = await req.json();

    console.log(req.json());

    // Build the document to be inserted
    const document = {
      participant_name: formData.participant_name,
      gender: formData.gender,
      contact_number: formData.contact_number,
      email_id: formData.email_id,
      organisation_name: formData.organisation_name,
      accommodation: formData.accommodation,
      committee_preferences: {
        preference_1: formData.committee_preference_1,
        preference_2: formData.committee_preference_2,
        preference_3: formData.committee_preference_3,
      },
      experience: {
        delegate: {
          muns: formData.exp_delegate_muns || 0,
          experience: formData.exp_delegate_text || "",
        },
        eb: {
          muns: formData.exp_eb_muns || 0,
          experience: formData.exp_eb_text || "",
        },
      },
      allotment_committee: null,
      allotment_portfolio: null,
    };

    // Insert the document into the MongoDB collection
    const result = await collection.insertOne(document);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json(
      { error: "Failed to save data to MongoDB" },
      { status: 500 }
      
    );
  }
}
