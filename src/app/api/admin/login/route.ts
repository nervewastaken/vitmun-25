import { NextResponse } from "next/server";

// Load environment variables
const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 401 }
      );
    }
  } catch (e) {
    console.log("Error:", e);
    return NextResponse.json(
      { message: "Internal Server Error! Please try again later." },
      { status: 500 }
    );
  }
}
