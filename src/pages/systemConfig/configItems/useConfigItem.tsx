import { ReactNode, useMemo } from "react";
import { SystemConfigurationType } from "../../../types/entities/SystemConfiguration";
import { OverdueTodosPolicy } from "./OverdueTodosPolicy";

type ConfigItemType = {
  key: keyof SystemConfigurationType;
  content: ReactNode;
  caption: ReactNode;
  info?: ReactNode;
};

export const useConfigItem = (
  onChange: (value: any) => void,
  systemConfig?: SystemConfigurationType
) => {
  const items = useMemo(
    (): ConfigItemType[] => [
      {
        key: "overdueTodosPolicy",
        content: (
          <OverdueTodosPolicy
            value={systemConfig?.overdueTodosPolicy}
            onChange={(value) =>
              onChange({ ...(systemConfig || {}), overdueTodosPolicy: value })
            }
          />
        ),
        caption: "Overdue todos policy"
      }
    ],
    [onChange, systemConfig]
  );

  return {
    getItem: (itemKey: string) => items.find(({ key }) => itemKey === key)
  };
};
