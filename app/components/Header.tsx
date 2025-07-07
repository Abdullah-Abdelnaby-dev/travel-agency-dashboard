import { ButtonComponent } from "@syncfusion/ej2-react-buttons";
import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

interface HeaderProps {
  title?: string;
  description?: string;
  size?: "small" | "large";
  ctaText?: string;
  ctaUrl?: string;
}
const Header = ({ title, description, size, ctaText, ctaUrl }: HeaderProps) => {
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
      {ctaText && ctaUrl && (
        <Link to={ctaUrl}>
          <ButtonComponent
            type="button"
            className="button-class !h-11 !w-full !md:w-[240px] !text-white"
          >
            <img src="/assets/icons/plus.svg" alt="plus" className="size-5 " />
            <span> {ctaText} </span>
          </ButtonComponent>
        </Link>
      )}
    </header>
  );
};

export default Header;
