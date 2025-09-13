import React, { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { FEATURES, USE_CASES, TESTIMONIALS, PRICING, BLOG_POSTS, FAQ } from "./mocks/mock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel";
import { Progress } from "./components/ui/progress";
import { Switch } from "./components/ui/switch";
import { Toaster, toast } from "sonner";
import { Activity, ShieldCheck, Sparkles, Layers, LineChart, Workflow } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const IconMap = { Activity, ShieldCheck, Sparkles, Layers, LineChart, Workflow };

// Abstract black & white illustrations
const ILLUSTRATIONS = {
  hero: "https://images.unsplash.com/photo-1533135091724-62cc5402aa20",
  feature: "https://images.unsplash.com/photo-1532456745301-b2c645d8b80d",
  accent: "https://images.unsplash.com/photo-1482053450283-3e0b78b09a70",
};

function usePingBackend() {
  useEffect(() => {
    async function hello() {
      try {
        const res = await axios.get(`${API}/`);
        console.log(res.data.message);
      } catch (e) {
        console.warn("Backend not reachable yet or error on /api/", e?.message);
      }
    }
    hello();
  }, []);
}

function scrollToId(id) { const el = document.getElementById(id); if (el) el.scrollIntoView({ behavior: "smooth", block: "start" }); }

function useSEO(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (!m) { m = document.createElement("meta"); m.name = "description"; document.head.appendChild(m); }
      m.content = description;
    }
  }, [title, description]);
}

