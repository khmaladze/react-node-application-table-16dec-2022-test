import React from "react";
import { Button, Space } from "antd";
import ButtonContainer from "./button.styles";

const AddButton: React.FC<any> = ({ onAdd }: any) => (
  <ButtonContainer>
    <h3>Add Table Row</h3>
    <Space wrap>
      <Button type="primary" onClick={() => onAdd(true)}>
        add row
      </Button>
    </Space>
  </ButtonContainer>
);

export default AddButton;
