import { Button, Form, Input, Modal } from "antd";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { render } from "react-dom";
import { login } from "../network";

export function LoginModal() {
  const [isShowLoginModal, setIsShowLoginModal ] = useState(false)


  useEffect(() => {
    loginLogic()
  })

  function loginLogic() {

    if (!Cookies.get('token')) {
      setIsShowLoginModal(true) 
    }

    try {
      login('13121529304', 'wangliguang')
    } catch (error) {
      debugger
    }
  }

  function renderForm() {
    const onFinish = (values: any) => {
      console.log('Success:', values);
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
    };
  
    return (
      <Form
        labelWrap={true}
        labelAlign={"right"}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
        labelAlign={"right"}
          className="formItem"
          label="手机号"
          name="手机号"
          rules={[{ required: true, message: '请输入您的手机号！' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
        labelAlign={"right"}
        className="formItem"
          label="密码"
          name="密码"
          rules={[{ required: true, message: '请输入你的密码！' }]}
        >
          <Input.Password />
        </Form.Item>
  
      </Form>
    );
  }

  return (
    <Modal
      title="登录注册"
      centered
      visible={isShowLoginModal}
      onOk={() => setIsShowLoginModal(false)}
      onCancel={() => setIsShowLoginModal(false)}
      width={400}
    >
      {renderForm()}
    </Modal>
  )
}