import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ProductsAdmin = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    catId: "1",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  let mode = id ? "update" : "create";
  useEffect(() => {
    let prd =
      mode == "update"
        ? props.items.find((item) => item.id == id)
        : {
            name: "",
            price: 0,
            catId: "1",
          };
    if (prd) setFormData(prd);
  }, [props.items]);

  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  let handleAddProduct = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("http://localhost:3000/products", {
      ...formData,
      price: +formData.price,
      count: 0,
    });
    props.handleAddProduct(data);
    navigate("/admin");
  };
  let handleUpdateProduct = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:3000/products/${id}`, {
        ...formData,
        price: +formData.price,
      });
      props.updateProduct(formData);
      navigate("/admin");
    } catch (err) {
      console.log(err);
    }
  };
  const {categories} = useSelector((state) => state);
  return (
    <div className="flex justify-center">
      <form className="flex flex-col">
        <label htmlFor="name" className="text-white my-2">
          Name
        </label>
        <input
          type="text"
          value={formData.name}
          name="name"
          onChange={handleChange}
        />
        <label htmlFor="price" className="text-white my-2">
          Price
        </label>
        <input
          type="number"
          value={formData.price}
          name="price"
          onChange={handleChange}
        />
        <label htmlFor="catId" className="text-white my-2">
          Category
        </label>
        <select name="catId" value={formData.catId} onChange={handleChange}>
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            );
          })}
        </select>
        <button
          className="btn h-1 mt-2"
          onClick={mode == "update" ? handleUpdateProduct : handleAddProduct}
        >
          {mode == "update" ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default ProductsAdmin;
