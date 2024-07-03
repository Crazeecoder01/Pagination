import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [pages, setPages] = useState(1);
  const fetchProducts = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    console.log(data);
    if (data && data.products) {
      setProducts(data.products);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSelectPage = (setPageNumber) => {
    setPages(setPageNumber);
  };

  const handlePrev = (currPage) => {
    setPages(currPage - 1 == 0 ? currPage : currPage - 1);
  };
  const handleNext = (currPage) => {
    setPages(currPage + 1 == 11 ? currPage : currPage + 1);
  };
  return (
    <div className="app">
      {
        <div className="products">
          {products
            .slice(100 - pages * 10, 100 - (pages - 1) * 10)
            .map((ele) => {
              return (
                <span className="products__single" key={ele.id}>
                  <img src={ele.thumbnail} alt={ele.title} />
                  <span>{ele.title}</span>
                </span>
              );
            })}
        </div>
      }
      {
        <div className="pagination">
          <span
            className={pages > 1 ? "" : "pagination_disabled"}
            onClick={() => handlePrev(pages)}
          >
            ◀️
          </span>
          {[...Array(products.length / 10)].map((_, i) => {
            return (
              <span
                className={pages == i + 1 ? "pagination_selected" : ""}
                onClick={() => handleSelectPage(i + 1)}
                key={i}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            className={
              pages < products.length / 10 ? "" : "pagination_disabled"
            }
            onClick={() => handleNext(pages)}
          >
            ▶️
          </span>
        </div>
      }
    </div>
  );
}
