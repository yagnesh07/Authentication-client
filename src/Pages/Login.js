import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { useRecoilState } from 'recoil';
import styled from "styled-components";
import { userState } from '../state/userState';
import { LOGIN_ROUTE } from '../Utils/ApiRoutes';

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [, setUser] = useRecoilState(userState)
  const { register, formState: { errors }, handleSubmit } = useForm();

  useEffect(() => {
    if (Cookies.get("adriux_test")) navigate("/dashboard");
  }, [])

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  function sleep(ms) {
    return new Promise((val) => setTimeout(val, ms));
  }

  const onSubmit = async (data) => {
    console.log("data", data)
    setLoading(true)
    const result = await axios
      .get(
        LOGIN_ROUTE,
        { params: { email: data.email, password: data.password } },
        {
          withCredentials: true,
        }
      )
      .catch((error) => {
        setLoading(false)
        if (error.response.status === 400) {
          toast.error(`Invalid Credentials`, toastOptions);
        } else console.log(error);
      });
    if (result?.status === false) {
      setLoading(false)
      toast.error(result.msg, toastOptions);
    }
    if (result?.status === 200) {
      console.log("result", result)
      Cookies.set("adriux_test", result.data._id, { expires: 1 });
      setUser(result.data)
      toast.success("Login Sucessfull", toastOptions);
      await sleep(3000);
      setLoading(false)
      navigate("/dashboard");
    }
  }

  return (
    <Parent>
      <LoginContainer>
        <h2>Login</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Label htmlFor="email">Email</Label>
          <Input type="email" placeholder="Enter email" {...register("email", {
            required: "Email Address is required", pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "invalid email address"
            }
          })}
          />
          {errors.email && <Invalid role="alert">{errors.email?.message}</Invalid>}

          <Label htmlFor="password">Password</Label>
          <Input type="password" placeholder="Enter password" {...register("password", { required: "Password is required", minLength: { value: 8, message: "Min 8 character required" } })} />
          {errors.password && <Invalid role="alert">{errors.password?.message}</Invalid>}
          <ForgotPassword>Forgot password?</ForgotPassword>

          <Button disabled={loading} type="submit">{loading ? "Loading..." : "Login"}</Button>

          <SignUp>Don&apos;t have an account? <Link to="/register">Register</Link></SignUp>
        </Form>
      </LoginContainer>
      <ToastContainer />
    </Parent>
  )
}


const Parent = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
`;

const LoginContainer = styled.div`
  background-color: #fff;
  padding: 0 30px 30px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  min-width: 400px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin: 16px 0 8px;
  display: flex;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 16px;
  width: 95%;
  &:focus {
    outline: none;
    border: 1px solid #0077cc;
  }
`;

const Button = styled.button`
  background-color: rgba(0,0,0,0.9);
  color: #fff;
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0,0,0);
  }
`;

const ForgotPassword = styled.a`
  font-size: 14px;
  color: #000;
  margin: 8px;
  text-decoration: none;
  text-align: end;
  cursor: pointer
`;

const SignUp = styled.a`
  font-size: 14px;
  color: #000;
  margin-top: 16px;
  text-decoration: none;
`;

const Invalid = styled.p`
  text-align: left;
  color: red;
  margin: 0;
`
export default Login