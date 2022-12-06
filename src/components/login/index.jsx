import { Form, Input } from "antd";
import styles from "../register/register.module.css";
import { useAuth } from "../../store/auth-context";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ setIsAuth }) => {
  const { login } = useAuth();
  const onFinish = async (values) => {
    const { email, password } = values;
    try {
      await login(email, password);
      setIsAuth(true);
    } catch {
      toast.error("Invliad Email or Password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="p-5 text-white"
      >
        <form-label>Email</form-label>
        <Form.Item
          className="mb-3 "
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your Email!",
            },
            {
              type: "email",
            },
          ]}
          hasFeedback
        >
          <Input className={styles.input} />
        </Form.Item>

        <form-label>Password</form-label>
        <Form.Item
          className="mb-5"
          name="password"
          rules={[
            {
              required: true,
              message: "Please enter your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password className={styles.input} />
        </Form.Item>

        <Form.Item className="text-center">
          <button type="submit" className="green fw-bold btn text-white  w-100">
            Log in
          </button>
        </Form.Item>
      </Form>
      <ToastContainer limit={2} />
    </>
  );
};

export default Login;
