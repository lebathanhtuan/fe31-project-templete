import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Steps, Table, Button, Input, Space, Row, Col, Card } from "antd";
import {
  CreditCardOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import { ROUTES } from "../../../constants/routes";
import {
  updateCartItemAction,
  deleteCartItemAction,
} from "../../../redux/actions";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartList } = useSelector((state) => state.cart);

  // let cartTotalPrice = 0;

  // cartList.forEach((item) => {
  //   cartTotalPrice = cartTotalPrice + item.price * item.quantity;
  // });

  const cartTotalPrice = cartList.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tableColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, item) => (
        <Space.Compact>
          <Button
            onClick={() =>
              dispatch(
                updateCartItemAction({
                  id: item.id,
                  quantity: quantity > 1 ? quantity - 1 : 1,
                })
              )
            }
            icon={<MinusOutlined />}
          />
          <Input value={quantity} readOnly style={{ width: 50 }} />
          <Button
            onClick={() =>
              dispatch(
                updateCartItemAction({
                  id: item.id,
                  quantity: quantity + 1,
                })
              )
            }
            icon={<PlusOutlined />}
          />
        </Space.Compact>
      ),
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VND`,
    },
    {
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Button onClick={() => dispatch(deleteCartItemAction({ id: item.id }))}>
          Xóa
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Steps
        current={0}
        items={[
          {
            title: "Giỏ hàng",
            icon: <ShoppingCartOutlined />,
          },
          {
            title: "Thông tin giao hàng",
            icon: <SolutionOutlined />,
          },
          {
            title: "Thanh toán",
            icon: <CreditCardOutlined />,
          },
          {
            title: "Hoàn tất",
            icon: <CheckCircleOutlined />,
          },
        ]}
      />
      <Table
        columns={tableColumn}
        dataSource={cartList}
        rowKey="id"
        pagination={false}
      />
      <Row justify="end">
        <Col span={8}>
          <Card size="small" title="Tổng tiền">
            {cartTotalPrice.toLocaleString()} VND
          </Card>
        </Col>
      </Row>
      <Row justify="end">
        <Button
          type="primary"
          disabled={cartList.length === 0}
          onClick={() => navigate(ROUTES.USER.CHECKOUT_INFO)}
        >
          Tiếp theo
        </Button>
      </Row>
    </div>
  );
}

export default CartPage;
