import React from "react";
import {
  Mail,
  MapPin,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[rgba(39,39,42,0.5)] bg-[linear-gradient(90deg,#6A3CFF_0%,#B000FF_40%,#FF1AAE_75%,#FF4FA3_100%)] px-6 py-12 text-white md:px-16 lg:px-24 dark:bg-[linear-gradient(90deg,rgba(106,60,255,0.5)_0%,rgba(176,0,255,0.5)_40%,rgba(255,26,174,0.5)_75%,rgba(255,79,163,0.5)_100%)]">
      <div className="mx-auto max-w-7xl">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 pb-10 md:grid-cols-3">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-400 text-xl font-bold">
                C
              </div>
              <h2 className="text-2xl font-bold tracking-tight">ClipKaro</h2>
            </div>
            <p className="typo-landing-body3 max-w-xs text-gray-200">
              Helping creators turn content into real opportunities.
            </p>
            {/* Divider - below lg only */}
            <div className="w-full border-t border-white/30 md:hidden"></div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="typo-landing-body3 text-white capitalize">
              Contact
            </h3>
            <div className="typo-landing-body3 space-y-3 text-[#E6E8F2]">
              <div className="flex items-start gap-3">
                <Mail size={18} className="mt-0.5" />
                <a
                  href="mailto:support@clipkaro.in"
                  className="transition-colors hover:text-white"
                >
                  support@clipkaro.in
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  235, BINNAMANGALA, 2nd Floor, 13th <br />
                  Cross Road, Indira Nagar 2nd Stage, <br />
                  Bengaluru – 560038
                </p>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-start justify-start gap-5 md:justify-end">
            <a href="#" className="transition-opacity hover:opacity-80">
              <Twitter size={24} className="text-[#E6E8F2]" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              <Instagram size={24} className="text-[#E6E8F2]" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              <Linkedin size={24} className="text-[#E6E8F2]" />
            </a>
            <a href="#" className="transition-opacity hover:opacity-80">
              <Youtube size={24} className="text-[#E6E8F2]" />
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="mb-6 w-full border-t border-white/30"></div>

        {/* Bottom Section */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="typo-landing-body3 font-dm-sans-400! flex gap-6 uppercase opacity-90">
            <span>Modern</span>
            <span>Scalable</span>
            <span>Creative</span>
          </div>
          {/* Divider - below lg only */}
          <div className="w-full border-t border-white/30 md:hidden"></div>
          <p className="typo-landing-info-text text-[#E6E8F2] opacity-80">
            © 2026 ClipKaro. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
