import { useState } from "react";
import photo from "../../assets/images/Laptop.png";
import Steps from "../order/Steps";
import Timeline from "../order/Timeline";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../config";
import axios from "axios";

function OrderDetails() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState({});
  const [dataRetrieved, setDataRetrieved] = useState(false);
  const [joinedArray, setJoinedArray] = useState([]);

  // const tableItems = [
  //   {
  //     avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  //     name: "Liam James",
  //     email: "liamjames@example.com",
  //     phone_nimber: "+1 (555) 000-000",
  //     position: "Software engineer",
  //     salary: "$100K",
  //   },
  //   {
  //     avatar: "https://randomuser.me/api/portraits/men/86.jpg",
  //     name: "Olivia Emma",
  //     email: "oliviaemma@example.com",
  //     phone_nimber: "+1 (555) 000-000",
  //     position: "Product designer",
  //     salary: "$90K",
  //   },
  //   {
  //     avatar: "https://randomuser.me/api/portraits/women/79.jpg",
  //     name: "William Benjamin",
  //     email: "william.benjamin@example.com",
  //     phone_nimber: "+1 (555) 000-000",
  //     position: "Front-end developer",
  //     salary: "$80K",
  //   },
  //   {
  //     avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
  //     name: "Henry Theodore",
  //     email: "henrytheodore@example.com",
  //     phone_nimber: "+1 (555) 000-000",
  //     position: "Laravel engineer",
  //     salary: "$120K",
  //   },
  //   {
  //     avatar: "https://images.unsplash.com/photo-1439911767590-c724b615299d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
  //     name: "Amelia Elijah",
  //     email: "amelia.elijah@example.com",
  //     phone_nimber: "+1 (555) 000-000",
  //     position: "Open source manager",
  //     salary: "$75K",
  //   },
  // ];

  const { orderId } = useParams();
  // console.log("Params : ", orderId);
  //order fetching
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${BASE_URL}/user/orders/${orderId}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      console.log("result1 : ", result.data.order);
      setOrder(result.data.order);
    };
    fetchData();
  }, []);
  //product fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!order?.orderedItems) {
          return;
        }

        const variantIds = order.orderedItems.map((item) => item.product);

        const result = await axios.get(`${BASE_URL}/user/products/variants`, {
          params: {
            variantIds: variantIds.join(","),
          },
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        });

        console.log("result2 : ", result.data.variants);
        setItems(result.data.variants);
        setDataRetrieved(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [order]);

  useEffect(() => {
    if (dataRetrieved) {
      setJoinedArray(() =>
        order.orderedItems.map((obj1) => {
          const matchingObj2 = items.find((obj2) => obj1.product === obj2._id);

          if (matchingObj2) {
            return {
              ...obj1,
              ...matchingObj2,
            };
          } else {
            return obj1;
          }
        })
      );
    }
  }, [dataRetrieved]);

  console.log("joinedArray : ", joinedArray);

  const handleStatus = async (orderId, orderStatus) => {
    try {
      if (confirm("Are you sure ?")) {
        const result = await axios.patch(
          `${BASE_URL}/user/order/status`,
          {
            orderId,
            orderStatus,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
        console.log("status result : ", result);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3 className="text-center mb-10 font-bold text-gray-600">Order Timeline</h3>
      <Steps />
      {console.log("order status : ", order.orderStatus)}
      {order.orderStatus !== "Cancelled" &&
        (order.orderStatus === "Delivered" ? (
          <div onClick={() => handleStatus(order._id, "Returned")} className="text-sm text-center text-[#FA8232] font-bold mb-16 cursor-pointer">
            RETURN PRODUCT
          </div>
        ) : (
          <div onClick={() => handleStatus(order._id, "Cancelled")} className="text-sm text-center text-[#FA8232] font-bold mb-16 cursor-pointer">
            CANCEL PRODUCT
          </div>
        ))}
      {/* <Timeline /> */}
      <h3 className="text-center my-10 font-bold text-gray-600">Product</h3>
      <table className="w-full mt-10 table-auto border text-sm text-left shadow-lg">
        <thead className="bg-[#F2F4F5] text-gray-600 font-medium border-b">
          <tr className="uppercase">
            <th className="py-3 px-6">Products</th>
            <th className="py-3 px-6">Price</th>
            <th className="py-3 px-6">Quantity</th>
            <th className="py-3 px-6">Sub total</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 divide-y">
          {dataRetrieved &&
            joinedArray.map((item, idx) => (
              <tr key={item?._id}>
                <td className="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                  {/* <p>{item._id}</p> */}
                  <img src={`${BASE_URL}/uploads/${item.images[0]}`} className="w-10 h-10 " />
                  <div>
                    <span className="block text-gray-700 text-sm font-medium">{item.variantName}</span>
                    <span className="block text-gray-700 text-xs">{item.email}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>

                <td className="px-6 py-4 whitespace-nowrap">{item.price * item.quantity}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {/* address */}
      <div className="border max-w-xs h-max flex text-sm flex-col gap-4 p-10 my-8 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800">Shipping address</h3>
        <p>FullName : {order.shippingAddress?.fullName}</p>
        <p>Address : {order.shippingAddress?.address}</p>
        <p>Phone1 : {order.shippingAddress?.phone1}</p>
        <p>Phone2 : {order.shippingAddress?.phone2}</p>
      </div>
    </>
  );
}

export default OrderDetails;
