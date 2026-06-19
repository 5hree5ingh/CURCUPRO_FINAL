import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";
import { writeToSheets } from "@/lib/google-sheets";

// ── API Route ─────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, grade, message } = body;
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Run email + sheets in PARALLEL — cuts time roughly in half
    await Promise.all([
      sendEmail(name, email, phone, grade, message, timestamp),
      writeToSheets(name, email, phone, grade, message, timestamp),
    ]);

    console.log("[Submit] ✅ Email sent + row appended");
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
