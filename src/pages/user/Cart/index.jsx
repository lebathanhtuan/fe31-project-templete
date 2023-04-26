import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Steps, Table, Button, Input, Space } from "antd";
import {
  CreditCardOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  updateCartItemAction,
  deleteCartItemAction,
} from "../../../redux/actions";

function CartPage() {
  const dispatch = useDispatch();

  const { cartList } = useSelector((state) => state.cart);

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
    <div>
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
    </div>
  );
}

export default CartPage;
