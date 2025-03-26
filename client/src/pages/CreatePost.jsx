import React, { useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import  LexicalEditor from '../components/LexicalEditor.jsx'
import { CircularProgressbar } from "react-circular-progressbar"; 
import 'react-circular-progressbar/dist/styles.css';
export default function CreatePost() {
  const [file,setFiles] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  /*const handleUploadImage = async () => {
    try {
      if(!file){
        return;
      }
      
    } catch (error) {
      console.log(error);
    }
  }*/
    const handleUploadImage = async () => {
      try {
        if (!file) {
          setImageUploadError('Please select an image');
          return;
        }
    
        setImageUploadError(null);
        setImageUploadProgress(0);
    
        // Prepare FormData for Cloudinary
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset',import.meta.env.VITE_REACT_APP_CLOUDINARY_UPLOAD_PRESET); // Set your Cloudinary preset


        // Create a fake progress indicator
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10; // Increment progress
          setImageUploadProgress(progress);
          if (progress >= 90) clearInterval(interval); // Stop near completion
        }, 500);
    
        // Upload to Cloudinary
        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        clearInterval(interval);
    
        const data = await response.json();
    
        if (!response.ok) {
          throw new Error(data.error?.message || 'Image upload failed');
        }
    
        // Get Cloudinary URL
        const imageUrl = data.secure_url;
    
        // Update formData with image URL
        setImageUploadProgress(100);
        setTimeout(() => setImageUploadProgress(null), 1000); // Hide after 1s
        setImageUploadError(null);
        setFormData((prev) => ({ ...prev, image: imageUrl }));
    
      } catch (error) {
        setImageUploadError(error.message || 'Image upload failed');
        setImageUploadProgress(null);
        console.error(error);
      }
    };
    
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl  my-7 font-semibold">Create Post</h1>
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 sm:flex-row justify-between">
          <input
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1 w-full text-4xl font-serif text-gray-700 bg-transparent border-none outline-none focus:ring-0 focus:border-transparent"
            // className="flex-1 outline-none border-none bg-transparent text-4xl placeholder-gray-400"
          />
          <Select>
            <option value="uncategorized">Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="food">Food</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 p-[2px] rounded-lg border-gray-300 border">
          <div className="w-full p-3 bg-white rounded-md">
            <FileInput
              type="file"
              accept="image/*"
              className="w-full cursor-pointer"
              onChange={(e) => setFiles(e.target.files[0])}
            />
            <Button
              type="button"
              gradientDuoTone="tealToLime"
              size="sm"
              className="mt-2"
              outline
              onClick={handleUploadImage}
              disabled={imageUploadProgress}
            >
              {
                imageUploadProgress ? (
                <div className="w-16 h-16">
                  <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0 }%`} />

                </div>
                )
                : ( 'Upload Image'
              )}
            </Button>
          </div>
          {
            imageUploadError && (
              <Alert color="failure">
                {imageUploadError}
              </Alert>
            )
          }
          {
            formData.image && (
              <img src={formData.image} 
              alt="Uploaded" 
              className="w-32 h-32 object-cover rounded-md" />
            )
          }
        </div>
        <LexicalEditor required />
        <Button type="submit" gradientDuoTone="tealToLime">
          Publish
        </Button>
        {/*<div className="flex gap-4 items-center  justify-between border-4 focus:border-gradient-to-r from-teal-400 to-lime-400 p-3">
            <FileInput type='file' accept='image/*'/>
        </div>
          
        <ReactQuill theme="snow" placeholder="Write something amazing..." />*/}
      </form>
    </div>
  );
}
