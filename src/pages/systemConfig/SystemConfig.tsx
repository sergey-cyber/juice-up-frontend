import { systemConfigurationApi } from "../../store/services/SystemConfiguration";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useConfigItem } from "./configItems/useConfigItem";
import { Button, Collapse, Popover, Space } from "antd";
import { useCallback, useMemo, useState } from "react";
import { SystemConfigurationType } from "../../types/entities/SystemConfiguration";

interface Props {
  initialData: SystemConfigurationType;
}

export const SystemConfig = ({ initialData }: Props) => {
  const [updadteSystemConfig, { isLoading: isUpdating }] =
    systemConfigurationApi.useUpdateSystemConfigMutation();

  const [changes, setChanges] = useState(initialData);

  const { getItem } = useConfigItem((value) => setChanges(value), changes);

  const items = useMemo(
    () =>
      Object.keys(changes || {})
        .map((key) => ({
          ...getItem(key)
        }))
        .filter(({ key }) => !!key),
    [changes, getItem]
  );

  const save = useCallback(
    () => changes && updadteSystemConfig(changes),
    [changes, updadteSystemConfig]
  );

  return (
    <Space size={24} style={{ width: "100%" }} direction="vertical">
      <Collapse>
        {items.map(({ caption, content, info }, i) => (
          <Collapse.Panel
            extra={
              info ? (
                <Popover content={info} trigger="click">
                  <InfoCircleOutlined />
                </Popover>
              ) : null
            }
            key={i}
            header={caption}
          >
            {content}
          </Collapse.Panel>
        ))}
      </Collapse>

      <Button loading={isUpdating} onClick={save} type="primary">
        Save
      </Button>
    </Space>
  );
};
