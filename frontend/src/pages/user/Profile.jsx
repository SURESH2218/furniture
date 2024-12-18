import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, changePassword } from '../../redux/slices/userSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        country: user.country || '',
        postalCode: user.postalCode || '',
      });
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profileData));
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords don't match");
      return;
    }
    dispatch(
      changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      })
    );
  };

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        Loading...
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-3xl font-bold mb-6'>My Profile</h1>
      {error && <p className='text-red-500 mb-4'>{error}</p>}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <form
          onSubmit={handleProfileSubmit}
          className='bg-white shadow-md rounded-lg p-6'
        >
          <h2 className='text-xl font-semibold mb-4'>Personal Information</h2>
          <div className='grid grid-cols-1 gap-4'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Name
              </label>
              <input
                type='text'
                id='name'
                name='name'
                value={profileData.name}
                onChange={handleProfileChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={profileData.email}
                onChange={handleProfileChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='phone'
                className='block text-sm font-medium text-gray-700'
              >
                Phone
              </label>
              <input
                type='tel'
                id='phone'
                name='phone'
                value={profileData.phone}
                onChange={handleProfileChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='address'
                className='block text-sm font-medium text-gray-700'
              >
                Address
              </label>
              <input
                type='text'
                id='address'
                name='address'
                value={profileData.address}
                onChange={handleProfileChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='city'
                className='block text-sm font-medium text-gray-700'
              >
                City
              </label>
              <input
                type='text'
                id='city'
                name='city'
                value={profileData.city}
                onChange={handleProfileChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='state'
                className='block text-sm font-medium text-gray-700'
              >
                State
              </label>
              <input
                type='text'
                id='state'
                name='state'
                value={profileData.state}
                onChange={handleProfileChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='country'
                className='block text-sm font-medium text-gray-700'
              >
                Country
              </label>
              <input
                type='text'
                id='country'
                name='country'
                value={profileData.country}
                onChange={handleProfileChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='postalCode'
                className='block text-sm font-medium text-gray-700'
              >
                Postal Code
              </label>
              <input
                type='text'
                id='postalCode'
                name='postalCode'
                value={profileData.postalCode}
                onChange={handleProfileChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
          </div>
          <button
            type='submit'
            className='mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300'
          >
            Update Profile
          </button>
        </form>

        <form
          onSubmit={handlePasswordSubmit}
          className='bg-white shadow-md rounded-lg p-6'
        >
          <h2 className='text-xl font-semibold mb-4'>Change Password</h2>
          <div className='grid grid-cols-1 gap-4'>
            <div>
              <label
                htmlFor='currentPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Current Password
              </label>
              <input
                type='password'
                id='currentPassword'
                name='currentPassword'
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='newPassword'
                className='block text-sm font-medium text-gray-700'
              >
                New Password
              </label>
              <input
                type='password'
                id='newPassword'
                name='newPassword'
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm New Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                name='confirmPassword'
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
              />
            </div>
          </div>
          <button
            type='submit'
            className='mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300'
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
