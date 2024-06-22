import { v4 as uuidv4 } from "uuid";
import remove_icon from "../assets/cart_cross_icon.png";
import { useContext } from "react";
import { backetContext } from "../context/BacketContext";

const CardDetail = () => {
  const { backets, backetsDispatcher, totalProductPrice, totalPriceProducts } = useContext(backetContext);
  const totalPrice = totalPriceProducts()

  const handleClick = (type, id) => {
    switch (type) {
      case "minus":
        backetsDispatcher({
          type: "DECREMENT_QTY",
          payload: {
            id,
          },
        });
        break;

      case "plus":
        backetsDispatcher({
          type: "INCREMENT_QTY",
          payload: {
            id,
          },
        })
        break;

      default:
        break;
    }
  };

  const handleRemove = (id) => {
    backetsDispatcher({
      type: "REMOVE_FROM_BACKET",
      payload: {
        id,
      },
    });
  }

  return (
    <div>
      <div className="carditems">
        <div className="cartitems-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        {backets.map((backet) => {
          return (
            <div key={uuidv4()}>
              <div className="cartitems-format cartitems-format-main">
                <img
                  src={backet.image}
                  alt="product name"
                  className="carticon-product-icon"
                />
                <p>{backet.name}</p>
                <p>{backet.price}</p>
                <button className="cartitems-quantity">
                  <button
                    onClick={() => handleClick("minus", backet.backet_id)}
                  >
                    {" "}
                    -{" "}
                  </button>
                  {backet.qty}
                  <button onClick={() => handleClick("plus", backet.backet_id)}>
                    {" "}
                    +{" "}
                  </button>
                </button>
                <p>{totalProductPrice(backet.id)}</p>
                <button onClick={() => handleRemove(backet.backet_id)}>
                  <img
                    src={remove_icon}
                    className="cartitems-remove-icon"
                    alt=""
  
                    
                  />
                </button>
              </div>
              <hr />
            </div>
          );
        })}
        <div className="cartitems-down">
          <div className="cartitems-total">
            <h1>Cart Totals</h1>
            <div>
              <div className="cartitems-total-item">
                <p>Subtotal</p>
                <p>{totalPrice}$</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <p>Shipping Fee</p>
                <p>{totalPrice > 1000 ? "Free" : totalPrice === 0 ? "0$" : "50$"  }</p>
              </div>
              <hr />
              <div className="cartitems-total-item">
                <h3>Total</h3>
                <h3>{totalPrice < 1000 ? totalPrice + 50 : totalPrice}$</h3>
              </div>
            </div>
            <button>PROCCEED TO CHECKOUT</button>
          </div>
          <div className="cartitems-promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems-promobox">
              <input type="text" placeholder="promo code" />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
