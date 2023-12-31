import  { useEffect, useState } from 'react'
import usePostStore from '../store/PostStor';
import useAuthStore from '../store/authStore';
import UseShowToast from './UseShowToast';
import useuserProfileStore from '../store/UserProfileStore';
import { collection,getDocs,query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const  useGetFeedPost = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {Posts, setPosts} = usePostStore();
  const authUser = useAuthStore((state) => state.user );
  const showToast = UseShowToast();
  const {setUserProfile} = useuserProfileStore();

  useEffect(() => {
    const getFeedPost = async ( ) =>{
        setIsLoading(true);
        if (authUser.following.length === 0){
            setIsLoading(false)
            setPosts([])
            return
        }
        const q = query(collection(firestore, "Posts"), where("createdBy", "in", authUser.following))
        try {
            const querySnapshot = await getDocs(q);4
            const feedPosts = [];


            querySnapshot.forEach(doc => {
               feedPosts.push({id:doc.id, ...doc.data()}) 
              })
              feedPosts.sort((a,b) => b.createdAt - a.createdAt)
              setPosts(feedPosts)
            
        } catch (error) {
            showToast("Error", error.message, "error")
            
        }finally{
            setIsLoading(false)
        }
        

    };
    if (authUser)  getFeedPost();

  }, [authUser,showToast, setPosts, setUserProfile ])

return {isLoading, Posts};

}

export default useGetFeedPost