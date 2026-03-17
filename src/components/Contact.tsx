"use client";

import emailjs from "@emailjs/browser";
import { useRef } from "react";

export default function Contact() {

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "service_lnsl1ep",
        "template_q72twvw",
        form.current,
        "PSAUTNZ592GoMoU3R"
      )
      .then(
        () => {
          alert("MESSAGE SENT 🚀");
          form.current?.reset();
        },
        (error) => {
          console.log(error);
          alert("ERROR SENDING MESSAGE");
        }
      );
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center bg-black text-green-400 px-6"
    >
      <div className="border-4 border-green-400 p-10 max-w-3xl w-full bg-neutral-900">

        <h2 className="text-3xl text-yellow-300 mb-10 text-center">
          COMMUNICATION TERMINAL
        </h2>

        <form ref={form} onSubmit={sendEmail} className="space-y-6">

          <div>
            <label className="block mb-2 text-sm">NAME</label>
            <input
              name="name"
              type="text"
              required
              className="w-full bg-black border-2 border-green-400 p-2 text-green-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">EMAIL</label>
            <input
              name="email"
              type="email"
              required
              className="w-full bg-black border-2 border-green-400 p-2 text-green-300"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">MESSAGE</label>
            <textarea
              name="message"
              rows={4}
              required
              className="w-full bg-black border-2 border-green-400 p-2 text-green-300"
            />
          </div>

          <button
            type="submit"
            className="w-full border-2 border-yellow-300 text-yellow-300 py-2 hover:bg-yellow-300 hover:text-black transition"
          >
            TRANSMIT MESSAGE
          </button>

        </form>

      </div>
    </section>
  );
}