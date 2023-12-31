import { useState } from 'react';
import UseShowToast from './UseShowToast';
import useAuthStore from '../store/authStore';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import usePostStore from '../store/PostStor';

const  usePostComments = () => {
  const [isCommenting, setIsCommenting ]= useState(false);
  const showToast = UseShowToast();
  const authUser = useAuthStore ((state) =>  state.user);
  const addcomment = usePostStore ((state) => state.addcomment )

  const handlePostComment = async ( postId, comment ) => {
 if (isCommenting) return ;
 if (!authUser) return showToast("Error", "you must logged to comment", "error");
 setIsCommenting(true);
 const newComment ={
    comment,
    createdAt: Date.now(),
	createdBy: authUser.uid,
    postId,
};
  

 try {
   const postRef = doc(firestore, "Posts", postId);
   await updateDoc(postRef, {
    comments: arrayUnion(newComment)
   })
  
    addcomment(postId, newComment);
   
    
 } catch (error) {
  showToast("Error" , error.message, "error");
    
 }finally{
    setIsCommenting(false);
 }





  };
  return {isCommenting, handlePostComment};
}

export default usePostComments;