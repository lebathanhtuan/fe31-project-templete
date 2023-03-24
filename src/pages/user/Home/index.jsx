import { useState, useEffect } from "react";
import { Link, generatePath } from "react-router-dom";
import { Input, Button, Card, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../../constants/routes";
import { getProductListAction } from "../../../redux/actions";

import * as S from "./styles";

function HomePage() {
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
  const [productErrors, setProductErrors] = useState({
    name: "",
    price: "",
  });

  const dispatch = useDispatch();
  const data = useSelector((state) => state.product);
  console.log("🚀 ~ file: index.jsx:56 ~ HomePage ~ data:", data);

  // Mounting và unmounting
  useEffect(() => {
    // Câu lệnh gọi API
    console.log("Khởi tạo");

    return () => {
      // Clear dữ liệu khi rời khỏi trang
      console.log("Rời khỏi");
    };
  }, []);

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

  const getProductList = () => {
    dispatch(getProductListAction([1, 2, 3]));
  };

  const renderProductList = () => {
    return productList.map((item, index) => {
      return (
        <Col key={index} xs={24} md={12} xl={8}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: index })}>
            <Card title={item.name} size="small">
              <h3>{item.price}</h3>
              <Button onClick={(e) => handleBuyProduct(e, item.name)}>
                Buy
              </Button>
            </Card>
          </Link>
        </Col>
      );
    });
  };

  return (
    <S.HomeWrapper>
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
      <Button onClick={() => getProductList()}>Get Product List</Button>
    </S.HomeWrapper>
  );
}

export default HomePage;
