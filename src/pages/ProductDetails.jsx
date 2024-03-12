import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const [prd, setPrd] = useState({});
  let {id} = useParams()
  useEffect(() => {
    (async function () {
      let { data } = await axios.get(
        `http://localhost:3000/products/${id}`
      );
      setPrd(data);
    })();
  }, [prd, id]);

  return (
  <div className="text-center">
    <h1 className="m-5">{prd.name}</h1>
    <span>{prd.price}$</span>
  </div>)
};

export default ProductDetails;
