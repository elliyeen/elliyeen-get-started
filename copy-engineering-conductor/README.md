# Copy Engineering System

A behavioral copy evaluation and production system.

## Principle

Copy exists to move people.

Outputs are not documents. Outputs are behavior-changing assets.

---

## System Architecture

```
copy-engineering-conductor/
├── README.md                     ← this file
├── copy_outputs.md               ← full taxonomy of output types
├── router.md                     ← dispatcher — routes requests to the right agent
├── agent.md                      ← Conductor — evaluates any completed copy asset
├── input.schema.json             ← Conductor input format
├── output.schema.json            ← Conductor output format
├── scoring.md                    ← force scoring rules (0–10 per force)
├── evaluation-rubric.md          ← audit questions per behavioral force
├── examples.md                   ← two full conductor reports with input and output
├── tests.md                      ← eight test cases with pass criteria
└── agents/
    ├── acquisition.md            ← headlines, ads, sales letters, cold email, outreach
    ├── website.md                ← landing pages, homepage, about, pricing, FAQ, checkout
    ├── email.md                  ← newsletters, sequences, launches, cart abandonment
    ├── social.md                 ← LinkedIn, Twitter/X, Instagram, TikTok, YouTube descriptions
    ├── video.md                  ← VSL scripts, webinar, YouTube, reels, hooks, closing CTAs
    ├── sales.md                  ← discovery questions, call scripts, objection handling, proposals
    ├── product.md                ← onboarding, microcopy, tooltips, buttons, errors, chat flows
    ├── brand.md                  ← mission, vision, values, taglines, positioning, founder story
    ├── community.md              ← surveys, testimonials, case studies, referral programs
    ├── recruiting.md             ← job posts, career pages, candidate emails, offer letters
    ├── internal.md               ← SOPs, playbooks, policies, reports, meeting agendas
    ├── ai-systems.md             ← prompt templates, agent instructions, persona files, safety rules
    └── persuasion.md             ← offers, guarantees, mechanisms, proof, objection responses, CTAs
```

---

## Agent Registry

| Agent | File | Role |
|---|---|---|
| Router | `router.md` | Routes every request to the correct specialist |
| Conductor | `agent.md` | Evaluates completed copy for behavioral movement |
| Acquisition | `agents/acquisition.md` | Headlines, ads, sales letters, cold email, VSL scripts, outreach |
| Website | `agents/website.md` | Landing pages, homepage, about, pricing, FAQ, checkout, order bumps |
| Email | `agents/email.md` | Newsletters, sequences, launches, cart abandonment, post-purchase |
| Social | `agents/social.md` | LinkedIn, Twitter/X, Instagram, TikTok, Facebook, YouTube descriptions |
| Video | `agents/video.md` | VSL scripts, webinar, YouTube, reels, shorts, interview questions, hooks |
| Sales | `agents/sales.md` | Discovery questions, call scripts, objection handling, proposals, pitch decks |
| Product | `agents/product.md` | Onboarding, microcopy, tooltips, buttons, errors, notifications, chat flows |
| Brand | `agents/brand.md` | Mission, vision, values, taglines, positioning, unique mechanism, founder story |
| Community | `agents/community.md` | Surveys, testimonials, review requests, case studies, referral programs |
| Recruiting | `agents/recruiting.md` | Job posts, career pages, interview questions, candidate emails, offer letters |
| Internal | `agents/internal.md` | SOPs, playbooks, policies, knowledge bases, reports, meeting agendas |
| AI Systems | `agents/ai-systems.md` | Prompt templates, agent instructions, persona files, safety rules, workflow definitions |
| Persuasion | `agents/persuasion.md` | Offers, guarantees, risk reversal, mechanisms, proof blocks, objection responses |

---

## Ownership Rules (No Duplicates)

Every output type is owned by exactly one agent.

