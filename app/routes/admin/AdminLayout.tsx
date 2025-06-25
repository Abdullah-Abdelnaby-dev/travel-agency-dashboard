import { Outlet } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import NavItems from "~/components/NavItems";
import MobileSidebar from "~/components/MobileSidebar";

import { useLargeScreen } from "~/hooks/useLargeScreen";

const AdminLayout = () => {

 const isLargeScreen = useLargeScreen()
 if (isLargeScreen === null) {
  return <div className="p-4 flex justify-center items-center mt-[25%] text-3xl font-bold  ">Loading interface...</div>;
}

if (isLargeScreen === null) return null;
  return (
    <div className="admin-layout">
      <MobileSidebar/>

      {isLargeScreen && (
        <aside className=" w-full max-w-[270px] hidden lg:block" >
        <SidebarComponent width={270} enableGestures={true}>
          <NavItems />
        </SidebarComponent>
      </aside >
      )}

      <aside className="w-full lg:w-[calc(100%-270px)]">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
