import { useEffect, useState } from 'react'
import usePostStore from '../store/PostStor';
import UseShowToast from './UseShowToast';
import useuserProfileStore from '../store/UserProfileStore';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const  useGetUserpost = ()  => {
const [isLoading, setIsLoading] = useState(true);
const {Posts, setPosts} = usePostStore();
const showToast = UseShowToast();
const userProfile = useuserProfileStore((state) => state.userProfile);
 


useEffect(() => {
const getPosts = async () => {
      if (!userProfile) return ;
      setIsLoading(true);
      setPosts([]);
      
      
      try {
      const q= query(collection(firestore,"Posts"),where("createdBy", "==", userProfile.uid));
      const  querySnapshot = await getDocs(q);

      const  Posts = [];
      

      querySnapshot.forEach((doc) => {
         Posts.push({ ...doc.data(), id:doc.id});
      });
      Posts.sort((a, b) => b.createdAt - a.createdAt);
      setPosts(Posts);

      } catch (error) {
      showToast ("Error ", error.message, "error");
      setPosts([]);
      
      } finally{
      setIsLoading(false);
      }

    };

    
    getPosts();
 }, [setPosts, userProfile, showToast]);

 return {isLoading, Posts};







};

export default useGetUserpost ;