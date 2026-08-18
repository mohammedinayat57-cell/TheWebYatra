import { NextRequest, NextResponse } from "next/server";

// WhatsApp-based contact — no SMTP needed.
// The actual WhatsApp redirect is handled client-side.
// This route just validates the payload for any server-side use.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, service, budget, message } = body as Record<string, string>;

    const errors: string[] = [];
    if (!name || name.trim().length < 2) errors.push("Name is required.");
    if (!phone || phone.trim().length < 7) errors.push("Phone number is required.");
    if (!message || message.trim().length < 5) errors.push("Message is required.");

    if (errors.length) return NextResponse.json({ success: false, errors }, { status: 400 });

    // Build WhatsApp message
    const wa = encodeURIComponent(
      `*New Inquiry — TheWebYatra*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email || "—"}\n` +
      `*Phone:* ${phone}\n` +
      `*Service:* ${service || "—"}\n` +
      `*Budget:* ${budget || "—"}\n\n` +
      `*Message:*\n${message}`
    );

    const whatsappUrl = `https://wa.me/919220612315?text=${wa}`;

    return NextResponse.json({ success: true, whatsappUrl });
  } catch {
    return NextResponse.json({ success: false, errors: ["Server error."] }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
