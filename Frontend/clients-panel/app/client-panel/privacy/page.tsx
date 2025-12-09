export default function PrivacyPage() {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Privacy Policy</h1>

      <p className="mb-6 text-gray-700 leading-relaxed">
        This Privacy Policy explains how GimStore collects, uses, and protects
        your personal information when you access or use our services.
      </p>

      {/* Section */}
      <div className="border-l-4 border-darkblue-600/70 pl-4 space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            1. Data Collection
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We collect information such as your name, email address,
            account details, and purchase history when you interact with our
            platform.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            2. How We Use Your Data
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Your data is used to process transactions, improve our services,
            enhance platform security, and provide a personalized user
            experience.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            3. Data Security
          </h2>
          <p className="text-gray-700 leading-relaxed">
            We implement industry-standard security measures, including
            encryption and secure storage, to protect your personal information
            from unauthorized access.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            4. Third-Party Services
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Some features may involve trusted third-party providers
            (such as payment gateways). These services only receive the data
            required to perform their functions and are obligated to protect it.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            5. Your Rights
          </h2>
          <p className="text-gray-700 leading-relaxed">
            You have the right to access, update, or delete your personal data
            at any time. Contact our support team if you wish to make a data
            request.
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 mt-8 italic">
        This policy may be updated periodically to reflect changes in our
        practices or legal requirements.
      </p>
    </div>
  );
}
