import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { Button, Form, Input, Select } from "antd";
import { IUser } from "../../store/tableStore";
const { Option } = Select;

type ModalComponent = {
  onAdd: Function;
  onToogle: Function;
  open: boolean;
  data: IUser;
  clearTable: Function;
  onUpdate: Function;
};

const ModalComponent: React.FC<any> = ({
  onAdd,
  onToogle,
  open,
  data,
  clearTable,
  onUpdate,
}: ModalComponent) => {
  const onFinish = (values: any) => {
    if (data) {
      const id = data.id;
      const newValue = { ...values, id };
      onUpdate(newValue);
      clearTable("");
    } else {
      onAdd(values);
    }
    onToogle(false);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      isOpen={open}
      toggle={() => {
        onToogle(false);
        clearTable("");
      }}
    >
      <ModalHeader>
        {data.id ? "update table row" : "add table row"}
      </ModalHeader>
      <ModalBody>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            initialValue={data.name ? data.name : ""}
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            initialValue={data.email ? data.email : ""}
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="gender"
            label="Gender"
            initialValue={data.gender ? data.gender : ""}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Select a option and change input text above"
              allowClear
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Address street"
            name="street"
            initialValue={data.address?.street ? data.address.street : ""}
            rules={[
              {
                required: true,
                message: "Please input your address street!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address city"
            name="city"
            initialValue={data.address?.city ? data.address.city : ""}
            rules={[
              {
                required: true,
                message: "Please input your address city!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="phone"
            name="phone"
            initialValue={data.phone ? data.phone : ""}
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              {data.id ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalComponent;
