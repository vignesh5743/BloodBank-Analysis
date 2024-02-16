import { Button, Form, Input } from "antd";
import { Link , useNavigate} from "react-router-dom";
import React , { useEffect }from "react";
import {message, Radio, Cascader, DatePicker } from "antd";
import OrgHospitalForm from "./OrgHospitalForm";
import "./../../styles/registerstyle.css";
import TextArea from "antd/es/input/TextArea";
import { RegisterUser } from "../../apicalls/users";
// import { Select } from 'antd';
import { useDispatch } from "react-redux";
import { SetLoading } from "../../redux/loadersSlice";
import { getAntdInputValidation } from "../../utils/helpers";
function Register() {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [type, setType] = React.useState("donor");
  const onChange = (date, dateString) => {
    console.log(date, dateString, typeof date, typeof dateString);
  };
 
  const onFinish=async(values)=> {
    if (Array.isArray(values.blood)) {
      values.blood = values.blood[0];
    }
    if (Array.isArray(values.state)) {
      values.state = values.state[0];
    }
    try{
      dispatch(SetLoading(true))
      const response = await RegisterUser({
        ...values,
        userType: type,
      });
      dispatch(SetLoading(false))
      if(response.success) {
       message.success(response.message); 
       navigate("/login");

      }
      else{
          throw new Error(response.message);
      }
    }catch(error){
      dispatch(SetLoading(false))
      message.error(error.message);
    }
  }; 
  
  const options = [
    {
      value: "Andhra Pradesh",
      label: "Andhra Pradesh",
    },
    {
      value: "Arunachal Pradesh",
      label: "Arunachal Pradesh",
    },
    {
      value: "Assam",
      label: "Assam",
    },
    {
      value: "Bihar",
      label: "Bihar",
    },
    {
      value: "Chhattisgarh",
      label: "Chhattisgarh",
    },
    {
      value: "Goa",
      label: "Goa",
    },
    {
      value: "Gujarat",
      label: "Gujarat",
    },
    {
      value: "Haryana",
      label: "Haryana",
    },
    {
      value: "Himachal Pradesh",
      label: "Himachal Pradesh",
    },
    {
      value: "Jharkhand",
      label: "Jharkhand",
    },
    {
      value: "Karnataka",
      label: "Karnataka",
    },
    {
      value: "Kerala",
      label: "Kerala",
    },
    {
      value: "Madhya Pradesh",
      label: "Madhya Pradesh",
    },
    {
      value: "Maharashtra",
      label: "Maharashtra",
    },
    {
      value: "Manipur",
      label: "Manipur",
    },
    {
      value: "Meghalaya",
      label: "Meghalaya",
    },
    {
      value: "Mizoram",
      label: "Mizoram",
    },
    {
      value: "Nagaland",
      label: "Nagaland",
    },
    {
      value: "Odisha",
      label: "Odisha",
    },
    {
      value: "Punjab",
      label: "Punjab",
    },
    {
      value: "Rajasthan",
      label: "Rajasthan",
    },
    {
      value: "Sikkim",
      label: "Sikkim",
    },
    {
      value: "Tamil Nadu",
      label: "Tamil Nadu",
    },
    {
      value: "Telangana",
      label: "Telangana",
    },
    {
      value: "Tripura",
      label: "Tripura",
    },
    {
      value: "Uttar Pradesh",
      label: "Uttar Pradesh",
    },
    {
      value: "Uttarakhand",
      label: "Uttarakhand",
    },
    {
      value: "West Bengal",
      label: "West Bengal",
    },
  ];

  const blood = [
    {
      value: "B+",
      label: "B+",
    },
    {
      value: "A+",
      label: "A+",
    },
    {
      value: "A-",
      label: "A-",
    },
    {
      value: "AB+",
      label: "AB+",
    },
    {
      value: "A1B",
      label: "A1B",
    },
    {
      value: "B-",
      label: "B-",
    },
    {
      value: "O+",
      label: "O+",
    }, 
    {
      value: "O-",
      label: "O-",
    },
    {
      value: "AB-",
      label: "AB-",
    },
    {
      value: "Other",
      label: "Other",
    },
  ];

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  },[])
 
  return (
    <div className="flex h-screen items-center justify-center bg-primary index-container">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid grid-cols-2  p-5 gap-5"
        onFinish={onFinish}
      >
        <h1 className="col-span-2 uppercase text-2xl">
          <span className="text-#EA1179">
            {type.toUpperCase()}-Registration
          </span>
          <hr />
        </h1>

        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="col-span-2"
        >
          <Radio value="donor">Donor</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organisation">Organisation</Radio>
        </Radio.Group>
        {type === "donor" && (
          <>
            {" "}
            <Form.Item label="Name" name="name"
            rules={getAntdInputValidation()}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Age" name="age"
            rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>

            <Form.Item label="Email" name="email"
            rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>

            <Form.Item label="Phone" name="phone"
            rules={getAntdInputValidation()}>
              <Input />
            </Form.Item>

            <Form.Item label="Gender" name="gender"
            rules={getAntdInputValidation()}>
              <Radio.Group>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="Blood group" name="blood"
            rules={getAntdInputValidation()}>
              <Cascader options={blood} placeholder="Please select" />
            </Form.Item>

            <Form.Item label="State" name="state"
            rules={getAntdInputValidation()}>
              <Cascader options={options} placeholder="Please select" />
            </Form.Item>

            <Form.Item label="Password" name ="password"
            rules={getAntdInputValidation()}>
              <Input type="password"/>
            </Form.Item>

            <Form.Item label="Address" name="address"
            rules={getAntdInputValidation()}>
              <TextArea />
            </Form.Item>

            <Form.Item label="DOB" name="DOB"
            rules={getAntdInputValidation()}>
              <DatePicker onChange={onChange} />
            </Form.Item>
          </>
        )}

        {type !== "donor" && <OrgHospitalForm type={type} />}

        <Button type="primary " block className="col-span-2" htmlType="submit">
          Register
        </Button>

        <Link
          to="/login"
          className="col-span-2 text-center text-gray-700 underline"
        >
          Already have account? signin
        </Link>
      </Form>
    </div>
  );
}

export default Register;
