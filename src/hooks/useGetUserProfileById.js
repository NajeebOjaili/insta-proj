import  { useState } from 'react'
import UseShowToast from './UseShowToast';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../firebase/firebase';

const useGetUserProfileById = (userId) =>  {
    const [isLoading , setIsLoading] = useState(true); 
    const [userProfile , setUserProfile] = useState(null);
    const showToast = UseShowToast();
  
    useEffect(() => {
        const getUserProfile = async () => {
        setIsLoading(true);
        setUserProfile(null);
        
        
        try {
            const userRef = await getDoc(doc(firestore, "users", userId));
            if (userRef.exists()){
            setUserProfile(userRef.data());

        }
            
        } catch (error) {
            showToast("Error", error.message, "error");

            
        }finally{
            setIsLoading(false);
        }

        };
        getUserProfile();
    }, [showToast, setUserProfile, userId]);

    return {isLoading, userProfile, setUserProfile}
}

export default useGetUserProfileById