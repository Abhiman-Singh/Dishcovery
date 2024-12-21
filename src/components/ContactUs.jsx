import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [activeFAQ, setActiveFAQ] = useState(null); // To handle FAQ toggle

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to an API or email)
    console.log(formData);
  };

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-5xl font-semibold text-orange-500 mb-8 pt-4">Contact Us</h2>

        {/* Contact Information */}
        <div className="mb-12 text-left max-w-xl mx-auto">
          <p className="text-lg text-gray-700 mb-4">
            For any inquiries, feedback, or support, please feel free to reach out to us through the contact form below or use the following details:
          </p>
          <ul className="text-lg text-gray-700">
            <li className="mb-2">📧 Email: <a href="mailto:support@recipefinder.com" className="text-orange-500 hover:underline">support@recipefinder.com</a></li>
            <li className="mb-2">📞 Phone: +1 234 567 890</li>
            <li className="mb-2">🏠 Address: 123 Recipe Street, Cooktown, CT 12345</li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg text-gray-700 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-lg text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-lg text-gray-700 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-md text-gray-700 focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-md hover:from-yellow-500 hover:to-orange-600 transition"
            >
              Send Message
            </button>
          </form>
        </div>

        

        {/* FAQ Section */}
        <div className="mt-12 max-w-3xl mx-auto text-left">
          <h3 className="text-2xl font-semibold text-orange-500 mb-6">Frequently Asked Questions</h3>

          {/* FAQ Item 1 */}
          <div className="mb-4">
            <button 
              className="w-full text-left text-lg text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={() => toggleFAQ(0)}
            >
              What is Recipe Finder?
            </button>
            {activeFAQ === 0 && (
              <p className="mt-2 text-gray-600 text-lg">
                Recipe Finder is a platform designed to help users easily discover, save, and organize their favorite recipes, making cooking more enjoyable and less stressful.
              </p>
            )}
          </div>

          {/* FAQ Item 2 */}
          <div className="mb-4">
            <button 
              className="w-full text-left text-lg text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={() => toggleFAQ(1)}
            >
              How do I save recipes?
            </button>
            {activeFAQ === 1 && (
              <p className="mt-2 text-gray-600 text-lg">
                Simply search for a recipe, click the favorite icon, and it will be saved to your personal recipe collection.
              </p>
            )}
          </div>

          {/* FAQ Item 3 */}
          <div className="mb-4">
            <button 
              className="w-full text-left text-lg text-gray-700 font-medium py-3 px-4 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
              onClick={() => toggleFAQ(2)}
            >
              Can I share my saved recipes with others?
            </button>
            {activeFAQ === 2 && (
              <p className="mt-2 text-gray-600 text-lg">
                Yes, you can easily share your saved recipes via email or social media by clicking the share button on the recipe page.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
