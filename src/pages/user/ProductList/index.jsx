import { useState, useEffect, useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import { Input, Button, Card, Row, Col, Select, Checkbox, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";

import * as S from "./styles";

function ProductListPage() {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    searchKey: "",
    sort: "",
  });
  console.log(
    "🚀 ~ file: index.jsx:21 ~ ProductListPage ~ filterParams:",
    filterParams
  );

  const dispatch = useDispatch();

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  const handleFilter = (key, values) => {
    setFilterParams({
      ...filterParams,
      [key]: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        [key]: values,
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  };

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderCategoryFilter = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col span={24} key={item.id}>
          <Checkbox
            value={item.id}
          >{`${item.name} (${item.products.length})`}</Checkbox>
        </Col>
      );
    });
  }, [categoryList.data]);

  const renderProductList = useMemo(() => {
    return productList.data.map((item) => {
      return (
        <Col key={item.id} xs={12} xl={8}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}>
            <Card title={item.name} size="small">
              <p>{item.category?.name}</p>
              <p>{item.price.toLocaleString()} VND</p>
            </Card>
          </Link>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.ProductListWrapper>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card title="Filter" size="small">
            <Checkbox.Group
              onChange={(values) => handleFilter("categoryId", values)}
            >
              <Row>{renderCategoryFilter}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input
                onChange={(e) => handleFilter("searchKey", e.target.value)}
                placeholder="Search..."
              />
            </Col>
            <Col span={8}>
              <Select
                onChange={(value) => handleFilter("sort", value)}
                placeholder="Sort by"
                style={{ width: "100%" }}
              >
                <Select.Option value="name.desc">Tên A-Z</Select.Option>
                <Select.Option value="name.asc">Tên Z-A</Select.Option>
                <Select.Option value="price.asc">Giá tăng dần</Select.Option>
                <Select.Option value="price.desc">Giá giảm dần</Select.Option>
              </Select>
            </Col>
          </Row>
          <Spin spinning={productList.load}>
            <Row gutter={[16, 16]}>{renderProductList}</Row>
          </Spin>
          {productList.data.length !== productList.meta.total && (
            <Row justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowMore()}>Show more</Button>
            </Row>
          )}
        </Col>
      </Row>
    </S.ProductListWrapper>
  );
}

export default ProductListPage;
