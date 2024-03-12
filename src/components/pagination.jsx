const Pagination = (props) => {
  let pageNums = [];
  for (let i = 1; i <= props.no; i++) {
    pageNums.push(i);
  }
  if(pageNums.length<2) return null
  return (
    <div className="mt-10">
      {pageNums.map((ele) => {
        return <button onClick={()=>props.setCurPage(ele)} className={`btn btn-sm ml-3 ${
          props.curPage === ele && "bg-white text-slate-700"
        }`} key={ele}>{ele}</button>;
      })
      }
    </div>
  );
};

export default Pagination;
