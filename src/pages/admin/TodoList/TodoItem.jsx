import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Form, Input, Card, Button, Space } from "antd";

function TodoList({ id, title, content, handleEditToDo, handleRemoveToDo }) {
  const [isEdit, setIsEdit] = useState(false);
  console.log("🚀 ~ file: TodoItem.jsx:7 ~ TodoList ~ isEdit:", isEdit);

  const [editForm] = Form.useForm();

  const renderView = () => {
    return (
      <>
        <div>Title: {title}</div>
        <div>Content: {content}</div>
      </>
    );
  };

  const renderEdit = () => {
    return (
      <Form
        name={`editTodo-${id}`}
        form={editForm}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          title: title,
          content: content,
        }}
        onFinish={(values) => {
          handleEditToDo(id, values);
          setIsEdit(false);
        }}
      >
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
            {
              pattern: /^[A-Z].{0,}$/g,
              message: "Chữ cái đầu tiên phải viết hoa",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Content"
          name="content"
          validateFirst
          rules={[
            {
              required: true,
              whitespace: true,
              message: "Content là bắt buộc!",
            },
            {
              max: 20,
              type: "string",
              message: "Content phải ngắn hơn 20 kí tự",
            },
            {
              pattern: /^[A-Z].{0,}$/g,
              message: "Chữ cái đầu tiên phải viết hoa",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    );
  };

  return (
    <Card size="small" style={{ marginTop: 16 }}>
      {isEdit ? renderEdit() : renderView()}
      <Space>
        {isEdit ? (
          <>
            <Button key="save" type="primary" onClick={() => editForm.submit()}>
              Save
            </Button>
            <Button key="cancel" onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button
            key="Edit"
            type="primary"
            ghost
            onClick={() => setIsEdit(true)}
          >
            Edit
          </Button>
        )}
        <Button danger onClick={() => handleRemoveToDo(id)}>
          Remove
        </Button>
      </Space>
    </Card>
  );
}

export default TodoList;
