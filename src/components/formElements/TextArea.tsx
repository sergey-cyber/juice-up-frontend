import { Form, Input } from "antd";
import { CSSProperties } from "react";

export const TextArea = (props: {
  style?: CSSProperties;
  name?: string;
  label?: string;
}) => {
  return (
    <Form.Item
      name={props.name || "description"}
      label={props.label || "Description"}
    >
      <Input.TextArea style={{ minHeight: "15vh", ...props.style }} />
    </Form.Item>
  );
};
