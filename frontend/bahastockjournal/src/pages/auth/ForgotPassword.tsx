import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserAPI } from '../../common/ServerBackEnd';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [newPassword, setNewPassword] = useState('');
    const [otpResendAttempts, setOtpResendAttempts] = useState(0);
    const [timer, setTimer] = useState(60);
    const navigate = useNavigate();


    useEffect(() => {
        if (step === 2 && timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else if (timer === 0) {
            handleOTPExpiry();
        }
    }, [step, timer]);

    const handleOTPExpiry = () => {
        setOtpResendAttempts((prev) => prev + 1);
        if (otpResendAttempts + 1 >= 3) {
            toast.error('Too many tries, returning to login page.');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } else {
            toast.error('OTP expired. Please request a new OTP.');
            setStep(1);
            setTimer(60);
        }
    };

    const handleSendOTP = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: UserAPI.Forgot_Password.method,
                url: UserAPI.Forgot_Password.url,
                data: {
                    email: email,
                },
            });

            if (response.data.success) {
                toast.success('OTP sent to your email!');
                setStep(2);
                setTimer(60);
            } else {
                toast.error(response.data.message || 'Failed to send OTP.');
            }
        } catch (error) {
            toast.error('Error sending OTP.');
        }
    };

    const handleVerifyOTP = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: UserAPI.Verify_OTP.method,
                url: UserAPI.Verify_OTP.url,
                data: {
                    email: email,
                    otp: otp,
                },
            });

            if (response.data.success) {
                toast.success('OTP verified!');
                setStep(3);
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            toast.error('Invalid OTP.');
        }
    };

    const handleResetPassword = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const response = await axios({
                method: UserAPI.Reset_Password.method,
                url: UserAPI.Reset_Password.url,
                data: {
                    email: email,
                    newPassword: newPassword,
                },
            });

            if (response.data.success) {
                toast.success('Password reset successful!');
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error(response.data.message || 'Error resetting password.');
            }
        } catch (error) {
            toast.error('Error resetting password.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#2e3446] p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                {step === 1 && (
                    <>
                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Forgot Password</h2>
                            <input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">Send OTP</button>
                        </form>
                        <Link to="/login" className="flex justify-center mt-4 font-bold text-lg hover:text-indigo-700 hover:scale-125 transition-all">Login</Link>
                    </>
                )}
                {step === 2 && (
                    <form onSubmit={handleVerifyOTP} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Enter OTP</h2>
                        <input type="text" placeholder="OTP Code" value={otp} onChange={(e) => setOtp(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                        <p className="text-center text-gray-600">Time remaining: {timer} seconds</p>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">Verify OTP</button>
                    </form>
                )}
                {step === 3 && (
                    <form onSubmit={handleResetPassword} className="space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Reset Password</h2>
                        <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">Reset Password</button>
                    </form>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ForgotPassword;