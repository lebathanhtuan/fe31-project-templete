import { useEffect, useMemo, useState } from "react";
import { Link, useParams, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Spin,
  Row,
  Col,
  Card,
  InputNumber,
  Input,
  Button,
  Form,
  Rate,
  Space,
  notification,
} from "antd";
import moment from "moment";

import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import {
  getProductDetailAction,
  getProductListAction,
  getReviewListAction,
  sendReviewAction,
  addToCartAction,
} from "../../../redux/actions";
import * as S from "./styles";

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();
  const [reviewForm] = Form.useForm();

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);
  const { productList, productDetail } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);

  const totalRate = useMemo(
    () =>
      reviewList.data.length
        ? reviewList.data
            .map((item) => item.rate)
            .reduce((total, item) => total + item)
        : 0,
    [reviewList.data]
  );

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(getReviewListAction({ productId: id }));
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
  }, [id]);

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        id: parseInt(id),
        name: productDetail.data.name,
        price: productDetail.data.price,
        quantity: quantity,
      })
    );
    notification.success({
      message: "Thêm vào giỏ thành công!",
    });
  };

  const handleReview = (values) => {
    dispatch(
      sendReviewAction({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: parseInt(id),
        },
        callback: () => reviewForm.resetFields(),
      })
    );
  };

  const renderProductImages = useMemo(() => {
    return productDetail.data.images?.map((item) => {
      return (
        <img key={item.id} src={item.url} width="300px" height="auto" alt="" />
      );
    });
  }, [productDetail.data.images]);

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <Card size="small" key={item.id}>
          <Space>
            <h3>{item.user.fullName}</h3>
            <span>{moment(item.createdAt).fromNow()}</span>
          </Space>
          <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
          <p>{item.comment}</p>
        </Card>
      );
    });
  }, [reviewList.data]);

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
        <Space>
          <Rate value={totalRate / reviewList.data.length} disabled />
          <span>{`(${(totalRate / reviewList.data.length).toFixed(1)})`}</span>
        </Space>
        {renderProductImages}
        <p>{productDetail.data.category?.name}</p>
        <p>{productDetail.data.price?.toLocaleString()} VND</p>
        <div>
          <InputNumber
            min={1}
            value={quantity}
            onChange={(value) => setQuantity(value)}
          />
        </div>
        <div>
          <Button type="primary" onClick={() => handleAddToCart()}>
            Add To Cart
          </Button>
        </div>

        <Card size="small">
          <S.ProductContent
            dangerouslySetInnerHTML={{
              __html: productDetail.data.content,
            }}
          ></S.ProductContent>
        </Card>

        <div>
          {userInfo.data.id && (
            <Card title="Review" size="small">
              <Form
                form={reviewForm}
                name="reviewForm"
                layout="vertical"
                onFinish={(values) => handleReview(values)}
                autoComplete="off"
              >
                <Form.Item
                  label="Rate"
                  name="rate"
                  rules={[
                    {
                      required: true,
                      message: "Please input your rate!",
                    },
                  ]}
                >
                  <Rate />
                </Form.Item>
                <Form.Item
                  label="Comment"
                  name="comment"
                  rules={[
                    {
                      required: true,
                      message: "Please input your comment!",
                    },
                  ]}
                >
                  <Input.TextArea
                    autoSize={{
                      minRows: 2,
                      maxRows: 4,
                    }}
                  />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Submit
                </Button>
              </Form>
            </Card>
          )}
          {renderReviewList}
        </div>
      </div>
      <p>Sản phẩm tương tự</p>
      <Row gutter={[16, 16]}>{renderProductList}</Row>
    </Spin>
  );
}

export default ProductDetailPage;
