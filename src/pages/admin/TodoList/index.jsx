import { Form, Input, Card, Button } from "antd";

function TodoList() {
  return (
    <div>
      <Card>
        <Form
          name="todolist"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onFinish={(values) => console.log(values)}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Email là bắt buộc!",
              },
              {
                type: "email",
                message: "Email không đúng định dạng!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            validateFirst
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Title là bắt buộc!",
              },
              {
                min: 3,
                type: "string",
                message: "Title phải dài hơn 3 kí tự",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Content" name="content">
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: "Số điện thoại không đúng định dạng",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default TodoList;
