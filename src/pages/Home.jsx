import { useContext } from "react";
import Card from "../components/Card";
import { productContext } from "../context/ProductsContext";

const Home = () => {
  const { products } = useContext(productContext)

  return (
    <div className="ui grid container">
      {
        products?.map((product) => {
          return (
            <Card
              key={product.id}
              id={product.id}
              title={product.name}
              description={product.description}
              price={product.price}
              category={product.category}
              image={product.image}
            />
          )
        })
      }

      {
        products?.length === 0 && (
          <div className="w-full flex items-center justify-center">
            <h1 className="text-3xl text-center">No products found</h1>
          </div>
        )
      }
    </div>
  );
};

export default Home;
