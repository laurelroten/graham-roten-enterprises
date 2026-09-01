/**
 * Contact form handler.
 *
 * Static assets are served by Cloudflare before this Worker runs, so the only
 * request that reaches here is the form POST. The form also works without
 * JavaScript: a plain form submit gets an HTML response instead of JSON.
 */

const MAX = { name: 120, email: 200, phone: 40, subject: 200, message: 5000 };

/**
 * Single-line fields (name, email, subject) go into email headers, so every
 * control character is stripped — a stray CR/LF there is header injection.
 */
function clean(value, limit) {
  return String(value ?? "")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .trim()
    .slice(0, limit);
}

/** The message body is not a header, so keep its line breaks. */
function cleanBody(value, limit) {
  return String(value ?? "")
    .replace(/\r\n?/g, "\n")
    .replace(/[\x00-\x09\x0B-\x1F\x7F]/g, "")
    .trim()
    .slice(0, limit);
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function wantsJson(request) {
  return (request.headers.get("accept") || "").includes("application/json");
}

function reply(request, status, message) {
  if (wantsJson(request)) {
    return new Response(JSON.stringify({ ok: status < 400, message }), {
      status,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
  // No-JS fallback: a readable page rather than raw JSON.
  const heading = status < 400 ? "Message sent" : "Message not sent";
  return new Response(
    `<!doctype html><meta charset="utf-8">
     <meta name="viewport" content="width=device-width,initial-scale=1">
     <title>${heading} | GR Enterprises</title>
     <body style="font-family:system-ui,sans-serif;max-width:34rem;margin:4rem auto;padding:0 1rem;line-height:1.6">
     <h1 style="font-size:1.5rem">${heading}</h1>
     <p>${escapeHtml(message)}</p>
     <p><a href="/">Back to GR Enterprises</a></p>`,
    { status, headers: { "content-type": "text/html; charset=utf-8" } }
  );
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname !== "/api/contact") {
      return new Response("Not found", { status: 404 });
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", {
        status: 405,
        headers: { allow: "POST" },
      });
    }

    let form;
    try {
      const type = request.headers.get("content-type") || "";
      form = type.includes("application/json")
        ? new Map(Object.entries(await request.json()))
        : await request.formData();
    } catch {
      return reply(request, 400, "We couldn't read that submission. Please try again.");
    }

    const get = (k) => (form.get ? form.get(k) : undefined);

    // Honeypot: real people never fill this in.
    if (clean(get("company"), 50)) {
      // Look successful to the bot; send nothing.
      return reply(request, 200, "Thanks — your message has been sent.");
    }

    const name = clean(get("name"), MAX.name);
    const email = clean(get("email"), MAX.email);
    const phone = clean(get("phone"), MAX.phone);
    const subject = clean(get("subject"), MAX.subject);
    const message = cleanBody(get("message"), MAX.message);

    if (!name || !email || !subject || !message) {
      return reply(request, 400, "Please fill in your name, email, subject, and message.");
    }
    if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(email)) {
      return reply(request, 400, "That email address doesn't look right. Please check it and try again.");
    }

    const lines = [
      `From:    ${name} <${email}>`,
      phone ? `Phone:   ${phone}` : null,
      `Subject: ${subject}`,
      "",
      message,
    ].filter((line) => line !== null); // keep the intentional blank separator

    try {
      await env.NOTIFY.send({
        // The binding is locked to this address anyway, but pass it
        // explicitly — an omitted `to` is not accepted.
        to: env.CONTACT_TO,
        from: `website@${env.SEND_DOMAIN}`,
        subject: `Website enquiry: ${subject}`,
        replyTo: { email, name },
        text: lines.join("\n"),
        html:
          `<p><strong>From:</strong> ${escapeHtml(name)} ` +
          `&lt;${escapeHtml(email)}&gt;</p>` +
          (phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : "") +
          `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>` +
          `<hr><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
      });
    } catch (err) {
      console.error("contact form send failed", err?.code, err?.message);
      return reply(
        request,
        502,
        "Sorry — we couldn't send that just now. Please call (828) 262-5593 and we'll take the details."
      );
    }

    return reply(request, 200, "Thanks — your message has been sent. We'll get back to you shortly.");
  },
};
