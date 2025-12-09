export default function TermsPage() {
  return (
    <div className="px-6 py-12 max-w-4xl mx-auto text-gray-700">

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Please review the following terms before using the GimStore platform.
        </p>
      </div>

      {/* Light Steam-like container */}
      <div className="bg-gray-50 border border-gray-200 shadow-md rounded-xl p-8 space-y-10">

        {/* Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            1. User Accounts
          </h2>
          <p className="leading-relaxed">
            Users must create an account to access purchasing features.
            You are responsible for maintaining the confidentiality of your
            login credentials and all activities under your account.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            2. Purchases & Transactions
          </h2>
          <p className="leading-relaxed">
            All completed transactions are final and cannot be refunded.
            Ensure that purchase details are correct before making payment.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            3. Prohibited Actions
          </h2>
          <p className="leading-relaxed">
            Misuse of platform features, exploitation of system vulnerabilities, 
            or harmful actions toward other users may result in account suspension
            or termination.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* Section */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            4. Security & Privacy
          </h2>
          <p className="leading-relaxed">
            Users must protect their account details. GimStore is not responsible
            for any loss resulting from negligence or unauthorized access due to
            poor security practices.
          </p>
        </section>

      </div>

      <p className="text-center text-sm text-gray-500 mt-10">
        Last Updated • {new Date().getFullYear()}
      </p>
    </div>
  );
}
