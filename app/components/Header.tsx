import { useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface HeaderProps {
  title?: string;
  description?: string;
  size?: "small" | "large";
}
const Header = ({ title, description ,size}: HeaderProps) => {
  const location = useLocation();
  return (
    <header className="header mt-4">
      <article>
        <h1
          className={cn(
            "text-dark-100",
            size === "large"
              ? "text-2xl md:text-4xl font-bold "
              : "text-xl md:text-2xl font-semibold"
          )}
        >
          {title}
        </h1>
        <p
          className={cn(
            "text-gray-100",
            location.pathname === "/"
              ? "text-sm md:text-xl font-bold "
              : "text-sm md:text-xl font-semibold"
          )}
        >
          {description}
        </p>
        
      </article>
    </header>
  );
};

export default Header;
