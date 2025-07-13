import { useNavigate } from "react-router";


const travelPage = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {
    
    navigate("/sign-in");
  };
  return (
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
          console.log(1)
        }}
      >
        To Dash Board
      </button>
    </div>
  )
}

export default travelPage
