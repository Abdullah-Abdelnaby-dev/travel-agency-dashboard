//@ts-nocheck
import { GiHamburgerMenu } from "react-icons/gi";

import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import NavItems from "./NavItems";

const MobileSidebar = () => {
  let sidebar: SidebarComponent;

  const toggleSidebar = () => {
    sidebar.toggle();
  };

  return (
    <div className="mobile-sidebar wrapper"> 
      <header>
        <Link to="dashboard">
          <img
            src="/public/assets/icons/logo.svg"
            alt="logo"
            className="size-6"
          />
          <h1 className="font-bold text-xl">Tourvisto</h1>
        </Link>
        <button onClick={toggleSidebar}>
        <GiHamburgerMenu size={20} />
        </button>
      </header>
      <SidebarComponent
        width={270}
        ref={(Sidebar: any) => (sidebar = Sidebar)}
        created={() => sidebar.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="over"
      >
        <NavItems handelClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSidebar;
