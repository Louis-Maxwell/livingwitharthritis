import { Home, MessageCircle, BookOpen } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", icon: Home, href: "/" },
  { label: "Chat", icon: MessageCircle, href: "/chat" },
  { label: "Blog", icon: BookOpen, href: "/blog" },
];

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-[80] bg-background/95 backdrop-blur-xl border-t border-border/30 lg:hidden safe-area-bottom"
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-around h-[68px] max-w-md mx-auto px-1">
        {navItems.map(({ label, icon: Icon, href }) => {
          const isActive = pathname === href;
          return (
            <button
              key={href}
              onClick={() => navigate(href)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[48px] px-3 py-2 rounded-xl transition-colors active:scale-95 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.5]" : ""}`} />
              <span className="text-[10px] font-semibold leading-none">{label}</span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileBottomNav;
