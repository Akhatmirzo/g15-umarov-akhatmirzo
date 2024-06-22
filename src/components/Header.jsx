import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { backetContext } from "../context/BacketContext";

const Header = () => {
  const { backets } = useContext(backetContext)

  return (
    <div className="ui fixed-m menu">
      <div className="ui container center">
        <Link to={`/`}>
          <h2 id="ww" className="font-bold text-2xl mr-3">FakeShop</h2>
        </Link>
        <Link to={`/add`}>Add product</Link>
        <Link to={`cardDetail`}>
          <AiOutlineShoppingCart className="shopCard" />
          <div className="shopCardCount">
            <p>{backets?.length || 0}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
