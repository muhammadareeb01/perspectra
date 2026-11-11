'use client';

import { brand } from '@/lib/brand';
import { FormEvent, useState } from 'react';

export function ContactClient() {
  const [sent, setSent] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    setSent(true);
  }
  return sent ? (
    <div className="form-success">
      <strong>Message received.</strong>
      <br />
      Thanks for helping us make the comparison clearer. We’ll be in touch from {brand.email}.
    </div>
  ) : (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required autoComplete="email" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="subject">Subject</label>
        <input id="subject" name="subject" required />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>
      <div className="form-submit">
        <button className="button button--dark" type="submit">
          Send message <span aria-hidden="true">↗</span>
        </button>
      </div>
    </form>
  );
}
