import type { Metadata } from "next";
import SiteNav from "@/app/SiteNav";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and conditions governing the use of Elliyeen Research's website and services.",
  alternates: { canonical: "https://elliyeen-get-started.pages.dev/terms" },
};

export default function TermsPage() {
  const updated = "June 21, 2026";

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <SiteNav />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Legal</p>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.03em]">Terms &amp; Conditions</h1>
        <p className="mt-4 text-sm text-zinc-400">Last updated: {updated}</p>

        <div className="prose prose-zinc mt-12 max-w-none text-[17px] leading-8">

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">1. Acceptance of Terms</h2>
          <p className="mt-4 text-zinc-700">
            By accessing or using the Elliyeen Research website and services, you agree to be bound by these Terms &amp; Conditions. If you do not agree, please do not use our site or services. These terms apply to all visitors, users, and others who access or use the site.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">2. Services</h2>
          <p className="mt-4 text-zinc-700">
            Elliyeen Research provides revenue engineering, customer experience strategy, and AI-assisted business analysis services. All service engagements are governed by a separate written agreement between Elliyeen Research and the client. These Terms cover your use of the public website only unless otherwise specified.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">3. Use of the Site</h2>
          <p className="mt-4 text-zinc-700">You agree to use this site only for lawful purposes. You must not:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-700">
            <li>Transmit any material that is unlawful, harmful, defamatory, or otherwise objectionable.</li>
            <li>Attempt to gain unauthorized access to any part of the site or its related systems.</li>
            <li>Use automated tools to scrape, crawl, or harvest content without our express written consent.</li>
            <li>Impersonate any person or entity or misrepresent your affiliation with any person or entity.</li>
            <li>Interfere with or disrupt the integrity or performance of the site.</li>
          </ul>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">4. Intellectual Property</h2>
          <p className="mt-4 text-zinc-700">
            All content on this site — including text, graphics, logos, design, and code — is the property of Elliyeen Research or its content suppliers and is protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works from any content without our prior written permission.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">5. Disclaimer of Warranties</h2>
          <p className="mt-4 text-zinc-700">
            This site and all content are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied. Elliyeen Research does not warrant that the site will be uninterrupted, error-free, or free of viruses or other harmful components. We do not warrant the accuracy, completeness, or suitability of any information on the site.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">6. Limitation of Liability</h2>
          <p className="mt-4 text-zinc-700">
            To the fullest extent permitted by law, Elliyeen Research shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of — or inability to use — this site or its content. Our total liability to you for any claim arising from these Terms shall not exceed one hundred US dollars ($100).
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">7. Third-Party Links</h2>
          <p className="mt-4 text-zinc-700">
            Our site may contain links to third-party websites. These links are provided for convenience only. Elliyeen Research has no control over those sites and is not responsible for their content, privacy practices, or availability. Inclusion of a link does not constitute endorsement.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">8. Privacy</h2>
          <p className="mt-4 text-zinc-700">
            Your use of this site is also governed by our <a href="/privacy" className="text-[#1B5EA8] underline underline-offset-2">Privacy Policy</a>, which is incorporated into these Terms by reference.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">9. Modifications</h2>
          <p className="mt-4 text-zinc-700">
            We reserve the right to modify these Terms at any time. Changes take effect immediately upon posting to the site. The "Last updated" date at the top reflects the most recent revision. Your continued use of the site after any changes constitutes acceptance of the updated Terms.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">10. Governing Law</h2>
          <p className="mt-4 text-zinc-700">
            These Terms are governed by and construed in accordance with the laws of the State of Georgia, United States, without regard to conflict of law principles. Any disputes arising from these Terms shall be subject to the exclusive jurisdiction of the state and federal courts located in Georgia.
          </p>

          <h2 className="mt-12 font-serif text-2xl font-normal tracking-tight">11. Contact</h2>
          <p className="mt-4 text-zinc-700">
            Questions about these Terms? Reach us at:<br />
            <strong>Elliyeen Research</strong><br />
            <a href="https://www.linkedin.com/in/abbasabdullah/" className="text-[#1B5EA8] underline underline-offset-2" target="_blank" rel="noopener noreferrer">linkedin.com/in/abbasabdullah</a>
          </p>
        </div>
      </main>

      <footer className="mt-24 border-t border-zinc-100 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Elliyeen Research. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="/privacy" className="hover:text-black">Privacy Policy</a>
            <a href="/accessibility" className="hover:text-black">Accessibility</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
