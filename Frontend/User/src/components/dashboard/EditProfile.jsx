import React, { useEffect, useRef, useState } from "react";
import { FaUserPlus } from "react-icons/fa6";
// import User from "../../assets/icons/User.svg";
import { FaCircleUser } from "react-icons/fa6";
import user from "../../assets/icons/user.png";
import Swal from "sweetalert2";
import { showAlert, showToast } from "../../utils/sweetAlert";
import { BASE_URL } from "../../../config";
import { Link } from "react-router-dom";
import axiosInstance from "../../utils/axiosConfig";

function EditProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [user, setUser] = useState({});
  const username = useRef();
  const email = useRef();
  const age = useRef();
  const genderSelect = useRef();
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    axiosInstance
      .get(`/user`)
      .then((res) => {
        // console.log("res : ", );
        const user = res.data.user;
        setUser(res.data.user);
        username.current.value = user.username || "Not set";
        email.current.value = user.email || "Not set";
        age.current.value = user.age || 0;
        genderSelect.current.value = user.gender || "Not set";
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfileImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = () => {
    // Get form data
    const ageValue = age.current.value;
    const genderValue = genderSelect.current.value;
    const usernameValue = username.current.value;

    // Validation checks
    if (usernameValue.trim() === "" || usernameValue.length > 15) {
      // Handle invalid username
      showAlert("error", "Username must not be empty or exceed 15 characters!", "Oops...");
      return;
    }

    const numericAge = Number(ageValue);
    // console.log("age1 : ", numericAge);
    if (isNaN(numericAge) || numericAge <= 0 || numericAge > 100) {
      // console.log("age2 : ", numericAge);
      showAlert("error", "Invalid age! Age must be a number between 0 and 100.", "Oops...");
      return;
    }

    // If validation passes, proceed with the API call
    const formData = new FormData();
    formData.append("userid", userId);
    formData.append("age", ageValue);
    formData.append("gender", genderValue);
    formData.append("username", usernameValue);
    console.log("gender : ", genderValue);
    formData.append("image", profileImage);
    console.log("image : ", profileImage);

    axiosInstance
      .put(`/user/profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        showToast("success", "Profile edited successfully");
        console.log("res : ", res);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error updating user data", err);
        showAlert("error", "Something went wrong!", "Oops...");
      });

    console.log("Submitted User Data:", user);
  };

  console.log(user);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

      <div className="flex items-center space-x-4">
        <div className="w-1/4">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
            <div className="mt-1 flex items-center justify-center">
              {previewImage ? (
                <>
                  <img src={previewImage} alt="Profile" className="w-24 h-24 rounded-full" />
                </>
              ) : (
                <img src={`${BASE_URL}/uploads/${user.image}` || user} alt="Profile" className="" />
              )}
              <input type="file" id="profileImage" name="profileImage" className="hidden" disabled={!isEditing} onChange={handleImageChange} />
            </div>
          </label>
        </div>

        <div className={`w-3/4 space-y-4 ${!isEditing ? "text-gray-500" : ""}`}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input type="text" id="name" ref={username} name="name" className="mt-1 p-2 w-full border rounded-md" disabled={!isEditing} />
          </div>

          {/* <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input type="email" id="email" ref={email} name="email" className=" mt-1 p-2 w-full border rounded-md" disabled />
          </div> */}

          <div>
            <label htmlFor="phone1" className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input ref={age} type="number" id="phone1" name="phone1" className=" mt-1 p-2 w-full border rounded-md" disabled={!isEditing} />
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select id="gender" name="gender" ref={genderSelect} value={user.gender || ""} className=" mt-1 p-2 w-full border rounded-md" disabled={!isEditing}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => {
            if (isEditing) {
              handleSubmit();
            }
            setIsEditing(!isEditing);
          }}
          className={`px-4 py-2 ${isEditing ? "bg-red-500 text-white" : "bg-blue-500 text-white"} rounded-md transition duration-300 hover:bg-opacity-80`}
        >
          {isEditing ? "Submit" : "Edit"}
        </button>
        <Link to={"/dashboard"}>
          <button type="button" className={`px-4 py-2  bg-blue-500 text-white rounded-md transition duration-300 hover:bg-opacity-80`}>
            discard
          </button>
        </Link>
      </div>
    </div>
  );
}

export default EditProfile;
