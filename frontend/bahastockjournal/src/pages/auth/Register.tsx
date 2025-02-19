import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserAPI } from '../../common/ServerBackEnd';

interface RegisterValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {

  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {

      navigate('/');
    }
  }, [navigate]);

  const initialValues: RegisterValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(5, 'Password must be at least 5 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Required'),
  });

  const handleSubmit = async (values: RegisterValues, { setSubmitting }: any) => {
    try {

      const response = await axios({
        url: UserAPI.Register_User.url,
        method: UserAPI.Register_User.method,
        data: values,

      });

      console.log('Registration successful:', response.data);
      navigate('/login');

    } catch (error) {

      console.error('Registration failed:', error);
      alert('Registration failed. Please try again.');

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#2e3446]">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-700">Register to BahaaStockJournal</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email Address</label>
                <Field type="email" id="email" name="email" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email Address" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                <Field type="password" id="password" name="password" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">Confirm Password</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Confirm Password" />
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="flex items-center justify-end">
                <Link to={'/login'} className="text-md font-semibold text-blue-500 hover:underline">Login</Link>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                {isSubmitting ? 'Registering...' : 'Register'}
              </button>
            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default Register;
