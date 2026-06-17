import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";

const SPREADSHEET_ID = "1rby4czk-qR_oK809MmBujzYSkU4fWumiLoeYhu020qE";
const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), "service-account.json");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, grade, message } = body;
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // ── 1. Send email via Gmail SMTP ────────────────────────────────────────
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Curcumin Solutions Website" <${process.env.GMAIL_USER}>`,
      to: "shreyanshmall2@gmail.com",
      subject: `New Sample Request — ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e5dcd0;">
          <div style="background:linear-gradient(135deg,#b0741a,#8c540c);padding:24px 32px;">
            <h2 style="color:#fff;margin:0;font-size:20px;letter-spacing:0.02em;">New Sample Request</h2>
            <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:12px;">Curcumin Solutions — ${timestamp}</p>
          </div>
          <div style="padding:28px 32px;">
            <table style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="color:#888;padding:8px 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Name</td></tr>
              <tr><td style="color:#1a1105;font-weight:600;padding-bottom:16px;border-bottom:1px solid #f0ebe0;">${name}</td></tr>
              <tr><td style="color:#888;padding:12px 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Email</td></tr>
              <tr><td style="color:#1a1105;padding-bottom:16px;border-bottom:1px solid #f0ebe0;">${email}</td></tr>
              <tr><td style="color:#888;padding:12px 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Phone</td></tr>
              <tr><td style="color:#1a1105;padding-bottom:16px;border-bottom:1px solid #f0ebe0;">${phone}</td></tr>
              <tr><td style="color:#888;padding:12px 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Grade Selected</td></tr>
              <tr><td style="color:#b0741a;font-weight:600;padding-bottom:16px;border-bottom:1px solid #f0ebe0;">${grade}</td></tr>
              <tr><td style="color:#888;padding:12px 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;">Requirements</td></tr>
              <tr><td style="color:#1a1105;padding-bottom:8px;">${message || "—"}</td></tr>
            </table>
          </div>
          <div style="background:#faf7f2;padding:16px 32px;text-align:center;border-top:1px solid #f0ebe0;">
            <a href="https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/edit" style="color:#b0741a;font-size:12px;text-decoration:none;">View all submissions in Google Sheets →</a>
          </div>
        </div>
      `,
    });

    // ── 2. Write directly to Google Sheets via Service Account ──────────────
    const auth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Check if header row exists
    const headerCheck = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A1:F1",
    });

    const hasHeader = headerCheck.data.values && headerCheck.data.values.length > 0;

    if (!hasHeader) {
      // Write header row with formatting
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A1:F1",
        valueInputOption: "RAW",
        requestBody: {
          values: [["Timestamp", "Name", "Email", "Phone", "Grade", "Requirements"]],
        },
      });

      // Bold + color the header
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            {
              repeatCell: {
                range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 6 },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.69, green: 0.455, blue: 0.102 },
                    textFormat: { bold: true, foregroundColor: { red: 1, green: 1, blue: 1 } },
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat)",
              },
            },
          ],
        },
      });
    }

    // Append the new row
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1!A:F",
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[timestamp, name, email, phone, grade, message || "—"]],
      },
    });

    console.log("[Sheets] ✅ Row appended successfully");
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 });
  }
}
