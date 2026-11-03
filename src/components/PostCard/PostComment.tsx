import { ImagePlus, Send, X } from "lucide-react";
import React, { useState } from "react";
import { createPostComment } from "../../services/comments.service";
import toast from "react-hot-toast";

function PostComment({postId,getComments}:{postId :string , getComments:(postId :string)=>void}) {
// *for comment body
const [content, setContent] = useState<string>("")
// *for Image comment
const [image, setImage] = useState<File|null>(null)
// *image preview in comment
const [imagePreview, setImagePreview] = useState<string|null>(null)

const formData = new FormData()

function handleImage(e:React.ChangeEvent<HTMLInputElement>){
  const fileImage = e.target.files?.[0]
  if(fileImage){
    setImage(fileImage)
    setImagePreview(URL.createObjectURL(fileImage))
  }
}
async function submitData(e:React.ChangeEvent<HTMLInputElement>){
e.preventDefault()
console.log(content)
formData.append("content",content);
if(image){
  formData.append("image",image)
}
try {
    const {data} = await createPostComment(postId,formData);
    console.log(data)
    toast.success(data.message)
    getComments(postId)
    setContent("")
    setImage(null)
    setImagePreview(null)
} catch (error) {
  console.log(error)
}
}
function clearPreview(){
  setImagePreview(null)
}
  return (
    <>
    <form className="mt-4 flex flex-col gap-2 pb-5">
      <div className="flex items-center gap-2.5">
        <img
          alt="Your profile"
          className="size-8 shrink-0 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=96&h=96&q=80"
        />
        <div className="flex min-w-0 flex-1 items-center rounded-full bg-gray-100 pr-1.5 focus-within:ring-2 focus-within:ring-blue-200">
          <span className="sr-only">Write a comment</span>
          <input
            className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-gray-900 outline-none placeholder:text-gray-500"
            id="post-details-comment"
            placeholder="Write a comment..."
            value={content}
            onChange={(e)=>setContent(e.target.value)}
          />
          <label className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-blue-700 transition hover:bg-blue-100">
            <span className="sr-only">Add an image</span>
            <input
              accept="image/*"
              className="sr-only"
              type="file"
              onChange={(handleImage)}
            />
            <ImagePlus size={16} />
          </label>
          <button
            aria-label="Post comment"
            className="flex size-8 shrink-0 items-center justify-center rounded-full text-blue-700 transition hover:bg-blue-100 disabled:text-gray-400 disabled:hover:bg-transparent"
            type="submit"
            onClick={submitData}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </form>
    {imagePreview && (<>
    <div className=" w-40 h-40 relative">
      <X onClick={clearPreview} className="top-0 left-0 absolute cursor-pointer"/>
      <img className="w-40 h-40 object-cover" src={imagePreview} alt="" />
    </div>
    </>)}
    </>
  );
}

export default PostComment;
