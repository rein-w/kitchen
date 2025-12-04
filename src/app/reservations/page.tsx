"use client";

import { useState } from "react";

export default function ReservationsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requestedDate: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-white min-h-screen pt-16 md:pt-24 pb-16 md:pb-24">
        <div className="px-4 sm:px-8 lg:px-16 max-w-2xl mx-auto text-center">
          <h1
            className="text-3xl md:text-4xl font-light text-black tracking-wide mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Thank You
          </h1>
          <p className="text-gray-700 font-light text-[14px]">
            Thank you for your reservation request. We will get back to you soon.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-16 md:pt-24 pb-16 md:pb-24">
      <div className="px-4 sm:px-8 lg:px-16 max-w-2xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-light text-black tracking-wide mb-12 text-center"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          Reservations
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-light text-[14px] mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 text-[14px] font-light focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-light text-[14px] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 text-[14px] font-light focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-gray-700 font-light text-[14px] mb-2"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 text-[14px] font-light focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="requestedDate"
              className="block text-gray-700 font-light text-[14px] mb-2"
            >
              Requested Date
            </label>
            <input
              type="date"
              id="requestedDate"
              name="requestedDate"
              value={formData.requestedDate}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-3 text-[14px] font-light focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-gray-700 font-light text-[14px] mb-2"
            >
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 px-4 py-3 text-[14px] font-light focus:outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#556B2F] text-white py-3 px-6 font-light text-[14px] hover:bg-[#4a5d29] transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
