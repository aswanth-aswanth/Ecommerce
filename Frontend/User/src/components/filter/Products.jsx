import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosConfig";
import { useNavigate, useLocation } from "react-router-dom";

function Products({ query }) {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  let location = useLocation();
  // console.log("query : ", query);
  // console.log("location : ", location.state.key);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get(
          `/user/products/filter?${query}`
        );
        setproducts(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (query) {
      fetchData();
    }
  }, [query]);

  // console.log("Products : ", products);

  const handleClick = (item) => {
    navigate(`/product/${item._id}`);
  };

  return (
    <div className="mx-auto text-xs mt-8 md:text-base break-all">
      <div className="flex flex-wrap justify-center gap-2">
        {products.map((item) => {
          return (
            <div
              key={item?._id}
              onClick={() => handleClick(item)}
              className="flex w-44 h-64 my-2 relative cursor-pointer flex-col p-2 border"
            >
              <div className="w-44 h-44  overflow-hidden">
                <img
                  className="w-40 rounded-sm h-full object-contain"
                  src={`${item?.variants[0]?.publicIds[0]}` || ""}
                  alt=""
                />
              </div>
              <div className="absolute bottom-2">
                <p className="text-sm w-44 overflow-hidden whitespace-nowrap overflow-ellipsis max-w-full">
                  {item?.description}
                </p>
                <p>₹ {item?.variants[0]?.salePrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Products;
