import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    // Check if the user is authenticated
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized access. Please sign in." },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("delegateallotments");
    const collection = db.collection("internal");

    // Parse form data from request body
    const formData = await req.json();

    // Build the document to be inserted
    const document = {
      registration_number: formData.registration_number,
      participant_name: formData.participant_name,
      gender: formData.gender,
      contact_number: formData.contact_number,
      email_id: formData.email_id,
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