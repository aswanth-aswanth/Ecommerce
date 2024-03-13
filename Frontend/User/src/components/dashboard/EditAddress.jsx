import { useEffect, useRef, useState } from "react";

import { BASE_URL } from "../../../config";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosConfig";

function AddAddress({ setIsEdit, addressDetails }) {
  const fullName = useRef();
  const address = useRef();
  const street = useRef();
  const state = useRef();
  const pincode = useRef();
  // const email = useRef();
  const phone1 = useRef();
  const phone2 = useRef();

  useEffect(() => {
    fullName.current.value = addressDetails.fullName;
    address.current.value = addressDetails.address;
    street.current.value = addressDetails.street;
    state.current.value = addressDetails.state;
    pincode.current.value = addressDetails.pincode;
    phone1.current.value = addressDetails.phone1;
    phone2.current.value = addressDetails.phone2;
    window.scrollTo(0, 0);
  }, []);

  console.log("addressDetails : ", addressDetails);

  console.count("render : ");
  const handleSubmit = () => {
    const validateInputs = () => {
      const fullNameValue = fullName.current.value.trim();
      const addressValue = address.current.value.trim();
      const stateValue = state.current.value.trim();
      const pincodeValue = pincode.current.value.trim();
      const phone1Value = phone1.current.value.trim();

      if (!fullNameValue || !addressValue || !stateValue || !pincodeValue || !phone1Value) {
        alert("Validation Error: All fields are required!");
        return false;
      }

      const pincodeRegex = /^\d{6}$/;
      const phoneRegex = /^\d{10}$/;

      if (!pincodeRegex.test(pincodeValue)) {
        alert("Validation Error: Invalid Pincode! Pincode must be 6 digits.");
        return false;
      }

      if (!phoneRegex.test(phone1Value)) {
        alert("Validation Error: Invalid Phone Number! Phone number must be 10 digits.");
        return false;
      }

      return true;
    };

    if (!validateInputs()) {
      return;
    }

    axiosInstance
      .put(`/user/address`, {
        fullName: fullName.current.value,
        address: address.current.value,
        state: state.current.value,
        street: street.current.value,
        phone1: phone1.current.value,
        pincode: pincode.current.value,
        phone2: phone2.current.value,
        addressId: addressDetails._id,
      })
      .then((res) => {
        alert("Success: " + res.data.message);
        setIsEdit((prev) => !prev);
      })
      .catch((err) => {
        console.log("err : ", err);
        alert("Oops... Something went wrong!");
      });
  };

  const handleDelete = async () => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this address!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete!",
    });

    if (confirmed.isConfirmed) {
      axiosInstance
        .delete(`${BASE_URL}/user/address/${addressDetails._id}`)
        .then(async (res) => {
          Swal.fire({
            icon: "success",
            title: "Deleted successfully",
          });
          setIsEdit((prev) => !prev);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        });
    }
  };

  return (
    <>
      <div className="flex flex-wrap   justify-start lg:flex-nowrap gap-4 lg:gap-0">
        <form className="w-full max-w-md bg-white border p-4 shadow-md ml-4">
          <h3 className="border-b pb-2 mb-2">Shipping address</h3>
          <p onClick={handleDelete} className="mr-4 text-red-400 cursor-pointer text-right float-right hover:text-red-600">
            Delete address
          </p>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Full Name
              </label>
              <input ref={fullName} className="appearance-none block w-full bg-gray-50 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" required type="text" placeholder="Jane" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Address
              </label>
              <input ref={address} className="appearance-none block w-full bg-gray-50 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" required placeholder="Jane" />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-2 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                Street
              </label>
              <input ref={street} className="appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" required placeholder="Albuquerque" />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                State
              </label>
              <div className="relative">
                <select ref={state} className="block appearance-none w-full bg-gray-50 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                  <option>Kerala</option>
                  <option>Tamilnadu</option>
                  <option>Karnataka</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                Pin Code
              </label>
              <input ref={pincode} className="appearance-none block w-full bg-gray-50 text-gray-700 border  rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="number" required placeholder="90210" />
            </div>

            <div className="w-full md:w-2/4 mt-2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Phone1
              </label>
              <input ref={phone1} className="appearance-none block w-full bg-gray-50 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Jane" required />
            </div>
            <div className="w-full md:w-2/4 mt-2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Phone2
              </label>
              <input ref={phone2} className="appearance-none block w-full bg-gray-50 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="number" placeholder="Jane" />
            </div>
            <div className="flex  justify-between w-full items-center">
              <button onClick={handleSubmit} className="bg-[#FA8232] text-white px-4 py-2 rounded-sm ml-3 mt-2">
                Submit Address
              </button>

              <p onClick={() => setIsEdit((prev) => !prev)} className="mr-4 text-red-400 cursor-pointer hover:text-red-600">
                Discard
              </p>
            </div>
          </div>
        </form>
      </div>
      {/* <button className="bg-[#FA8232] text-white px-4 py-2 rounded-sm mx-auto flex mt-10 h-max">Add Address</button> */}
    </>
  );
}

export default AddAddress;
