
import UseShowToast from './UseShowToast'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import useAuthStore from '../store/authStore';

const useLogin = () => {
    const showToast = UseShowToast();
   
    const [signInWithEmailAndPassword, , loading, error] = useSignInWithEmailAndPassword(auth);
    const loginUser = useAuthStore((state) => state.login);
  
    const login = async (inputs) => {
        if (!inputs.email || !inputs.password) {
            return showToast("Error", "please fill all the fields", "error");
        }
        try {
            const userCred = await signInWithEmailAndPassword(inputs.email, inputs.password);
            if (userCred){
                const docRef = doc(firestore,"users", userCred.user.uid);
                const docsnap = await getDoc(docRef);
                localStorage.setItem("user-info",JSON.stringify(docsnap.data()));
                loginUser(docsnap.data());
            
            }

            }catch (error){
                showToast("Error", error.message, "error")

        };

    }
    return { loading, error, login};
};

export default useLogin ;