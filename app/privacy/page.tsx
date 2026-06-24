import type { Metadata } from "next";
import SiteNav from "@/app/SiteNav";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Elliyeen Research collects, uses, and protects your information. Read our full privacy policy.",
  alternates: { canonical: "https://elliyeen-get-started.pages.dev/privacy" },
};

export default function PrivacyPage() {
  const updated = "June 21, 2026";

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <SiteNav />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Legal</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.03em]">Privacy Policy</h1>
        <p className="mt-4 text-sm text-zinc-400">Last updated: {updated}</p>

        <div className="prose prose-zinc mt-12 max-w-none text-[17px] leading-8">

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">1. Who We Are</h2>
          <p className="mt-4 text-zinc-700">
            Elliyeen Research ("Elliyeen", "we", "us", or "our") is a revenue engineering and customer experience consultancy. Our website is located at <strong>elliyeen-get-started.pages.dev</strong>. This Privacy Policy explains how we collect, use, disclose, and protect information about you when you visit our site or engage with our services.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">2. Information We Collect</h2>
          <p className="mt-4 text-zinc-700">We may collect the following categories of information:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-700">
            <li><strong>Contact information</strong> — name, email address, phone number, and company name when you fill out a form or request an assessment.</li>
            <li><strong>Usage data</strong> — pages visited, time spent on site, referring URLs, browser type, and device type collected automatically via analytics tools.</li>
            <li><strong>Communications</strong> — messages you send us via contact forms or email.</li>
            <li><strong>Cookies</strong> — small files placed on your device to remember preferences and measure site performance (see Section 5).</li>
          </ul>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">3. How We Use Your Information</h2>
          <p className="mt-4 text-zinc-700">We use the information we collect to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-700">
            <li>Respond to your inquiries and deliver services you request.</li>
            <li>Improve our website, content, and offerings.</li>
            <li>Send relevant updates, insights, or service information (you may unsubscribe at any time).</li>
            <li>Analyze site performance and user behavior in aggregate to improve user experience.</li>
            <li>Comply with applicable legal obligations.</li>
          </ul>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">4. How We Share Your Information</h2>
          <p className="mt-4 text-zinc-700">
            We do not sell, rent, or trade your personal information. We may share it with trusted third-party service providers (analytics, email delivery, hosting) who are contractually required to protect it. We may also disclose information when required by law or to protect our rights.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">5. Cookies</h2>
          <p className="mt-4 text-zinc-700">
            We use essential cookies to operate the site and analytics cookies to understand how visitors interact with our content. You may disable cookies in your browser settings; however, some site features may not function as intended.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">6. Data Retention</h2>
          <p className="mt-4 text-zinc-700">
            We retain personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law. When no longer needed, data is securely deleted or anonymized.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">7. Your Rights</h2>
          <p className="mt-4 text-zinc-700">Depending on your location, you may have the right to:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-700">
            <li>Access the personal data we hold about you.</li>
            <li>Request correction or deletion of your data.</li>
            <li>Object to or restrict certain processing.</li>
            <li>Withdraw consent at any time where processing is based on consent.</li>
          </ul>
          <p className="mt-4 text-zinc-700">To exercise any of these rights, contact us at the address below.</p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">8. Security</h2>
          <p className="mt-4 text-zinc-700">
            We implement reasonable technical and organizational measures to protect your information against unauthorized access, loss, or disclosure. No method of transmission over the internet is completely secure; we cannot guarantee absolute security.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">9. Third-Party Links</h2>
          <p className="mt-4 text-zinc-700">
            Our site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review their privacy policies before providing any personal information.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">10. Changes to This Policy</h2>
          <p className="mt-4 text-zinc-700">
            We may update this Privacy Policy from time to time. The "Last updated" date at the top reflects the most recent revision. Continued use of our site after changes constitutes your acceptance of the updated policy.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">11. Contact</h2>
          <p className="mt-4 text-zinc-700">
            Questions about this policy? Reach us at:<br />
            <strong>Elliyeen Research</strong><br />
            <a href="https://www.linkedin.com/in/abbasabdullah/" className="text-[#1B5EA8] underline underline-offset-2" target="_blank" rel="noopener noreferrer">linkedin.com/in/abbasabdullah</a>
          </p>
        </div>
      </main>

      <footer className="mt-24 border-t border-zinc-100 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Elliyeen Research. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="/terms" className="hover:text-black">Terms</a>
            <a href="/accessibility" className="hover:text-black">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
