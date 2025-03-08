import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import axios from "axios";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploading, setImageFileUploading] = useState(false);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [formData, setFormData] = useState({});
  const filePickerRef = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);

    if (!imageFile) {
      setImageFileUploadError("No file selected!");
      setImageFileUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET
    ); // Replace with Cloudinary upload preset
    formData.append("cloud_name", import.meta.env.VITE_CLOUDINARY_CLOUD_NAME); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${
          import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
        }/image/upload`, // Replace with your Cloudinary cloud name
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setImageFileUploadProgress(progress);
          },
        }
      );

      // Get uploaded image URL
      const downloadURL = response.data.secure_url;
      setImageFileUrl(downloadURL);
      setFormData({ ...formData, profilePicture: downloadURL });
      console.log(downloadURL);
    } catch (error) {
      setImageFileUploadError(
        "Could not upload image (File must be less than 2MB)"
      );
      setImageFileUploadProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
    } finally {
      setImageFileUploading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          ref={filePickerRef}
          hidden
        />
        <div
          className=" relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root:{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top:0,
                  left:0,
                },
                path: {
                  stroke: `rgba(62, 152, 199, ${
                    imageFileUploadProgress / 100
                  })`,
                }
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className={`rounded-full w-full h-full object-cover border-1 border-[black]
              ${imageFileUploadProgress &&
                imageFileUploadProgress < 100 &&
                'opacity-60'
              }`} 
          />
        </div>

        {uploading && <p className="text-center text-gray-500">Uploading...</p>}
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="tealToLime" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}

/*import { Button, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  useEffect(()=>{
    if(imageFile){
      uploadImage();
    }
  },[imageFile])

  const uploadImage = async () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/user/${userid}`)
    .then((res) => res.json())
    .then((data) => setData(data));
  }
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          ref={filePickerRef}
          hidden
        />
        <div
          className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full object-cover border-1 border-[black] "
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="password" />
        <Button type="submit" gradientDuoTone="tealToLime" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">SignOut</span>
      </div>
    </div>
  );
}*/
/*const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    if (!imageFile) {
      setImageFileUploadError("No file selected!");
      setImageFileUploading(false);
      return;
    }
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        },
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setImageFileUploadProgress(progress);
          },
        }
      );

      if (!response.ok) throw new Error("Upload failed!");

      const data = await response.json();
      //setImageFileUrl(data.secure_url);
      //console.log("Uploaded Image URL:", data.secure_url);

      // Get uploaded image URL
      const downloadURL = data.secure_url;
      setImageFileUrl(downloadURL);
      setFormData({ ...formData, profilePicture: downloadURL });

    } catch (error) {
      console.error("Error uploading image:", error);
      setImageFileUploadError("Could not upload image (File must be less than 2MB)");
      setImageFileUploadProgress(null);
      setImageFile(null);
      setImageFileUrl(null);
    } finally {
      setUploading(false);
    }
  };*/
