import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/config/site";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  // If Resend API key not configured, fall back gracefully
  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Email service not configured. Please contact directly at " + siteConfig.email },
      { status: 503 },
    );
  }

  const body = await request.json() as {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };

  const { name, email, subject, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Website Contact <onboarding@resend.dev>",
      to: [siteConfig.email],
      replyTo: email,
      subject: subject?.trim()
        ? `[Website] ${subject}`
        : `[Website Contact] Message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
          <h2 style="color: #111; margin-bottom: 4px;">New message from your website</h2>
          <p style="color: #666; margin-top: 0; font-size: 14px;">Via the contact form on prasenjitdey.in</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <table style="width: 100%; font-size: 14px; color: #333;">
            <tr><td style="padding: 6px 0; font-weight: bold; width: 80px;">From</td><td>${name}</td></tr>
            <tr><td style="padding: 6px 0; font-weight: bold;">Email</td><td><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td></tr>
            ${subject ? `<tr><td style="padding: 6px 0; font-weight: bold;">Subject</td><td>${subject}</td></tr>` : ""}
          </table>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <h3 style="font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.05em;">Message</h3>
          <p style="font-size: 15px; line-height: 1.7; color: #222; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999;">Reply directly to this email to respond to ${name}.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please email directly at " + siteConfig.email },
      { status: 500 },
    );
  }
}
