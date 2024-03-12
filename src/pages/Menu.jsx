import { useNavigate } from "react-router-dom";
import Filter from "../components/filter";
import Pagination from "../components/pagination";

const Menu = (props) => {
  const navigate = useNavigate()
  let check = (id) => {
    let check = props.cartItems.findIndex((item) => item.id == id);
    if (check != -1) {
      return true;
    }
  };
  let getProductDetails = async (item) => {
    navigate(`/productdetails/${item.id}`)
  };

  return (
    <div className="grid grid-cols-3 p-2">
      <div className="col-span-1">
        <Filter
          categories={props.categories}
          filterByCat={props.filterByCat}
          selectedCatId={props.selectedCatId}
          items={props.items}
        />
      </div>
      <div className="col-span-2">
        <input
          type="text"
          placeholder="Search"
          className="p-2 m-2"
          onChange={props.handleSearch}
          value={props.searchBy}
        />
        <table className="w-full">
          <thead>
            <tr className="text-left">
              <th>Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.items.map((item) => {
              return (
                <tr key={item.id} onClick={(()=>getProductDetails(item))}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <div onClick={(e) => props.addToCart(item, e)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={`${check(item.id) ? "#f8b810" : "none"}`}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 cursor-pointer"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          items={props.items}
          setCurPage={props.setCurPage}
          noOfItems={props.noOfItems}
          no={props.no}
          curPage={props.curPage}
        />
      </div>
    </div>
  );
};

export default Menu;
