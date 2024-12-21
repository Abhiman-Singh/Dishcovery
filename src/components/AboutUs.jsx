import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Section Heading */}
        <h2 className="text-5xl font-semibold text-orange-500 mb-8 pt-5">
          About Us
        </h2>

        {/* Text Content */}
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          At Recipe Finder, we are passionate about making cooking accessible and enjoyable for everyone. Our journey began with a love for cooking and a desire to simplify meal planning for busy individuals. Recipe Finder was created to help people discover and save their favorite recipes easily, making meal preparation a breeze.
        </p>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Our mission is to empower home cooks by providing a platform that not only inspires culinary creativity but also simplifies the cooking process. We believe that everyone should have the opportunity to enjoy delicious meals without the stress of planning and organizing.
        </p>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Our team consists of culinary experts and tech enthusiasts dedicated to enhancing your cooking experience. We are committed to continuous improvement and innovation, ensuring that our app evolves to meet the changing needs of our users.
        </p>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          Join us on this exciting culinary journey and transform the way you cook!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
