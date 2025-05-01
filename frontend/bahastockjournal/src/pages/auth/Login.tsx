import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { UserAPI } from '../../common/ServerBackEnd';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginValues } from '../../Types/Auth';



const Login: React.FC = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {

      navigate('/');
    }
  }, [navigate]);

  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Required'),
  });

  const handleSubmit = async (values: LoginValues) => {


    try {
      const response = await axios({
        method: UserAPI.Login_User.method,
        url: UserAPI.Login_User.url,
        data: values,
      })



      const { token } = response.data;


      localStorage.setItem('token', token);


      const expiresIn = Math.floor(Date.now() / 1000) + 3600;
      localStorage.setItem('expiresIn', expiresIn.toString());



      navigate('/');

    } catch (error: any) {
      toast.error(`Login error: ${error.response.data.message}`);


    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2e3446]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">Login to BahaaStockJournal</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {
            () => (
              <Form className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email Address"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                </div>
                <div className="flex items-center justify-between">
                  <Link to={'/forgot-password'} className="text-sm text-blue-500 hover:underline">Forgot password?</Link>
                  <Link to={'/register'} className="text-md font-semibold text-blue-500 hover:underline">Register</Link>
                </div>
                <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Login</button>
              </Form>
            )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
