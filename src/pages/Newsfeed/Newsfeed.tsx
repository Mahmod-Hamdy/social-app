import Sidebar from '../../components/Sidebar/Sidebar'
import SuggestedFriends from '../../components/Suggested Friends/SuggestedFriends'
import PostCard from '../../components/PostCard/PostCard'
import axios from 'axios'
import { getUserFeed } from '../../services/feed.service'
import React, { useEffect, useState } from 'react'
import type { PostCardInterface } from '../../types/postCard.types'
import SkeletonPost from '../../components/PostCard/SkeletonPost'
import CreatePost from '../../components/PostCard/CreatePost'
import { useQuery } from '@tanstack/react-query'


function Newsfeed() {

  const [posts, setPosts] = useState<PostCardInterface[] | []>([]);
  const [isLoading, setIsLoading] = useState(true)
  async function getAllPost(){
    try {
      const {data}=await getUserFeed()
      console.log(data)
      setPosts(data.data.posts);
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.log(error.response?.data.message)
      }
    }finally{
      setIsLoading(false)
    }
  }
    useEffect(()=>{
    getAllPost()
  },[])
  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='grid grid-cols-1 gap-5 lg:grid-cols-12'>
        <div className="hidden lg:col-span-2 lg:block">
          <Sidebar/>
        </div>
        <div className="col-span-7">
        <CreatePost getAllPost={getAllPost}/>
        {/* <CreatePost /> */}
        {isLoading? <SkeletonPost/>: posts.map((post)=>{
            return<React.Fragment key={post._id}>
            <PostCard post={post} getAllPost={getAllPost}/>
            {/* <PostCard post={post}/> */}
            </React.Fragment>
          })}
        </div>
        {/* <main className="min-w-0 space-y-5 lg:col-span-7">
          {posts.map((post)=>{
            return<React.Fragment key={post._id}>
            <PostCard post={post}/>
            </React.Fragment>
          })}
          
        </main> */}
        <div className="hidden lg:col-span-3 lg:block">
          <SuggestedFriends/>
        </div>
      </div>
    </div>
  )
}

export default Newsfeed
