import {
  useNavigate,
} from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      <h1 className="text-4xl p-5">Item List Assigment</h1>
      <div className="flex gap-5">
        <button className="border pl-7 pr-7 p-3 rounded-full bg-black text-white cursor-pointer hover:bg-[#292929]"
        onClick={() => navigate("/getitems")}
        >
          View Items
        </button>
        <button className="border border-gray-400 pl-7 pr-7 p-3 rounded-full cursor-pointer"
          onClick={() => navigate("/additem")}
        >
          Add Item
        </button>
       
      </div>
      
    </div>
  );
};

export default Home;
