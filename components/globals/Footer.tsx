"use client";
import React from "react";
import { Twitter, Instagram, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-orange-500">MINT-SOL</h3>
          <p className="text-sm">Your gateway to instant NFT liquidity</p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-500">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Marketplace
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">
                How It Works
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-500">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4 text-orange-500">
            Newsletter
          </h4>
          <p className="text-sm mb-2">Stay updated with our latest offers</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white px-3 py-2 text-sm rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500 w-full"
            />
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 text-sm rounded-r-md hover:bg-orange-600 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-400">
          &copy; 2024 NFT Liquidator. All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="#"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-orange-500 transition-colors"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>
    </div>
  );
}
