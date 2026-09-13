/**
 * Kaboota site content — ported from Kaboota_Site_refined_4.html (the Claude Design bundle's
 * page copy and data constants). Every figure keeps the window it was measured over.
 * Page set and section order follow the aiprlassist site-content blueprint.
 */

export type Status = "LIVE" | "IN ROLLOUT" | "COMING" | "PILOT" | "MEASURED" | "PROJECTED";

export const brand = {
  name: "Kaboota",
  tagline: "Conversation-to-action intelligence",
  brandLine: "Human-first · AI-enabled · above your CRM",
  domain: "kaboota.cloudmantra.ai",
  phone: "*72 · 877 570 5946",
  emails: {
    hello: "hello@kaboota.cloudmantra.ai",
    support: "support@kaboota.cloudmantra.ai",
    security: "security@kaboota.cloudmantra.ai",
    partners: "partners@kaboota.cloudmantra.ai",
  },
  copyright: "© 2026 KABOOTA · CALLS ARE RECORDED WITH DISCLOSURE · TCPA-AWARE MESSAGING",
};

export const nav = [
  { label: "Product", href: "/product" },
  { label: "Solutions", href: "/solutions" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Plans", href: "/plans" },
  { label: "Company", href: "/company" },
  { label: "Field notes", href: "/field-notes" },
];

export const ctas = {
  primary: { label: "Start free pilot", href: "/pilot" },
  secondary: { label: "Book a walkthrough", href: "/walkthrough" },
  listen: { label: "Hear a real call", href: "/walkthrough" },
  /** Existing customers and demo accounts sign in to the Kaboota app (Firebase Hosting). */
  signIn: { label: "Sign in", href: "https://app.kaboota.ai/login" },
};

/* ------------------------------------------------------------------ */
/* Home                                                                */
/* ------------------------------------------------------------------ */

export const hero = {
  eyebrow: "Conversation-to-action intelligence for service businesses and showrooms",
  sub: "You're on a roof, under a sink or at dinner, and the call rings out to a competitor. Kaboota answers every call, text, chat and DM, decides the right next move, and executes the workflows you approve — on top of whatever system you already run. No job lost to being busy, or being home.",
  checks: ["Live in an afternoon", "Beside your team or autonomous", "Keeps your system of record", "Every field evidence-linked"],
};

/** Live call script (walkthrough console). */
export const heroScript = [
  { who: "Caller", t: "10:42:07", text: "Hi — our walk-in freezer's completely down, we're losing product.", mine: false },
  { who: "Sam · Kaboota", t: "10:42:11", text: "I'm sorry, that's urgent. I can get a tech out today. Is this for the Dawson Group on Ridgeway?", mine: true },
  { who: "Caller", t: "10:42:19", text: "Yes, that's us. How soon can somebody be here?", mine: false },
  { who: "Sam · Kaboota", t: "10:42:24", text: "I have a two o'clock emergency slot today. Shall I hold it and text you the confirmation?", mine: true },
  { who: "Caller", t: "10:42:31", text: "Please. PO number is 44-1180.", mine: false },
];

export const heroFields = [
  { k: "Customer", v: "Dawson Group", c: "0.97" },
  { k: "Problem", v: "Walk-in freezer down", c: "0.95" },
  { k: "Urgency", v: "Emergency", c: "0.96" },
  { k: "PO number", v: "44-1180", c: "0.99" },
  { k: "Est. job value", v: "$2,400", c: "0.81" },
];

export const kpis = [
  { label: "Missed leads recovered", target: 12, prefix: "", suffix: "", delta: "+5 vs last week" },
  { label: "Jobs booked", target: 31, prefix: "", suffix: "", delta: "+9 vs last week" },
  { label: "Revenue recovered", target: 48200, prefix: "$", suffix: "", delta: "+$14,100 vs last week" },
  { label: "Calls captured", target: 287, prefix: "", suffix: "", delta: "100% of the phone" },
];

export const kpiCaveat =
  "Measured over one week at a mechanical-services pilot running 20–40 conversations a day — one of several in flight across trades. Illustrative of that account, not a promise about yours.";

export const modes = {
  listen: {
    title: "Beside your team",
    badge: "Assistive",
    sub: "Your people stay on the conversation. Kaboota runs underneath it — capturing, structuring, enriching and recommending — and acts only where you've said it may.",
    bullets: [
      { h: "Your people still own the conversation.", d: "It rings, texts and chats exactly where it always did." },
      { h: "Silent capture, or suggest-and-approve.", d: "Two settings apart: notes only, or a recommended action waiting for your yes." },
      { h: "The job gets written down properly.", d: "Named-speaker transcript, summary, action items, sentiment, structured fields." },
      { h: "Every fact is sourced.", d: "Customer, site, equipment, severity, PO — each tied to what was actually said." },
      { h: "Straight into your system of record.", d: "A complete, evidence-linked record — no retyping, no swivel-chair." },
    ],
    chips: ["NO NEW HARDWARE", "HUMAN APPROVAL GATE", "EVIDENCE-LINKED FIELDS", "WRITES TO YOUR CRM"],
  },
  ai: {
    title: "Fully autonomous",
    badge: "Executing",
    sub: "Kaboota handles the conversation end to end — answers, qualifies, decides, books, dispatches and follows up — inside the guardrails you wrote. Nobody goes to voicemail and nobody gets put on hold.",
    bullets: [
      { h: "Answers on the first ring, always.", d: "Call, chat or text — on the rooftop mid-job, at 11 PM with the family, on a Saturday. The customer never hears voicemail, and the job stays yours." },
      { h: "Knows an emergency when it hears one.", d: "No-heat with a newborn jumps the queue. Gas smell means hang up and call 911." },
      { h: "Books the slot for real.", d: "Checks live availability in Google, Calendly, Cal.com or Microsoft, then confirms it." },
      { h: "Pulls the customer's history mid-call.", d: "Past service, equipment and warranty from your dispatch system, while they're still talking." },
      { h: "Escalates like a real desk.", d: "L1 to L2 to L3 with the context carried over, and sooner if the caller's getting hot." },
      { h: "You can whisper mid-call.", d: "Type a nudge from the console and Sam works it in within two seconds." },
    ],
    chips: ["VOICE · SMS · CHAT", "6 LIVE TOOLS", "SEMANTIC TURN-TAKING", "L1→L2→L3 ESCALATION", "LIVE SUPERVISION"],
  },
  onePlatform: "The intelligence is identical in both modes — only the autonomy changes. Silent capture, suggest-and-approve, or full execution: it's a setting, not a different product, and you can move one workflow at a time.",
};

export const channels: { k: string; h: string; d: string; status: Status }[] = [
  { k: "Voice", h: "The phone line", d: "The number on the truck, answered on the first ring at 2am on a Sunday.", status: "LIVE" },
  { k: "SMS", h: "Text back and forth", d: "Missed-call recovery, photo intake, confirmations and the follow-up nobody had time to send.", status: "LIVE" },
  { k: "Web chat", h: "The box on your site", d: "The same brain as the phone, so the answer online matches the answer on the line.", status: "LIVE" },
  { k: "Email", h: "The inbox nobody owns", d: "Quote requests and service mail read, sorted and turned into records like any other conversation.", status: "LIVE" },
  { k: "DMs", h: "DMs and comments", d: "Instagram, Facebook, Messenger and WhatsApp, where half your after-hours questions actually arrive.", status: "LIVE" },
  { k: "Search", h: "Google Business Profile", d: "The message sent straight from your map listing, answered instead of ignored.", status: "LIVE" },
  { k: "Reviews", h: "Google and Yelp reviews", d: "Answered in your voice within the hour, and the ones that name a job or an order routed to the desk that owns it.", status: "LIVE" },
  { k: "Counter", h: "On the floor and at the desk", d: "What was said in the showroom or at the counter, written into the same record as the call that started it.", status: "LIVE" },
];

export const channelIntro = {
  h2: "The phone is the loudest leak, not the only one",
  sub: "One customer, one memory, whichever door they use. A question that goes unanswered in a DM doesn't evaporate. It turns into a call at 4:40 on a Friday from somebody who is already annoyed. Kaboota answers wherever it started.",
  note: "Status is stated per channel rather than averaged into a claim. Live means it is answering for customers today; coming means we are building it and have not shipped it.",
};

export const memory = {
  h2: "The part that isn't the voice",
  sub: "Answering well is a solved problem. Remembering — across channels, across weeks, across whoever picks up next — is the part that changes a week.",
  cards: [
    { h: "One record, not seven threads", d: "A caller who texted a photo on Tuesday and rings on Thursday is the same customer with the same open job, not a stranger with a fresh ticket." },
    { h: "Context arrives before the greeting", d: "Service history, equipment, warranty position and what they were last unhappy about — pulled while the phone is still ringing." },
    { h: "Channel switches don't reset anything", d: "Start on chat, finish on the phone, confirm by text. Nobody is asked to repeat an address they already gave." },
    { h: "The human inherits everything", d: "When it escalates, the person picking up gets the whole thread and the reasoning — not a transfer and an apology." },
  ],
};

export const suite = [
  { k: "Messages", h: "Texts that chase for you", d: "Missed-call recovery, photo intake, estimate follow-ups and reminders in one inbox, with AI-written replies you send in a tap." },
  { k: "Outbound", h: "Campaigns that dial", d: "Import a list, set the retry policy, and let Kaboota work maintenance renewals and reactivations without tying up a person." },
  { k: "Recover", h: "Estimate rescue", d: "Open quotes ranked by close odds with the customer's actual objection, plus a six-step cadence from Day 0 text to Day 9 final email." },
  { k: "Connected", h: "Above your CRM, not instead of it", d: "Pulls history, equipment, warranty and margin on the call — then writes an evidence-linked record back into ServiceTitan, Housecall Pro or whatever you run." },
];

export const desks = {
  h2: "A conversation is only handled when it reaches somebody who can end it",
  sub: "Every conversation becomes a record with an owner. Not a queue, not a shared inbox — a named desk with the history already attached.",
  items: [
    { k: "Service", h: "Something's broken", d: "Triaged by severity and equipment, booked against real availability or escalated with the diagnosis attached." },
    { k: "Sales", h: "Something's wanted", d: "Qualified, priced where you allow it, and handed over warm with the objection already on the record." },
    { k: "Parts", h: "Something's needed", d: "Checked against what you actually carry, with fitment and lead time rather than a promise to call back." },
    { k: "Billing", h: "Something's wrong on paper", d: "Routed to the person who can fix an invoice, never to the tech who can't." },
    { k: "Dispatch", h: "Something's moving", d: "Schedule changes, confirmations and cancellations handled without tying up the board." },
    { k: "Delivery", h: "Something's on a truck", d: "Where-is-my-order, delivery windows, damage and returns answered from the order itself, then routed to the team that can close them." },
  ],
};

export const pipeline = [
  { n: "01", phase: "Understand", h: "Identify customer and location", d: "Matched against your records, address verified against Census and USPS." },
  { n: "02", phase: "Understand", h: "Transcribe and understand", d: "Named speakers, both sides, intent and sentiment as it happens." },
  { n: "03", phase: "Understand", h: "Extract structured fields", d: "Problem, equipment, severity, PO, decision maker — each tied to what was said." },
  { n: "04", phase: "Understand", h: "Detect missing information", d: "Flags the blank that will cost you a return trip instead of guessing at it." },
  { n: "05", phase: "Understand", h: "Detect safety and exceptions", d: "Gas smell, no heat with an infant, a warranty edge case — caught, not buried." },
  { n: "06", phase: "Decide", h: "Enrich with CRM and financials", d: "Service history, equipment age, warranty and margin pulled in mid-conversation." },
  { n: "07", phase: "Decide", h: "Recommend the next-best action", d: "The financially and operationally correct move, with the reasoning shown." },
  { n: "08", phase: "Execute", h: "Book, route, escalate or approve", d: "Against live availability and your chain of command — or held for your sign-off." },
  { n: "09", phase: "Execute", h: "Write evidence-linked records", d: "A complete record into the CRM you already run, sourced line by line." },
  { n: "10", phase: "Execute", h: "Prepare dispatcher and tech", d: "The brief that means nobody arrives cold or without the right part." },
  { n: "11", phase: "Learn", h: "Capture diagnosis and margin", d: "What was actually wrong, what it invoiced, what got paid, what it earned." },
  { n: "12", phase: "Learn", h: "Trigger the right follow-up", d: "Estimate cadence, maintenance renewal, review request — matched to the outcome." },
  { n: "13", phase: "Learn", h: "Learn what actually worked", d: "Which conversations and decisions produced the best customer and financial outcome." },
];

export const pipelineIntro = {
  h2: "Thirteen steps from hello to what it earned",
  sub: "Most tools stop at step three. Transcript-to-fields is where Kaboota starts — the value is in everything that happens after the words are on the page.",
  loop: "Step 13 feeds step 8. The recommendations get sharper every week because the outcomes come back in.",
  evidence: { h: "Evidence map", d: "Every extracted field is tied to the exact words the customer said, so you can check it in one glance. If the call never mentioned it, Kaboota leaves it blank instead of guessing.", quote: "the walk-in freezer's completely down, we're losing product", chips: ["SEVERITY: EMERGENCY", "EQUIPMENT: WALK-IN FREEZER"] },
  scoring: { h: "Outcome scoring", d: "Every call lands in one bucket automatically, so the board tells the truth without anybody typing notes.", buckets: ["Booked", "Emergency", "Callback", "Existing customer", "Lost", "Spam"] },
};

export const screens = ["Revenue board", "Voice — live console", "Transcript intelligence", "Messages", "Recover — estimate rescue", "Leads", "Lead detail", "Admin"];

export const digest = {
  h2: "Four things on a Monday, not a dashboard to go hunting in",
  sub: "You should not have to build a report to find out whether the thing you bought worked. One digest, four answers, every figure openable down to the conversation underneath it.",
  items: [
    { n: "01", h: "What the phone actually cost you", d: "Conversations that would have rung out, what they were worth at your own close rate, and which hours leak worst." },
    { n: "02", h: "What got booked, and by whom", d: "Jobs on the board from AI-handled conversations, split by service, location and who approved them." },
    { n: "03", h: "Where the week went sideways", d: "Repeat callers, escalations, the themes underneath them and which locations are drifting from the rest — with the actual conversation one click away." },
    { n: "04", h: "One thing to change", d: "A single recommendation with the reasoning shown. If the number stops moving, that's ours to fix, not yours to chase." },
  ],
};

export const costs = {
  h2: "\"Margin-based\" isn't a slogan. It's in the code.",
  sub: "Every voice engine costs a real number per minute. Kaboota picks the cheapest one that still does your job right — and shows you the math instead of hiding it in a bundle.",
  rows: [
    { axis: "Speech-to-text", options: "google-batch $0.003 · google-streaming $0.016 · assemblyai $0.0025 · deepgram $0.0077 · openai $0.003", gating: "Batch is the listen-only default because it's roughly five times cheaper for the same transcript. Dual-channel is premium — it costs twice as much." },
    { axis: "Text-to-speech", options: "Google $0.0036 · PlayHT $0.0072 · ElevenLabs $0.027", gating: "Better voices cost more, so they're tied to plan. If a voice provider stumbles, Google picks it up mid-call." },
    { axis: "Realtime voice", options: "OpenAI $0.24 · ElevenLabs $0.08 + model · ConversationRelay $0.07", gating: "Three engines behind one contract. The brain behind ElevenLabs is pluggable — GPT-4o, Claude or Gemini." },
  ],
  cards: [
    { h: "Clamping with receipts", d: "Ask for more than your plan covers and Kaboota quietly corrects it, then tells you which knob it moved and why.", brand: true },
    { h: "Advice both directions", d: "Over 90% of your minutes, we say upgrade. Under 20%, we say downgrade — if it saves you more than ten bucks a month." },
    { h: "Bring your own keys", d: "Already have vendor accounts? Use them. We charge a platform fee, your keys carry the usage, and they're stored AES-256-GCM encrypted." },
  ],
};

export const trust = {
  h2: "Recording calls is serious. We treat it that way.",
  sub: "A consent line plays before anything is captured, in your own words. Opt-outs are honored automatically. And the AI never speaks to a customer unless you turn it on — the safe setting is the default.",
  chips: ["TCPA CONSENT TRACKING", "STOP AUTO-SUPPRESSION", "MARKETING-HOURS BLOCKING"],
  items: [
    { h: "Nothing writes from the browser", d: "Every change goes through the server. Client-side writes are denied outright." },
    { h: "Your keys, encrypted", d: "AES-256-GCM with a fresh IV and auth tag, validated per provider." },
    { h: "Signed telephony", d: "Webhook signatures verified in production so nobody can fake a call into your account." },
    { h: "311 tests, 25 suites", d: "Plus an end-to-end run from webhook to database on every deploy." },
    { h: "Fail-safe defaults", d: "Listen-only unless flipped; a calendar outage never blocks a booking." },
    { h: "One tenant can't see another", d: "Reads are gated on your organization, top to bottom." },
  ],
};

export const vendors = ["Twilio", "OpenAI", "ElevenLabs", "Google Cloud", "Gemini", "Deepgram", "AssemblyAI", "Stripe", "ServiceTitan", "Housecall Pro", "Jobber", "Google Calendar", "Microsoft 365", "Calendly", "Cal.com", "Meta", "WhatsApp", "TikTok", "Google Business Profile", "Yelp", "Shopify", "HubSpot", "Salesforce"];

export const stack: { k: string; d: string; status: Status }[] = [
  { k: "Telephony", d: "We hold the numbers and the carrier relationship. Star-code forwarding, SIP, SMS and MMS.", status: "LIVE" },
  { k: "Field service, CRM & DMS", d: "ServiceTitan, Housecall Pro, Jobber, HubSpot and Salesforce-class CRMs, dealer DMS and service schedulers — read during the conversation, written back after it.", status: "LIVE" },
  { k: "Calendars", d: "Google, Microsoft, Calendly and Cal.com, checked for real free/busy before anything is promised.", status: "LIVE" },
  { k: "Messaging & reviews", d: "Instagram, Facebook, Messenger, WhatsApp Business, TikTok, Google Business Profile and Yelp into the same inbox as the phone.", status: "LIVE" },
  { k: "Commerce, catalog & inventory", d: "Shopify, BigCommerce, WooCommerce, Magento, ERP, PIM, POS and supplier CSV/JSON/XML feeds — products, parts, pricing, stock per location — in whatever shape they arrive.", status: "LIVE" },
  { k: "Google ecosystem", d: "Business Profile sync, Ads conversion tracking, GA4 events and Shopping-feed output, so what the AI booked shows up where you already measure.", status: "LIVE" },
  { k: "Your website", d: "Embeddable chat and voice widgets, a JavaScript SDK and a headless API when you want your own UI on top.", status: "LIVE" },
  { k: "Accounting & payments", d: "Invoice and payment status back against the job, so margin is a fact rather than a guess.", status: "COMING" },
];

export const faqs = [
  { q: "Do I have to change my phone number?", a: "No. You dial one star code on your existing line and it forwards through us. Your number, your business cards, your truck wraps — all unchanged. Undo it the same way." },
  { q: "Do I need a Twilio account or a new phone system?", a: "No. Kaboota holds all the telephony under its own account. There's nothing to buy, sign up for, or plug in." },
  { q: "Will the AI talk to my customers?", a: "Only as far as you let it. Autonomy is a setting per workflow: silent capture, suggest-and-approve, or full execution. Set to assistive, the AI is physically incapable of speaking on a conversation — and you can move one workflow at a time rather than flipping the whole business." },
  { q: "Does it do anything besides answer the phone?", a: "Answering is step one of thirteen. It enriches the conversation with CRM and financial context, recommends the right next move, executes the workflows you've approved, writes the record back into your system, briefs the tech, then captures the invoice and margin and learns from it. Transcript-to-fields is only the entry point." },
  { q: "Do I have to replace my CRM or field-service system?", a: "No — Kaboota works above whatever you run. ServiceTitan, Housecall Pro, Jobber, a spreadsheet and a whiteboard: we read from it during the conversation and write complete, evidence-linked records back. If you switch systems later, the intelligence layer comes with you." },
  { q: "Is this only for HVAC?", a: "No. It was proven first in mechanical services because that's who we built alongside, but nothing in the platform is trade-specific — plumbing, electrical, roofing, restoration, pest, landscaping and multi-trade operations run the same pipeline, and so do furniture and design showrooms, dealerships, transit agencies and wireless stores — each with their own services, guardrails and escalation rules." },
  { q: "Is recording calls legal where I work?", a: "A disclosure line plays before capture in your own wording, consent is tracked per customer, opt-outs are honored automatically, and marketing messages are blocked outside legal hours. Your attorney will find it boring, which is the goal." },
  { q: "What happens if one of the AI vendors goes down?", a: "Every path has a fallback. A realtime engine failure drops to the traditional pipeline, any voice failure falls back to Google, and a calendar outage assumes the slot is available rather than blocking a booking. Hangup never breaks." },
  { q: "How long until I see something?", a: "Setup is an afternoon. You'll have transcribed calls the same day and a first full week on the revenue board by Friday." },
  { q: "Is this just the phone, or the other channels too?", a: "Voice, SMS, web chat, email, DMs, Google Business Profile, reviews and the showroom floor are all answering today, as one customer memory. The status is still stated per channel on the home page rather than averaged into a claim, because a channel that is coming is not a channel you have." },
  { q: "Does a customer have to start over when they switch channels?", a: "No — that is most of the point. A photo texted on Tuesday, a chat on Wednesday and a call on Thursday are one record with one history. Whoever picks up next inherits the thread, and so does the AI." },
  { q: "Where does a conversation go once it's been answered?", a: "To a desk with an owner — service, sales, parts, billing or dispatch — with the transcript, the structured fields and the reasoning attached. A conversation is only handled when it reaches somebody who can end it." },
  { q: "Can it answer questions about what we sell?", a: "As far as your data lets it. Supplier files get normalised into one released version per product, you decide what the AI may state flat and what it must qualify, and the phone, the site and the counter all read that same record. Where the data is thin the AI says so instead of inventing a price." },
  { q: "Do you work outside the trades?", a: "Yes. The same pipeline runs furniture and design showrooms, automotive dealerships and service counters as well as dispatch desks — a product feed, local stock, delivery windows, financing and warranties are read the same way a job history is. The Where it runs table states status per sector." },
  { q: "How do I know it actually worked?", a: "A Monday digest with four answers: what the phone cost you, what got booked, where the week went sideways, and one thing to change. Every figure carries the window it was measured over, anything extrapolated says so, and each number opens into the conversation underneath it." },
  { q: "Who owns the conversation data?", a: "You do. It lives in your tenancy, it is not pooled with anyone else's, and it is not used to train models that serve other customers. It exports in full and deletes on request — leaving should cost you a support ticket rather than a quarter." },
  { q: "Can you answer our security questionnaire?", a: "Yes, and we will answer it plainly — including the rows where the answer is not yet. We would rather lose a deal on a control we do not hold than win one on a badge we implied. Ask and we will tell you what is in place today." },
  { q: "What do you need from us to get started?", a: "A star code on your existing line, read access to the system you already run, your hours and escalation rules, and about an hour a week from one person who can settle a judgement call for the first three weeks. That is the whole ask." },
  { q: "Do you work with agencies and resellers?", a: "We do the build and the ongoing tuning; the partner keeps the relationship and the credit. It suits agencies who own the marketing spend and want to prove which of it produced a booked job, and franchise groups who need per-location rules under one agreement." },
];

export const closing = {
  h2: "Forward your line this afternoon. See your real week by Friday.",
  p: "Two weeks, your own number, your own CRM, no carrier change and nothing to uninstall if you hate it.",
};

export const footerCols = [
  { h: "Product", items: [["Product", "/product"], ["Solutions", "/solutions"], ["Outcomes", "/outcomes"], ["Plans", "/plans"]] },
  { h: "Company", items: [["About", "/company"], ["Field notes", "/field-notes"], ["Security", "/security"], ["Contact", "/contact"]] },
  { h: "Get started", items: [["Start free pilot", "/pilot"], ["Book a walkthrough", "/walkthrough"], ["Sign in", "https://app.kaboota.ai/login"]] },
];

/* ------------------------------------------------------------------ */
/* Product                                                             */
/* ------------------------------------------------------------------ */

export const product = {
  h1: "An operator with tools, guardrails, and a chain of command",
  sub: "You edit plain-language settings — company, hours, services, service area, tone of voice, what to escalate, what to never say. Kaboota compiles that into the agent every time you hit save. You never write a prompt.",
};

export const tools = [
  { name: "capture_lead", what: "The one that pays for the whole thing. Called over and over as facts come out: name, phone, address, job type, urgency, decision maker, system age and type, estimated value, source. Streams to your screen mid-call." },
  { name: "book_appointment", what: "Checks your calendar's free/busy first, refuses slots you're already in with alternatives, writes the appointment and emails the confirmation. Diagnostic, repair, emergency, estimate or maintenance." },
  { name: "transfer_to_agent", what: "Escalation with a handoff cap and hierarchy-first routing — L1 to L2 to L3. Frustrated callers escalate on sentiment, and the next agent gets the context, not a cold start." },
  { name: "take_message", what: "Callback capture with urgency, category, preferred time and method. Emergencies flag the session and jump the queue." },
  { name: "search_knowledge_base", what: "Services, pricing, service area, hours and brands you carry, so the answer on the phone matches the answer on your website." },
  { name: "send_email", what: "Confirmations and follow-ups, sent transactionally the moment the call ends." },
];

export const whisper = {
  h: "Whisper to the AI mid-call",
  d: "Watch a call happen in the console and type a nudge — \"offer the maintenance plan,\" \"we're booked Friday.\" Guidance reaches the agent within two seconds and expires when the call ends.",
};

export const guardrails = {
  quotes: ["One question at a time. Always repeat back names, numbers and dates.", "Politely decline jobs outside the service area.", "Our voice: warm, brief, no exclamation marks — at 2pm and at 2am.", "Gas smell → tell them to hang up and call 911."],
  note: "Addresses are verified against US Census + USPS before they ever hit a work order.",
};

export const objects = [
  { n: "Package", h: "What you see", d: "Decides your answer mode and exactly which screens exist. Anything not listed is revoked — the safe default is listen-only." },
  { n: "Tier", h: "What it costs", d: "Voice engine options, minute caps, how many calls at once, outbound allowance." },
  { n: "Agent", h: "Who answers", d: "Voice, speech mode, tools it may use, where it sits in the chain of command." },
  { n: "Business", h: "What it knows", d: "Profile, hours, services, service area, escalation rules, guardrails, greeting, disclosure." },
  { n: "Number", h: "Where it rings", d: "Voice mode, dial-out target, consent line, messaging channels. We hold the numbers." },
];

export const catalog = {
  h2: "It can't answer about a part it has three prices for",
  sub: "Most wrong answers on a phone line aren't reasoning failures. They're data failures — the sheet said one thing, the site said another, and the counter said a third. Kaboota keeps one released version of what you sell — dimensions, finishes, stock, delivery, financing, warranty — and answers from that, on the phone and on the floor.",
  items: [
    { h: "Take the file however it arrives", d: "Supplier spreadsheets, PDFs, a column renamed without warning. It gets normalised instead of retyped." },
    { h: "You own the final answer", d: "When the supplier's sheet and your own pricing disagree, yours is the one that ships. The source stays attached so you can see who said what." },
    { h: "Decide what the AI may claim", d: "Approved language per product: what can be stated flat, what has to be qualified, what it must never promise." },
    { h: "One version reaches every channel", d: "Site, quote, counter and phone read the same released record, so nobody gets three prices for one part." },
    { h: "Options and exclusions, not flat SKUs", d: "Dimensions, fabrics, finishes and configurable units with real dependencies, so the AI can walk someone through valid combinations instead of guessing." },
    { h: "Stock where the customer is standing", d: "Availability per location from the live feed — the answer is for their store, not the warehouse — with the alternative offered when it isn't there." },
    { h: "Delivery, financing and warranty, answered flat", d: "Windows, finance terms, warranty and return policies as approved language per product, so the floor and the phone quote the same terms." },
    { h: "Guided selling, not a search box", d: "It asks what the room or the job needs, narrows to the valid options, and books the showroom visit or the site survey on a real calendar." },
    { h: "Post-sale is the same conversation", d: "Delivery-day questions, damage claims and warranty service land on the desk that owns them with the order and the history attached." },
    { h: "Publish-ready, not just answer-ready", d: "SEO titles, meta descriptions, schema and a Google Shopping feed come out of the same released record, so the site and the phone can't drift apart." },
    { h: "Images and enrichment from the same file", d: "Product copy enriched, images processed, every SKU validated before it publishes — a catalog that gets easier with each supplier update, not harder." },
    { h: "Ready for the shopping agent", d: "Machine-readable, complete and consistent, so an AI agent shortlisting on a shopper's behalf includes you instead of skipping the contradiction." },
  ],
};

export const sectors: { k: string; d: string; status: Status }[] = [
  { k: "Mechanical & HVAC", d: "Where it was proven first — emergency triage, equipment history, maintenance renewals.", status: "LIVE" },
  { k: "Plumbing & electrical", d: "Same pipeline, own guardrails, own safety exceptions and escalation rules.", status: "LIVE" },
  { k: "Roofing & restoration", d: "Storm-season surges absorbed without adding a phone for six weeks.", status: "LIVE" },
  { k: "Multi-location & franchise", d: "Several brands, several boards, one intelligence layer with per-location hours, inventory and rules.", status: "LIVE" },
  { k: "Furniture, mattress & design retail", d: "Products, dimensions, stock, delivery windows, financing and warranties answered on the floor's behalf, and the visit booked.", status: "LIVE" },
  { k: "Automotive dealerships & service", d: "Sales enquiries and bay booking at the counter's worst hour, fitment and trade-in questions, parts-ready follow-up.", status: "LIVE" },
  { k: "Transit & paratransit", d: "Ride bookings, confirmations and changes handled start to finish, after hours included, where a missed call strands somebody.", status: "LIVE" },
  { k: "Wireless & telecom stores", d: "Plan comparisons grounded in the customer's actual usage, routine triage before a person, the store visit booked from the same conversation.", status: "LIVE" },
];

export const evidence = [
  { h: "Every figure carries its window", d: "A number without a date range is a decoration. Ours say whether they're one week, one month or trailing ninety days." },
  { h: "Measured and projected are different words", d: "Anything extrapolated to a year says so on its face, next to the pace it was extrapolated from." },
  { h: "Status is stated, not implied", d: "Live and coming mean two different things. You should never discover from a support ticket that a capability was a roadmap slide." },
  { h: "The transcript is the receipt", d: "Every claim on the board opens into the conversation that produced it. Nothing rolls up into a number you can't take apart." },
];

/* ------------------------------------------------------------------ */
/* Solutions                                                           */
/* ------------------------------------------------------------------ */

export const solutions = [
  { g: "The phone", h: "Calls ring out after five and nobody knows what was lost", d: "Every call answered on the first ring, day or night, with the ones that would have gone to voicemail captured, qualified and either booked or handed over with the context attached." },
  { g: "The phone", h: "The line stacks up at the counter's worst hour", d: "Overflow answered in parallel instead of queued, so the advisor under a hood is not also the person losing a booking at the desk." },
  { g: "The phone", h: "Nobody can say what the phone cost last month", d: "Conversations, bookings and leaks on one board, each figure carrying the window it was measured over and opening into the transcript underneath." },
  { g: "The phone", h: "Riders call to book, confirm or change a trip — and wait", d: "Ride bookings, confirmations and changes handled start to finish, after hours included, with every call scored so a bad one surfaces the same day." },
  { g: "Booking", h: "\"Can you get me in Tuesday?\" never gets an answer", d: "Live availability checked against your real calendar, the slot held, the confirmation texted, and the reminder actually sent before the visit." },
  { g: "Booking", h: "Estimates go quiet and nobody chases them", d: "Open quotes ranked by close odds with the customer's actual objection, worked through a cadence rather than remembered by whoever has time." },
  { g: "Booking", h: "Callbacks get promised and not made", d: "Captured with urgency, category and preferred time, then completed — by the AI where you allow it, by a person where you don't." },
  { g: "Across channels", h: "A DM sits unread and arrives later as an angry call", d: "Social, chat, text and email answered from the same brain as the phone, so the question is resolved where it started." },
  { g: "Across channels", h: "Customers repeat themselves at every handoff", d: "One record across channels and weeks. Whoever picks up next inherits the thread, the history and the reasoning." },
  { g: "Across channels", h: "The website says one thing and the phone says another", d: "One released record per product or service, so the answer is the same wherever it is asked for." },
  { g: "The office", h: "Jobs get written up twice, badly", d: "Named-speaker transcript, structured fields and an evidence-linked record straight into the system you already run. No retyping, no swivel chair." },
  { g: "The office", h: "Conversations land on the wrong desk", d: "Service, sales, parts, billing and dispatch routed to an owner with the full history attached, rather than into a shared inbox nobody owns." },
  { g: "The office", h: "Nobody arrives knowing what they're walking into", d: "A brief for the dispatcher and the tech built from what was actually said, so the right part is on the truck the first time." },
  { g: "The floor", h: "\"Do you have it in stock?\" gets a guess", d: "Availability answered per location from the live feed, the alternative offered when it is not there, and the hold placed against the order." },
  { g: "The floor", h: "Delivery, financing and warranty questions stall the sale", d: "Approved answers per product — quoted flat where you allow it, qualified where you don't — with the order and the customer's history attached." },
  { g: "The floor", h: "Showroom visits are booked by whoever remembers", d: "Guided to the right products first, then the appointment on a real calendar with the salesperson who already owns that customer." },
  { g: "The floor", h: "\"Where's my order?\" gets a promise to call back", d: "A real answer from the order and the delivery schedule, and a change or a damage claim routed to the team that owns it, with the sale attached." },
];

/* ------------------------------------------------------------------ */
/* Results                                                             */
/* ------------------------------------------------------------------ */

export type Case = {
  tag: string;
  status: Status;
  h: string;
  problem: string;
  solution: string;
  window: string;
  outcomes: string[];
  figures: { v: string; l: string; basis: Status }[];
  quote?: string;
};

export const cases: Case[] = [
  {
    tag: "Mechanical services · pilot",
    status: "MEASURED",
    h: "It caught two calls the owner never knew he'd lost",
    problem: "A working mechanical-services company answering from trucks, crawlspaces and a desk that was already busy. Calls that rang out left no trace, so the leak was invisible — you cannot chase a lead you never knew arrived.",
    solution: "The line was forwarded on a star code and Kaboota ran in listen-only first: capturing, transcribing and structuring every conversation before it was allowed to speak to anyone.",
    window: "One week · 20–40 conversations a day",
    outcomes: [
      "287 calls captured — the whole phone, not a sample",
      "12 missed leads surfaced that had previously left no record",
      "31 jobs booked from conversations on the board",
      "$48,200 in recovered work attributed to those conversations",
    ],
    figures: [
      { v: "287", l: "Calls captured — the whole phone, not a sample", basis: "MEASURED" },
      { v: "12", l: "Missed leads surfaced that had left no record", basis: "MEASURED" },
      { v: "31", l: "Jobs booked from conversations on the board", basis: "MEASURED" },
      { v: "$48,200", l: "Recovered work attributed to those conversations", basis: "MEASURED" },
    ],
    quote: "It was already worth it the first week, when it caught the two calls we never knew we'd lost.",
  },
];

export const proofOpen = [
  { k: "Plumbing & electrical", d: "Running. Measured results not published yet — they will appear here with their window when there is a full reporting period behind them." },
  { k: "Roofing & restoration", d: "Running through a storm season. We would rather publish one honest number late than a projection early." },
  { k: "Multi-location & franchise", d: "Running. Per-location reporting is what will be published, and it will carry its window when it is." },
  { k: "Retail showrooms & dealerships", d: "Running. Furniture, design and automotive accounts are on the board; measured results appear here with their window when a full reporting period is behind them." },
];

/* ------------------------------------------------------------------ */
/* Plans                                                               */
/* ------------------------------------------------------------------ */

export type Plan = { name: string; minutes: string; minutesN: number; who: string; features: string[]; tag?: string; featured?: boolean; cta: string };

export const plans: Plan[] = [
  { name: "Starter", minutes: "~500 minutes / mo", minutesN: 500, who: "One location testing the water.", features: ["Assistive capture", "Transcripts & summaries", "Structured records", "Revenue board"], cta: "Talk to us" },
  { name: "Standard", minutes: "~2,000 minutes / mo", minutesN: 2000, who: "A real crew losing real conversations.", features: ["Everything in Starter", "Suggest-and-approve actions", "SMS recovery inbox", "Estimate rescue"], cta: "Talk to us" },
  { name: "Premium", minutes: "~10,000 minutes / mo", minutesN: 10000, who: "Autonomous execution, all day.", features: ["Answers, decides, books & dispatches", "Live supervision & whisper", "System-of-record connectors", "Best-in-class voices"], cta: "Talk to us", tag: "Most shops", featured: true },
  { name: "Enterprise", minutes: "Unlimited minutes", minutesN: Infinity, who: "Multiple locations, dispatch teams, custom rules.", features: ["Everything in Premium", "Outbound campaigns", "Call-review workflows", "Managed onboarding"], cta: "Talk to us" },
];

export const plansIntro = {
  h1: "Priced against the jobs it books, not the seats you fill",
  sub: "Four plans by minutes and capability. We'll quote yours on a fifteen-minute call once we know your call volume — no list price games, no annual lock to start.",
  byok: { h: "Bring your own keys", d: "Already paying OpenAI, ElevenLabs or Google? Point Kaboota at your accounts. You pay a small platform fee per minute, your vendor bills land on your own cards, and your keys sit encrypted with per-provider validation." },
  included: { h: "What's included in all of them", d: "Keep your number, guided carrier setup, every call captured and transcribed, structured leads, the revenue board, SMS receipts, and a human who answers when you call us." },
  note: "Overage, invoices and six-month cost forecasting are built in — you'll never find a surprise on the bill you couldn't see coming.",
};

export const addons: { k: string; h: string; d: string; status: Status }[] = [
  { k: "Catalog layer", h: "Answers about what you sell", d: "Supplier files normalised into one released record per product, with the claims the AI is allowed to make set by you. Enrichment, images, SEO titles and schema come out of the same record. Turn it on when wrong prices on the phone start costing more than the work of fixing the data.", status: "LIVE" },
  { k: "Channel pack", h: "Beyond voice and text", d: "DMs, reviews, Google Business Profile and the shared email inbox answered from the same brain as the phone. Priced by conversation volume, not per channel — adding a channel should not feel like buying a second product.", status: "LIVE" },
  { k: "Multi-location", h: "More than one board", d: "Per-location hours, services, guardrails and escalation, with routing by who is actually open and what they have in stock. Included at Enterprise, available earlier if you run more than three.", status: "LIVE" },
  { k: "Outbound", h: "Campaigns that dial", d: "Maintenance renewals and reactivations worked from a list with your own retry policy and quiet hours. Minutes come out of the same allowance as inbound.", status: "LIVE" },
];

export const billing = [
  { h: "Minutes, not seats", d: "Adding a dispatcher does not change the bill. You are charged for conversation, which is the thing that actually varies." },
  { h: "The meter is visible", d: "Every engine and its per-minute rate is on this page. You can see what a call costs before you commit to a plan, and while you are on one." },
  { h: "Overage is a conversation, not a surprise", d: "Cross your band and we tell you, with the arithmetic. We would rather move you down a tier than have you find it on an invoice." },
  { h: "No charge for the AI failing", d: "A conversation the AI could not handle and had to hand over is not billed as a handled one. The board and the bill agree." },
];

export const onboard = {
  h2: "An afternoon to start, a week to know if it worked",
  sub: "There is no implementation quarter. Capture starts the day you forward the line, and nothing speaks to a customer until you say it may.",
  you: [
    { n: "01", h: "The line and the logins", d: "One star code on your existing number, plus read access to the system of record you already run. No new handset, nothing to install." },
    { n: "02", h: "How you actually answer", d: "Hours, services, service area, what gets escalated and to whom, and the handful of things the AI must never say." },
    { n: "03", h: "An hour a week, for three weeks", d: "One person who can settle a judgement call. Not a project team, not a steering committee." },
  ],
  we: [
    { n: "01", h: "Transcribed calls the same day", d: "Capture starts the afternoon you forward the line, in listen-only, before anything speaks to a customer." },
    { n: "02", h: "Your real week by Friday", d: "A first full week on the board — what came in, what got booked, what leaked — measured, with the window stated." },
    { n: "03", h: "Autonomy when you say so", d: "We move one workflow at a time from capture to suggest-and-approve to execute. You set the pace and can move it back." },
  ],
};

/* ------------------------------------------------------------------ */
/* Company                                                             */
/* ------------------------------------------------------------------ */

export const company = {
  h1: "Nine out of ten jobs still start with a phone call",
  p1: "And most of them get answered from a truck, a crawlspace, or not at all. That's not a software problem you fix with another app to check — it's a phone problem. So we started at the phone.",
  p2: "Kaboota was built alongside a working mechanical-services company, not in a demo. The first version didn't talk to anybody. It just listened, wrote the job down, and showed the owner what the week actually looked like. Everything since has been earned one call at a time.",
  quote: "It was already worth it the first week, when it caught the two calls we never knew we'd lost.",
  quoteBy: "PILOT CUSTOMER · MECHANICAL SERVICES · 20–40 CONVERSATIONS/DAY",
  stats: [
    { v: "90%", l: "of service work still starts as a conversation" },
    { v: "1", l: "star code to go live — nothing to install" },
  ],
};

export const principles = [
  { h: "Autonomy is earned, not assumed", d: "It starts by listening and recommending. Every step up in authority is a decision you make, workflow by workflow." },
  { h: "Never guess on a customer's behalf", d: "If the call didn't say it, the field stays empty. A blank is honest; a fabrication costs you a job." },
  { h: "Show the math", d: "Every minute has a cost, and you can see it. We'd rather suggest you downgrade than lose your trust." },
  { h: "Never the system of record", d: "You keep whatever you run today. We're the intelligence between the conversation and it — replaceable underneath, portable on top." },
  { h: "Owner-readable, not admin-readable", d: "Plain language settings, big numbers, one green that always means money." },
];

export const promises = [
  { h: "We will not invent a number to win a deal", d: "Every figure we publish carries the window it was measured over, and anything extrapolated says so on its face. If a pilot is one account and one month, that is what it will say." },
  { h: "We will not put a capability on a page before it ships", d: "Live and coming mean two different things, and they are marked separately per channel and per integration. You should never learn from a support ticket that something was a slide." },
  { h: "We will not let the AI confirm what did not happen", d: "No booking it did not make, no part it did not check, no promise it cannot keep. A blank field is honest; a confident fabrication costs you the customer." },
];

export const security = [
  { k: "Encryption", d: "TLS in transit, AES-256-GCM at rest with a fresh IV and auth tag per record. Provider keys are validated per vendor and never leave the server." },
  { k: "Tenancy", d: "Every read is gated on your organisation from the query up. One account cannot see another's conversations, records or numbers by construction, not by filter." },
  { k: "Recording & consent", d: "A disclosure line in your own wording plays before capture, consent is tracked per customer, opt-outs are honoured automatically and marketing messages are blocked outside legal hours." },
  { k: "Customer data", d: "Conversation data belongs to your tenancy. It is not pooled, not sold, and not used to train models that serve anyone else." },
  { k: "Audit trail", d: "Every conversation, agent action and admin change is logged and queryable, so you can show exactly what was said and done on your behalf." },
  { k: "Deletion & export", d: "Records export in full and delete on request. Leaving should cost you a support ticket, not a quarter." },
];

export const securityNote = "Formal certification status is stated on request rather than implied by a badge on a marketing page. If you need a questionnaire answered, ask and we will tell you plainly what we hold today and what we do not.";

export const partners = {
  h2: "Bring us the account. Keep the relationship.",
  sub: "We do the build and the ongoing tuning so your team does not have to add a head to support it. You stay the one the client calls.",
  items: [
    { k: "Agencies", h: "You own the spend", d: "Show which of the marketing budget produced a booked job rather than a click, and keep the account on the strength of it." },
    { k: "Consultancies", h: "Recommend it, don't staff it", d: "An answering layer you can put in front of a client without hiring for it or maintaining it afterwards." },
    { k: "Trade software resellers", h: "Sit on top of what you sell", d: "Add conversation capture and reporting above the field-service system already in the account." },
    { k: "Franchise groups", h: "One layer, many boards", d: "Per-location rules and routing under a single agreement, with reporting that rolls up and breaks down." },
  ],
};

/* ------------------------------------------------------------------ */
/* Contact, privacy, pilot, walkthrough                                */
/* ------------------------------------------------------------------ */

export const contactRoutes = [
  { k: "Pilots & pricing", h: "Talk to someone who runs these", d: "Volume, plan sizing and what a two-week pilot on your line would actually look like.", to: brand.emails.hello },
  { k: "Support", h: "Already live with us", d: "Something is wrong, something changed, or you want a workflow moved up or down a level of autonomy.", to: brand.emails.support },
  { k: "Security & privacy", h: "Questionnaires and data requests", d: "Vendor reviews, security questionnaires, deletion and export requests, consent and recording questions.", to: brand.emails.security },
  { k: "Partners", h: "Agencies, resellers and groups", d: "How the partner program works, what we do, what stays yours, and commercial terms.", to: brand.emails.partners },
];

export const privacyPoints = [
  { h: "What we collect", d: "What you give us on a form — name, company, email, role — plus standard analytics on the site. From live accounts, the conversations the platform is there to handle." },
  { h: "What we never do", d: "We do not sell personal information, and conversation data is not pooled or used to train models that serve anybody else." },
  { h: "Where it sits", d: "Inside your tenancy, encrypted at rest, reachable only by people you have authorised and by us when you ask us to look." },
  { h: "What you can demand", d: "Access, correction, export and deletion — including recordings and transcripts. One email starts it and we do not make you chase it." },
];

export const pilot = {
  h1: "Forward your line. See your real week by Friday.",
  sub: "Two weeks, your own number, listen-only to start. Nothing speaks to a customer until you say it may — and nothing to uninstall if you hate it.",
  see: ["Every call captured and transcribed the same day", "Structured leads with every field tied to what was said", "A first full week on the revenue board by Friday", "Missed leads, jobs booked and what the phone actually cost", "Autonomy moved one workflow at a time, when you say so"],
  who: ["Owner-operators answering from the truck", "Dispatch desks and service counters", "Multi-location and franchise groups", "Agencies and resellers bringing an account"],
  trades: ["Mechanical & HVAC", "Plumbing & electrical", "Roofing & restoration", "Multi-location & franchise", "Furniture & design retail", "Automotive dealership", "Transit & paratransit", "Wireless & telecom", "Other"],
  systems: ["ServiceTitan", "Housecall Pro", "Jobber", "Spreadsheet & whiteboard", "Something else"],
  volumes: ["Under 10 conversations a day", "10–40 a day", "40–100 a day", "More than 100 a day"],
};

export const walkthrough = {
  eyebrow: "Hear a real call · 20 minutes",
  h1: "Hear a real call end in the right action.",
  sub: "A recorded pilot call, the live console beside it, and the record it wrote into the CRM — then the revenue board for the week it came from. No slides.",
  steps: [
    { n: "01", h: "Tell us what you run", d: "Trade, call volume and the system of record. That is the whole ask." },
    { n: "02", h: "We pick the right call", d: "An emergency triage, a Saturday booking or an estimate rescue — whichever sounds like your week." },
    { n: "03", h: "You watch it happen", d: "Transcript, extracted fields, the recommended action and the evidence behind each one." },
    { n: "04", h: "You decide the posture", d: "Assistive or autonomous, workflow by workflow. Most start listen-only and move one thing at a time." },
  ],
  line: "The intelligence is identical in both modes — only the autonomy changes.",
};

/* ------------------------------------------------------------------ */
/* Field notes                                                         */
/* ------------------------------------------------------------------ */

export const featuredPost = {
  kicker: "Field notes · Aug 2026 · 6 min read",
  title: "The cheapest lead you'll ever buy is the one that already called you",
  dek: "Every shop we've sat with can tell you what a lead costs. Almost none can tell you how many walked in the front door and left without being written down.",
  body: [
    "Spend an afternoon watching the phone at a seven-truck shop and the pattern is boring and expensive. The line rings during a rooftop job. It rings at 4:52 while someone's closing out a ticket. It rings Saturday. Each one of those is a customer with a broken system and a credit card, and each one takes about eleven seconds to become somebody else's revenue.",
    "The calls you do answer leak too. A tech takes the job on speaker, gets the address roughly right, forgets the PO number, and never writes down that the unit is eleven years old — which was the whole replacement conversation. By the time anyone follows up, the story is gone.",
    "This is why we started with listening instead of talking. Nobody's afraid of a notepad. Once the notepad also tells you that eleven of last week's calls were replacement-shaped and four of them never got a quote, the conversation about who answers the phone gets a lot easier.",
    "Three numbers, no software required: how many calls came in, how many turned into a booked visit, and how many of your open estimates are older than nine days. If you can't answer all three by lunch, that's the leak — not your marketing spend.",
  ],
  pull: "If a call isn't written down, it didn't happen — and you can't coach, quote, or forecast against something that didn't happen.",
  caption: "FIG 1 · CALL → JOB → SIGNED → BOARD",
};

export const topics = [
  { k: "The phone", d: "What an unanswered line actually costs, and which hours leak worst." },
  { k: "Channels", d: "Why a question ignored in a DM arrives later as an angry call." },
  { k: "Memory", d: "The difference between answering well and remembering across weeks." },
  { k: "Measurement", d: "Which numbers survive contact with a Monday, and which are decoration." },
  { k: "Autonomy", d: "Where to let AI act, where to keep a human gate, and how to move the line." },
  { k: "Data", d: "Why most wrong answers are stale records rather than reasoning failures." },
];

export const morePosts = [
  { kicker: "Playbook", title: "The nine-day rule: why estimates go cold and how to save them" },
  { kicker: "Behind the build", title: "Why our AI stayed silent for the first six months" },
];
