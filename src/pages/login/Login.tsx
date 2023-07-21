import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useClient } from "../../context/client";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRequest, RegisterRequest } from "../../types/auth/auth";
import { Events, useEvent } from "../../utils/hooks/useEvents";
import { useForm } from "antd/es/form/Form";

export const Login = () => {
  const client = useClient();
  const navigate = useNavigate();
  const { setEvent } = useEvent();
  const [form] = useForm();

  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const onSubmit = useCallback(
    (values: LoginRequest | RegisterRequest) => {
      if (isLogin && "login" in values) {
        return client.auth
          .login(values)
          .then(() => navigate("/"))
          .catch(() => setEvent(Events.LOGIN_FAILURE));
      } else if ("name" in values) {
        return client.auth
          .register(values)
          .then(() => {
            setEvent(Events.REGISTRATION_SUCCESSFUY);
            form.resetFields();
            setIsLogin(true);
          })
          .catch(() => setEvent(Events.REGISTRATION_FAILURE));
      }
      return Promise.reject();
    },
    [client.auth, form, isLogin, navigate, setEvent]
  );

  const onFinish = (values: LoginRequest | RegisterRequest) => {
    setLoading(true);
    onSubmit(values).finally(() => setLoading(false));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      title="Sign in or register"
      centered
      open={true}
      cancelButtonProps={{ style: { display: "none" } }}
      okButtonProps={{ style: { display: "none" } }}
      closable={false}
    >
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Login"
          name={isLogin ? "login" : "name"}
          rules={[{ required: true, message: "Please input your login!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        {!isLogin && (
          <>
            <Form.Item label="E-mail" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Phone number" name="phone">
              <Input />
            </Form.Item>
          </>
        )}

        {isLogin && (
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        )}

        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            {isLogin ? "Sign in" : "Registation"}
          </Button>
        </Form.Item>
      </Form>

      <Button block type="link" onClick={() => setIsLogin(!isLogin)}>
        {isLogin ? "Don't have an account? Go to registration" : "< To sign in"}
      </Button>
    </Modal>
  );
};
