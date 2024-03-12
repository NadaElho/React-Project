import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { filterByCategory } from "./redux/FilterByCategory";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./redux/CategoriesSlice";

import Home from "./pages/Home";
import Cart from "./components/cart";
import Navbar from "./components/navbar";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import DashboardIndex from "./pages/DashboardIndex";
import NotFound from "./pages/notFound";
import axios from "axios";
import Menu from "./pages/Menu";
import Admin from "./pages/Admin";
import ProductsAdmin from "./pages/ProductsAdmin";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [curPage, setCurPage] = useState(1);
  const [searchBy, setSearchBy] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      setLoading(true);
      let { data } = await axios.get("http://localhost:3000/products");
      setItems(data);
      setLoading(false);
    })();

    dispatch(getCategories());
    (async function () {
      let { data } = await axios.get("http://localhost:3000/cart");
      setCartItems(data);
    })();
  }, []);
  
  //Cart
  const addToCart = (item, e) => {
    e.stopPropagation();
    let count = cartItems.findIndex((ele) => ele.id == item.id);
    async function add() {
      let { data } = await axios.post("http://localhost:3000/cart", {
        count: 1,
        prdId: item.id,
      });
      setCartItems([...cartItems, data]);
    }
    if (count == -1) {
      add();
      toast.success(`${item.name} added to cart suucessfully`);
    } else {
      deleteItem(item);
    }
  };

  const deleteItem = async (item) => {
    let newItems = cartItems.filter((ele) => ele.id != item.id);
    await axios.delete(`http://localhost:3000/cart/${item.id}`);
    setCartItems(newItems);
    toast(`${item.name} deleted from cart suucessfully`);
  };
  const handleReset = () => {
    let newItems = [...cartItems];
    newItems.map(async(item) => {
      item.count = 0;
      await axios.patch("http://localhost:3000/cart/" + item.id, {
      count: 0,
    });
    });
    setCartItems(newItems);
  };

  const HandleIncrement = async (cartItem) => {
    let id = 0
    console.log(cartItems);
    let newItems = cartItems.map((item) => {
      if (item.id == cartItem.id) {
        id=item.id
        item = { ...item, count: item.count + 1 };
      }
      return item;
    });

    await axios.patch("http://localhost:3000/cart/" + id, {
      count: cartItem.count + 1,
    });
    setCartItems(newItems);
  };

  const HandleDecrement = (cartItem) => {
    let newItems = [...cartItems];
    newItems.map((item, i) => {
      if (item.id == cartItem.id && item.count != 0) {
        newItems[i] = { ...item, count: item.count - 1 };
      }
    });
    setCartItems(newItems);
  };

  //Products
  const deleteProduct = async (item) => {
    let index = items.findIndex((prd) => prd.id == item.id);
    let newItems = items.filter((ele) => ele.id != item.id);
    setItems(newItems);
    try {
      await axios.delete(`http://localhost:3000/products/${item.id}`);
      toast(`${item.name} deleted suucessfully`);
    } catch (err) {
      let firstPart = newItems.slice(0, index);
      let secondPart = newItems.slice(index, newItems.length);
      let newPrds = [...firstPart, item, ...secondPart];
      setItems(newPrds);
    }
  };

  const handleAddProduct = async (item) => {
    let newItems = [...items];
    newItems.push(item);
    setItems(newItems);
    toast.success(`${item.name} added suucessfully`);
  };

  const updateProduct = async (item) => {
    let newItems = [...items];
    let index = newItems.findIndex((prd) => prd.id == item.id);
    newItems[index] = { ...item };
    setItems(newItems);
    toast.success(`${item.name} updated suucessfully`);
  };
  const state = useSelector((state) => state);

  //Filteration
  let toShowItems = [...items];
  const filterByCat = (cat) => {
    setCurPage(1);
    dispatch(filterByCategory(cat));
    setSearchBy("");
  };
  let filtered = state.filterByCategory
    ? items.filter((product) => product.catId === state.filterByCategory)
    : items;
  toShowItems = [...filtered];
  
  let handleSearch = (e) => {
    let prdItems = [...filtered];
    let prdBySearch = prdItems.filter((prd) =>
      prd.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchBy(e.target.value);
    setSearchResult(prdBySearch);
  };
  toShowItems = searchBy ? searchResult : filtered;

  //Pagination
  let noOfItemsInPage = 2;
  let noOfItems = toShowItems.length;
  let no = Math.ceil(noOfItems / noOfItemsInPage);
  const indexOfLastItem = curPage * noOfItemsInPage;
  const indexOfFirstItem = indexOfLastItem - noOfItemsInPage;
  toShowItems = toShowItems.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div>
      <BrowserRouter>
        <Navbar noOfItems={cartItems.length} />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/products/:id"
            element={
              <ProductsAdmin
                // categories={categories}
                updateProduct={updateProduct}
                items={items}
              />
            }
          />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
          <Route
            path="/products/add"
            element={
              <ProductsAdmin
                items={items}
                handleAddProduct={handleAddProduct}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                items={items}
                deleteProduct={deleteProduct}
                handleAddProduct={handleAddProduct}
                updateProduct={updateProduct}
                loading={loading}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="" index element={<DashboardIndex />} />
            <Route path="products" element={<Products />} />
            <Route path="categories" element={<Categories />} />
          </Route>
          <Route
            path="menu"
            element={
              <Menu
                items={toShowItems}
                addToCart={addToCart}
                filterByCat={filterByCat}
                cartItems={cartItems}
                handleSearch={handleSearch}
                searchResult={searchResult}
                searchBy={searchBy}
                noOfItems={noOfItems}
                setCurPage={setCurPage}
                curPage={curPage}
                no={no}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                handleReset={handleReset}
                deleteItem={deleteItem}
                handleIncrement={HandleIncrement}
                handleDecrement={HandleDecrement}
                items={cartItems}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
