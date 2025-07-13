import { useNavigate } from "react-router";
import { logoutUser } from "~/appwrite/auth";

const PageLayOut = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    
    navigate("/sign-in");
  };
  return (
    <main className="flex  flex-col justify-center items-center ">
      <h1 className="font-bold text-4xl mt-5">Travisto DashBoard</h1>
    <div className="mt-10 flex  gap-5">
      <button
        className="bg-primary-500 p-5 text-white rounded-3xl font-semibold cursor-pointer"
        onClick={handleLogout}
       
      > 
        Sign In
      </button>

      <button
        className="bg-primary-500 p-5 text-white rounded-3xl font-semibold cursor-pointer"
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        To Dash Board
      </button>
    </div>
    </main>
  );
};

export default PageLayOut;
