import { useEffect, useState } from "react";
import product from "../../assets/images/Laptop.png";
import axios from "axios";
import { BASE_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { IoIosHeartEmpty } from "react-icons/io";
import Skeleton from "react-loading-skeleton"; // Import the Skeleton component

function BestDeals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // State to track if data is being fetched
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/products`);
        setProducts(res.data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    };

    fetchData();
  }, []);

  const handleClick = (item) => {
    navigate(`/product/${item._id}`);
  };

  return (
    <div className="mx-auto text-xs md:text-base break-all">
      <div className="flex my-4 justify-between mx-20 md:mx-0">
        <h4 className="font-bold">Best Deals</h4>
        <p className="text-[#2DA5F3] font-medium cursor-pointer">Browse All product</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3 ">
        {loading // Render skeleton UI while data is being fetched
          ? Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="w-48 h-64 rounded-lg bg-slate-50 p-2 shadow-lg border">
                <Skeleton height={176} />
              </div>
            ))
          : // Render actual product list when data is available
            products.map((item) => (
              <div key={item.productVariantId} onClick={() => handleClick(item)} className="flex w-48 h-64 rounded-lg relative cursor-pointer flex-col p-2 shadow-lg border">
                {console.log("item Best : ", item)}
                <div className="w-52 h-44 overflow-hidden">
                  <img className="w-44 h-44 object-contain rounded-sm" src={`${BASE_URL}/uploads/${item.image}` || product} alt="" />
                </div>
                <div className="absolute bottom-2">
                  <p className="text-base font-semibold text-gray-500 w-[140px] overflow-hidden whitespace-nowrap overflow-ellipsis max-w-full">{item.description}</p>
                  <p className="text-xs text-[#2DA5F3]">₹ {item.salePrice}</p>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default BestDeals;
