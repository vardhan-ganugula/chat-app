import React, { useRef } from "react";
import { useAuthStore } from "../store/useAuthStrore";
import { Camera, Mail, Loader2 } from "lucide-react";
import profilePic from '../assets/images/cat.png'

const Profile = () => {
  const { updateProfile, isUpdatingProfile, authUser } = useAuthStore();
  const imageRef = useRef();

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async () => {
      const base64Image = fileReader.result;
      imageRef.current.src = base64Image;
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-[90vh] bg-gradient-to-b from-blue-50 to-white p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl">
        <div className="p-8">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full overflow-hidden ring-4 ring-blue-100 ring-offset-2">
                <img
                  ref={imageRef}
                  src={authUser?.profilePic || profilePic}
                  alt={`${authUser?.username}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <label
                htmlFor="upload"
                className="absolute bottom-2 right-2 p-3 bg-blue-600 hover:bg-blue-700 
                         text-white rounded-full cursor-pointer shadow-lg 
                         transform transition-all duration-200 hover:scale-105"
              >
                <Camera className="w-5 h-5" />
              </label>
              <input
                type="file"
                id="upload"
                accept="image/*"
                className="hidden"
                onChange={handleUploadImage}
                disabled={isUpdatingProfile}
              />
            </div>

            {isUpdatingProfile && (
              <div className="flex items-center space-x-2 text-blue-600">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Updating profile...</span>
              </div>
            )}

            <div className="space-y-4 w-full text-center">
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {authUser?.username || "Loading..."}
              </h1>
              
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{authUser?.email || "Loading..."}</span>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;