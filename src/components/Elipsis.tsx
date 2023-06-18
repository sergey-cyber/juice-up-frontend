import { Popover, Typography } from "antd";
import { TextProps } from "antd/es/typography/Text";
import { TitleProps } from "antd/es/typography/Title";
import React from "react";
import { PropsWithChildren, useCallback } from "react";

export function Elipsis(props: PropsWithChildren<{ type?: "Text" | "Title" }>) {
  const { Title, Text } = Typography;

  const Component = useCallback(
    (_props: TextProps | TitleProps) => {
      switch (props.type) {
        case "Text":
          return <Text {..._props} />;
        case "Title":
          return <Title {..._props} />;
        default:
          return <Text {..._props} />;
      }
    },
    [Text, Title, props.type]
  );

  return (
    <Popover trigger={"hover"} content={props.children}>
      <Component ellipsis>{props.children}</Component>
    </Popover>
  );
}
