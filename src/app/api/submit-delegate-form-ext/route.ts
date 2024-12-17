import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("external");

    // Parse form data from request body
    const formData = await req.json();

    console.log(formData);

    // Check for existing entry with the same email or contact number
    const existingEntry = await collection.findOne({
      $or: [
        { email_id: formData.email_id },
        { contact_number: formData.contact_number },
      ],
    });

    if (existingEntry) {
      return NextResponse.json(
        { error: "Entry with this email or contact number already exists." },
        { status: 400 }
      );
    }

    // Build the document to be inserted
    const document = {
      participant_name: formData.participant_name,
      gender: formData.gender,
      contact_number: formData.contact_number,
      email_id: formData.email_id,
      organisation_name: formData.organisation_name,
      accommodation: formData.accommodation,
      committee_preferences: {
        preference_1: {
          committee: formData.committee_preference_1,
          allotments: [
            formData.allotment_preference_1_1,
            formData.allotment_preference_1_2,
            formData.allotment_preference_1_3,
          ].filter(Boolean),
        },
        preference_2: {
          committee: formData.committee_preference_2,
          allotments: [
            formData.allotment_preference_2_1,
            formData.allotment_preference_2_2,
            formData.allotment_preference_2_3,
          ].filter(Boolean),
        },
        preference_3: {
          committee: formData.committee_preference_3,
          allotments: [
            formData.allotment_preference_3_1,
            formData.allotment_preference_3_2,
            formData.allotment_preference_3_3,
          ].filter(Boolean),
        },
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
      paid: false,
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
