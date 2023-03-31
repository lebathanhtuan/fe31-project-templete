import { Fragment, useState, useMemo, useEffect } from "react";
import { Form, Input, Card, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import TodoItem from "./TodoItem";

import { addToDoAction } from "../../../redux/actions";

function TodoList() {
  const [text, setText] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [addForm] = Form.useForm();

  const { todoList } = useSelector((state) => state.todo);

  const filterTodoList = useMemo(
    () =>
      todoList.filter((item) =>
        item.title.toLowerCase().includes(searchKey.toLowerCase())
      ),
    [searchKey, todoList]
  );

  const dispatch = useDispatch();

  const renderToDoList = useMemo(() => {
    console.log("render");
    return filterTodoList.map((item) => {
      return (
        <Fragment key={item.id}>
          <TodoItem id={item.id} title={item.title} content={item.content} />
        </Fragment>
      );
    });
  }, [filterTodoList]);

  return (
    <div>
      <Card size="small">
        <Form
          name="addTodo"
          form={addForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={(values) => {
            dispatch(addToDoAction(values));
            // dispatch({
            //   type: 'ADD_TO_DO',
            //   payload: values
            // })
            addForm.resetFields();
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
          <Button type="primary" htmlType="submit" block>
            Add
          </Button>
        </Form>
      </Card>
      <Input
        onChange={(e) => setSearchKey(e.target.value)}
        style={{ marginTop: 16 }}
      />
      {renderToDoList}
      <Input
        onChange={(e) => setText(e.target.value)}
        style={{ marginTop: 16 }}
      />
    </div>
  );
}

export default TodoList;
