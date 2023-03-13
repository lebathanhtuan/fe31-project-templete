import { useState } from "react";
import Text from "./Text";
import "./test.css";

function Main({ isShowSidebar }) {
  const [productList, setProductList] = useState([
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
  ]);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
  });
  console.log("🚀 ~ file: Main.jsx:22 ~ Main ~ productData:", productData);
  const [productErrors, setProductErrors] = useState({
    name: "",
    price: "",
  });

  const handleBuyProduct = (e, name) => {
    console.log(`buy ${name}`);
  };

  const handleChangeProductData = (e, key) => {
    setProductData({
      ...productData,
      [key]: e.target.value,
    });
  };

  const handleAddProduct = () => {
    const onlyNumberRegex = /^[0-9]/g;
    let isValid = true;
    const errors = {
      name: "",
      price: "",
    };
    if (!productData.name) {
      errors.name = "Name is required !!!";
      isValid = false;
    } else {
      errors.name = "";
    }

    if (!productData.price) {
      errors.price = "Price is required !!!";
      isValid = false;
    } else if (!onlyNumberRegex.test(productData.price)) {
      errors.price = "Price is number !!!";
      isValid = false;
    } else {
      errors.price = "";
    }

    if (isValid) {
      setProductList([
        ...productList,
        {
          name: productData.name,
          price: parseInt(productData.price),
        },
      ]);
      setProductData({
        name: "",
        price: "",
      });
    }
    setProductErrors(errors);
  };

  const handleResetForm = () => {
    setProductData({
      name: "",
      price: "",
    });
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
      <div>{renderProductList()}</div>
      <input
        type="text"
        onChange={(e) => handleChangeProductData(e, "name")}
        value={productData.name}
        placeholder="Product name"
      />
      <span>{productErrors.name}</span>
      <input
        type="text"
        onChange={(e) => handleChangeProductData(e, "price")}
        value={productData.price}
        placeholder="Product price"
      />
      <span>{productErrors.price}</span>
      <button onClick={() => handleAddProduct()}>Add product</button>
      <button onClick={() => handleResetForm()}>Reset</button>
      <Text>
        <h3>ABC</h3>
      </Text>
    </div>
  );
}

export default Main;
