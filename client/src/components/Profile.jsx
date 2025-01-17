import React, { useRef } from "react";
import { FaCamera } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useAuthStore } from "../store/useAuthStrore";
import ProfileImage from '../assets/images/cat.png'
const Profile = () => {
  const { updateProfile, isUpdatingProfile,authUser } = useAuthStore();
  const imageRef = useRef();
  console.log(authUser);
  
  const handleUplaodImage = (e) => {
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
    <div className="w-full h-[90vh] flex items-center justify-center bg-slate-200 flex-col">
      <div className="bg-white shadow p-5 flex items-center flex-col px-10">
        <div className="flex flex-col gap-3 items-center">
          <div className="w-44 h-44 rounded-full shadow relative ">
            <img
              ref={imageRef}
              src={`${authUser.profilePic ? authUser.profilePic :ProfileImage } `}
              alt="profile"
              className="border-2 border-blue-800 w-full h-full object-cover rounded-full"
            />
            <label
              htmlFor="upload"
              className="cursor-pointer absolute -right-4 bottom-0 bg-blue-100 p-4 rounded-full"
            >
              <FaCamera className="text-blue-600" size={15} />
            </label>
            <input
              type="file"
              name="upload"
              id="upload"
              accept="image/*"
              hidden
              onChange={handleUplaodImage}
              disabled={isUpdatingProfile}
            />
          </div>
          <p className="text-center">{isUpdatingProfile && 'uploading ...'}</p>
          <h1 className="text-center font-bold capitalize text-blue-600">
          {authUser && authUser.username }
          </h1>
          <h2 className="text-center text-zinc-600 flex items-center gap-2">
            <MdEmail className="text-zinc-600" size={20} /> {authUser && authUser.email}
          </h2>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
