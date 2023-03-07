import { useState } from "react";

function Main({ isShowSidebar }) {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  console.log("🚀 ~ file: Main.jsx:6 ~ Main ~ text:", text);

  const productList = [
    {
      name: "iPhone 14",
      price: 999,
    },
    {
      name: "iPhone 14 Pro",
      price: 1999,
    },
    {
      name: "iPhone 14 Pro Max",
      price: 2999,
    },
  ];

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    setCount(count - 1);
  };

  const handleBuyProduct = (e, name) => {
    console.log(e.target);
    console.log(`buy ${name}`);
  };

  const handleChangeSearchKey = (e) => {
    setText(e.target.value);
  };

  const handleAddProduct = () => {
    // setProductList ...
  };

  const renderProductList = () => {
    return productList.map((item, index) => {
      return (
        <div key={index} className="product-item">
          <h2>{item.name}</h2>
          <h3>{item.price}</h3>
          <button onClick={(e) => handleBuyProduct(e, item.name)}>Buy</button>
        </div>
      );
    });
  };

  return (
    <div className={isShowSidebar ? "main" : "main full"}>
      <button onClick={() => handleMinus()}>-</button>
      <h3>{count}</h3>
      <button onClick={() => handlePlus()}>+</button>
      <div>
        <input name="searchKey" onChange={(e) => handleChangeSearchKey(e)} />
        <p>{text}</p>
      </div>
      <div>{renderProductList()}</div>
      <button onClick={() => handleAddProduct()}>Add product</button>
    </div>
  );
}

export default Main;
