import { Button, Form, Input,message } from "antd";
import { Link , useNavigate} from "react-router-dom";
import React, { useEffect } from "react";
import { Radio} from "antd";
import "./../../styles/registerstyle.css";
import { LoginUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helpers";
// import { Select } from 'antd';

function Login() {
  const [type, setType] = React.useState("donor");
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try{
      dispatch(SetLoading(true))
      const response = await LoginUser({
        ...values,
        userType: type,
      });
      dispatch(SetLoading(false))
      if(response.success) {
       message.success(response.message); 
       localStorage.setItem('token', response.data);
      navigate('/')
      }
      else{
          throw new Error(response.message);
      }
    }catch(error){
      dispatch(SetLoading(false))
      message.error(error.message);
    }
    console.log(values);
  };

  useEffect(()=>{
    if(localStorage.getItem('token')){
      navigate('/')
    }
  },[])

  return (
    <div className="flex h-screen items-center justify-center bg-primary index-container">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid   p-5 gap-5"
        onFinish={onFinish}
      >
        <h1 className=" uppercase text-2xl">
          <span className="text-#EA1179">
            {type.toUpperCase()}-Login
          </span>
          <hr />
        </h1>

        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className=""
        >
          <Radio value="donor">Donor</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organisation">Organisation</Radio>
        </Radio.Group>



        <Form.Item label="Email" name="email"
        rules={getAntdInputValidation()}
        >
          <Input />
        </Form.Item>


        <Form.Item label="Password" name="password"
         rules={getAntdInputValidation()}
        >
          <Input type="password" />
        </Form.Item>


        <Button type="primary " block className="" htmlType="submit">
          Login
        </Button>

        <Link
          to="/register"
          className=" text-center text-gray-700 underline"
        >
          If Don't have account ? Register
        </Link>
      </Form>
    </div>
  );
}

export default Login;
