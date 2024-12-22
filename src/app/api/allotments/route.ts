import { NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const committee = searchParams.get("committee");

    const client = await clientPromise;
    const db = client.db("delegateallotments");

    // Build the query
    const query: Record<string, unknown> = {
      allotment_portfolio: { $ne: null },
    };
    if (committee) {
      query.allotment_committee = committee;
    }

    // Fetch data from both 'external' and 'internal' collections
    const [externalData, internalData] = await Promise.all([
      db
        .collection("external")
        .find(query, {
          projection: { participant_name: 1, allotment_portfolio: 1 },
        })
        .toArray(),
      db
        .collection("internal")
        .find(query, {
          projection: { participant_name: 1, allotment_portfolio: 1 },
        })
        .toArray(),
    ]);

    // Combine and filter data
    const combinedData = [...externalData, ...internalData].filter(
      (item) => item.allotment_portfolio !== null
    );

    return NextResponse.json({ success: true, data: combinedData });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
