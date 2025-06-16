import React, {useEffect, useState} from 'react';
import { Camera, Save, X } from 'lucide-react';
import {Avatar} from "../../../components/atoms/Avatar/Avatar.jsx";
import {useAuth} from "../../auth/contexts/useAuth.jsx";

export const SettingsPage = () => {
    const { userData, updateProfile } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [profileImagePreview, setProfileImagePreview] = useState('');

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        if (userData) {
            setFormData({
                firstName: userData.first_name || '',
                lastName: userData.last_name || '',
                email: userData.email || ''
            });
        }
    }, [userData]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setUpdateError('Image size must be less than 5MB');
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                setUpdateError('Please select a valid image file');
                return;
            }

            setProfileImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setUpdateError('');
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setProfileImagePreview('');
        document.getElementById('profile-image').value = '';
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        setUpdateError('');
        setUpdateSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setUpdateError('');
        setUpdateSuccess('');

        // Basic validation
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim()) {
            setUpdateError('All fields are required');
            setIsLoading(false);
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setUpdateError('Please enter a valid email address');
            setIsLoading(false);
            return;
        }

        try {
            await updateProfile(formData, profileImage);
            setUpdateSuccess('Profile updated successfully!');

            // Clear the profile image state since it's now saved
            setProfileImage(null);
            setProfileImagePreview('');
            document.getElementById('profile-image').value = '';

        } catch (error) {
            console.error('Profile update failed:', error);
            setUpdateError(error.message || 'Failed to update profile. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const getInitials = (firstName, lastName) => {
        const first = firstName?.charAt(0) || '';
        const last = lastName?.charAt(0) || '';
        return `${first}${last}`.toUpperCase();
    };

    // Show loading state while user data is being fetched
    if (!userData) {
        return (
            <div className="min-h-screen bg-black py-8 px-4 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-black py-8 px-4">
            <div className="w-full max-w-md mx-auto bg-black rounded-xl overflow-hidden">
                <div className="bg-black px-6 py-4 ">
                    <h1 className="text-2xl font-bold text-white text-center">Profile Settings</h1>
                </div>

                <div className="p-6">
                    <div className="space-y-6">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative border-2 border-gray-200 rounded-full">
                                {profileImagePreview || userData.profileImage ? (
                                    <div className="relative">
                                        <img
                                            src={profileImagePreview || userData.profileImage}
                                            alt="Profile"
                                            className="w-24 h-24 rounded-full object-cover "
                                        />
                                        <button
                                            type="button"
                                            onClick={removeImage}
                                            className="absolute -top-2 -right-2 bg-white text-black rounded-full p-1 hover:bg-white hover:text-black"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-black  flex items-center justify-center text-white text-xl font-semibold">
                                        {getInitials(userData.firstName, userData.lastName)}
                                    </div>
                                )}

                                <label
                                    htmlFor="profile-image"
                                    className="absolute bottom-0 right-0 bg-white text-black rounded-full p-2 cursor-pointer hover:bg-white hover:text-black "
                                >
                                    <Camera size={16} />
                                </label>
                                <input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={isLoading}
                                />
                            </div>
                            <p className="text-xs text-white text-center">
                                Click the camera icon to upload a new photo
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm font-medium text-white" htmlFor="firstName">
                                    First Name
                                </label>
                                <input
                                    id="firstName"
                                    type="text"
                                    value={userData.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Enter your first name"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-white" htmlFor="lastName">
                                    Last Name
                                </label>
                                <input
                                    id="lastName"
                                    type="text"
                                    value={userData.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Enter your last name"
                                    disabled={isLoading}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-sm font-medium text-white" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={userData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="Enter your email"
                                    disabled={isLoading}
                                    required
                                />
                            </div>
                        </div>

                        {updateError && (
                            <div className="bg-black text-white p-3 rounded-lg text-sm">
                                {updateError}
                            </div>
                        )}

                        {updateSuccess && (
                            <div className="bg-black text-white p-3 rounded-lg text-sm">
                                {updateSuccess}
                            </div>
                        )}

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isLoading}
                            className="w-full bg-white text-black font-medium py-3 px-4 rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
                            ) : (
                                <span className="flex items-center">
                  <Save size={16} className="mr-2" />
                  Save Changes
                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}