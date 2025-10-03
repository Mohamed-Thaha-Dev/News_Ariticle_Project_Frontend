import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="flex justify-center p-4 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-4xl w-full overflow-auto mt-25 mb-20 md:mb-5">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          விதிமுறைகள் மற்றும் நிபந்தனைகள் / Terms & Conditions
        </h1>

        {/* ================= Tamil ================= */}
        <section className="mb-6 space-y-3">
          <h2 className="text-2xl font-semibold text-gray-700">✅ விதிமுறைகள் மற்றும் நிபந்தனைகள்</h2>

          <div>
            <p className="font-bold text-gray-600">விதிமுறைகளை ஏற்றுக்கொள்வது</p>
            <p>
              இந்த பயன்பாட்டை பதிவிறக்கி பயன்படுத்துவதாக இருப்பின், இங்கு குறிப்பிடப்பட்ட விதிமுறைகளையும் நிபந்தனைகளையும் நீங்கள் ஏற்றுக்கொண்டதாக கருதப்படும்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">உள்ளடக்க நம்பகத்தன்மை</p>
            <p>
              செய்திகள், கட்டுரைகள் மற்றும் மீடியா தகவல்கள் தகவல் பெறுவதற்காக மட்டுமே வழங்கப்படுகின்றன. எந்தவொரு தவறுகள், குறைவுகள் அல்லது தாமதங்களுக்கு நாங்கள் பொறுப்பேற்கமாட்டோம்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">பயனர் நடத்தை</p>
            <p>
              பயனர்கள் பயன்பாட்டை சட்டபூர்வமான காரணங்களுக்காக மட்டுமே பயன்படுத்த வேண்டும். தவறான தகவல் பகிர்வு, ஸ்பாம், அல்லது தவறான பயன்பாடு தடை செய்யப்படுகிறது.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">அமைப்புரிமை</p>
            <p>
              அனைத்து உள்ளடக்கங்கள், லோகோக்கள் மற்றும் வடிவமைப்புகள் ஆப்பின்(app) உரிமையாளருக்கே சொந்தமானவை.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">விதிமுறைகளில் மாற்றங்கள்</p>
            <p>
              விதிமுறைகள் காலாண்டாக அல்லது தேவையான போது மாற்றப்படலாம். பயன்பாட்டை தொடர்ந்தும் பயன்படுத்துவது புதிய விதிமுறைகளை ஏற்றுக்கொண்டதாக கருதப்படும்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">தடைசெய்யப்பட்ட உள்ளடக்கம்</p>
            <p>
              பாலியல், அசிங்கமான, தனிமனித தாக்குதல், சாதி மதம் பற்றிய தவறான கருத்துக்கள் அல்லது பொது மரியாதைக்கு எதிரான உள்ளடக்கம் பகிர்வது முற்றிலும் தடைசெய்யப்பட்டுள்ளது. இதை மீறுபவர்களின் கணக்குகள் இடைநீக்கம் செய்யப்படும் அல்லது நிரந்தரமாக பான் செய்யப்படும்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">உடனடி நடவடிக்கை</p>
            <p>
              முறையற்ற உள்ளடக்கம் கண்டுபிடிக்கப்பட்டவுடன், எந்த முன்னறிவிப்பும் இல்லாமல் உடனடியாக நீக்கப்படும்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">சட்டப்படி இணக்கம்</p>
            <p>
              தடைசெய்யப்பட்ட உள்ளடக்கம் பகிர்வது இந்திய தகவல் தொழில்நுட்ப சட்டத்திற்கு எதிரானது. மீறுபவர்கள் சட்ட நடவடிக்கைக்கு உட்பட்டிருப்பார்கள்.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">சட்டத்தின் அமல்பாடு</p>
            <p>இந்த விதிமுறைகள் இந்திய சட்டப்படி வழிகாட்டப்படும்.</p>
          </div>
        </section>

        {/* ================= English ================= */}
        <section className="space-y-3">
          <h2 className="text-2xl font-semibold text-gray-700">✅ Terms & Conditions</h2>

          <div>
            <p className="font-bold text-gray-600">Acceptance of Terms</p>
            <p>
              By downloading or using this application, you agree to comply with and be bound by these Terms and Conditions.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Content Accuracy</p>
            <p>
              All news, articles, and media are provided for informational purposes only. We are not responsible for any inaccuracies, omissions, or delays.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">User Conduct</p>
            <p>
              Users must use the app only for lawful purposes. Misuse, spamming, or spreading false information is strictly prohibited.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Intellectual Property</p>
            <p>
              All content, logos, and designs are owned by the app owner.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Updates to Terms</p>
            <p>
              We may update these Terms periodically. Continued use of the app implies acceptance of the updated terms.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Prohibited Content</p>
            <p>
              Any sexual, pornographic, obscene, Personal Attack, misconceptions about caste and religion, or offensive material is strictly forbidden. Violators will have their accounts suspended or banned.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Immediate Action</p>
            <p>
              Any inappropriate content detected will be removed immediately without prior notice.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Legal Compliance</p>
            <p>
              Posting prohibited content is against Indian IT laws, and violators may face legal consequences.
            </p>
          </div>

          <div>
            <p className="font-bold text-gray-600">Governing Law</p>
            <p>These terms are governed by the laws of India.</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
