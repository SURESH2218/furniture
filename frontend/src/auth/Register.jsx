import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../store/slices/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { confirmPassword, ...userData } = formData;
      await dispatch(registerUser(userData)).unwrap();
      navigate('/home');
    } catch (error) {
      console.error('Registration failed:', error);
      alert(error.message || 'Registration failed');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-xl shadow-md w-96'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Username</label>
            <input
              type='text'
              name='username'
              value={formData.username}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md text-black'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Email</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md text-black'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Password</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md text-black'
              required
            />
          </div>
          <div className='mb-6'>
            <label className='block text-gray-700 mb-2'>Confirm Password</label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full px-3 py-2 border rounded-md text-black'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'
          >
            Register
          </button>
        </form>
        <p className='mt-4 text-center'>
          Already have an account?
          <a href='/login' className='text-blue-500 ml-2'>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
