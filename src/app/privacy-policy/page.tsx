import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-white text-gray-800  mx-auto px-6 py-12 rounded-2xl shadow-md ">
      <h1 className="text-4xl font-bold text-blue-700 mb-8 text-center">
        Privacy Policy For PAK Health App
      </h1>

      {/* 1. Introduction */}
      <section className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-blue-600">1. Introduction</h2>
        <p>
          Curely Health ("we", "us", "our") operates the Curely Health mobile
          application (the “App”). This Privacy Policy explains how we collect,
          use, disclose, and protect your personal and health information when
          you use our App.
        </p>
      </section>

      {/* 2. Information We Collect */}
      <section className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-blue-600">
          2. Information We Collect
        </h2>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-blue-500">
            2.1 Personal Information
          </h3>
          <p>
            We may collect information that identifies you such as your name,
            phone number, email, date of birth, national ID (e.g., CNIC), and
            similar identifiers when you create an account or register with a
            hospital.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-blue-500">
            2.2 Health and Medical Information
          </h3>
          <p>
            To provide healthcare features (appointments, medical records,
            prescriptions), we may collect medical information such as
            appointment history, diagnoses, prescribed medications, uploaded
            medical documents, test results, and other health-related information
            you or your healthcare provider provide.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-blue-500">
            2.3 Device and Usage Data
          </h3>
          <p>
            We automatically collect device information (device model, OS, app
            version), analytics and usage information (pages visited, features
            used), and crash reports to improve the App.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-blue-500">
            2.4 Location and Photos
          </h3>
          <p>
            If you permit, we may access photos/images (for document upload) and
            approximate device location (to show nearby hospitals). Such access
            is only with your explicit permission.
          </p>
        </div>
      </section>

      {/* 3. How We Use Your Information */}
      <section className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold text-blue-600">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-2">
          <li>To provide and operate the App features, including booking and managing appointments.</li>
          <li>To communicate with you about appointments, reminders, and service updates.</li>
          <li>To process, store and share medical records with authorized healthcare providers when needed for treatment.</li>
          <li>To improve, test and monitor the App and ensure its security.</li>
          <li>To comply with legal and regulatory obligations.</li>
        </ul>
      </section>

      {/* 4–14 Sections */}
      {[
        {
          title: "4. Legal Basis & Consent",
          text: `By using the App and providing your information, you consent to the collection and processing described in this policy. For sensitive health data, we rely on your explicit consent and on lawful bases necessary for delivering health services to you.`,
        },
        {
          title: "5. Sharing & Disclosure",
          text: `We do not sell your personal or medical data. We may share information with:`,
          list: [
            "Healthcare providers and hospitals as required to deliver care and services.",
            "Third-party service providers (cloud, analytics, push notifications) who process data on our behalf and under contract.",
            "Legal or regulatory authorities when required by law.",
          ],
        },
        {
          title: "6. Third-Party Services & Links",
          text: `The App may use third-party services (for example, cloud storage, analytics, payment services). Those providers have their own privacy policies — we recommend you review them. We do not control their practices.`,
        },
        {
          title: "7. Security",
          text: `We use industry-standard security measures (encryption in transit and at rest where applicable) to protect data. However, no method of transmission or storage is 100% secure. You are responsible for keeping your device and account credentials secure.`,
        },
        {
          title: "8. Data Retention",
          text: `We retain your personal and medical data for as long as necessary to provide services and as required by applicable laws. You may request deletion of your account and data; see the “Your Rights” section below.`,
        },
        {
          title: "9. Your Rights",
          list: [
            "Access: You can request access to your data.",
            "Correction: You can request correction of inaccurate information.",
            "Deletion: You can request deletion of your account and data subject to legal retention requirements.",
            "Objection: You can object to certain data processing where permitted by law.",
          ],
        },
        {
          title: "10. Children",
          text: `The App is not intended for children under 13 (or the minimum age in your jurisdiction). We do not knowingly collect personal information from children without parental consent.`,
        },
        {
          title: "11. Cookies & Tracking",
          text: `We may use cookies or similar technologies in our web interfaces and SDKs to provide and monitor the service. You can control cookies via browser/device settings and app permissions.`,
        },
        {
          title: "12. International Transfers",
          text: `Your data may be stored or processed in countries outside your residence. We take steps to ensure adequate safeguards for such transfers.`,
        },
        {
          title: "13. Changes to This Policy",
          text: `We may update this policy from time to time. We will post the updated version with a new effective date and notify you as required by law.`,
        },
        {
          title: "14. Contact",
          text: (
            <>
              If you have questions, email:{" "}
              <a
                href="mailto:privacy@pakhims.com"
                className="text-blue-600 underline"
              >
                privacy@pakhims.com
              </a>{" "}
              or visit{" "}
              <a
                href="https://profile.pakhims.com"
                className="text-blue-600 underline"
              >
                profile.pakhims.com
              </a>
              .
            </>
          ),
        },
      ].map((sec, i) => (
        <section key={i} className="space-y-3 mb-8">
          <h2 className="text-2xl font-semibold text-blue-600">{sec.title}</h2>
          {sec.text && <p>{sec.text}</p>}
          {sec.list && (
            <ul className="list-disc list-inside space-y-2">
              {sec.list.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}

      {/* Footer */}
      <footer className="border-t border-gray-300 pt-6 mt-8 text-sm text-center text-gray-600">
        <p>Company: Curely Health / Pakhims</p>
        <p>Effective Date: 6 November 2025</p>
      </footer>
    </main>
  );
}
