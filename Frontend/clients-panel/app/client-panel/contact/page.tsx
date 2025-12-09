export default function ContactPage() {
  return (
    <div className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Contact Us</h1>

      <p className="text-gray-700 mb-6 leading-relaxed">
        For any inquiries or assistance, please contact us using the information provided below. Our team is ready to help you anytime.
      </p>

      {/* Divider */}
      <div className="border-b border-gray-300 mb-8" />

      {/* Contact Info */}
      <div className="space-y-2 text-gray-800">
        <p><strong>Address:</strong> Jl. Raya Tengah No.80, Gedong, Pasar Rebo, Jakarta Timur</p>
        <p><strong>Phone:</strong> +62 877-1111-2112</p>
        <p><strong>Email:</strong> support@gimstore.com</p>
      </div>
    </div>
  );
}
