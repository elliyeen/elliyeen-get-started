export type ArticleSection = {
  heading?: string;
  paragraphs: string[];
};

export type GoodProfitArticle = {
  slug: string;
  issue: number;
  date: string;
  dateISO: string;
  readTime: string;
  theme: string;
  title: string;
  description: string;
  intro: string[];
  sections: ArticleSection[];
};

export const articles: GoodProfitArticle[] = [
  {
    slug: "the-principle",
    issue: 1,
    date: "January 15, 2025",
    dateISO: "2025-01-15",
    readTime: "4 min",
    theme: "Copy",
    title: "Profit Earned by Serving Customers Better Is the Only Kind That Lasts",
    description:
      "Most revenue advice tells you to capture more. The Good Profit model starts somewhere different — with the customers already arriving at your site.",
    intro: [
      "Most revenue advice tells you to capture more. More leads, more ads, more follow-up sequences, more retargeting spend. The assumption underneath all of it is that the problem is acquisition — that if you just got more people in, more would buy.",
      "The Good Profit model starts somewhere different. It starts with the customers already arriving at your site — and asks why they leave without buying.",
    ],
    sections: [
      {
        heading: "The answer is almost never the product",
        paragraphs: [
          "In twelve years of website audits, the gap between what a business sells and what the market wants has rarely been the problem. Businesses that survive long enough to hire consultants almost always have product-market fit. The market wants what they sell.",
          "What they don't have is page-market fit. The copy doesn't name the buyer. The trust signals are absent or generic. The FAQ answers questions no one actually asks. The hero headline describes the company instead of the customer's situation.",
          "The visitor arrives ready to consider buying. The page fails to earn the next click. The visitor leaves. The owner concludes they need more traffic.",
        ],
      },
      {
        heading: "Starting with what is already there",
        paragraphs: [
          "If your site currently converts 2% of visitors and you spend $5,000 per month on ads, improving your conversion rate to 4% doubles your revenue without increasing your ad spend by a dollar. That is not a traffic problem. That is a page problem.",
          "This is where Good Profit begins. Not with acquisition but with conversion. Not with more visitors but with fewer wasted ones. The revenue is already arriving at your door. The question is whether your page is earning it.",
        ],
      },
      {
        heading: "What this means in practice",
        paragraphs: [
          "Good Profit is earned — not extracted. It comes from a visitor who read your page, felt understood, and made a decision based on clarity. That customer does not regret their purchase. They do not call to complain. They do not churn after one cycle. They refer someone.",
          "The only profit worth building is the kind that earns the next customer automatically. That is the compounding mechanism that separates Good Profit from everything else.",
        ],
      },
    ],
  },
  {
    slug: "bad-profit",
    issue: 2,
    date: "February 3, 2025",
    dateISO: "2025-02-03",
    readTime: "3 min",
    theme: "Strategy",
    title: "Bad Profit Feels Like Growth. It Is Not.",
    description:
      "Bad Profit converts some visitors — but those buyers churn faster, complain louder, and never refer anyone. It is expensive to sustain and impossible to compound.",
    intro: [
      "Bad Profit is real revenue. It shows up in the bank account. It funds payroll. For a period of time — sometimes years — it looks indistinguishable from growth.",
      "The distinction only becomes visible when you look at what happens after the sale.",
    ],
    sections: [
      {
        heading: "What Bad Profit looks like",
        paragraphs: [
          "Bad Profit comes from vague copy that hides limitations until after purchase. From countdown timers that reset when the page refreshes. From pricing buried so deep in the checkout flow that the buyer only sees it after they have already committed emotionally. From testimonials pulled from outlier results and presented as typical.",
          "Each of these tactics converts some visitors. That is not in dispute. The dispute is what those visitors cost after they buy.",
        ],
      },
      {
        heading: "The math of churn",
        paragraphs: [
          "A customer who felt deceived does not quietly leave. They file disputes. They leave reviews. They tell people. In service businesses and subscription models, a single misrepresented sale can cost five to ten times its value in support load, refunds, and reputation repair.",
          "More importantly: they do not refer. The referral mechanism that makes Good Profit compound simply does not exist in Bad Profit. Every new customer has to be acquired from scratch, at full acquisition cost.",
        ],
      },
      {
        heading: "The replacement treadmill",
        paragraphs: [
          "Bad Profit businesses spend more on acquisition over time, not less. Because their churn rate prevents the formation of a customer base that sustains itself, they must keep buying attention at market rates. When ad costs rise — and they always rise — the margin compresses until the model fails.",
          "Good Profit businesses spend less on acquisition over time. Because each satisfied customer generates referrals, their effective cost per acquisition falls with every passing year. The gap between these two trajectories is the entire argument for building the right kind of revenue from the start.",
        ],
      },
    ],
  },
  {
    slug: "every-gap-is-revenue",
    issue: 3,
    date: "February 24, 2025",
    dateISO: "2025-02-24",
    readTime: "5 min",
    theme: "Audit",
    title: "Every Gap in Your Site Is a Recoverable Unit of Revenue",
    description:
      "When a potential customer reads your hero and leaves, that is not a lost lead. It is a fixable gap. Each gap has a fix. Each fix has a revenue value.",
    intro: [
      "The frame matters. When a potential customer reads your hero and leaves, most business owners think: lost lead. The Good Profit audit treats it differently: fixable gap.",
      "The distinction is not semantic. Lost leads are a volume problem — you need more of them. Fixable gaps are a quality problem — you need to stop losing the ones you have. One costs money to solve. The other earns it.",
    ],
    sections: [
      {
        heading: "The hero that does not name the buyer",
        paragraphs: [
          "Most hero headlines describe the company. \"We provide compassionate, personalized care for seniors and individuals with disabilities in the Savannah area.\" The company is the subject. The buyer is not in the sentence.",
          "The buyer who arrives at that page at 11pm — exhausted, worried, trying to figure out if this agency is the right one — does not see themselves. They see a company describing itself. They leave.",
          "A hero that opens with the buyer's situation stops the departure. \"You've been managing this long enough.\" Five words. The buyer is now the subject. The page earned the next scroll.",
        ],
      },
      {
        heading: "The FAQ that does not answer the fear",
        paragraphs: [
          "One client had a FAQ page with three questions on it. \"What types of products or services do you offer?\" \"How can I contact you?\" \"Do you have a return policy?\" These were Wix default placeholder questions — visible to every family in crisis who found the site.",
          "Families considering home care for an aging parent have specific fears. What happens if the caregiver doesn't show up? How do I know the caregiver is trustworthy? Can care start this week? These are the questions keeping them up at night. None of them were on the page.",
          "Rewriting a FAQ to answer the real questions is a single afternoon's work. The revenue impact of that one afternoon compounds for years.",
        ],
      },
      {
        heading: "The trust signal that is missing",
        paragraphs: [
          "Trust signals are not decorative. They are the evidence a buyer needs to justify a decision they already want to make. A credential that is not displayed is a decision that does not happen.",
          "The most powerful trust signal is almost always the founder's specific qualification — not generic language about commitment and care, but the actual credential. A CNA who built a care agency is a different product than a businessperson who hired caregivers. That difference is worth stating explicitly. Most sites do not state it.",
        ],
      },
      {
        heading: "How to find your gaps",
        paragraphs: [
          "Read your page as a stranger. Not the page you intended to build — the page that is actually live. Read the hero without knowing what you sell. Read the FAQ without knowing what your customers actually ask. Read the trust signals without knowing why you are trustworthy.",
          "What you see is what your visitors see. Most owners cannot do this, because they know too much. They read what they meant to say, not what the stranger sees for the first time. This is why an outside audit finds things internal review consistently misses.",
          "The Elliyeen audit runs 18 frameworks simultaneously across every layer — copy, positioning, trust, UX, SEO, AEO, accessibility, conversion architecture. Every gap found arrives with the specific fix already written. The goal is not a list of problems. It is a document of replacements.",
        ],
      },
    ],
  },
  {
    slug: "customers-become-multipliers",
    issue: 4,
    date: "March 10, 2025",
    dateISO: "2025-03-10",
    readTime: "4 min",
    theme: "Retention",
    title: "Customers Who Were Genuinely Served Become Multipliers",
    description:
      "The customer who found you, read your page, felt understood, and called — that customer stays, refers, and returns. The economic math diverges sharply at 12 months.",
    intro: [
      "The clearest sign of Good Profit is what happens 90 days after the first purchase. A Good Profit customer has received what the copy promised. The expectation matched the experience. There is no cognitive dissonance to resolve, no complaint to file, no decision to regret.",
      "That customer has moved into a different category. They are no longer a prospect you converted. They are a reference point for every future decision you need to make.",
    ],
    sections: [
      {
        heading: "The referral that costs nothing",
        paragraphs: [
          "Word of mouth has always been the most efficient acquisition channel. It costs nothing at the point of referral. The referred prospect arrives with a trust level that paid advertising cannot manufacture. They convert at higher rates, complain at lower rates, and refer at higher rates than any other cohort.",
          "Good Profit customers refer because they experienced the gap between what they expected and what they got — and it was in the right direction. The product exceeded what the copy promised, or delivered exactly what it promised with no unpleasant surprises. Either outcome generates referrals.",
          "Bad Profit customers do not refer because the gap ran the other way.",
        ],
      },
      {
        heading: "The economic divergence at 12 months",
        paragraphs: [
          "Consider two businesses with identical monthly revenue at month one. Business A built its customer base through manipulation — urgency, vague claims, buried limitations. Business B built its customer base through clarity — honest copy, named buyer, specific credentials.",
          "At month three, Business A's churn rate becomes visible. Support costs rise. Reviews begin appearing. Re-acquisition spend increases to replace churned customers. Business B's customer base has stayed largely intact. A few have referred new customers.",
          "At month twelve, Business A is spending more on acquisition than it did at month one, with lower margin. Business B is spending less. The gap between these two trajectories is not theoretical. It appears consistently, across industries, at a scale that makes the initial cost of getting copy right look trivial by comparison.",
        ],
      },
      {
        heading: "Building the multiplier base",
        paragraphs: [
          "The multiplier base — the group of customers who refer, return, and review — does not build itself. It is built by doing the work of earning it at every step: copy that tells the truth, delivery that matches the promise, follow-up that treats the customer as a person and not a transaction.",
          "Every step of the Elliyeen audit is aimed at this outcome. Not just converting the next visitor, but converting them in a way that creates the conditions for multiplication.",
        ],
      },
    ],
  },
  {
    slug: "good-vs-bad-profit",
    issue: 5,
    date: "March 31, 2025",
    dateISO: "2025-03-31",
    readTime: "3 min",
    theme: "Framework",
    title: "Good Profit vs. Bad Profit: The Five Dimensions That Separate Them",
    description:
      "A comparison across five dimensions — source of conversion, customer quality, revenue trajectory, scalability, and risk profile — that makes the choice concrete.",
    intro: [
      "The distinction between Good Profit and Bad Profit can feel philosophical until you put it across five concrete dimensions. At that point it becomes an operational decision — one that affects every piece of copy, every pricing page, every FAQ, every trust signal on your site.",
    ],
    sections: [
      {
        heading: "1. Source of conversion",
        paragraphs: [
          "Bad Profit converts through manufactured urgency, confusion about limitations, and friction exploitation — buried pricing, hard-to-cancel flows, comparisons structured to mislead.",
          "Good Profit converts through clarity. The copy names the exact buyer. The pricing is visible before commitment. The limitations are stated before the question is asked. The conversion happens because the buyer made an informed decision, not because they were prevented from making an informed one.",
        ],
      },
      {
        heading: "2. Customer quality",
        paragraphs: [
          "Bad Profit customers churn faster, generate higher support costs, and leave negative reviews at higher rates. They were converted before they were ready, or on the basis of information that turned out to be misleading.",
          "Good Profit customers stay, refer, and return. They were converted on the basis of accurate information. Their expectation matched their experience.",
        ],
      },
      {
        heading: "3. Revenue trajectory",
        paragraphs: [
          "Bad Profit revenue peaks early and then requires constant acquisition spend to maintain. Churn prevents compounding.",
          "Good Profit revenue compounds. Each satisfied customer reduces the effective cost of acquiring the next one. The trajectory is not linear — it is exponential over time.",
        ],
      },
      {
        heading: "4. Scalability",
        paragraphs: [
          "Bad Profit is difficult to scale because scaling requires proportionally more acquisition spend. The unit economics do not improve with volume.",
          "Good Profit scales because the referral mechanism amplifies with volume. More customers means more referrals means lower acquisition cost means higher margin per customer. The unit economics improve with scale.",
        ],
      },
      {
        heading: "5. Risk profile",
        paragraphs: [
          "Bad Profit businesses are exposed. Negative reviews accumulate. Dispute rates attract payment processor scrutiny. Regulatory attention follows patterns of customer complaints. The business is one viral review away from a crisis.",
          "Good Profit businesses are defensible. Their public review profile reflects their actual customer experience. They have nothing to hide in their copy because there is nothing that contradicts reality. This is not just an ethical position — it is a durable competitive advantage.",
        ],
      },
    ],
  },
  {
    slug: "what-is-aeo",
    issue: 6,
    date: "April 14, 2025",
    dateISO: "2025-04-14",
    readTime: "4 min",
    theme: "AEO",
    title: "What Is Answer Engine Optimization — And Why It Changes How Customers Find You",
    description:
      "AI-powered search engines don't rank pages. They cite specific answers. Here's how to structure your content so yours is the answer they pull.",
    intro: [
      "Search is changing in a way that most businesses have not yet accounted for. The shift is not about algorithm updates or keyword strategy. It is structural.",
      "When someone types a question into ChatGPT, Perplexity, Google's AI Overviews, or Claude, they do not receive a list of links. They receive an answer. Sometimes that answer cites a source. More often, it does not. Either way, the page that provided the answer got the signal — and the page that didn't, didn't.",
    ],
    sections: [
      {
        heading: "What AI engines actually do",
        paragraphs: [
          "AI search engines index the web and use it to construct answers to direct questions. They are not ranking pages by keyword relevance. They are extracting structured, citable content from pages that answer specific questions clearly and completely.",
          "A page that buries its answer inside three paragraphs of preamble is not citable. A page that states the answer in the first sentence, then supports it with evidence, is. This is a fundamentally different optimization target than traditional SEO.",
        ],
      },
      {
        heading: "AEO vs. SEO",
        paragraphs: [
          "Traditional SEO targets keyword rankings. The goal is to appear on page one of Google for terms your buyers search. AEO targets citation. The goal is to be the source an AI engine draws from when it constructs an answer to a question your buyer asks.",
          "These are not mutually exclusive. A page that is well-optimized for AEO tends to also perform well for traditional SEO, because the qualities AI engines value — clarity, specificity, direct answers, structured content — are the same qualities that earn authority in search rankings.",
          "But AEO requires something traditional SEO does not: you must actually answer the question, directly, in plain language, without hedging or preamble. This turns out to be harder for most businesses than keyword placement.",
        ],
      },
      {
        heading: "How to structure for citation",
        paragraphs: [
          "The structure that AI engines favor is direct answer first, evidence second, context third. If your FAQ question is \"What happens if my caregiver doesn't show up?\", the answer should begin with what happens — not with a sentence about how the company takes reliability seriously.",
          "Schema markup (FAQPage, Article, HowTo) signals to crawlers that the content is structured and citable. Pages with clean FAQ schema are pulled at higher rates by AI engines than equivalent pages without it.",
          "The Elliyeen audit includes AEO readiness as one of its 18 diagnostic frameworks. Most pages we audit have content that would answer AI queries well — buried inside prose that prevents it from being cited. The fix is usually structural, not substantive.",
        ],
      },
      {
        heading: "What to fix first",
        paragraphs: [
          "Start with FAQ pages. They are the most naturally structured for AEO and the most neglected by businesses that haven't thought about it. Rewrite every question as the exact phrasing a buyer would type into an AI engine. Write the answer in the first sentence. Add schema markup.",
          "Then audit your service and about pages for direct answers to the questions your buyers actually ask — pricing, timeline, credentials, what makes you different. Each of those answers is a potential citation waiting for the structure that makes it citable.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): GoodProfitArticle | undefined {
  return articles.find((a) => a.slug === slug);
}
