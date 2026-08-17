import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  budget: string;
  message: string;
}

function validatePayload(data: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const payload = data as Record<string, string>;

  if (!payload.name || payload.name.trim().length < 2) {
    errors.push("Name must be at least 2 characters.");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!payload.email || !emailRegex.test(payload.email)) {
    errors.push("A valid email address is required.");
  }

  if (!payload.phone || payload.phone.trim().length < 7) {
    errors.push("A valid phone number is required.");
  }

  if (!payload.service) {
    errors.push("Please select a service.");
  }

  if (!payload.budget) {
    errors.push("Please select a budget range.");
  }

  if (!payload.message || payload.message.trim().length < 20) {
    errors.push("Message must be at least 20 characters.");
  }

  // Basic XSS prevention — reject script tags
  const dangerousPattern = /<script|javascript:|onerror|onload/i;
  const allValues = Object.values(payload).join(" ");
  if (dangerousPattern.test(allValues)) {
    errors.push("Invalid input detected.");
  }

  return { valid: errors.length === 0, errors };
}

function buildEmailHtml(data: ContactPayload): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0f; color: #e2e8f0; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; padding: 32px 24px; }
          .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); padding: 24px; border-radius: 16px 16px 0 0; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 22px; font-weight: 700; }
          .header p { color: rgba(255,255,255,0.8); margin: 6px 0 0; font-size: 14px; }
          .body { background: #0f0f1a; border: 1px solid rgba(255,255,255,0.08); border-top: 0; border-radius: 0 0 16px 16px; padding: 28px; }
          .field { margin-bottom: 18px; }
          .label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #8B5CF6; margin-bottom: 4px; }
          .value { font-size: 15px; color: #e2e8f0; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 10px 14px; }
          .message { white-space: pre-wrap; line-height: 1.6; }
          .footer { margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center; color: #4b5563; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 New Inquiry — TheWebYatra</h1>
            <p>A new client has started their digital journey</p>
          </div>
          <div class="body">
            <div class="field"><div class="label">Name</div><div class="value">${escapeHtml(data.name)}</div></div>
            <div class="field"><div class="label">Email</div><div class="value">${escapeHtml(data.email)}</div></div>
            <div class="field"><div class="label">Phone</div><div class="value">${escapeHtml(data.phone)}</div></div>
            ${data.company ? `<div class="field"><div class="label">Company</div><div class="value">${escapeHtml(data.company)}</div></div>` : ""}
            <div class="field"><div class="label">Service Interested In</div><div class="value">${escapeHtml(data.service)}</div></div>
            <div class="field"><div class="label">Budget Range</div><div class="value">${escapeHtml(data.budget)}</div></div>
            <div class="field"><div class="label">Message</div><div class="value message">${escapeHtml(data.message)}</div></div>
            <div class="footer">Sent via thewebyatra.com contact form · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { valid, errors } = validatePayload(body);

    if (!valid) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const data = body as ContactPayload;

    // Configure transporter — uses env variables for security
    // For development, falls back to Ethereal (test) SMTP
    const isDev = process.env.NODE_ENV !== "production";

    let transporter;

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else if (isDev) {
      // In dev without env vars, use Ethereal test account
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    } else {
      return NextResponse.json(
        { success: false, errors: ["Email service not configured. Please contact us directly."] },
        { status: 503 }
      );
    }

    const toEmail = process.env.CONTACT_EMAIL || "hello@thewebyatra.com";

    const info = await transporter.sendMail({
      from: `"TheWebYatra Contact" <${process.env.SMTP_USER || "noreply@thewebyatra.com"}>`,
      to: toEmail,
      replyTo: data.email,
      subject: `New Inquiry from ${data.name} — ${data.service}`,
      html: buildEmailHtml(data),
      text: `
New Inquiry from TheWebYatra Contact Form
==========================================
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.company ? `Company: ${data.company}` : ""}
Service: ${data.service}
Budget: ${data.budget}
Message:
${data.message}
      `.trim(),
    });

    // In dev, log preview URL
    if (isDev) {
      console.log("📧 Email preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return NextResponse.json({ success: true, message: "Your message has been sent! We'll be in touch within 24 hours." });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { success: false, errors: ["Something went wrong. Please try again or email us directly."] },
      { status: 500 }
    );
  }
}

// Health check
export async function GET() {
  return NextResponse.json({ status: "ok", service: "contact-form" });
}
