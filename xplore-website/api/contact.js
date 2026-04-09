import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { name, email, service, description } = req.body ?? {};

    if (!name || !email || !description) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const to = process.env.CONTACT_TO || "solutions.xploreautomations@gmail.com";

    if (!user || !pass) {
      return res.status(500).json({ message: "Mail server is not configured." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: `"Xplore Website" <${user}>`,
      to,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: [
        "New website inquiry",
        `Name: ${name}`,
        `Email: ${email}`,
        `Service: ${service || "Not specified"}`,
        "Description:",
        description,
      ].join("\n"),
      html: `
        <h2>New website inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <p><strong>Description:</strong></p>
        <p>${String(description).replace(/\n/g, "<br/>")}</p>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact email error:", error);
    return res.status(500).json({ message: "Failed to send inquiry email." });
  }
}
