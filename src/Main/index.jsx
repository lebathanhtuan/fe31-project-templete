import { useState, Fragment } from "react";
import { Input, Button, Card, Row, Col } from "antd";

import * as S from "./styles";

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
    {
      name: "iPhone 14 Pro Max",
      price: 2999,
    },
    {
      name: "iPhone 14 Pro Max",
      price: 2999,
    },
    {
      name: "iPhone 14 Pro Max",
      price: 2999,
    },
    {
      name: "iPhone 14 Pro Max",
      price: 2999,
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
        <Col key={index} xs={24} md={12} xl={8}>
          <Card title={item.name} size="small">
            <h3>{item.price}</h3>
            <Button onClick={(e) => handleBuyProduct(e, item.name)}>Buy</Button>
          </Card>
        </Col>
      );
    });
  };

  return (
    <S.MainWrapper isFull={!isShowSidebar}>
      <Row gutter={[16, 16]}>{renderProductList()}</Row>
      <Input
        type="text"
        onChange={(e) => handleChangeProductData(e, "name")}
        value={productData.name}
        placeholder="Product name"
      />
      <span>{productErrors.name}</span>
      <Input
        type="text"
        onChange={(e) => handleChangeProductData(e, "price")}
        value={productData.price}
        placeholder="Product price"
      />
      <span>{productErrors.price}</span>
      <Button type="primary" onClick={() => handleAddProduct()}>
        Add product
      </Button>
      <S.CustomButton onClick={() => handleResetForm()}>Reset</S.CustomButton>
    </S.MainWrapper>
  );
}

export default Main;
