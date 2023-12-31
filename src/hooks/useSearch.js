
import { useState } from 'react'
import UseShowToast from './UseShowToast';
import { collection,  getDocs, query, where } from 'firebase/firestore'
import { firestore } from '../firebase/firebase'
const useSearch = () => {
  const [isLoading, setIsLoading]= useState(false);
  const [user, SetUser]= useState(null);
  const showToast = UseShowToast();

  const getUserProfile = async ( username ) => {
    setIsLoading(true);
    SetUser(null);
  try {
     const q= query (collection (firestore, "users"), where("username", "==", username));
    
     const querySnapshot = await getDocs (q);
     if (querySnapshot.empty) return showToast("Error", "userNot FOUND", "error");
    
     querySnapshot.forEach((doc) => {
        SetUser(doc.data());
    });
} catch (error) {
    showToast("Error", error.message,"error");
    SetUser(null);

    
} finally{
    setIsLoading(false);
}



  }
return {isLoading, getUserProfile,user, SetUser};
}

export default useSearch;