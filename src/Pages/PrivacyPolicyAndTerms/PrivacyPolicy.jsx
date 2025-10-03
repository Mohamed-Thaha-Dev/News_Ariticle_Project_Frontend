import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-4xl w-full overflow-auto mt-25 mb-20 md:mb-5">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          தனியுரிமை கொள்கை / Privacy Policy
        </h1>

        {/* ================= Tamil ================= */}
        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-700">✅ தனியுரிமை கொள்கை</h2>

          <div>
            <p className="font-bold text-gray-600">தரவு சேகரிப்பு</p>
            <p>
              பயனர் சேவைகளை வழங்குவதற்காக மட்டுமே, மின்னஞ்சல், பயனர் பெயர் மற்றும் பதிவேற்றப்பட்ட உள்ளடக்கங்கள் போன்ற முக்கிய தகவல்கள் சேகரிக்கப்படுகின்றன.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">தரவு பாதுகாப்பு</p>
            <p>
              எல்லா பயனர் தரவுகளும் (கடவுச்சொற்கள், OTP, படங்கள் மற்றும் தனிப்பட்ட உள்ளடக்கம்) பாதுகாப்பான தனிப்பட்ட கிளவுட் சேமிப்பில் வைக்கப்படுகின்றன, அனுமதியற்றவர்களுக்கு அணுகல் மறுக்கப்படுகிறது.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">அங்கீகாரம் (Authentication)</p>
            <p>
              பயனர் கணக்குகளில் பாதுகாப்பான கடவுச்சொல் ஹேஷிங் மற்றும் OTP உறுதிப்படுத்தல் பயன்படுத்தப்படுகிறது, அங்கீகரிக்கப்பட்ட பயனர்கள் மட்டுமே கணக்குகளை அணுக முடியும்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">தரவு பயன்பாடு</p>
            <p>
              உங்கள் தரவு பயன்பாட்டின் செயல்பாடுகளுக்காக மட்டுமே பயன்படுத்தப்படுகிறது. நாங்கள் உங்கள் தனிப்பட்ட தரவை மூன்றாம் தரப்புடன் பகிர்போமாட்டோம் அல்லது விற்கமாட்டோம்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">உள்ளடக்க தனியுரிமை</p>
            <p>
              பயனர் பதிவேற்றிய படங்கள் மற்றும் மீடியா தனிப்பட்டதாக வைக்கப்படுகின்றன. நீங்கள் மற்றும் அங்கீகரிக்கப்பட்ட சேவைகள் மட்டுமே அணுக முடியும்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">பயனர் உரிமைகள்</p>
            <p>
              நீங்கள் எப்போதும் உங்கள் கணக்கை மற்றும் அதனுடன் தொடர்புடைய அனைத்து தரவுகளையும் நீக்க கோரலாம். இத்தகைய கோரிக்கைகள் பாதுகாப்பாகவும் விரைவாகவும் செயல்படுத்தப்படும்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">தனியுரிமை கொள்கை மாற்றங்கள்</p>
            <p>
              பொது தேவைக்கு ஏற்ப தனியுரிமை கொள்கை புதுப்பிக்கப்படலாம். பயன்பாட்டை தொடர்ந்தும் பயன்படுத்துவது புதுப்பிக்கப்பட்ட கொள்கையை ஏற்றுக்கொண்டதாக கருதப்படும்.
            </p>
          </div>
        </section>

        {/* ================= English ================= */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-700">✅ Privacy Policy</h2>

          <div>
            <p className="font-bold text-gray-600">Data Collection</p>
            <p>
              We collect only essential information such as your email, username, and uploaded content to provide our services.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Data Security</p>
            <p>
              All user data, including passwords, OTPs, images, and personal content, are securely stored in private cloud storage with restricted access.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Authentication</p>
            <p>
              We use secure password hashing and OTP verification to ensure that only authorized users access their accounts.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Data Usage</p>
            <p>
              Your data is used only for app functionality and notifications. We do not sell or share your personal data with third parties.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Content Privacy</p>
            <p>
              All uploaded images and media are stored privately. Only you (and authorized app services) can access them.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">User Rights</p>
            <p>
              You can request deletion of your account and all related data at any time. We will process such requests securely and promptly.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Changes to Privacy Policy</p>
            <p>
              We may update the Privacy Policy periodically. Continued use of the app implies acceptance of any updates.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
