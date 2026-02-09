"use client";

import { useState } from "react";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "+20",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+20",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner - Blue background */}
      <section className="relative bg-[#0a47c2] overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            <div className="w-full lg:max-w-md flex-shrink-0">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white/10">
                <Image
                  src={HERO_IMAGE}
                  alt="Contact support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                  priority
                />
              </div>
            </div>
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[#c9a227] font-bold text-3xl sm:text-4xl lg:text-5xl mb-2">
                Contact Us
              </h1>
              <h2 className="text-white font-bold text-2xl sm:text-3xl lg:text-4xl mb-3">
                Welcome To IMETS School of Business
              </h2>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg max-w-xl">
                Need something cleared up? Here are our most frequently asked
                questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Two columns */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Left - Contact info */}
          <div>
            <h2 className="text-[#0a47c2] font-bold text-2xl sm:text-3xl mb-2">
              We would love to hear from you
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-8">
              Need something cleared up? Here are our most frequently asked
              questions.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0a47c2]/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a47c2] mb-1">Email</h3>
                  <p className="text-gray-600 text-sm">
                    Our friendly team is here to help.
                  </p>
                  <a
                    href="mailto:contact@imetsedu.com"
                    className="text-gray-900 font-medium hover:text-[#0a47c2]"
                  >
                    contact@imetsedu.com
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0a47c2]/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a47c2] mb-1">Phone</h3>
                  <p className="text-gray-600 text-sm">
                    Sat-Thu from 10am to 6pm.
                  </p>
                  <a
                    href="tel:+201008815007"
                    className="text-gray-900 font-medium hover:text-[#0a47c2]"
                  >
                    +201008815007
                  </a>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#0a47c2]/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#0a47c2]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0a47c2] mb-1">Office</h3>
                  <p className="text-gray-600 text-sm">
                    Come say hello at our office HQ.
                  </p>
                  <p className="text-gray-900 font-medium">
                    Alserag Mall, Makram Ebeid Nasr City, Cairo Egypt
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 lg:p-10">
            <h2 className="text-[#0a47c2] font-bold text-2xl sm:text-3xl mb-2">
              Get in touch
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-6">
              We would love to hear from you. Please fill out this form.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    First Name
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a47c2] focus:border-[#0a47c2] bg-white"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-semibold text-gray-700 mb-1.5"
                  >
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a47c2] focus:border-[#0a47c2] bg-white"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a47c2] focus:border-[#0a47c2] bg-white"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Phone Number
                </label>
                <div className="flex">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    className="w-24 px-3 py-3 border border-gray-300 rounded-l-lg border-r-0 focus:outline-none focus:ring-2 focus:ring-[#0a47c2] bg-white text-gray-700"
                  >
                    <option value="+20">🇪🇬 +20</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+971">+971</option>
                    <option value="+966">+966</option>
                    <option value="+91">+91</option>
                  </select>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="1008815007"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-[#0a47c2] focus:border-[#0a47c2] bg-white"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700 mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Leave us a message..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0a47c2] focus:border-[#0a47c2] bg-white resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-lg font-semibold text-white bg-[#c9a227] hover:bg-[#b8921f] transition-colors shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
