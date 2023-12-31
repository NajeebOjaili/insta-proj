import { Image,  Flex ,Text } from "@chakra-ui/react"

import { useSignInWithEmailAndPassword, useSignInWithGoogle } from "react-firebase-hooks/auth";
import UseShowToast from "../../src/hooks/UseShowToast";
import useAuthStore from "../../src/store/authStore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../../src/firebase/firebase";


  const GoogleAuth = ({ prefix }) => {
  const [signInWithGoogle, error] =useSignInWithGoogle (auth)
  const ShowToast = UseShowToast();
  const loginUser = useAuthStore((state) => state.login);

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle();
      if (!newUser && error) {
        ShowToast ("Error", error.message, "error");
        return;
      }
      const userRef = doc(firestore, "users", newUser.user.uid);
      const userSnap =  await getDoc(userRef);
      if (userSnap.exists()){
        const userDoc =userSnap.data();
        loginUser(userDoc);

      }
      else{
        const userDoc ={
          uid: newUser.user.uid,
          email: newUser.user.email,
          username: newUser.user.email.split("@")[0],
          fullname: newUser.user.displayName,
          bio: "",
          profilePicURL: newUser.user.photoURL,
          followers: [],
          following: [],
          posts: [],
          createdAt: Date.now(),

        };
        await setDoc (doc(firestore , "users", newUser.user.uid), userDoc);
        localStorage.setItem ("user-info" , JSON.stringify(userDoc));
        loginUser(userDoc);


      }
    }
    catch (error){
      ShowToast("Error", error.message, "error");
    }
  };
  
return(
  <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}> 
<Image src="google.png" w={5} alt="google.png"/>
<Text  mx={2} color={"blue.500"}  fontSize={14}>
  
  {prefix}  with Google 
    
    </Text>  
</Flex>

  
  );
};

export default GoogleAuth ;