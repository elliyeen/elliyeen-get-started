import type { Metadata } from "next";
import SiteNav from "@/app/SiteNav";

export const metadata: Metadata = {
  title: "Accessibility",
  description: "Elliyeen Research's commitment to WCAG 2.1 AA accessibility standards and building an inclusive web experience for all users.",
  alternates: { canonical: "https://www.elliyeen.com/accessibility" },
};

export default function AccessibilityPage() {
  const updated = "June 21, 2026";

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <SiteNav />

      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Inclusion</p>
        <h1 className="mt-4 font-serif t-display">Accessibility Statement</h1>
        <p className="mt-4 text-sm text-zinc-400">Last updated: {updated}</p>

        <div className="mt-12 max-w-none text-[17px] leading-8">

          <p className="text-zinc-700">
            Elliyeen Research is committed to ensuring that our website is accessible to everyone — including people with disabilities. We believe that good experience design means designing for all people, and we hold ourselves to that standard.
          </p>

          <h2 className="mt-12 font-serif t-subheading font-normal">Our Commitment</h2>
          <p className="mt-4 text-zinc-700">
            We aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> as published by the World Wide Web Consortium (W3C). These guidelines explain how to make web content more accessible to people with a wide range of disabilities, including visual, auditory, physical, speech, cognitive, language, learning, and neurological disabilities.
          </p>

          <h2 className="mt-12 font-serif t-subheading font-normal">What We've Done</h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 text-zinc-700">
            <li><strong>Semantic HTML</strong> — We use proper heading hierarchy, landmark regions, and semantic elements so screen readers can navigate the page efficiently.</li>
            <li><strong>Keyboard navigation</strong> — All interactive elements (links, buttons, forms) are reachable and operable using a keyboard alone.</li>
            <li><strong>Color contrast</strong> — Text and background color combinations meet or exceed WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text).</li>
            <li><strong>Focus indicators</strong> — Visible focus states are maintained on all interactive elements so keyboard users always know where they are on the page.</li>
            <li><strong>Alt text</strong> — Images include descriptive alternative text. Decorative images are marked as such.</li>
            <li><strong>Responsive design</strong> — The site is usable at 320px viewport width and supports browser text zoom up to 200% without loss of content or functionality.</li>
            <li><strong>Motion</strong> — Animated elements respect the <code>prefers-reduced-motion</code> media query. Users who have requested reduced motion will see a simpler, static experience.</li>
            <li><strong>ARIA labels</strong> — Icon-only controls include descriptive <code>aria-label</code> attributes to communicate purpose to assistive technologies.</li>
          </ul>

          <h2 className="mt-12 font-serif t-subheading font-normal">Known Limitations</h2>
          <p className="mt-4 text-zinc-700">
            We are continuously working to improve accessibility. Some areas where we are actively making improvements include:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-700">
            <li>Third-party embedded content (images from external services) may not always include complete alternative text.</li>
            <li>Some complex interactive components may not yet fully support all screen reader interactions. We are working to resolve these.</li>
          </ul>

          <h2 className="mt-12 font-serif t-subheading font-normal">Assistive Technologies Supported</h2>
          <p className="mt-4 text-zinc-700">Our site is designed to be compatible with the following assistive technologies:</p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-zinc-700">
            <li>Screen readers — NVDA, JAWS, VoiceOver (macOS/iOS), TalkBack (Android)</li>
            <li>Voice control — Dragon NaturallySpeaking, Voice Control (macOS)</li>
            <li>Keyboard-only navigation</li>
            <li>Browser zoom up to 200%</li>
          </ul>

          <h2 className="mt-12 font-serif t-subheading font-normal">Browser Compatibility</h2>
          <p className="mt-4 text-zinc-700">
            This site is tested and supported on current versions of Chrome, Firefox, Safari, and Microsoft Edge across desktop and mobile devices.
          </p>

          <h2 className="mt-12 font-serif t-subheading font-normal">Feedback & Contact</h2>
          <p className="mt-4 text-zinc-700">
            We welcome feedback on the accessibility of our site. If you encounter any barriers, experience difficulty accessing any content, or have suggestions for improvement, please contact us. We take all accessibility feedback seriously and will respond promptly.
          </p>
          <p className="mt-4 text-zinc-700">
            <strong>Elliyeen Research</strong><br />
            <a href="https://www.linkedin.com/in/abbasabdullah/" className="text-[#1B5EA8] underline underline-offset-2" target="_blank" rel="noopener noreferrer">linkedin.com/in/abbasabdullah</a>
          </p>
          <p className="mt-6 rounded-2xl bg-zinc-50 p-6 text-sm text-zinc-600">
            We aim to respond to accessibility feedback within <strong>2 business days</strong> and to resolve identified issues within a reasonable timeframe depending on complexity.
          </p>
        </div>
      </main>

      <footer className="mt-24 border-t border-zinc-100 bg-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
          <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Elliyeen Research. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="/privacy" className="hover:text-black">Privacy Policy</a>
            <a href="/terms" className="hover:text-black">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
