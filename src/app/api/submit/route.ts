import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import path from "path";

const SPREADSHEET_ID = "1v-bJEaX57keHkvxz8u4Leu-eHKEpyqoiOkTa8oAA8rQ";
const SERVICE_ACCOUNT_FILE = path.join(process.cwd(), "service-account.json");

// Cache auth so we don't re-read the JSON file on every request
let cachedAuth: InstanceType<typeof google.auth.GoogleAuth> | null = null;
function getAuth() {
  if (!cachedAuth) {
    cachedAuth = new google.auth.GoogleAuth({
      keyFile: SERVICE_ACCOUNT_FILE,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
  }
  return cachedAuth;
}

// ── Email task ────────────────────────────────────────────────────────────────
async function sendEmail(name: string, email: string, phone: string, grade: string, message: string, timestamp: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Curcumin Solutions Website" <${process.env.GMAIL_USER}>`,
    to: "aurvaaywellness@gmail.com",
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

  // Auto-reply to the lead
  await transporter.sendMail({
    from: `"Curcumin Solutions" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: `Thanks ${name} — We've received your sample request`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e5dcd0;">
        <div style="background:linear-gradient(135deg,#b0741a,#8c540c);padding:24px 32px;">
          <h2 style="color:#fff;margin:0;font-size:20px;letter-spacing:0.02em;">Sample Request Received ✓</h2>
          <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:12px;">Curcumin Solutions — ${timestamp}</p>
        </div>
        <div style="padding:28px 32px;">
          <p style="color:#1a1105;font-size:15px;line-height:1.7;margin:0 0 16px;">Hi ${name},</p>
          <p style="color:#493c2c;font-size:14px;line-height:1.7;margin:0 0 16px;">
            Thank you for your interest in our synthetic curcumin. We've received your request for <strong style="color:#b0741a;">${grade}</strong>.
          </p>
          <p style="color:#493c2c;font-size:14px;line-height:1.7;margin:0 0 20px;">
            Our team will review your requirements and get back to you within <strong>24 hours</strong> with sample details, pricing, and shipping information.
          </p>
          <div style="background:#faf7f2;border:1px solid #f0ebe0;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
            <p style="color:#888;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;">Your Request Summary</p>
            <p style="color:#1a1105;font-size:13px;margin:2px 0;"><strong>Grade:</strong> ${grade}</p>
            <p style="color:#1a1105;font-size:13px;margin:2px 0;"><strong>Requirements:</strong> ${message || "—"}</p>
          </div>
          <p style="color:#493c2c;font-size:13px;line-height:1.6;margin:0;">
            Meanwhile, feel free to reach us at <a href="tel:+919045101186" style="color:#b0741a;text-decoration:none;">+91 90451 01186</a> or reply to this email.
          </p>
        </div>
        <div style="background:#faf7f2;padding:16px 32px;text-align:center;border-top:1px solid #f0ebe0;">
          <a href="https://www.curcumex.com" style="color:#b0741a;font-size:12px;text-decoration:none;">Visit curcumex.com →</a>
        </div>
      </div>
    `,
  });
}

// ── Sheets task ───────────────────────────────────────────────────────────────
async function writeToSheets(name: string, email: string, phone: string, grade: string, message: string, timestamp: string) {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  // Check if header row exists
  const headerCheck = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A1:F1",
  });

  const hasHeader = headerCheck.data.values?.length
    && headerCheck.data.values[0][0] === "Timestamp";

  if (!hasHeader) {
    // Clear ALL content + formatting, write header, style, set widths — in ONE batch
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: "Sheet1",
    });

    // Column widths: Timestamp=200, Name=180, Email=280, Phone=180, Grade=320, Requirements=400
    const columnWidths = [200, 180, 280, 180, 320, 400];

    // Write header + format + set widths all in parallel
    await Promise.all([
      sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: "Sheet1!A1:F1",
        valueInputOption: "RAW",
        requestBody: {
          values: [["Timestamp", "Name", "Email", "Phone", "Grade", "Requirements"]],
        },
      }),
      sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
          requests: [
            // Clear ALL formatting (removes old brown background)
            {
              repeatCell: {
                range: { sheetId: 0 },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 1, green: 1, blue: 1 },
                  },
                },
                fields: "userEnteredFormat.backgroundColor",
              },
            },
            // Golden header: bold white text on golden background
            {
              repeatCell: {
                range: { sheetId: 0, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: 6 },
                cell: {
                  userEnteredFormat: {
                    backgroundColor: { red: 0.69, green: 0.455, blue: 0.102 },
                    textFormat: {
                      bold: true,
                      fontSize: 11,
                      foregroundColor: { red: 1, green: 1, blue: 1 },
                    },
                    horizontalAlignment: "CENTER",
                    verticalAlignment: "MIDDLE",
                  },
                },
                fields: "userEnteredFormat(backgroundColor,textFormat,horizontalAlignment,verticalAlignment)",
              },
            },
            // Set fixed column widths
            ...columnWidths.map((px, i) => ({
              updateDimensionProperties: {
                range: { sheetId: 0, dimension: "COLUMNS", startIndex: i, endIndex: i + 1 },
                properties: { pixelSize: px },
                fields: "pixelSize",
              },
            })),
            // Freeze the header row
            {
              updateSheetProperties: {
                properties: { sheetId: 0, gridProperties: { frozenRowCount: 1 } },
                fields: "gridProperties.frozenRowCount",
              },
            },
          ],
        },
      }),
    ]);
  }

  // Append the new row (no extra formatting — white is the default)
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[timestamp, name, email, phone, grade, message || "—"]],
    },
  });
}

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
