import React, { useContext, useState } from "react";
import { convertToBase64 } from "../utils/convert64";
import { productContext } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddProduct() {
  const { productsDispatcher } = useContext(productContext);
  const navigate = useNavigate()

  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  const handleInputValue = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    const image64Url = await convertToBase64(file);

    setInputs({
      ...inputs,
      image: image64Url,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    productsDispatcher({
      type: "ADD_PRODUCT",
      payload: inputs,
    });

    navigate("/")
    toast.success("Product added successfully")
  };

  return (
    <div className="w-full h-[calc(100vh_-_80px)] mx-auto flex items-center justify-center">
      <div className="w-[500px] border-2 px-2 py-3 flex flex-col gap-4">
        <h1 className="text-2xl text-center">AddProduct page</h1>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Mahsulot nomi"
            className="p-3 border-2"
            required
            onChange={handleInputValue}
          />
          <div className="flex">
            <input
              type="number"
              name="price"
              placeholder="Mahsulot Narxi"
              className="w-full p-3 border-2"
              required
              onChange={handleInputValue}
            />
            <select name="valyuta" disabled className="p-3 border-2">
              <option selected value="$">
                $
              </option>
            </select>
          </div>
          <input
            type="text"
            name="description"
            placeholder="Mahsulotning Tavsifi"
            className="p-3 border-2"
            required
            onChange={handleInputValue}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="p-3 border-2"
            required
            onChange={handleInputValue}
          />
          <input type="file" className="p-3 border-2" onChange={handleImage} />
          <button
            type="submit"
            className="w-[120px] px-3 py-2 rounded-lg border bg-blue-600 text-white self-center"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
