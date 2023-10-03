import { Form, Radio } from "antd";
import { OverdueTodosPolicyActions } from "../../../types/entities/SystemConfiguration";

interface Props {
  value?: OverdueTodosPolicyActions;
  onChange: (value: OverdueTodosPolicyActions) => void;
}

export const OverdueTodosPolicy = ({ value, onChange }: Props) => {
  const localization: { [key in OverdueTodosPolicyActions]: string } = {
    REMOVE: "Remove",
    RESCHEDULE: "Reshedule",
    IGNORE: "Ignore"
  };

  return (
    <Form>
      <Form.Item
        label="Policy actions"
        tooltip="Sets how to deal with overdue todos"
      >
        <Radio.Group
          onChange={({ target }) => onChange(target.value)}
          value={value || OverdueTodosPolicyActions.IGNORE}
        >
          {Object.values(OverdueTodosPolicyActions).map((action) => (
            <Radio key={action} value={action}>
              {localization[action]}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    </Form>
  );
};
