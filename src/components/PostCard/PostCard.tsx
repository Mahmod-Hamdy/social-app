import {
  ChevronDown,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import type { PostCardInterface, TopComment } from "../../types/postCard.types";
import { Link } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import PostComment from "./PostComment";
import { getPostComments } from "../../services/comments.service";
import { AlertDialog, Button, Dropdown, Label } from "@heroui/react";
import { UserContext, type UserContextType } from "../Contexts/User Context/UserContext";
import EditPost from "./EditPost";
import { deletePost } from "../../services/post.service";
import toast from "react-hot-toast";

export default function PostCard({ post , getAllPost}: {getAllPost:()=>void , post: PostCardInterface }) {
// export default function PostCard({ post , }: {  post: PostCardInterface }) {
  const [allComments, setAllComments] = useState<TopComment[] | []>([]);
  const [visibleComments, setVisibleComments] = useState(2);
  const {userDetails} : UserContextType=useContext(UserContext)
  const [showEditPost, setShowEditPost] = useState(false)
  const [showDeleteDialouge, setShowDeleteDialouge] = useState<boolean>(false)
  // const restOfComments = allComments.filter((comment)=>comment._id !== post.topComment._id)
  const restOfComments = allComments.filter(
    (comment) => comment != null && comment._id !== post.topComment?._id,
  );

  async function getComments(postId: string) {
    try {
      const { data } = await getPostComments(postId);
      console.log(data.data.comments, "comments");
      setAllComments(data.data.comments);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteMyPost(postId: string){
    try {
      const {data} = await deletePost(postId)
      console.log(data)
      toast.success(data.message
      )
      getAllPost();
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getComments(post._id);
  }, [post.id]);
  function handleMoreComments() {
    setVisibleComments(visibleComments + 2);
  }
  return (
    <article className="mx-auto my-3 w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Post creator, timestamp, and privacy */}
      <header className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <img
            className="size-11 shrink-0 rounded-full object-cover ring-2 ring-white"
            src={post.user.photo}
            alt={post.user.name}
          />
          <div className="min-w-0">
            <div className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="truncate text-sm font-semibold text-gray-900">
                {post.user.name}
              </span>
              <span className="truncate text-xs text-gray-500">
                {post.user.username}
              </span>
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-gray-500">
              <span>
                {new Date(post.createdAt).toLocaleString("en-us", {
                  timeStyle: "short",
                  dateStyle: "full",
                })}
              </span>
              <span aria-hidden="true">·</span>
              {/* <PrivacyIcon  size={13} /> */}
              <span>{post.privacy}</span>
            </div>
          </div>
        </div>
        {post.user._id === userDetails?._id? <>
        <Dropdown>
          <Button aria-label="Menu" variant="ghost">
            <MoreHorizontal size={21} />
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
              <Dropdown.Item id="save-post" textValue="Save Post">
                <Label>Save Post</Label>
              </Dropdown.Item>
              <Dropdown.Item onClick={()=>setShowEditPost(true)} id="edit-post" textValue="Edit Post">
                <Label>Edit Post</Label>
              </Dropdown.Item>
              <Dropdown.Item
              onClick={()=>setShowDeleteDialouge(true)}
                id="delete-post"
                textValue="Delete Post"
                variant="danger"
              >
                <Label>Delete Post</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
        </> : ""}
      </header>
      <AlertDialog isOpen={showDeleteDialouge}>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete Post permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                Are you sure , you want to delete the post
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button onClick={()=>setShowDeleteDialouge(false)} slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={()=>deleteMyPost(post._id)} slot="close" variant="danger">
                Delete Project
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
      {/* edit form */}
      {showEditPost?<EditPost getAllPost={getAllPost} postId={post._id} setShowEditPost={setShowEditPost}/>:<>
      {/* Post body */}
      <div className="px-4 pb-3 pt-3 text-sm leading-6 text-gray-800 sm:px-5">
        <p>{post.body}</p>
      </div>
      {/* Post image */}
      {post.image && (
        <>
          <img
            className="block max-h-[520px] w-full bg-gray-100 object-cover"
            src={post.image}
            alt={post.body}
          />
        </>
      )}
      </>}
      {/* Reaction and comment counts */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-xs text-gray-500 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="flex size-[18px] items-center justify-center rounded-full bg-rose-500 text-white">
            <Heart aria-hidden="true" fill="currentColor" size={11} />
          </span>
          <span>{post.likesCount} likes</span>
        </div>
        <div className="flex gap-3">
          <span>{post.commentsCount} comments</span>
          <span>{post.sharesCount} shares</span>
        </div>
      </div>

      {/* Like, comment, and share actions */}
      <div className="mx-4 flex items-center border-y border-gray-200 sm:mx-5">
        <button
          className={`flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium transition hover:bg-gray-50  text-gray-600`}
          type="button"
        >
          <Heart fill={"currentColor"} size={18} />
          Like
        </button>
        <button
          className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          onClick={() => document.getElementById("post-comment")?.focus()}
          type="button"
        >
          <MessageCircle size={18} />
          Comment
        </button>
        <button
          className="flex min-h-11 flex-1 items-center justify-center gap-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
          type="button"
        >
          <Share2 size={18} />
          Share
        </button>
        <Link to={`/main/postDetails/${post._id}`}>View Details</Link>
      </div>

      {/* Comments, with the first comment shown by default */}
      <section aria-label="Comments" className="px-4 pb-4 pt-3 sm:px-5">
        <button
          className="mb-3 flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900"
          type="button"
          // onClick={handleMoreComments}
          onClick={() => setVisibleComments(visibleComments + 1)}
        >
          Show more comments
          <ChevronDown className={`transition-transform"}`} size={16} />
        </button>

        {/*  mapping */}
        {/* {allComments.length > 0 ? (
          allComments.slice(0, visibleComments).map((comment) => {
            return (
              <React.Fragment key={comment._id}>
                <div className="space-y-3 my-3">
                  <div className="flex items-start gap-2.5">
                    <img
                      alt={comment.commentCreator.name}
                      className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                      src={comment.commentCreator.photo}
                    />
                    <div className="min-w-0 rounded-2xl bg-gray-100 px-3 py-2">
                      <div className="flex flex-wrap items-baseline gap-x-1.5">
                        <span className="text-xs font-semibold text-gray-900">
                          {comment.commentCreator.name}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {comment.commentCreator.username}
                        </span>
                      </div>
                      <p className="mt-0.5 break-words text-sm leading-5 text-gray-800">
                        {comment.content}
                      </p>
                      {comment.image && (
                        <>
                          <img
                            src={comment.image}
                            className="w-20 h-20"
                            alt=""
                          />
                        </>
                      )}
                      <span className="mt-1 block text-[11px] text-gray-500">
                        {new Date(comment.createdAt).toLocaleString("en-us", {
                          timeStyle: "short",
                          dateStyle: "full",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <>
            {post.topComment && (
              <>
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <img
                      alt={post.topComment.commentCreator.name}
                      className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                      src={post.topComment.commentCreator.photo}
                    />
                    <div className="min-w-0 rounded-2xl bg-gray-100 px-3 py-2">
                      <div className="flex flex-wrap items-baseline gap-x-1.5">
                        <h2 className="text-green-600 text-sm font-black">
                          Top Comment
                        </h2>
                        <span className="text-xs font-semibold text-gray-900">
                          {post.topComment.commentCreator.name}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {post.topComment.commentCreator.username}
                        </span>
                      </div>
                      <p className="mt-0.5 break-words text-sm leading-5 text-gray-800">
                        {post.topComment.content}
                      </p>
                      {restOfComments &&
                        restOfComments
                          .slice(0, visibleComments)
                          .map((comment) => {
                            return (
                              <React.Fragment key={comment._id}>
                                <div className="space-y-3 my-3">
                                  <div className="flex items-start gap-2.5">
                                    <img
                                      alt={comment.commentCreator.name}
                                      className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                                      src={comment.commentCreator.photo}
                                    />
                                    <div className="min-w-0 rounded-2xl bg-gray-100 px-3 py-2">
                                      <div className="flex flex-wrap items-baseline gap-x-1.5">
                                        <span className="text-xs font-semibold text-gray-900">
                                          {comment.commentCreator.name}
                                        </span>
                                        <span className="text-[11px] text-gray-500">
                                          {comment.commentCreator.username}
                                        </span>
                                      </div>
                                      <p className="mt-0.5 break-words text-sm leading-5 text-gray-800">
                                        {comment.content}
                                      </p>
                                      {comment.image && (
                                        <>
                                          <img
                                            src={comment.image}
                                            className="w-20 h-20"
                                            alt=""
                                          />
                                        </>
                                      )}
                                      <span className="mt-1 block text-[11px] text-gray-500">
                                        {new Date(
                                          comment.createdAt,
                                        ).toLocaleString("en-us", {
                                          timeStyle: "short",
                                          dateStyle: "full",
                                        })}
                                      </span>
                                    </div>
                                    <Button aria-label="Menu" variant="ghost">
                                      <MoreHorizontal size={21} />
                                    </Button>
                                  </div>
                                </div>
                              </React.Fragment>
                            );
                          })}
                      {post.topComment.image && (
                        <>
                          <img
                            src={post.topComment.image}
                            className="w-20 h-20"
                            alt=""
                          />
                        </>
                      )}
                      <span className="mt-1 block text-[11px] text-gray-500">
                        {new Date(post.topComment.createdAt).toLocaleString(
                          "en-us",
                          {
                            timeStyle: "short",
                            dateStyle: "full",
                          },
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        )} */}
        {allComments.length > 0 ? (
          allComments.slice(0, visibleComments).map((comment) => {
            return (
              <React.Fragment key={comment._id}>
                <div className="my-3 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <img
                      alt={comment.commentCreator.name}
                      className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                      src={comment.commentCreator.photo}
                    />
                    <div className="min-w-0 rounded-2xl bg-gray-100 px-3 py-2">
                      <div className="flex flex-wrap items-baseline gap-x-1.5">
                        <span className="text-xs font-semibold text-gray-900">
                          {comment.commentCreator.name}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {comment.commentCreator.username}
                        </span>
                      </div>
                      <p className="mt-0.5 break-words text-sm leading-5 text-gray-800">
                        {comment.content}
                      </p>
                      {comment.image && (
                        <img src={comment.image} className="h-20 w-20" alt="" />
                      )}
                      <span className="mt-1 block text-[11px] text-gray-500">
                        {new Date(comment.createdAt).toLocaleString("en-us", {
                          timeStyle: "short",
                          dateStyle: "full",
                        })}
                      </span>
                    </div>
                    <Dropdown>
          <Button aria-label="Menu" variant="ghost">
            <MoreHorizontal size={21} />
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
              <Dropdown.Item id="edit-comment" textValue="Edit Comment">
                <Label>Edit Comment</Label>
              </Dropdown.Item>
              <Dropdown.Item id="copy-comment" textValue="Copy Comment">
                <Label>Copy Comment</Label>
              </Dropdown.Item>
              <Dropdown.Item
                id="delete-comment"
                textValue="Delete Comment"
                variant="danger"
              >
                <Label>Delete Comment</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        ) : (
          <>
            {post.topComment && (
              <div className="my-3 space-y-3">
                <div className="flex items-start gap-2.5">
                  <img
                    alt={post.topComment.commentCreator.name}
                    className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                    src={post.topComment.commentCreator.photo}
                  />
                  <div className="min-w-0 rounded-2xl bg-gray-100 px-3 py-2">
                    <div className="flex flex-wrap items-baseline gap-x-1.5">
                      <h2 className="text-sm font-black text-green-600">
                        Top Comment
                      </h2>
                      <span className="text-xs font-semibold text-gray-900">
                        {post.topComment.commentCreator.name}
                      </span>
                      <span className="text-[11px] text-gray-500">
                        {post.topComment.commentCreator.username}
                      </span>
                    </div>
                    <p className="mt-0.5 break-words text-sm leading-5 text-gray-800">
                      {post.topComment.content}
                    </p>
                    {post.topComment.image && (
                      <img
                        src={post.topComment.image}
                        className="h-20 w-20"
                        alt=""
                      />
                    )}
                    <span className="mt-1 block text-[11px] text-gray-500">
                      {new Date(post.topComment.createdAt).toLocaleString(
                        "en-us",
                        {
                          timeStyle: "short",
                          dateStyle: "full",
                        },
                      )}
                    </span>
                  </div>
                </div>
              </div>
            )}
            {restOfComments &&
              restOfComments.slice(0, visibleComments).map((comment) => {
                return (
                  <React.Fragment key={comment._id}>
                    <div className="my-3 space-y-3">
                      <div className="flex items-start gap-2.5">
                        <img
                          alt={comment.commentCreator.name}
                          className="mt-0.5 size-8 shrink-0 rounded-full object-cover"
                          src={comment.commentCreator.photo}
                        />
                        <div className="min-w-0 rounded-2xl bg-gray-100 px-3 py-2">
                          <div className="flex flex-wrap items-baseline gap-x-1.5">
                            <span className="text-xs font-semibold text-gray-900">
                              {comment.commentCreator.name}
                            </span>
                            <span className="text-[11px] text-gray-500">
                              {comment.commentCreator.username}
                            </span>
                          </div>
                          <p className="mt-0.5 break-words text-sm leading-5 text-gray-800">
                            {comment.content}
                          </p>
                          {comment.image && (
                            <img
                              src={comment.image}
                              className="h-20 w-20"
                              alt=""
                            />
                          )}
                          <span className="mt-1 block text-[11px] text-gray-500">
                            {new Date(comment.createdAt).toLocaleString(
                              "en-us",
                              {
                                timeStyle: "short",
                                dateStyle: "full",
                              },
                            )}
                          </span>
                        </div>
                        <Dropdown>
          <Button aria-label="Menu" variant="ghost">
            <MoreHorizontal size={21} />
          </Button>
          <Dropdown.Popover>
            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
              <Dropdown.Item id="edit-comment" textValue="Edit Comment">
                <Label>Edit Comment</Label>
              </Dropdown.Item>
              <Dropdown.Item id="copy-comment" textValue="Copy Comment">
                <Label>Copy Comment</Label>
              </Dropdown.Item>
              <Dropdown.Item
                id="delete-comment"
                textValue="Delete Comment"
                variant="danger"
              >
                <Label>Delete Comment</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
          </>
        )}
        {/* Add a comment */}
        <PostComment postId={post._id} getComments={getComments} />
      </section>
    </article>
  );
}
