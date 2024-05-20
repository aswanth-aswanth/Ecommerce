import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { confirmAction } from "../../utils/sweetAlert";
import axiosInstance from "../../utils/axiosConfig";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Wishlist() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDashboardCartPath = location.pathname === "/dashboard/wishlists";

  const [wishList, setWishList] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axiosInstance.get(`/user/wishlist`);
        console.log("wishlist : ", result.data.wishlistItems);
        setWishList(result.data.wishlistItems);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isUpdated]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRemoveFromWishlist = async (productVariant) => {
    try {
      const confirmed = await confirmAction(
        "warning",
        "Are you sure?",
        "Do you want to remove from wishlist!",
        "yes,sure"
      );
      if (confirmed) {
        await axiosInstance.put(`/user/wishlist`, { productVariant });
        setIsUpdated((prev) => !prev);
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  const handleClickImage = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = async (id) => {
    try {
      const response = await axiosInstance.post(`/user/cart`, {
        productVariantId: id,
        quantity: 1,
      });
      setIsUpdated((prev) => !prev);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div className={`${isDashboardCartPath ? "my-0" : "my-10"}`}>
      <section
        className={`flex flex-col justify-center antialiased text-gray-600 p-4 ${
          isDashboardCartPath ? "p-0" : "p-4"
        }`}
      >
        <div className="h-full">
          <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-800">Wishlist</h2>
            </header>
            <div className="p-3">
              <div className="overflow-x-auto">
                <table className="table-auto w-full">
                  <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                    <tr>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Products</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">Price</div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-left">
                          Stock status
                        </div>
                      </th>
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Actions</div>
                      </th>
                    </tr>
                  </thead>

                  <tbody className="text-sm divide-y divide-gray-100">
                    {loading ? (
                      Array.from({ length: 3 }).map((_, idx) => (
                        <tr key={idx}>
                          <td className="flex items-center min-w-max py-8 ps-2 sm:px-6 whitespace-nowrap">
                            <Skeleton width={40} height={40} />
                            <div className="ml-3">
                              <Skeleton width={100} />
                            </div>
                          </td>
                          <td className="p-2 min-w-max whitespace-nowrap">
                            <Skeleton width={50} />
                          </td>
                          <td className="p-2 min-w-max whitespace-nowrap">
                            <Skeleton width={70} />
                          </td>
                          <td className="p-2 min-w-max whitespace-nowrap">
                            <div className="flex justify-center gap-4">
                              <Skeleton width={100} height={30} />
                              <Skeleton width={70} height={30} />
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : wishList.length === 0 ? (
                      <tr>
                        <td className="text-center text-xl py-24" colSpan={4}>
                          No items in wishlist
                        </td>
                      </tr>
                    ) : (
                      wishList.map((item, idx) => (
                        <tr key={item?.productVariant?._id}>
                          <td className="flex items-center min-w-max py-8 ps-2 sm:px-6 whitespace-nowrap">
                            <img
                              onClick={() =>
                                handleClickImage(item.productVariant.productId)
                              }
                              src={`${item?.productVariant?.publicIds[0]}`}
                              className="w-10 h-10 cursor-pointer object-contain mr-3"
                              alt=""
                            />
                            <div>
                              <span className="block text-gray-700 text-sm font-medium">
                                {item?.productVariant?.variantName}
                              </span>
                            </div>
                          </td>
                          <td className="p-2 min-w-max whitespace-nowrap">
                            <div className="text-left font-medium ">
                              {item?.productVariant?.salePrice}
                            </div>
                          </td>
                          <td className="p-2 min-w-max whitespace-nowrap">
                            <div
                              className={`text-xs ${
                                item?.productVariant?.stock == 0
                                  ? "text-red-500"
                                  : "text-green-500"
                              } `}
                            >
                              {item?.productVariant?.stock == 0
                                ? "Out of stock"
                                : "In stock"}
                            </div>
                          </td>
                          <td>
                            <div>
                              {item.isInCart !== true && (
                                <div
                                  onClick={() =>
                                    handleAddToCart(item?.productVariant?._id)
                                  }
                                  className="flex items-center gap-4 text-sm mx-auto justify-center p-2 text-green-400 hover:text-green-700 cursor-pointer border-2 border-green-200 hover:border-green-700 max-w-44 min-w-32 rounded-md"
                                >
                                  <FaCartPlus />
                                  <p>Add to cart</p>
                                </div>
                              )}
                              <p
                                onClick={() =>
                                  handleRemoveFromWishlist(
                                    item?.productVariant?._id
                                  )
                                }
                                className="p-2 whitespace-nowrap text-red-500 cursor-pointer text-sm text-center"
                              >
                                Remove
                              </p>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Wishlist;
