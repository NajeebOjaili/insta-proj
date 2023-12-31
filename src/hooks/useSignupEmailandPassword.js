import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { QuerySnapshot, collection, doc, query, setDoc, where } from "firebase/firestore"; 
import useShowToast from './UseShowToast';
import useAuthStore from '../store/authStore';


const useSignupEmailandPassword = ()=> {
    const [
        createUserWithEmailAndPassword,
        ,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

      const loginUser =useAuthStore(state => state.login);
      const logoutUser =useAuthStore(state => state.logout);
      const showToast = useShowToast ();
      const signup = async (inputs)=>{
        if (!inputs.email || !inputs.password || !inputs.username || !inputs.fullname){
            showToast ('Error', "plese fill all the fields", "error");
            
            return;
        }
          const usersRef = collection(firestore,"users");
          const q =query(usersRef,where("username","==",inputs.username ));
          if (!QuerySnapshot.empty){
            showToast("Error", "Username already exists ","error");
          }
       
       
          try {
           const newUser = await createUserWithEmailAndPassword(inputs.email,inputs.password);
           if (!newUser && error) {
              showToast ("Error", error.message, "error");
              return;
           }
           if (newUser){
                const userDoc = {
                    uid: newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    fullname:inputs.fullname,
                    bio:"",
                    profilepicURL:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now()
             };
                await setDoc(doc(firestore, "users",newUser.user.uid), userDoc);
                localStorage.setItem("user-info",JSON.stringify(userDoc));
                loginUser(userDoc)

        
        }
             }
        catch (error) {
            showToast("Error", error.message, "error");

        }
      };
    
  return {loading, error, signup };
    
    
 
  
  
};

export default useSignupEmailandPassword;