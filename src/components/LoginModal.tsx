import {Button, Form, Input, Modal} from 'antd'
import Cookies from 'js-cookie'
import {useEffect, useState} from 'react'
import {login} from '../network'

export function LoginModal({onSuccess}: {onSuccess: Function}) {
  const [isShowLoginModal, setIsShowLoginModal] = useState(false)

  useEffect(() => {
    loginLogic()
  }, [])

  function loginLogic() {
    if (!Cookies.get('token')) {
      setIsShowLoginModal(true)
    } else {
      onSuccess()
    }
  }

  async function onFinish(data = {mobile: '', password: ''}) {
    try {
      const result = await login(data.mobile, data.password)
      Cookies.set('token', result.token)
      setIsShowLoginModal(false)
      onSuccess(result)
    } catch (error) {}
  }

  function renderForm() {
    return (
      <Form
        labelWrap={true}
        labelAlign={'right'}
        initialValues={{remember: true}}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          labelAlign={'right'}
          className="formItem"
          label="手机号"
          name="mobile"
          rules={[{required: true, message: '请按照正确格式输入您的手机号！', pattern: /^1[3|4|5|7|8][0-9]\d{8}$/}]}
        >
          <Input autoComplete="username" />
        </Form.Item>

        <Form.Item
          labelAlign={'right'}
          className="formItem"
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              pattern: /^(?:\d|[a-zA-Z]|[!@#$%^&*]){6,18}$/,
              message: '密码格式有误，密码由6-18位数字、英文或特殊字符组成!',
            },
          ]}
        >
          <Input.Password autoComplete="current-password" />
        </Form.Item>

        <Form.Item style={{marginBottom: '0px'}}>
          <Button className="submit" type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    )
  }

  return (
    <Modal
      title="登录注册"
      centered
      visible={isShowLoginModal}
      onOk={() => setIsShowLoginModal(false)}
      onCancel={() => setIsShowLoginModal(false)}
      width={400}
      footer={null}
    >
      {renderForm()}
    </Modal>
  )
}