function LandingPage() {
  useSEO("FundWise — Workflow automation platform", "FundWise helps teams automate workflows and reduce manual work.");
  const nav = useNavigate();

  return (
    <main>
      {/* Hero */}
      <section className="hero-section">
        <div className="hero-content items-center">
          <div className="order-2 md:order-1">
            <h1 className="hero-title">FundWise</h1>
            <p className="hero-subtitle max-w-2xl mx-auto">A modern workflow automation platform that helps you orchestrate processes, cut manual work, and move faster — now in a crisp black & white aesthetic.</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button className="btn-primary" onClick={() => scrollToId("demo")}>Request a demo</button>
              <button className="btn-secondary" onClick={() => nav("/pricing")}>View pricing</button>
            </div>
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm text-[#6b7280]">
              <div className="product-card p-3 text-center">41% less manual work</div>
              <div className="product-card p-3 text-center">100+ integrations</div>
              <div className="product-card p-3 text-center">SOC2 + SSO</div>
              <div className="product-card p-3 text-center">Deploy in days</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="illustration-frame aspect-[16/10]">
              <img src={ILLUSTRATIONS.hero} alt="Abstract black & white" className="illustration-img" />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section">
        <div className="container">
          <div className="mb-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a]">Everything you need to automate</h2>
            <p className="mt-2 text-[#6b7280]">Build workflows in minutes, connect your stack, and let AI suggest improvements.</p>
          </div>
          <div className="ai-grid">
            {FEATURES.map((f) => {
              const Icon = IconMap[f.icon] || Activity;
              return (
                <Card key={f.id} className="product-card">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white grid place-items-center border">
                      <Icon className="text-black" size={18} />
                    </div>
                    <CardTitle className="text-black">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-[#6b7280]">{f.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="illustration-frame aspect-[16/10] md:col-span-1">
              <img src={ILLUSTRATIONS.feature} alt="Geometric cubes" className="illustration-img" />
            </div>
            <Card className="product-card md:col-span-2">
              <CardHeader>
                <CardTitle className="text-black">Visual builder + monitoring</CardTitle>
                <CardDescription>Design flows, set SLAs, and view health in one place.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>Drag-and-drop steps, instant preview</li>
                  <li>Integrations with CRMs, ERPs, sheets, chat</li>
                  <li>AI suggestions for bottlenecks and errors</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use cases Tabs */}
      <section className="section section-muted">
        <div className="container">
          <h3 className="text-xl font-semibold mb-4">Use cases</h3>
          <Tabs defaultValue={USE_CASES[0].key} className="w-full">
            <TabsList className="flex overflow-x-auto">
              {USE_CASES.map((u) => (
                <TabsTrigger key={u.key} value={u.key}>{u.title}</TabsTrigger>
              ))}
            </TabsList>
            {USE_CASES.map((u) => (
              <TabsContent key={u.key} value={u.key} className="mt-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="product-card">
                    <CardHeader>
                      <CardTitle className="text-black">{u.title} playbook</CardTitle>
                      <CardDescription>Examples of automations teams ship in days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-4 space-y-2">
                        {u.bullets.map((b, idx) => (<li key={idx}>{b}</li>))}
                      </ul>
                    </CardContent>
                  </Card>
                  <div className="illustration-frame aspect-[16/10]">
                    <img src={ILLUSTRATIONS.accent} alt="Abstract lattice" className="illustration-img" />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h3 className="text-xl font-semibold">Trusted by operators</h3>
              <p className="text-[#6b7280]">What leaders say about FundWise</p>
            </div>
          </div>
          <Carousel className="w-full">
            <CarouselContent>
              {TESTIMONIALS.map((t, idx) => (
                <CarouselItem key={idx} className="md:basis-1/2 lg:basis-1/3">
                  <Card className="product-card h-full flex flex-col">
                    <CardContent className="pt-6">
                      <p className="text-[var(--text-body)] italic">“{t.quote}”</p>
                      <div className="mt-4">
                        <p className="font-medium text-black">{t.name}</p>
                        <p className="text-[#6b7280] text-sm">{t.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-muted">
        <div className="container">
          <h3 className="text-xl font-semibold mb-4">FAQs</h3>
          <Accordion type="single" collapsible>
            {FAQ.map((f, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`}>
                <AccordionTrigger>{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="cta-band">
            <div>
              <h3 className="text-2xl font-semibold">Ready to see FundWise?</h3>
              <p className="opacity-90">Request a personalized demo tailored to your workflows.</p>
            </div>
            <button className="btn-primary" onClick={() => scrollToId("demo")}>Request a demo</button>
          </div>
        </div>
      </section>

      {/* Demo form */}
      <section id="demo" className="section section-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-2xl font-semibold mb-2">Request a demo</h3>
              <p className="text-[#6b7280]">Tell us a bit about your team. We'll respond within 24 hours.</p>
            </div>
            <DemoForm />
          </div>
        </div>
      </section>
    </main>
  );
}

function DemoForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("fundwise_demo_form");
    if (saved) { try { setForm(JSON.parse(saved)); } catch {} }
  }, []);

  function onChange(e) { const { name, value } = e.target; setForm((prev) => ({ ...prev, [name]: value })); }

  async function onSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error("Please add your name and email"); return; }
    setSubmitting(true);
    try {
      const payload = { ...form, submittedAt: new Date().toISOString(), utm: Object.fromEntries(new URLSearchParams(window.location.search)) };
      // Try backend API; fallback to localStorage
      try {
        const res = await axios.post(`${API}/demo-requests`, payload);
        if (res.status === 200) {
          toast.success("Request received. We'll be in touch soon!");
        }
      } catch (_) {
        const existing = JSON.parse(localStorage.getItem("fundwise_demo_submissions") || "[]");
        existing.push(payload);
        localStorage.setItem("fundwise_demo_submissions", JSON.stringify(existing));
        toast.success("Saved locally (offline). We'll sync later.");
      }
      localStorage.setItem("fundwise_demo_form", JSON.stringify(form));
      setForm({ name: "", email: "", company: "", notes: "" });
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally { setSubmitting(false); }
  }

  return (
    <form onSubmit={onSubmit} className="product-card space-y-4">
      <div>
        <label className="block text-sm mb-1">Full name</label>
        <Input name="name" placeholder="Jane Doe" value={form.name} onChange={onChange} />
      </div>
      <div>
        <label className="block text-sm mb-1">Work email</label>
        <Input name="email" type="email" placeholder="jane@company.com" value={form.email} onChange={onChange} />
      </div>
      <div>
        <label className="block text-sm mb-1">Company</label>
        <Input name="company" placeholder="Acme Inc" value={form.company} onChange={onChange} />
      </div>
      <div>
        <label className="block text-sm mb-1">What would you like to automate?</label>
        <Textarea name="notes" placeholder="Share your top 1-2 workflows..." value={form.notes} onChange={onChange} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-[#9ca3af] text-xs">No spam. We'll only contact you about your demo.</p>
        <button className="btn-primary" disabled={submitting}>{submitting ? "Submitting..." : "Request demo"}</button>
      </div>
    </form>
  );
}

function PricingPage() {
  useSEO("FundWise — Pricing", "Choose a plan that fits your team's needs.");
  const [annual, setAnnual] = useState(true);
  return (
    <main className="section">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Simple pricing</h2>
            <p className="text-[#6b7280]">Transparent plans that scale with you</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6b7280]">Monthly</span>
            <Switch checked={annual} onCheckedChange={setAnnual} />
            <span className="text-sm text-[#6b7280]">Annual</span>
            <Badge className="ml-2 bg-black text-white">Save 20%</Badge>
          </div>
        </div>
        <div className="ai-grid">
          {PRICING.map((p) => (
            <Card key={p.plan} className={`product-card ${p.popular ? "ring-2 ring-black" : ""}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-black">{p.plan}</CardTitle>
                  {p.popular && <Badge className="bg-black text-white">Most popular</Badge>}
                </div>
                <CardDescription>
                  {p.contact ? (
                    <span className="text-[#6b7280]">Custom pricing</span>
                  ) : (
                    <span className="text-black text-2xl font-semibold">${annual ? p.priceYearly : p.priceMonthly}<span className="text-sm text-[#6b7280]">/mo</span></span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-black"></span>{f}</li>
                  ))}
                </ul>
                {p.contact ? (
                  <Link to="/contact" className="btn-secondary w-full justify-center">Contact sales</Link>
                ) : (
                  <button className="btn-primary w-full">Start free trial</button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

function BlogPage() {
  useSEO("FundWise — Insights", "Thoughts on automation and productivity.");
  return (
    <main className="section">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Insights</h2>
        <div className="ai-grid">
          {BLOG_POSTS.map((post) => (
            <Card key={post.slug} className="product-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-black">{post.title}</CardTitle>
                  <Badge variant="outline">{post.tag}</Badge>
                </div>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{post.excerpt}</p>
                <button className="btn-secondary">Read more</button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}

function DashboardPage() {
  useSEO("FundWise — Dashboard", "Create, monitor and optimize workflows.");
  const [steps, setSteps] = useState([
    { id: 1, name: "Trigger: Form submission", enabled: true, health: 92 },
    { id: 2, name: "Enrich: CRM lookup", enabled: true, health: 88 },
    { id: 3, name: "Validate: Policy check", enabled: false, health: 0 },
    { id: 4, name: "Notify: Slack + Email", enabled: true, health: 95 },
  ]);

  function toggle(id) { setSteps((prev) => prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))); }

  return (
    <main className="section">
      <div className="container">
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">Workflow builder</h2>
          <p className="text-[#6b7280]">Create steps, toggle checks and monitor health.</p>
        </div>
        <div className="grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2 space-y-3">
            {steps.map((s) => (
              <Card key={s.id} className="product-card">
                <CardContent className="pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-black">{s.name}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Switch checked={s.enabled} onCheckedChange={() => toggle(s.id)} />
                        <span className="text-sm text-[#6b7280]">{s.enabled ? "Enabled" : "Disabled"}</span>
                      </div>
                    </div>
                    <div className="w-24">
                      <Progress value={s.health} />
                      <p className="text-xs text-[#9ca3af] mt-1">Health</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <button className="btn-secondary w-full">+ Add step</button>
          </div>
          <div className="md:col-span-3">
            <Card className="product-card h-full">
              <CardHeader>
                <CardTitle>Flow preview</CardTitle>
                <CardDescription>Dotted connections indicate enabled paths.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-6">
                  {steps.map((s, i) => (
                    <div key={s.id} className={`p-4 rounded-xl border ${s.enabled ? "bg-white" : "bg-[#fafafa]"}`}>
                      <p className="font-medium">Step {i + 1}</p>
                      <p className="text-[#6b7280] text-sm">{s.name}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-[#9ca3af] text-sm">Drag-and-drop builder and metrics coming soon.</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}

function ContactPage() {
  useSEO("FundWise — Contact", "Get in touch with our team.");
  return (
    <main className="section">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Contact us</h2>
            <p className="text-[#6b7280] mb-6">We typically reply within one business day.</p>
            <ul className="space-y-2">
              <li>Email: hello@fundwise.ai</li>
              <li>Support: support@fundwise.ai</li>
            </ul>
          </div>
          <DemoForm />
        </div>
      </div>
    </main>
  );
}

function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: "bot", content: "Hi! I'm the FundWise assistant (mock). Ask about pricing or demos." }]);
  const [input, setInput] = useState("");

  function onSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input.trim() };
    const lower = input.toLowerCase();
    let reply = "Thanks! A teammate will reach out shortly.";
    if (lower.includes("price") || lower.includes("pricing")) reply = "Growth is $149/mo (or $119/mo billed annually). Enterprise is custom.";
    if (lower.includes("demo")) reply = "Happy to help – use the Request a demo form and we'll schedule a session.";
    const botMsg = { role: "bot", content: reply };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput("");
  }

  return (
    <div>
      {open && (
        <div className="fixed bottom-24 left-6 md:left-auto md:right-8 w-[320px] p-3 rounded-xl shadow-lg z-[200] bg-white border">
          <div className="flex items-center justify-between mb-2">
            <p className="font-medium text-black">FundWise assistant</p>
            <button className="btn-secondary px-3 py-1" onClick={() => setOpen(false)}>Close</button>
          </div>
          <div className="h-56 overflow-y-auto space-y-2 pr-1">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm ${m.role === "bot" ? "text-[#6b7280]" : "text-black"}`}>
                <span className="font-medium mr-1">{m.role === "bot" ? "Bot:" : "You:"}</span>
                {m.content}
              </div>
            ))}
          </div>
          <form onSubmit={onSend} className="mt-2 flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message..." name="chatInput" data-testid="chat-input" />
            <button className="btn-primary" aria-label="Send message">Send</button>
          </form>
        </div>
      )}
      <button className="fixed bottom-6 left-6 md:left-auto md:right-8 btn-primary z-[200]" onClick={() => setOpen((o) => !o)} data-testid="chat-toggle">
        {open ? "Hide chat" : "Chat"}
      </button>
    </div>
  );
}

function AppShell() {
  usePingBackend();
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
      <Footer />
      <ChatWidget />
      <Toaster richColors position="top-center" />
    </div>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-[var(--bw-page)] text-[var(--bw-ink)]">
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </div>
  );
}

export default App;