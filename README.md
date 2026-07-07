#  Smart Bharat AI

An AI-powered civic assistant for India — built as a hackathon project. It helps citizens understand government services, file civic complaints, discover welfare schemes, and get document guidance, in plain, step-by-step language (Hindi + English).

Runs entirely on **Groq's free API** (Llama 3.3 70B) — no paid Anthropic/OpenAI key required.

---

## ✨ Features

- **Multi-page site**: Home, Ask Assistant (chat), Scheme Finder, Complaint Assistant, Login/Profile, About
- **Login + Profile page** (demo auth, fully client-side, stored in your browser only)
- **Light & Dark mode** with a smooth animated toggle
- **Glassmorphism UI**, scroll animations, and a signature rotating "chakra wheel" motif used as the loading indicator throughout
- **Fully responsive** — works great on mobile, tablet and desktop
- Structured AI responses following a strict format: Summary → Steps → Documents → Tips → Resources → Follow-up question
- Dedicated **Complaint Assistant** (auto-drafts a ready-to-submit complaint message)
- Dedicated **Scheme Finder** (profile-based scheme recommendations)

---

## 🧠 Why Groq instead of a paid API?

Groq gives you a **free tier API key** that runs open models (like Llama 3.3 70B) extremely fast, which is perfect for a hackathon demo — no credit card required.

### Get your free Groq API key:
1. Go to **https://console.groq.com**
2. Sign up (free, takes 1 minute)
3. Go to **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_...`)
5. Paste it into the app's **Profile page** after logging in — it's saved only in your browser's localStorage and sent directly from your browser to Groq. It never touches any server of ours.

> ⚠️ Note: calling a third-party API directly from the browser means your key lives in the client. That's fine for a hackathon demo. For a production app, proxy the Groq call through your own backend so the key stays secret.

---

## 🛠️ Setup & Run Locally

### Prerequisites
- **Node.js 18+** and **npm** installed ([download here](https://nodejs.org))

### Steps

```bash
# 1. Unzip the project and move into it
cd smart-bharat-ai

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

The app will open automatically at **http://localhost:5173**

### First-time use
1. Click **Login** (top right) → enter any name → Continue
2. On your **Profile** page, paste your free Groq API key → Save
3. Go to **Ask Assistant** and start chatting!

---

## 📦 Build for production

```bash
npm run build
```

This creates an optimized static build in the `dist/` folder. You can deploy it to **Vercel**, **Netlify**, **GitHub Pages**, or any static host:

```bash
npm run preview   # preview the production build locally
```

**Vercel (fastest):**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --dir=dist --prod
```

---

## 📁 Project Structure

```
smart-bharat-ai/
├── src/
│   ├── components/       # Navbar, Footer, ChatMessage bubbles, ChakraWheel motif
│   ├── context/          # ThemeContext (dark/light), AuthContext (login + API key)
│   ├── pages/             # Home, Chat, Schemes, Complaint, Login, Profile, About, NotFound
│   ├── services/
│   │   └── groqService.js # Groq API call + the full Smart Bharat AI system prompt
│   ├── App.jsx            # Routes
│   ├── main.jsx           # Entry point
│   └── index.css          # Tailwind + design tokens + glassmorphism utilities
├── index.html
├── tailwind.config.js      # Color palette, fonts, animation tokens
└── package.json
```

---

## 🎨 Design system

| Token | Value | Use |
|---|---|---|
| `raat` | `#0E1626` | Dark mode background |
| `kagaz` | `#F3F5F8` | Light mode background |
| `marigold` | `#E08D3C` | Primary accent (CTAs, highlights) |
| `banyan` | `#1F6F54` | Secondary accent (success, user messages) |
| Display font | Space Grotesk | Headings |
| Body font | Inter | Body text |
| Mono font | IBM Plex Mono | Labels, chips, data |

The rotating 24-spoke **chakra wheel** is the app's signature visual element — used in the navbar logo, hero background, loading spinner, and empty/404 states.

---

## 🧩 Customizing the AI system prompt

Edit `src/services/groqService.js` → the `SYSTEM_PROMPT` constant. You can change the model too by editing `GROQ_MODEL` (any model available on your Groq account, e.g. `llama-3.1-8b-instant` for even faster/cheaper responses).

---

## ⚠️ Disclaimer

