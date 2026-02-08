import { Film, Ticket, History } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <Film className="h-7 w-7 text-primary" />
          <span className="font-display text-2xl tracking-wider text-foreground">
            CINE<span className="text-primary">BOOK</span>
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            to="/"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Ticket className="h-4 w-4" />
            Movies
          </Link>
          <Link
            to="/history"
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              location.pathname === "/history"
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <History className="h-4 w-4" />
            My Bookings
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
