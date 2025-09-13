export const NAV_LINKS = [
  { to: "/features", label: "Features" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Insights" },
  { to: "/dashboard", label: "Dashboard" },
];

export const FEATURES = [
  {
    id: "builder",
    title: "Visual workflow builder",
    description: "Design automations with drag-and-drop blocks and instant previews.",
    icon: "Workflow",
  },
  {
    id: "ai-recommend",
    title: "AI recommendations",
    description: "FundWise suggests optimizations and flags bottlenecks proactively.",
    icon: "Sparkles",
  },
  {
    id: "integrations",
    title: "100+ integrations",
    description: "Connect CRMs, ERPs, spreadsheets, messaging apps and more.",
    icon: "Layers",
  },
  {
    id: "monitoring",
    title: "Monitoring & alerts",
    description: "Track SLAs, failure rates and receive smart incident alerts.",
    icon: "Activity",
  },
  {
    id: "security",
    title: "Enterprise security",
    description: "SSO, RBAC, audit logs and field-level encryption by default.",
    icon: "ShieldCheck",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Measure ROI and time-saved with built-in dashboards.",
    icon: "LineChart",
  },
];

export const USE_CASES = [
  {
    key: "ops",
    title: "Operations",
    bullets: [
      "Automate approvals and escalations",
      "Sync tasks across tools",
      "Daily health reports"
    ],
  },
  {
    key: "finance",
    title: "Finance",
    bullets: [
      "Invoice reconciliation",
      "Expense policy checks",
      "Cashflow alerts"
    ],
  },
  {
    key: "sales",
    title: "Sales",
    bullets: [
      "Lead routing & enrichment",
      "Deal stage automations",
      "Churn risk signals"
    ],
  },
  {
    key: "hr",
    title: "HR",
    bullets: [
      "Onboarding & offboarding",
      "Interview scheduling",
      "Compliance reminders"
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Ava Thompson",
    role: "VP Operations, Lumen",
    quote: "FundWise cut our manual work by 41% in the first quarter—teams finally focus on impact.",
  },
  {
    name: "Miguel Santos",
    role: "Head of RevOps, Northbeam",
    quote: "Implementation was a breeze. The AI suggestions pay for the product every month.",
  },
  {
    name: "Priya Nair",
    role: "CFO, Novacore",
    quote: "We automated reconciliation and saved 200+ hours/month with clear audit trails.",
  },
];

export const PRICING = [
  {
    plan: "Starter",
    priceMonthly: 49,
    priceYearly: 39,
    features: ["Unlimited workflows", "Basic analytics", "Email support"],
    popular: false,
  },
  {
    plan: "Growth",
    priceMonthly: 149,
    priceYearly: 119,
    features: ["AI recommendations", "Advanced analytics", "Priority support"],
    popular: true,
  },
  {
    plan: "Enterprise",
    priceMonthly: 0,
    priceYearly: 0,
    features: ["SSO + RBAC", "Custom SLAs", "Dedicated CSM"],
    popular: false,
    contact: true,
  },
];

export const BLOG_POSTS = [
  {
    slug: "automation-roi",
    title: "Calculating ROI of Workflow Automation",
    excerpt: "A practical framework to measure time saved and impact across teams.",
    tag: "Automation",
    date: "2025-05-12",
  },
  {
    slug: "ai-playbooks",
    title: "AI Playbooks for Operations Leaders",
    excerpt: "Five playbooks to streamline approvals, escalations, and reporting.",
    tag: "AI",
    date: "2025-06-02",
  },
  {
    slug: "scale-integrations",
    title: "Scaling Integrations without Chaos",
    excerpt: "Best practices for a maintainable integrations layer.",
    tag: "Engineering",
    date: "2025-07-08",
  },
];

export const FAQ = [
  {
    q: "How long does implementation take?",
    a: "Most teams get value within the first week. Starter projects often launch in 1-2 days.",
  },
  { q: "Do you offer on-prem?", a: "Yes, for Enterprise plans we support VPC and on-prem deployments." },
  { q: "Can I cancel anytime?", a: "Yes, monthly plans can be cancelled at any time in your workspace settings." },
];