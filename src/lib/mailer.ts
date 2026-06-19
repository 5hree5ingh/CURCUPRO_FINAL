import nodemailer from "nodemailer";

const SPREADSHEET_ID = "1v-bJEaX57keHkvxz8u4Leu-eHKEpyqoiOkTa8oAA8rQ";

// Cache SMTP transporter — avoids TLS handshake on every request (~1-2s saved)
let cachedTransporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
      pool: true,        // reuse connections
      maxConnections: 3,  // up to 3 parallel sends
    });
  }
  return cachedTransporter;
}

// ── Email task — BOTH emails sent in PARALLEL ─────────────────────────────────
export async function sendEmail(
  name: string,
  email: string,
  phone: string,
  grade: string,
  message: string,
  timestamp: string
) {
  const transporter = getTransporter();

  const notificationMail = transporter.sendMail({
    from: `"Curcumin Solutions Website" <${process.env.GMAIL_USER}>`,
    to: `info@aurvaay.com, ${process.env.GMAIL_USER}`,
    replyTo: email,
    subject: `New Sample Request — ${name}`,
    headers: {
      'X-Priority': '1',
      'X-Mailer': 'Curcumin Solutions Website',
    },
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

  const autoReplyMail = transporter.sendMail({
    from: `"Curcumin Solutions" <${process.env.GMAIL_USER}>`,
    to: email,
    replyTo: `info@aurvaay.com`,
    subject: `Hi ${name}, we received your request - Curcumin Solutions`,
    headers: {
      'X-Mailer': 'Curcumin Solutions Website',
    },
    // Plain text version — critical to avoid spam filters
    text: `Hi ${name},

Thank you for your interest in our synthetic curcumin. We have received your request for ${grade}.

Our team will review your requirements and get back to you within 24 hours with sample details, pricing, and shipping information.

Your Request Summary:
- Grade: ${grade}
- Requirements: ${message || "N/A"}

Meanwhile, feel free to reach us at +91 90451 01186 or reply to this email.

Best regards,
Curcumin Solutions
info@aurvaay.com
www.curcumex.com`,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;border:1px solid #e5dcd0;">
        <div style="background:linear-gradient(135deg,#b0741a,#8c540c);padding:24px 32px;">
          <h2 style="color:#fff;margin:0;font-size:20px;letter-spacing:0.02em;">Sample Request Received</h2>
          <p style="color:rgba(255,255,255,0.7);margin:4px 0 0;font-size:12px;">Curcumin Solutions - ${timestamp}</p>
        </div>
        <div style="padding:28px 32px;">
          <p style="color:#1a1105;font-size:15px;line-height:1.7;margin:0 0 16px;">Hi ${name},</p>
          <p style="color:#493c2c;font-size:14px;line-height:1.7;margin:0 0 16px;">
            Thank you for your interest in our synthetic curcumin. We have received your request for <strong style="color:#b0741a;">${grade}</strong>.
          </p>
          <p style="color:#493c2c;font-size:14px;line-height:1.7;margin:0 0 20px;">
            Our team will review your requirements and get back to you within <strong>24 hours</strong> with sample details, pricing, and shipping information.
          </p>
          <div style="background:#faf7f2;border:1px solid #f0ebe0;border-radius:8px;padding:16px 20px;margin-bottom:16px;">
            <p style="color:#888;font-size:10px;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 6px;">Your Request Summary</p>
            <p style="color:#1a1105;font-size:13px;margin:2px 0;"><strong>Grade:</strong> ${grade}</p>
            <p style="color:#1a1105;font-size:13px;margin:2px 0;"><strong>Requirements:</strong> ${message || "N/A"}</p>
          </div>
          <p style="color:#493c2c;font-size:13px;line-height:1.6;margin:0;">
            Meanwhile, feel free to reach us at <a href="tel:+919045101186" style="color:#b0741a;text-decoration:none;">+91 90451 01186</a> or reply to this email.
          </p>
        </div>
        <div style="background:#faf7f2;padding:16px 32px;text-align:center;border-top:1px solid #f0ebe0;">
          <a href="https://www.curcumex.com" style="color:#b0741a;font-size:12px;text-decoration:none;">Visit curcumex.com</a>
        </div>
      </div>
    `,
  });

  // Send BOTH emails in parallel — saves ~2-3s
  await Promise.all([notificationMail, autoReplyMail]);
}