| Output | Agent |
|---|---|
| Headlines | Acquisition |
| Ads (all formats) | Acquisition |
| Sales letters | Acquisition |
| Cold / warm email | Acquisition |
| SMS / DM scripts | Acquisition |
| Outreach messages | Acquisition |
| Referral requests (cold outreach) | Acquisition |
| Landing pages | Website |
| Homepage | Website |
| About / Services / Pricing pages | Website |
| FAQ pages | Website |
| Lead magnets / thank-you pages | Website |
| Checkout / order bumps / upsells | Website |
| Forms / error messages / 404 | Website |
| Newsletters | Email |
| Email sequences (all types) | Email |
| Cart abandonment | Email |
| Post-purchase emails | Email |
| Referral emails (to existing customers) | Email |
| LinkedIn posts | Social |
| Twitter/X threads | Social |
| Instagram captions | Social |
| TikTok scripts | Social |
| Facebook posts | Social |
| YouTube descriptions | Social |
| Community posts / polls / comments | Social |
| VSL scripts | Video |
| Webinar scripts | Video |
| YouTube / Podcast scripts | Video |
| Reels / Shorts | Video |
| Opening hooks | Video |
| Closing CTAs (video-embedded) | Video |
| Discovery questions | Sales |
| Sales call scripts | Sales |
| Objection handling (in sales context) | Sales |
| Proposals / pitch decks | Sales |
| Sales follow-up sequences | Sales |
| Voicemail / text message scripts | Sales |
| Onboarding flows | Product |
| Tooltips / microcopy / buttons / labels | Product |
| Notifications / success messages / errors | Product |
| Checkout flow copy (in-product) | Product |
| In-product chat flows | Product |
| In-product conversation trees | Product |
| AI responses (in-product) | Product |
| Mission / Vision / Values | Brand |
| Taglines / Positioning | Brand |
| Unique mechanism | Brand |
| Manifestos / brand story / founder story | Brand |
| Elevator pitch | Brand |
| Surveys | Community |
| Testimonial requests | Community |
| Review requests | Community |
| Case studies (raw collection) | Community |
| Referral programs | Community |
| Ambassador programs | Community |
| Job posts / career pages | Recruiting |
| Interview questions | Recruiting |
| Candidate emails / offer letters | Recruiting |
| Internal announcements (hires/departures) | Recruiting |
| Onboarding training material | Recruiting |
| SOPs / playbooks | Internal |
| Training documents (existing team) | Internal |
| Knowledge bases / policies | Internal |
| Reports / meeting agendas | Internal |
| Executive summaries | Internal |
| Prompt templates | AI Systems |
| Agent instructions | AI Systems |
| RAG documents / persona files / memory files | AI Systems |
| AI conversation trees | AI Systems |
| Escalation scripts / safety rules | AI Systems |
| Workflow definitions | AI Systems |
| Offers (as standalone components) | Persuasion |
| Guarantees / risk reversal / bonuses | Persuasion |
| Scarcity / urgency mechanisms | Persuasion |
| Proof blocks / testimonial components | Persuasion |
| Comparisons | Persuasion |
| FAQ (as objection-handling components) | Persuasion |
| Objection responses (standalone) | Persuasion |
| CTAs (as standalone reusable components) | Persuasion |

---

## Boundary Cases

**Case studies**: Community Agent collects and structures raw proof. Persuasion Agent shapes it into ready-to-embed components.

**CTAs**: If embedded inside a complete asset (landing page, email) → that specialist agent owns it. If built as a standalone reusable component for a specific offer → Persuasion.

**Testimonials**: Community Agent requests and collects them. Persuasion Agent formats them as proof components.

**FAQs**: If part of a website page → Website. If built as reusable objection-handling components → Persuasion.

**Conversation Trees**: In-product → Product. Sales qualification → Sales. AI agent behavior → AI Systems.

**Evaluation of any completed copy**: Always the Conductor.

---

## How to Use This System

### To produce copy

1. Identify the output type
2. Route to the correct specialist agent (or use the Router)
3. Provide the required inputs defined in that agent's file
4. Receive the output in the agent's defined format

### To evaluate copy

1. Prepare input using `input.schema.json`
2. Run it through the Conductor (`agent.md`)
3. Read the force scores, critical bottleneck, and highest-leverage fix
4. Act on one fix, then re-evaluate

### To build a persuasion layer

1. Use the Persuasion Agent to build standalone components (offers, guarantees, proof blocks)
2. Embed those components into the complete asset via the relevant specialist agent
3. Evaluate the complete asset with the Conductor

---

## The Ten Behavioral Forces (Conductor)

1. Attention
2. Curiosity
3. Understanding
4. Desire
5. Belief
6. Trust
7. Friction Reduction
8. Action
9. Loyalty
10. Advocacy

## Verdict Scale

| Verdict | Meaning |
|---|---|
| `moves_closer` | Copy increases probability of the desired action |
| `neutral` | Copy is clear but does not change prospect state meaningfully |
| `moves_away` | Copy creates confusion, skepticism, boredom, or hesitation |
