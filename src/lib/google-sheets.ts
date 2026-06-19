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

// Cache header check — only verify once per server lifecycle
let headerVerified = false;

// ── Sheets task ───────────────────────────────────────────────────────────────
export async function writeToSheets(
  name: string,
  email: string,
  phone: string,
  grade: string,
  message: string,
  timestamp: string
) {
  const sheets = google.sheets({ version: "v4", auth: getAuth() });

  // Only check/create header once per server lifecycle — saves ~1-2s on repeat requests
  if (!headerVerified) {
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

    headerVerified = true;
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
