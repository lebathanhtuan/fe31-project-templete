import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Steps, Form, Button, Input, Select, Row, Col, Card } from "antd";
import {
  CreditCardOutlined,
  CheckCircleOutlined,
  SolutionOutlined,
  ShoppingCartOutlined,
  MinusOutlined,
  PlusOutlined,
} from "@ant-design/icons";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
} from "../../../redux/actions";

function InfoPage() {
  const [infoForm] = Form.useForm();
  const dispatch = useDispatch();

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );

  const initialValues = {};

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  const handleSubmitInfoForm = (values) => {};

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);

  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

  return (
    <div style={{ padding: 24 }}>
      <Steps
        current={1}
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
      <Card size="small">
        <Form
          name="infoForm"
          form={infoForm}
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => handleSubmitInfoForm(values)}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="Full name" name="fullName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email" name="email">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Phone Number" name="phoneNumber">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="City" name="cityCode">
                <Select
                  onChange={(value) => {
                    dispatch(getDistrictListAction({ cityCode: value }));
                    infoForm.setFieldsValue({
                      districtCode: undefined,
                      wardCode: undefined,
                    });
                  }}
                >
                  {renderCityOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="District" name="districtCode">
                <Select
                  onChange={(value) => {
                    dispatch(getWardListAction({ districtCode: value }));
                    infoForm.setFieldsValue({
                      wardCode: undefined,
                    });
                  }}
                  disabled={!infoForm.getFieldValue("cityCode")}
                >
                  {renderDistrictOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Ward" name="wardCode">
                <Select disabled={!infoForm.getFieldValue("districtCode")}>
                  {renderWardListOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Address" name="address">
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row justify="space-between">
        <Button>Trở lại</Button>
        <Button type="primary">Tiếp theo</Button>
      </Row>
    </div>
  );
}

export default InfoPage;
