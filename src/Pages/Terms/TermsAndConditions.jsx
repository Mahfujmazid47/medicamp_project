import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 data-aos='fade-up' className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary/70">
        Terms and Conditions
      </h1>
      <p className="mb-4" data-aos='fade-up' data-aos-delay="100">
        Welcome to <span className="font-semibold">MediCamp</span>. By accessing
        or using our platform, you agree to comply with the following terms and
        conditions. Please read them carefully.
      </p>

      <div data-aos='fade-up' data-aos-delay="200">
        <h2 className="text-xl font-semibold mt-6 mb-2">
          1. Acceptance of Terms
        </h2>
        <p className="mb-4">
          By registering or participating in any camp, you agree to these terms.
          If you do not agree, please do not use our platform.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="300">
        <h2 className="text-xl font-semibold mt-6 mb-2">2. User Accounts</h2>
        <p className="mb-4">
          Users are responsible for maintaining the confidentiality of their
          account and for all activities under their account.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="400">
        <h2 className="text-xl font-semibold mt-6 mb-2">3. Organizer Roles</h2>
        <p className="mb-4">
          Organizers must provide accurate information when creating camps and are
          responsible for managing their events ethically.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="500">
        <h2 className="text-xl font-semibold mt-6 mb-2">4. Participant Roles</h2>
        <p className="mb-4">
          Participants must follow camp rules and respect healthcare
          professionals, organizers, and other attendees.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="600">
        <h2 className="text-xl font-semibold mt-6 mb-2">5. Payments</h2>
        <p className="mb-4">
          Payments are processed securely. We are not responsible for payment
          failures due to third-party services.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="700">
        <h2 className="text-xl font-semibold mt-6 mb-2">6. Termination</h2>
        <p className="mb-4">
          We reserve the right to suspend or terminate accounts that violate our
          policies or engage in unethical practices.
        </p>
      </div>

      <div data-aos='fade-up' data-aos-delay="800">
        <h2 className="text-xl font-semibold mt-6 mb-2">7. Changes</h2>
        <p>
          We may update these terms at any time. Continued use of MediCamp after
          changes means you accept the new terms.
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;
