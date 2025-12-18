import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("✅ Google login successful:", result.user);
        toast.success("গুগল লগইন সফল! / Google login successful!");
        setTimeout(() => {
          navigate("/");
        }, 500);
      })
      .catch((err) => {
        console.error("❌ Google login error:", err);
        console.error("Error code:", err.code);
        console.error("Error message:", err.message);
        
        let errorMessage = "গুগল লগইন ব্যর্থ / Google login failed";
        let helpMessage = "";
        
        if (err.code === "auth/popup-closed-by-user") {
          errorMessage = "পপআপ বন্ধ করা হয়েছে / Popup was closed";
          helpMessage = "আবার চেষ্টা করুন এবং popup বন্ধ করবেন না / Please try again and don't close the popup";
        } else if (err.code === "auth/popup-blocked") {
          errorMessage = "পপআপ ব্লক করা হয়েছে / Popup blocked";
          helpMessage = "Browser settings-এ popup allow করুন / Please allow popups in browser settings";
        } else if (err.code === "auth/unauthorized-domain") {
          errorMessage = "এই ডোমেইন অনুমোদিত নয় / Domain not authorized";
          helpMessage = "Firebase Console-এ localhost add করুন / Add localhost in Firebase Console → Authentication → Settings → Authorized domains";
        } else if (err.code === "auth/operation-not-allowed") {
          errorMessage = "Google Sign-In enable করা হয়নি / Google Sign-In not enabled";
          helpMessage = "Firebase Console → Authentication → Sign-in method → Google → Enable করুন / Enable Google in Firebase Console";
        } else if (err.code === "auth/not-initialized") {
          errorMessage = "Firebase configure করা হয়নি / Firebase not configured";
          helpMessage = ".env.local file check করুন / Please check .env.local file";
        } else {
          errorMessage = err.message || "গুগল লগইন ব্যর্থ / Google login failed";
          helpMessage = "Browser console check করুন (F12) / Please check browser console (F12)";
        }
        
        toast.error(errorMessage, { duration: 5000 });
        
        if (helpMessage) {
          setTimeout(() => {
            toast(helpMessage, {
              duration: 8000,
              icon: '💡',
            });
          }, 2000);
        }
      });
  };

  return (
    <div className="text-center">
      <p className="my-2 font-semibold text-gray-500">OR</p>
      {/* Google */}
      <button
        onClick={handleGoogleSignIn}
        className="btn w-full max-w-xs bg-white text-black border border-gray-300 flex items-center justify-center gap-2 hover:bg-gray-100 transition duration-200"
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="inline-block"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        <span className="font-medium">Login with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
