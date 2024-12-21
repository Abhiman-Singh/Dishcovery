import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWindowClose } from "react-icons/fa";

const PrivacyPolicyModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-8 max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <FaWindowClose size={24} />
        </button>
        
        <h2 className="text-2xl font-bold mb-6 text-orange-500">Privacy Policy</h2>
        
        <div className="space-y-4 text-gray-700">
          <section>
            <h3 className="text-xl font-semibold mb-2">1. Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as when you create an account, 
              use our services, or communicate with us. This may include your name, email address, 
              and other personal details.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2">2. How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services, 
              to communicate with you, and to personalize your experience with DishCovery.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2">3. Data Protection</h3>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized or unlawful processing, accidental loss, 
              destruction, or damage.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2">4. Your Rights</h3>
            <p>
              You have the right to access, correct, or delete your personal information. 
              You can contact us at any time to exercise these rights.
            </p>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2">5. Cookies and Tracking</h3>
            <p>
              We use cookies and similar tracking technologies to enhance your user experience 
              and analyze site traffic. You can adjust your browser settings to refuse cookies 
              if you prefer.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  // Smooth scroll function
  const handleScroll = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick links with section IDs
  const quickLinks = [
    { label: "Home", href: "#home" },
    { label: "About Us", href: "#about-us" },
    { label: "Features", href: "#features" },
    { label: "Contact Us", href: "#contact-us" },
    { label: "Privacy Policy", onClick: () => setIsPrivacyModalOpen(true) },
  ];

  return (
    <>
      {isPrivacyModalOpen && (
        <PrivacyPolicyModal onClose={() => setIsPrivacyModalOpen(false)} />
      )}

      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center flex flex-col space-y-8 md:space-y-12">
          {/* Quick Links */}
          <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8 text-lg">
            {quickLinks.map((link, index) => (
              <li key={index}>
                {link.href ? (
                  <button
                    onClick={() => handleScroll(link.href)}
                    className="hover:text-orange-500 transition"
                  >
                    {link.label}
                  </button>
                ) : (
                  <button
                    onClick={link.onClick}
                    className="hover:text-orange-500 transition"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Social Media Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-center space-x-6">
              {[
                { Icon: FaFacebook, href: "https://facebook.com", label: "Facebook" },
                { Icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
                { Icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
                { Icon: FaLinkedin, href: "https://linkedin.com", label: "LinkedIn" }
              ].map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-gray-400 hover:text-orange-500 transition duration-300"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Copyright Information */}
          <div className="text-gray-400 text-sm md:text-base">
            <p>© {new Date().getFullYear()} DishCovery. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;