import { useState, useEffect, useMemo } from "react";
import { Link, generatePath } from "react-router-dom";
import { Input, Button, Card, Row, Col, Select, Checkbox } from "antd";
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
  });

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

  const handleFilterCategory = (values) => {
    setFilterParams({
      ...filterParams,
      categoryId: values,
    });
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
        categoryId: values,
      })
    );
  };

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        categoryId: filterParams.categoryId,
        more: true,
      })
    );
  };

  const renderCategoryFilter = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col span={24} key={item.id}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
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
            <Checkbox.Group onChange={(values) => handleFilterCategory(values)}>
              <Row>{renderCategoryFilter}</Row>
            </Checkbox.Group>
          </Card>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col span={16}>
              <Input />
            </Col>
            <Col span={8}>
              <Select style={{ width: "100%" }}>
                <Select.Option value="desc">Giá tăng dần</Select.Option>
                <Select.Option value="asc">Giá giảm dần</Select.Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>{renderProductList}</Row>
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
