import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Authentication = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isSignInForm) {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/register`,
          {
            name,
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        setName('');
        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/users/login`,
          {
            email,
            password,
          },
          {
            withCredentials: true,
          }
        );
        setEmail('');
        setPassword('');
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error('Authentication error:', err);
    }
  };

  const toggleButton = () => {
    setIsSignInForm(!isSignInForm);
    setError('');
  };

  return (
    <div className='relative min-h-screen bg-gray-800'>
      <div>
        <img
          className='absolute object-cover w-full h-full'
          src='https://img.freepik.com/free-photo/mid-century-modern-living-room-interior-design-with-monstera-tree_53876-129804.jpg?t=st=1733988938~exp=1733992538~hmac=3282c67894cd1f5af5e8800f095bb4d2c8a00a169c38e3591c5ba2be38f7df8c&w=996'
          alt='Background'
        />
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-3/12 bg-black absolute left-0 right-0 my-36 mx-auto p-7 rounded-md bg-opacity-80'
      >
        <h1 className='font-bold text-white text-2xl pb-2'>
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </h1>

        {!isSignInForm && (
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Full Name'
            className='p-2 my-2 w-full rounded text-black'
            required
          />
        )}
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email or phone number'
          className='p-2 my-2 w-full rounded text-black'
          required
        />
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='p-2 my-2 w-full rounded text-black'
          required
        />
        <button
          className='p-2 my-4 w-full bg-red-600 rounded text-white'
          type='submit'
        >
          {isSignInForm ? 'Sign In' : 'Sign Up'}
        </button>
        <p
          className='text-white font-bold py-4 cursor-pointer hover:text-blue-400'
          onClick={toggleButton}
        >
          {isSignInForm
            ? "Don't have an account? Sign Up Now"
            : 'Already registered? Sign In Now'}
        </p>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </form>
    </div>
  );
};

export default Authentication;
