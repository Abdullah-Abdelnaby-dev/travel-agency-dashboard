import { Outlet, useNavigate } from "react-router";

const PageLayOut = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/sign-in");
  };
  return (
    <main className="flex  flex-col justify-center items-center ">
      <h1 className="font-bold text-4xl mt-5">Travisto DashBoard</h1>
      <Outlet />
    </main>
  );
};

export default PageLayOut;
