import React from "react";
import { Link } from "react-router-dom";
import { Separator } from "../../components/ui/separator";

export const Footer = () => {
  return (
    <footer className="mt-20 border-t border-[var(--border-light)]">
      <div className="container py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-[var(--accent-wash)] border border-[var(--border-light)] grid place-items-center">
              <span className="text-[var(--accent-text)] font-bold">F</span>
            </div>
            <span className="font-semibold text-[var(--text-primary)]">FundWise</span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm max-w-md">
            Automate workflows, reduce manual work, and scale efficiently with FundWise.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-[var(--text-primary)]">Product</h4>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li><Link to="/features" className="hover:text-[var(--text-primary)]">Features</Link></li>
            <li><Link to="/pricing" className="hover:text-[var(--text-primary)]">Pricing</Link></li>
            <li><Link to="/dashboard" className="hover:text-[var(--text-primary)]">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3 text-[var(--text-primary)]">Company</h4>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li><Link to="/blog" className="hover:text-[var(--text-primary)]">Insights</Link></li>
            <li><Link to="/contact" className="hover:text-[var(--text-primary)]">Contact</Link></li>
            <li><a href="https://emergent.sh" target="_blank" rel="noreferrer" className="hover:text-[var(--text-primary)]">Careers</a></li>
          </ul>
        </div>
      </div>
      <Separator />
      <div className="container py-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[var(--text-muted)] text-sm">© {new Date().getFullYear()} FundWise. All rights reserved.</p>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/privacy" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Privacy</Link>
          <Link to="/terms" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">Terms</Link>
        </div>
      </div>
    </footer>
  );
};