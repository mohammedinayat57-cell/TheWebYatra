import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// ─── Google Drive Setup ────────────────────────────────────────────────────────
const GOOGLE_DRIVE_FOLDER_ID = "1Goi_q41t6GgI54qzm_DpKc_2X3_rSb3Y";

async function uploadToGoogleDrive(pdfBuffer: Buffer, fileName: string) {
  try {
    // Initialize Google Drive with Service Account credentials
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive.file"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Upload file to Google Drive
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [GOOGLE_DRIVE_FOLDER_ID],
        mimeType: "application/pdf",
      },
      media: {
        mimeType: "application/pdf",
        body: Buffer.from(pdfBuffer),
      },
      fields: "id, webViewLink, webContentLink",
    });

    // Make the file accessible with the link
    await drive.permissions.create({
      fileId: response.data.id!,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return {
      success: true,
      fileId: response.data.id,
      webViewLink: response.data.webViewLink,
      webContentLink: response.data.webContentLink,
    };
  } catch (error) {
    console.error("Google Drive upload error:", error);
    return { success: false, error: String(error) };
  }
}

// ─── Email Setup ───────────────────────────────────────────────────────────────
async function sendAcceptanceEmail(
  clientEmail: string,
  clientName: string,
  quotationNumber: string,
  pdfBuffer: Buffer,
  fileName: string,
  driveLink?: string
) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email to client
    const clientMailOptions = {
      from: `TheWebYatra <${process.env.SMTP_USER}>`,
      to: clientEmail,
      subject: `Quotation ${quotationNumber} - Electronically Accepted | TheWebYatra`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5E3C, #C4966A); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #C4966A; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
            .status { background: #d4edda; border: 1px solid #c3e6cb; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✓ Quotation Accepted</h1>
              <p>Your quotation has been electronically accepted</p>
            </div>
            <div class="content">
              <p>Dear ${clientName},</p>
              
              <p>Thank you for accepting our quotation <strong>${quotationNumber}</strong>.</p>
              
              <div class="status">
                <strong>✓ Status:</strong> Electronically Accepted by Client
              </div>
              
              <p>Your accepted quotation PDF is attached to this email. ${driveLink ? `You can also access it online at: <a href="${driveLink}">View Quotation</a>` : ""}</p>
              
              <p><strong>Next Steps:</strong></p>
              <ul>
                <li>Our team will contact you within 24 hours to discuss project details</li>
                <li>We'll share payment details for the 50% advance payment</li>
                <li>Project timeline will commence after advance payment confirmation</li>
              </ul>
              
              <p>If you have any questions, please feel free to reach out:</p>
              <ul>
                <li>📧 Email: support@thewebyatra.com</li>
                <li>📞 Phone: +91 89202 91416</li>
                <li>💬 WhatsApp: <a href="https://wa.me/918920291416">Chat with us</a></li>
              </ul>
              
              <p>We're excited to work with you!</p>
              
              <p>Best regards,<br><strong>TheWebYatra Team</strong><br>We Code. You Grow.</p>
            </div>
            <div class="footer">
              <p>TheWebYatra | A-665, Street No. 12, Zakir Nagar, Delhi - 110025</p>
              <p><a href="https://thewebyatra.com">thewebyatra.com</a></p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Email to TheWebYatra
    const companyMailOptions = {
      from: `TheWebYatra <${process.env.SMTP_USER}>`,
      to: "thewebyatra@gmail.com",
      subject: `NEW ACCEPTANCE: ${quotationNumber} - ${clientName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #155724; color: white; padding: 20px; text-align: center; border-radius: 5px; }
            .content { background: #f9f9f9; padding: 20px; margin-top: 20px; border-radius: 5px; }
            .info-row { padding: 10px; border-bottom: 1px solid #ddd; }
            .info-row:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #666; display: inline-block; width: 150px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎉 New Quotation Accepted!</h2>
            </div>
            <div class="content">
              <h3>Quotation Details</h3>
              <div class="info-row">
                <span class="label">Quotation No:</span> ${quotationNumber}
              </div>
              <div class="info-row">
                <span class="label">Client Name:</span> ${clientName}
              </div>
              <div class="info-row">
                <span class="label">Status:</span> ✓ Electronically Accepted by Client
              </div>
              ${driveLink ? `<div class="info-row"><span class="label">Drive Link:</span> <a href="${driveLink}">View on Google Drive</a></div>` : ""}
              
              <p style="margin-top: 20px; padding: 15px; background: #fff3cd; border-left: 4px solid #ffc107;">
                <strong>Action Required:</strong> Follow up with the client within 24 hours to discuss next steps and payment details.
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
      attachments: [
        {
          filename: fileName,
          content: pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    };

    // Send both emails
    await transporter.sendMail(clientMailOptions);
    await transporter.sendMail(companyMailOptions);

    return { success: true };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, error: String(error) };
  }
}

// ─── API Route Handler ─────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pdfBase64, clientName, clientEmail, clientMobile, quotationNumber } = body;

    // Validate required fields
    if (!pdfBase64 || !clientName || !clientEmail || !clientMobile || !quotationNumber) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Convert base64 PDF to buffer
    const pdfBuffer = Buffer.from(pdfBase64, "base64");
    const fileName = `TheWebYatra_Accepted_Quotation_${clientName.replace(/\s+/g, "_")}_${quotationNumber}.pdf`;

    // Upload to Google Drive
    const driveResult = await uploadToGoogleDrive(pdfBuffer, fileName);
    
    if (!driveResult.success) {
      console.error("Drive upload failed, continuing with email...");
    }

    // Send emails
    const emailResult = await sendAcceptanceEmail(
      clientEmail,
      clientName,
      quotationNumber,
      pdfBuffer,
      fileName,
      driveResult.webViewLink
    );

    if (!emailResult.success) {
      return NextResponse.json(
        { success: false, error: "Failed to send emails" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Quotation accepted successfully",
      driveLink: driveResult.webViewLink,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