This assistant provides AI-generated guidance for informational purposes only. It is not legal advice. Always verify details on official government (`.gov.in`) portals before taking action.

---

Built with 🧡 for Digital India — Hackathon Project.






## Project Description
Smart Bharat AI is an AI-powered civic assistant that helps everyday Indian citizens navigate government services without confusion. Millions of people struggle with unclear eligibility rules, scattered information, and not knowing which office or portal to approach for something as simple as updating an Aadhaar address or reporting a broken streetlight.
Smart Bharat AI solves this by turning any civic question — asked in plain Hindi or English — into a clear, step-by-step action plan. The assistant identifies what the citizen actually needs (a government service, a complaint, a welfare scheme, or document help), then responds in a consistent, easy-to-scan format: a one-line summary, numbered steps, required documents, common-mistake warnings, official resource links, and a follow-up question to keep the conversation going.
Beyond a general chat interface, the platform includes two purpose-built tools: a Scheme Finder that recommends welfare schemes based on a citizen's age, occupation, income, and state, and a Complaint Assistant that identifies the right department for a civic issue and drafts a ready-to-submit complaint message. The app is fully responsive, supports light and dark mode, and runs on Groq's free, low-latency Llama 3.3 API — making it accessible to build and deploy without any paid infrastructure.




Here's both, written for a hackathon submission form — copy-paste ready:

---

## Project Description

**Smart Bharat AI** is an AI-powered civic assistant that helps everyday Indian citizens navigate government services without confusion. Millions of people struggle with unclear eligibility rules, scattered information, and not knowing which office or portal to approach for something as simple as updating an Aadhaar address or reporting a broken streetlight.

Smart Bharat AI solves this by turning any civic question — asked in plain Hindi or English — into a clear, step-by-step action plan. The assistant identifies what the citizen actually needs (a government service, a complaint, a welfare scheme, or document help), then responds in a consistent, easy-to-scan format: a one-line summary, numbered steps, required documents, common-mistake warnings, official resource links, and a follow-up question to keep the conversation going.

Beyond a general chat interface, the platform includes two purpose-built tools: a **Scheme Finder** that recommends welfare schemes based on a citizen's age, occupation, income, and state, and a **Complaint Assistant** that identifies the right department for a civic issue and drafts a ready-to-submit complaint message. The app is fully responsive, supports light and dark mode, and runs on Groq's free, low-latency Llama 3.3 API — making it accessible to build and deploy without any paid infrastructure.

---

## Prompt Workflow / Strategy

The core of Smart Bharat AI is a single, tightly-structured **system prompt** that governs every response, sent alongside conversation history on every request to Groq's chat completions endpoint.

**1. Role and constraint framing.** The system prompt anchors the model as "Smart Bharat AI," a civic assistant, and explicitly assumes the user may have low technical literacy — this steers the model away from jargon by default rather than relying on the user to ask for simpler language.

**2. Intent classification before response.** The prompt instructs the model to first silently classify the request into one of five types — government service, complaint, scheme/benefit, document help, or general query — before answering. This keeps multi-purpose queries from getting a generic, unfocused reply.

**3. Enforced output schema.** Rather than letting responses vary in structure, the prompt mandates a fixed section format with exact emoji headers (✅ Summary, 📌 Steps to Follow, 📄 Required Documents, ⚠️ Important Tips, 🌐 Useful Resources, 🧑 Follow-up). This was the single biggest lever for making AI output feel like a trustworthy product rather than a raw chatbot — it's predictable, scannable, and renders cleanly through Markdown in the UI.

**4. Task-specific prompt injection on top of the shared system prompt.** The Scheme Finder and Complaint Assistant pages don't just reuse the chat — they programmatically construct a tailored user-turn prompt from structured form inputs (e.g. age, occupation, income, state for schemes; category, location, description for complaints) and send it through the same system prompt. This gets the reliability of a form with the flexibility of natural-language generation.

**5. Guardrails against hallucinated policy.** The prompt explicitly instructs the model to say "please verify on the official government website" rather than inventing fees, eligibility cutoffs, or deadlines it isn't confident about — critical for a domain where wrong information has real consequences.

**6. Low temperature (0.4).** Tuned down from default to prioritize consistency of format and factual caution over creative variance, since users are following these steps literally.

Want me to also add a "Tech Stack" or "Challenges Faced" section, since hackathon forms often ask for those too?




