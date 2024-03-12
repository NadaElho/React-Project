import CartItem from "./cartItem";

const Cart = (props) => {
  return (
    <div className="p-4">
      {props.items.map((item, i) => {
        return (
          <CartItem
            key={i}
            item={item}
            deleteItem={props.deleteItem}
            handleIncrement={props.handleIncrement}
            handleDecrement={props.handleDecrement}
          />
        );
      })}

      {props.items.length != 0 && (
        <button
          onClick={props.handleReset}
          className="text-[#3b5d50] bg-white border border-[#3b5d50] transition-all hover:bg-[#3b5d50] px-2 hover:text-white "
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default Cart;
