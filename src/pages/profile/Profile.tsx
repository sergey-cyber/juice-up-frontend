import { Avatar, Col, Row, Space, Typography } from "antd";
import { authApi } from "../../store/services/Auth";
import { UserOutlined } from "@ant-design/icons";

export const Profile = () => {
  const { data: user } = authApi.useWhoAmIQuery("");

  if (!user) {
    return <>User not found</>;
  }

  return (
    <Space direction="vertical">
      <Row gutter={24}>
        <Col>
          <Avatar
            size={{ xs: 100, sm: 100, md: 120, lg: 120, xl: 150, xxl: 200 }}
            src={user.avatar}
            icon={user.avatar ? undefined : <UserOutlined />}
          />
        </Col>
        <Col>
          <Typography.Title level={5} style={{ margin: 0 }}>
            {user.name}
          </Typography.Title>
          <Typography.Paragraph type="secondary">
            {user.email}
          </Typography.Paragraph>
          <Typography.Paragraph type="secondary">
            {user.phone}
          </Typography.Paragraph>
        </Col>
      </Row>
    </Space>
  );
};
