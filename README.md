$readmeContent = @"
# 🧠 MetaFlow System — Founder-Grade Architecture

MetaFlow is a modular backend/frontend system designed for smart transportation, admin coordination, and affiliate profit relay. Built by Mustafa, this cockpit-grade architecture merges operational clarity with symbolic exports and audit-ready logic.

---

## 🔧 System Modules

### Backend (Node.js + Express)
- \`server.js\`: Core logic and routing
- \`routes/\`: API endpoints for cockpit triggers
- \`controllers/\`: Lifecycle logic, tier escalation, and affiliate sync

### Frontend (React + Builder.io)
- \`src/components/\`: Reusable UI elements
- \`src/widgets/\`: Dynamic modules (ProfitWidget, TierWidget, VerdictChain)
- \`public/\`: Static assets and cockpit visuals

### CI/CD (GitHub Actions)
- \`.github/workflows/deploy.yml\`: Auto-deploy pipeline with secret injection and tier logic

---

## 🪙 Monetization Logic

- Stripe checkout flow
- Affiliate engine with referral tracking
- Tier escalation based on engagement and profit
- Wallet ledger for sealed payouts and lifecycle tags

---

## 🔐 Secrets & Environment

Use \`.env\` to inject secure tokens:

\`\`\`env
NOTION_TOKEN=your-secret-token
STRIPE_KEY=your-stripe-key
\`\`\`

---

## 🚀 Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Frontend build:

\`\`\`bash
cd frontend
npm install
npm run build
\`\`\`

---

## 🧠 Vision

MetaFlow is more than code—it’s a symbolic cockpit for operational independence, compounding profit, and legacy-grade impact.

---

## 🤝 Contribute

Pull requests welcome. For strategic partnerships or cockpit sync, contact: \`founder@metaflow.systems\`
"@

Set-Content -Path README.md -Value $readmeContent
git add README.md
git commit -m "README updated: cockpit architecture and monetization logic"
git push origin main