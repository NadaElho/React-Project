import { useSelector } from "react-redux";

const Filter = (props) => {  
  const {filterByCategory, categories} = useSelector((state) => state);
  // const handleClick = (cat) =>{
  //   dispatch(filterByCategory(cat))
  // }

  return (
    <div>
      <ul>
        <li
          key="0"
          onClick={() => props.filterByCat(0)}
          className={`${
            filterByCategory === 0 ? "text-[#f8b810]" : "text-slate-400"
          } cursor-pointer`}
        >
          All
        </li>
        {categories.map((ele) => {
          return (
            <li
              key={ele.id}
              onClick={() => {
                // handleClick(ele)
                props.filterByCat(ele);
              }}
              className={`${
                filterByCategory === ele.id
                  ? "text-[#f8b810]"
                  : "text-slate-400"
              } cursor-pointer`}
            >
              {ele.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Filter;
