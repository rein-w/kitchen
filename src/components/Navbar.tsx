"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="bg-white">
      <div className="px-4 sm:px-8 lg:px-16">
        <div className="flex justify-between items-center h-[60px] md:h-[80px]">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Rein"
                width={78}
                height={31}
                className="h-[26px] md:h-8 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/about"
              className="text-gray-500 hover:text-black transition-colors font-light"
            >
              About
            </Link>
            <Link
              href="/events"
              className="text-gray-500 hover:text-black transition-colors font-light"
            >
              Events
            </Link>
            <Link
              href="/reservations"
              className="text-[#556B2F] border border-black px-5 py-2 font-light hover:bg-[#556B2F] hover:text-white transition-colors"
            >
              Reservations
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block w-6 h-[1px] bg-black transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-[7px]" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-black transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-black transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-all duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="px-4 sm:px-8">
          <div className="flex justify-between items-center h-[60px]">
            <Link href="/" onClick={closeMenu}>
              <Image
                src="/logo.png"
                alt="Rein"
                width={78}
                height={31}
                className="h-[26px] w-auto"
              />
            </Link>
            <button
              className="flex flex-col justify-center items-center w-10 h-10 space-y-1.5"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <span className="block w-6 h-[1px] bg-black rotate-45 translate-y-[7px]" />
              <span className="block w-6 h-[1px] bg-black opacity-0" />
              <span className="block w-6 h-[1px] bg-black -rotate-45 -translate-y-[7px]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] space-y-8">
          <Link
            href="/about"
            className="text-xl text-gray-700 hover:text-black transition-colors font-light"
            onClick={closeMenu}
          >
            About
          </Link>
          <Link
            href="/events"
            className="text-xl text-gray-700 hover:text-black transition-colors font-light"
            onClick={closeMenu}
          >
            Events
          </Link>
          <Link
            href="/reservations"
            className="text-xl text-[#556B2F] border border-black px-8 py-3 font-light hover:bg-[#556B2F] hover:text-white transition-colors"
            onClick={closeMenu}
          >
            Reservations
          </Link>
        </div>
      </div>
    </nav>
  );
}
