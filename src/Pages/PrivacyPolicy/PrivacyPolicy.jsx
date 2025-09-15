import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 data-aos='fade-up' className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary/70">
        Privacy Policy
      </h1>
      <p data-aos='fade-up' data-aos-delay="100" className="mb-4">
        Your privacy is important to us. This Privacy Policy explains how{" "}
        <span className="font-semibold text-primary/70">MediCamp</span> collects, uses, and
        protects your information.
      </p>

      <div data-aos='fade-up' data-aos-delay="200">
        <h2 className="text-xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal details such as name, email, phone number, and
          payment information when you register or participate in a camp.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="300">
        <h2 className="text-xl font-semibold mt-6 mb-2">2. How We Use Information</h2>
        <p className="mb-4">
          We use your information to manage registrations, process payments,
          improve services, and communicate updates about camps.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="400">
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We implement security measures to protect your data. However, no online
          system is completely secure, and we cannot guarantee 100% safety.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="500">
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Sharing of Data</h2>
        <p className="mb-4">
          We do not sell your information. Data may only be shared with
          third-party services necessary for payment and camp management.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="600">
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Cookies</h2>
        <p className="mb-4">
          Our platform may use cookies to improve user experience. You can manage
          cookies through your browser settings.
        </p>

      </div>

      <div data-aos='fade-up' data-aos-delay="700">
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Your Rights</h2>
        <p className="mb-4">
          You have the right to access, update, or request deletion of your
          personal information by contacting us.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="800">
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Updates</h2>
        <p>
          We may update this policy as needed. Continued use of MediCamp means you
          accept the updated Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
