import { useEffect, useMemo } from "react";
import { Link, useParams, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Row, Col, Card } from "antd";

import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import {
  getProductDetailAction,
  getProductListAction,
} from "../../../redux/actions";

function ProductDetailPage() {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { productList, productDetail } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  }, [id]);

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
    <Spin spinning={productDetail.load}>
      <div>
        <h3>{productDetail.data.name}</h3>
        <p>{productDetail.data.price?.toLocaleString()} VND</p>
      </div>
      <p>Sản phẩm tương tự</p>
      <Row gutter={[16, 16]}>{renderProductList}</Row>
    </Spin>
  );
}

export default ProductDetailPage;
