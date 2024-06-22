import { useContext } from "react";
import { useParams } from "react-router-dom";
import { productContext } from "../context/ProductsContext";
import { backetContext } from "../context/BacketContext";

const ProductDetail = () => {
  const { backetsDispatcher, checkBacketProduct } = useContext(backetContext);
  const { id } = useParams();
  const { findOneProduct } = useContext(productContext)
  const product = findOneProduct(id);

  const handleClick = () => {
    if (!product) return;

    const checkBacket = checkBacketProduct(id);

    if (!checkBacket) {
      backetsDispatcher({
        type: "ADD_TO_BACKET",
        payload: {...product, qty: 1},
      })
    }else {
      backetsDispatcher({
        type: "INCREMENT_QTY_ADD",
        payload: id,
      })
    }
  }

  return (
    <>
      <div className="ui grid container">
        <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="ui vertical divider">AND</div>
            <div className="middle aligned row">
              <div className="column lp">
                <img
                  className="ui fluid image"
                  src={product?.image}
                  alt="product"
                />
              </div>
              <div className="column rp">
                <h1 className="text-2xl mb-4 font-extrabold">{product?.name}</h1>
                <h2>
                  <h3 className="ui teal tag label">{product?.price}</h3>
                </h2>
                <h3 className="ui brown block header">{product?.category}</h3>
                <p className="mb-4">
                  {product?.description}
                </p>
                <div className="ui vertical animated button" tabIndex="0" onClick={handleClick}>
                  <div className="content">Add to Cart</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
