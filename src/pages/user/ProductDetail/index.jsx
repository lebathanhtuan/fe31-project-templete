import { useEffect, useMemo, useState } from "react";
import { Link, useParams, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
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
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import moment from "moment";

import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIMIT } from "../../../constants/paging";
import {
  getProductDetailAction,
  getProductListAction,
  getReviewListAction,
  sendReviewAction,
  addToCartAction,
  favoriteProductAction,
  unFavoriteProductAction,
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

  const averageRate = useMemo(
    () =>
      reviewList.data.length
        ? (
            reviewList.data.reduce((total, item) => total + item.rate, 0) /
            reviewList.data.length
          ).toFixed(1)
        : 0,
    [reviewList.data]
  );

  const isLike = useMemo(
    () =>
      productDetail.data.favorites?.findIndex(
        (item) => item.userId === userInfo.data.id
      ) !== -1,
    [productDetail.data.favorites, userInfo.data.id]
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

  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = productDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        dispatch(
          unFavoriteProductAction({
            id: favoriteData.id,
            productId: productDetail.data.id,
          })
        );
      } else {
        dispatch(
          favoriteProductAction({
            productId: productDetail.data.id,
            userId: userInfo.data.id,
          })
        );
      }
    } else {
      notification.error({
        message: "Vui lòng đăng nhập để thực hiện chức năng này!",
      });
    }
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
        <S.ReviewItemWrapper key={item.id}>
          <Space>
            <h3>{item.user.fullName}</h3>
            <span>{moment(item.createdAt).fromNow()}</span>
          </Space>
          <Rate
            value={item.rate}
            disabled
            style={{ display: "block", fontSize: 12 }}
          />
          <p>{item.comment}</p>
        </S.ReviewItemWrapper>
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
    <S.ProductDetailWrapper>
      <Card size="small" bordered={false}>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={10}>
            {!!productDetail.data.images?.length && (
              <img
                src={productDetail.data.images[0]?.url}
                width="100%"
                height="auto"
                alt=""
              />
            )}
          </Col>
          <Col xs={24} md={14}>
            <div>
              <h2>{productDetail.data.name}</h2>
              <Link
                to={ROUTES.USER.PRODUCT_LIST}
                state={{ categoryId: productDetail.data.category?.id }}
              >
                <h3>{productDetail.data.category?.name}</h3>
              </Link>
              <Space align="baseline">
                <Rate value={averageRate} disabled />
                <span>
                  {`(${
                    reviewList.data.length
                      ? `${reviewList.data.length} lượt đánh giá`
                      : "chưa có lượt đánh giá"
                  })`}
                </span>
              </Space>
              <p style={{ fontSize: 24, margin: "12px 0 16px" }}>
                {productDetail.data.price?.toLocaleString()} VND
              </p>
              <InputNumber
                min={1}
                value={quantity}
                onChange={(value) => setQuantity(value)}
                style={{ display: "block", marginBottom: 16 }}
              />
              <Space>
                <Button
                  type="primary"
                  size="large"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart()}
                >
                  Add To Cart
                </Button>
                <Button
                  size="large"
                  danger={isLike}
                  icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => handleToggleFavorite()}
                >
                  {productDetail.data?.favorites?.length || 0} liked
                </Button>
              </Space>
            </div>
          </Col>
        </Row>
      </Card>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} md={16}>
          <Card size="small" title="Thông tin sản phẩm" bordered={false}>
            <S.ProductContent
              dangerouslySetInnerHTML={{
                __html: productDetail.data.content,
              }}
            ></S.ProductContent>
          </Card>
          <Card
            title="Bình luận & nhận xét"
            size="small"
            bordered={false}
            style={{ marginTop: 16 }}
          >
            {userInfo.data.id && (
              <Form
                form={reviewForm}
                name="reviewForm"
                layout="vertical"
                onFinish={(values) => handleReview(values)}
                autoComplete="off"
                style={{ padding: 12, borderRadius: 6, background: "#f0f2f5" }}
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
            )}
            {renderReviewList}
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card size="small" title="Cấu hình" bordered={false}>
            Cấu hình
          </Card>
        </Col>
      </Row>

      <p>Sản phẩm tương tự</p>
      <Row gutter={[16, 16]}>{renderProductList}</Row>
    </S.ProductDetailWrapper>
  );
}

export default ProductDetailPage;
