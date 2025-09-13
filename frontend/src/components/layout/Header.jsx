import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Separator } from "../../components/ui/separator";

export const Header = () => {
  return (
    <header className="nav-header">
      <div className="flex items-center gap-3 pl-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white border grid place-items-center">
            <span className="text-black font-bold">F</span>
          </div>
          <span className="font-semibold text-black">FundWise</span>
        </Link>
        <Separator orientation="vertical" className="hidden md:block h-6 mx-2" />
        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: "/features", label: "Features" },
            { to: "/pricing", label: "Pricing" },
            { to: "/blog", label: "Insights" },
            { to: "/dashboard", label: "Dashboard" },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive ? "bg-black/5 text-black" : ""}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-2 pr-2">
        <Link to="/pricing" className="hidden sm:inline-flex btn-secondary">View pricing</Link>
        <Link to="/contact" className="btn-primary">Request a demo</Link>
      </div>
    </header>
  );
};