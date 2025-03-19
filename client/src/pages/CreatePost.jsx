import React from "react";
import { Button, FileInput, Select, TextInput } from "flowbite-react";
import  LexicalEditor from '../components/LexicalEditor.jsx'
export default function CreatePost() {
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
          <Select >
            <option value="uncategorized">Category</option>
            <option value="technology">Technology</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="food">Food</option>
          </Select>
        </div>
        <div className="flex items-center justify-between gap-4 p-[2px] rounded-lg border-gray-300 border">
          <div className="w-full p-3 bg-white rounded-md">
            <FileInput type="file" accept="image/*" className="w-full cursor-pointer" />
            <Button type="button" gradientDuoTone="tealToLime" size="sm" className="mt-2"outline>Upload Image</Button>
          </div>
        </div>
        <LexicalEditor required/>
        <Button
          type="submit"
          gradientDuoTone="tealToLime"
          >
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
