// components/Contact.jsx
import React, { useCallback, useState } from "react";

function Contact() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    const to = "vp77441719@gmail.com";
    const mailSubject = subject || `New message from ${fullName || "your portfolio"}`;
    const bodyLines = [
      `Name: ${fullName || "(not provided)"}`,
      `Email: ${email || "(not provided)"}`,
      "",
      message || "(no message provided)",
    ];
    const mailtoUrl = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
    window.location.href = mailtoUrl;
  }, [fullName, email, subject, message]);

  return (
    <div className="container py-4">
      <h1 className="mb-4">Contact Me</h1>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Get in touch</h5>
              <p className="card-text mb-2">Feel free to reach out using the details below.</p>
              <ul className="list-unstyled mb-0">
                <li className="mb-2"><strong>Name:</strong> Vikram Patil</li>
                <li className="mb-2"><strong>Email:</strong> <a href="mailto:vp77441719@gmail.com">vp77441719@gmail.com</a></li>
                <li className="mb-2"><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/vikram-patil-879b9925a" target="_blank" rel="noreferrer">linkedin.com/in/vikram-pati</a></li>
                <li className="mb-2"><strong>GitHub:</strong> <a href="https://github.com/Vikram3210" target="_blank" rel="noreferrer">Github.com/vikram-pati</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Send me a message</h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full name</label>
                  <input id="fullName" type="text" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input id="email" type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">Subject</label>
                  <input id="subject" type="text" className="form-control" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea id="message" className="form-control" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your message here..."></textarea>
                </div>
                <div className="d-grid d-sm-flex gap-2">
                  <button type="submit" className="btn btn-primary">Send Email</button>
                  <button type="reset" className="btn btn-outline-secondary" onClick={() => { setFullName(""); setEmail(""); setSubject(""); setMessage(""); }}>Clear</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

