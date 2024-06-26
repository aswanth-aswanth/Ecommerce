import { useEffect, useState } from "react";
import axios from "axios";
import AddImages from "./AddImages";
import { BASE_URL } from "../../config.js";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduct = () => {
  const [productName, setProductName] = useState("");
  const [variantName, setVariantName] = useState("");
  const [variant, setVariant] = useState({});
  const [variantId, setVariantId] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [productVariantArray, setProductVariantArray] = useState([]);
  const [color, setColor] = useState("");
  const [stock, setStock] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [regularPrice, setRegularPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [description, setDescription] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const { productId } = useParams();
  const [index, setIndex] = useState(0);
  // console.log("Product ID : ", productId);

  const [specifications, setSpecifications] = useState([
    { name: "", value: "" },
  ]);
  const [images, setImages] = useState([]);
  const [imagesObjects, setImagesObjects] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  //productDatafetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/admin/products/${productId}`,
          {
            headers: {
              Authorization: `${localStorage.getItem("adminToken")}`,
            },
          }
        );
        const product = response.data.product;
        // console.log("proudct : ", product);
        setProductName(product.name);
        setBrand(product.brand);
        setCategoryId(product.category);
        setDescription(product.description);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchData();
  }, []);

  //categoryItemsfetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/admin/categories`, {
          headers: {
            Authorization: `${localStorage.getItem("adminToken")}`,
          },
        });
        // console.log("category list : ", response);
        setCategoryOptions(response.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  //categoryItemfetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (categoryId) {
          const response = await axios.get(
            `${BASE_URL}/admin/categories/${categoryId}`,
            {
              headers: {
                Authorization: `${localStorage.getItem("adminToken")}`,
              },
            }
          );
          const categoryName = response.data.category.name;
          setCategory(categoryName);
          // console.log("category Name : ", categoryName);
          //   setCategoryOptions(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchData();
  }, [categoryId]);

  //productVariantfetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (productId) {
          const response = await axios.get(
            `${BASE_URL}/admin/products/variant/${productId}`,
            {
              headers: {
                Authorization: `${localStorage.getItem("adminToken")}`,
              },
            }
          );
          const variantData = response.data.variant;
          console.log("variant: ", variantData);
          // console.log("variant ID ::: ", variantData[0]._id);
          setVariantId(variantData[index]._id);
          setVariant(variantData);
          setProductVariantArray(variantData);
          setVariantName(variantData[index].variantName);
          //   setProductName(variant[0].variantName);
          setStock(variantData[index].stock);
          setSalePrice(variantData[index].salePrice);
          setRegularPrice(variantData[index].regularPrice);
          let file = [];
          const blobPromises = variantData[index].publicIds.map(
            async (imageUrl) => {
              // const response = await fetch(`${BASE_URL}/uploads/${imageUrl}`);
              const response = await fetch(`${imageUrl}`);
              const blob = await response.blob();
              const fileOne = new File([blob], `${imageUrl}`, {
                type: blob.type,
              });
              file.push(fileOne);
              // console.log("file : ", file);
              return URL.createObjectURL(blob);
            }
          );
          const blobs = await Promise.all(blobPromises);
          // console.log("file : ", file);
          setImages(blobs);
          setImagesObjects(file);
          setSpecifications(variantData[index].specification);
          //   setCategoryOptions(response.data.categories);
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchData();
  }, [variantId]);
  // console.count("count");

  const handleAddSpecification = () => {
    setSpecifications([...specifications, { name: "", value: "" }]);
  };

  const handleSpecificationChange = (index, field, e) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = e.target.value;
    setSpecifications(updatedSpecifications);
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications.splice(index, 1);
    setSpecifications(updatedSpecifications);
  };

  // console.log("variant id : ", variantId);
  // console.log("variant Name : ", variantName);
  // console.log("image object : ", imagesObjects);

  const handleInputChange = (fieldName, value) => {
    switch (fieldName) {
      case "productName":
        setProductName(value);
        break;
      case "brand":
        setBrand(value);
        break;
      case "category":
        setCategory(value);
        setCategoryId(value);
        break;
      case "productVariant":
        setVariantName(value);
        break;
      case "color":
        setColor(value);
        break;
      case "stock":
        setStock(value);
        break;
      case "regularPrice":
        setRegularPrice(value);
        break;
      case "salePrice":
        setSalePrice(value);
        break;
      case "description":
        setDescription(value);
        break;
      default:
        break;
    }
  };

  // console.log("category Id : ", categoryId);
  // console.log("category  : ", category);

  const handleAddProduct = async () => {
    try {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!productName) {
        Swal.fire({
          title: "Fill all!",
          text: "Product name must contain only letters and white spaces.",
          icon: "error",
        });
        return;
      }
      const brandRegex = /^[a-zA-Z\s]+$/;
      if (!brand || !brandRegex.test(brand.trim())) {
        Swal.fire({
          title: "Fill all!",
          text: "Brand must contain only letters and white spaces.",
          icon: "error",
        });
        return;
      }

      if (!category) {
        Swal.fire({
          title: "Fill all!",
          text: "Please select a category.",
          icon: "error",
        });
        return;
      }

      const descriptionRegex = /^[a-zA-Z\s]+$/;
      if (!description) {
        Swal.fire({
          title: "Fill all!",
          text: "Description must contain only letters and white spaces.",
          icon: "error",
        });
        return;
      }

      if (
        productName.trim() === "" ||
        brand.trim() === "" ||
        description.trim() === ""
      ) {
        Swal.fire({
          title: "Fill all!",
          text: "Input must not contain only white spaces.",
          icon: "error",
        });
        return;
      }

      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "Your edit will be submitted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Submit!",
      });
      if (confirmed.isConfirmed) {
        // Perform the API request with formData
        const response = await axios.put(
          `${BASE_URL}/admin/products/${productId}`,
          {
            brand,
            name: productName,
            category: categoryId,
            description,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("adminToken")}`,
            },
          }
        );
        Swal.fire({
          title: "Edited!",
          text: `Product edited successfully`,
          icon: "success",
        });
        // alert("product added successfully");
      }
      // console.log("RESPONSE : ", response.data);
    } catch (error) {
      console.error("Error adding product:", error);
      // alert("Error adding product");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleImageUpload = (e) => {
    // console.log("I am working fine ");
    // console.log("handleImageUpload");
    if (images.length < 8) {
      const file = e.target.files[0];
      console.log("handleImage : ", file);
      if (file) {
        setImages([...images, URL.createObjectURL(file)]);
        setImagesObjects([...imagesObjects, file]);
      }
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    const updatedImagesObjects = [...imagesObjects];
    updatedImages.splice(index, 1);
    updatedImagesObjects.splice(index, 1);
    setImages(updatedImages);
    setImagesObjects(updatedImagesObjects);
  };

  const handleSendDataToVariant = async () => {
    try {
      if (
        !stock ||
        !regularPrice ||
        !salePrice ||
        !variantName ||
        imagesObjects.length === 0 ||
        specifications.length === 0
      ) {
        Swal.fire({
          title: "Fill all!",
          text: "Please fill in all required fields and also add specifications.",
          icon: "error",
        });
        return;
      }

      if (variantName.length > 15) {
        Swal.fire({
          title: "Invalid input!",
          text: "Variant name must not exceed 10 characters.",
          icon: "error",
        });
        return;
      }

      const numericRegex = /^\d+$/;
      if (
        !numericRegex.test(stock) ||
        !numericRegex.test(regularPrice) ||
        !numericRegex.test(salePrice)
      ) {
        Swal.fire({
          title: "Invalid input!",
          text: "Stock, Regular Price, and Sale Price must contain only numbers.",
          icon: "error",
        });
        return;
      }

      if (imagesObjects.length === 0) {
        Swal.fire({
          title: "Fill all!",
          text: "At least one image is required.",
          icon: "error",
        });
        return;
      }

      if (specifications.some((spec) => !spec.name || !spec.value)) {
        Swal.fire({
          title: "Fill all!",
          text: "Specifications must not be empty.",
          icon: "error",
        });
        return;
      }
      if (variantName.trim() === "") {
        Swal.fire({
          title: "Fill all!",
          text: "Input must not contain only white spaces.",
          icon: "error",
        });
        return;
      }

      const confirmed = await Swal.fire({
        title: "Are you sure?",
        text: "Your edit will be submitted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Submit!",
      });
      if (confirmed.isConfirmed) {
        const variantFormData = new FormData();
        variantFormData.append("productId", productId);
        variantFormData.append("stock", stock);
        variantFormData.append("color", color);
        variantFormData.append("regularprice", regularPrice);
        variantFormData.append("specialprice", salePrice);
        variantFormData.append("variantName", variantName);
        imagesObjects.forEach((image, index) => {
          variantFormData.append("photos", image);
        });
        specifications.forEach((spec, index) => {
          variantFormData.append(`specification[${index}][name]`, spec.name);
          variantFormData.append(`specification[${index}][value]`, spec.value);
        });

        const variantResponse = await axios.put(
          `${BASE_URL}/admin/products/variant/${variantId}`,
          variantFormData,
          {
            headers: {
              Authorization: `${localStorage.getItem("adminToken")}`,
            },
          }
        );
        // navigate("/products/view-all");
        // console.log(variantResponse.data);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Product Variant added successfully",
        });

        // alert(variantResponse.data.message);
      }
    } catch (error) {
      console.error("Error adding product variant:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  const handleTabClicks = async (index) => {
    setVariantName(variant[index].variantName);
    //   setProductName(variant[0].variantName);
    setVariantId(variant[index]._id);
    setIndex(index);
    setStock(variant[index].stock);
    setSalePrice(variant[index].salePrice);
    setRegularPrice(variant[index].regularPrice);
    // setImages(variant[index].images);
    // setBackendImages(variant[index].images);
    setSpecifications(variant[index].specification);
    setSpecifications(variant[index].specification);
  };

  console.log("variantId  : ", variantId);
  return (
    <div className="bg-white p-8 shadow-md rounded-md max-w-3xl mx-auto text-[#566A7F]">
      <h2 className="text-left text-2xl font-bold mb-6">Product Information</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Name</label>
        <input
          value={productName}
          type="text"
          className="w-full border border-gray-300 p-2"
          onChange={(e) => handleInputChange("productName", e.target.value)}
        />
      </div>

      <div className="flex mb-4">
        <div className="w-1/2 pr-2">
          <label className="block text-sm font-semibold mb-1">Brand</label>
          <input
            value={brand}
            type="text"
            className="w-full border border-gray-300 p-2"
            onChange={(e) => handleInputChange("brand", e.target.value)}
          />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block text-sm font-semibold mb-1">Category</label>
          <select
            className="w-full border border-gray-300 p-2"
            value={category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {/* {category ? ( */}
            {category && <option value="">{category}</option>}
            {/* ) : ( */}
            {/* <> */}
            {categoryOptions?.map((option) => (
              <option key={option._id} value={option._id}>
                {option.name}
              </option>
            ))}
            {/* </> */}
            {/* )} */}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          value={description}
          className="w-full border border-gray-300 p-2"
          rows="6"
          onChange={(e) => handleInputChange("description", e.target.value)}
        ></textarea>
      </div>

      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-6 mb-12"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
      <div className="flex border-b border-gray-300 mb-10">
        {productVariantArray.map((item, index) => (
          <div
            key={index}
            className={`cursor-pointer py-2 px-4 ${
              activeTab === index ? "bg-gray-400  text-white" : "bg-gray-200"
            }`}
            onClick={() => {
              setActiveTab(index);
              handleTabClicks(index);
            }}
          >
            {/* {item.variantName} */}
            {index + 1}
          </div>
        ))}
      </div>

      <div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Variant name
          </label>
          <input
            value={variantName}
            type="text"
            className="w-full border border-gray-300 p-2"
            onChange={(e) =>
              handleInputChange("productVariant", e.target.value)
            }
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Stock</label>
          <input
            value={stock}
            type="number"
            className="w-full border border-gray-300 p-2"
            onChange={(e) => handleInputChange("stock", e.target.value)}
          />
        </div>

        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-semibold mb-1">
              Regular Price
            </label>
            <input
              value={regularPrice}
              type="number"
              className="w-full border border-gray-300 p-2"
              onChange={(e) =>
                handleInputChange("regularPrice", e.target.value)
              }
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-semibold mb-1">
              Sale Price
            </label>
            <input
              value={salePrice}
              type="number"
              className="w-full border border-gray-300 p-2"
              onChange={(e) => handleInputChange("salePrice", e.target.value)}
            />
          </div>
        </div>

        <AddImages
          images={images}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
        />
        <div className="mt-10">
          <label className="block text-xl font-semibold mb-4">
            Specifications
          </label>
          {specifications.map((spec, index) => (
            <div key={index} className="flex mb-4">
              <input
                type="text"
                className="w-1/2 mr-4 border border-gray-300 p-3 rounded-md"
                placeholder="Specification Name"
                value={spec.name}
                onChange={(e) => handleSpecificationChange(index, "name", e)}
              />
              <input
                type="text"
                className="w-1/2 border border-gray-300 p-3 rounded-md"
                placeholder="Define Specification"
                value={spec.value}
                onChange={(e) => handleSpecificationChange(index, "value", e)}
              />
              <button
                type="button"
                className="ml-4 text-red-600"
                onClick={() => handleRemoveSpecification(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded-md"
            onClick={handleAddSpecification}
          >
            Add Specification
          </button>
        </div>
        <button
          type="button"
          className="bg-lime-500 ms-auto block py-4 my-8 text-white  px-4 rounded-md"
          onClick={handleSendDataToVariant}
        >
          Send Data to Variant
        </button>
      </div>
    </div>
  );
};

export default EditProduct;
