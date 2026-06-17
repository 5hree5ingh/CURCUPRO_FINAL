// ─── CONFIG ───────────────────────────────────────────────────────────────────
const SHEET_ID     = "1rby4czk-qR_oK809MmBujzYSkU4fWumiLoeYhu020qE";
const NOTIFY_EMAIL = "shreyanshmall2@gmail.com";
// ──────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var data  = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();

    // Add header row on first submission
    if (sheet.getLastRow() === 0) {
      var header = ["Timestamp", "Name", "Email", "Phone", "Grade", "Requirements"];
      sheet.appendRow(header);
      sheet.getRange(1, 1, 1, header.length)
           .setFontWeight("bold")
           .setBackground("#b0741a")
           .setFontColor("#ffffff");
    }

    var ts = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    // Append the form submission as a new row
    sheet.appendRow([
      ts,
      data.name    || "",
      data.email   || "",
      data.phone   || "",
      data.grade   || "",
      data.message || ""
    ]);

    // Auto-resize columns for readability
    sheet.autoResizeColumns(1, 6);

    // Send email notification
    MailApp.sendEmail({
      to:      NOTIFY_EMAIL,
      subject: "New Sample Request — " + (data.name || "Unknown"),
      body: [
        "A new sample request was submitted on the Curcumin Solutions website.",
        "",
        "Name:         " + (data.name    || "—"),
        "Email:        " + (data.email   || "—"),
        "Phone:        " + (data.phone   || "—"),
        "Grade:        " + (data.grade   || "—"),
        "Requirements: " + (data.message || "—"),
        "",
        "Submitted at: " + ts,
        "",
        "View all submissions:",
        "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/edit"
      ].join("\n")
    });

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
