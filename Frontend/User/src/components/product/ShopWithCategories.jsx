import { useState, useEffect } from "react";
import image from "../../assets/images/Image.png";
import axios from "axios";
import { BASE_URL } from "../../../config";

function ShopWithCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const result = await axios.get(`${BASE_URL}/user/categories`);
      // console.log("result : ", result.data.categories);
      setCategories(result.data.categories);
    };
    fetchDetails();
  }, []);

  return (
    <>
      <div className=" mx-auto ">
        <h1 className=" my-20 text-xl text-[#191C1F] font-bold">Shop with categories</h1>
        <div className="md:max-w-[1020px] whitespace-nowrap overflow-x-scroll no-scrollbar">
          {categories.map((item) => {
            return (
              <div key={item._id} className="inline-block relative cursor-pointer w-[150px] mx-4 border p-4  h-[150px]">
                <img src={`${BASE_URL}/uploads/${item.image}`} alt="" className="object-cover" />
                <h4 className="absolute bottom-2 left-0 right-0 mx-auto text-center text-xs">{item.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ShopWithCategories;
