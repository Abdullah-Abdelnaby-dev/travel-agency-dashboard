import { Link, NavLink } from "react-router";
import { sidebarItems } from "~/constants";
import { cn } from "~/lib/utils";
const NavItems = ({handelClick}:{handelClick?:()=>void}) => {
  const user={
    name: "Abdullah Abdelnaby ",
    email: "abdullahmohamed89@gmail.com",
    imgUrl:'/public/assets/images/david.webp'
  }
  return (

    <section className="nav-items flex flex-col gap-4 p-4">
      <Link to="dashboard" className="link-logo">
        <img
          src="/public/assets/icons/logo.svg"
          alt="logo"
          className="size-6"
        />
        <h1 className="font-bold text-xl">Tourvisto</h1>
      </Link>

      <div className="container">
        <nav>
          {sidebarItems.map(({ href, icon, id, label }) => {
            return (
              <NavLink
                to={href}
                key={id}
                className="flex items-center w-full gap-2 p-2 rounded-md hover:bg-gray-200"
              >
                {({ isActive }: { isActive: boolean }) => (
                  <div
                    className={cn("group nav-item w-full", {
                      "bg-primary-100 w-full !text-white": isActive,
                    })} onClick={handelClick}
                  >
                    <img
                      src={icon}
                      alt={label}
                      className={`group-hover:brightness-0  ${
                        isActive ? "brightness-0 invert" : "text-dark-200"
                      }`}
                    />
                    {label}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <footer className="nav-footer flex items-center gap-2 p-2">
        <img src={user?.imgUrl || "/public/assets/images/david.webp"} alt="" />
        <article>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
        </article>

        <button onClick={()=>{
          console.log("log out");
        }} className="cursor-pointer">
          <img src="/public/assets/icons/logout.svg" alt="logout" className="size-7" />
        </button>
      </footer>
    </section>
  );
};

export default NavItems;
