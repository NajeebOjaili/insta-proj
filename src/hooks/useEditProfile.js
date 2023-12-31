import { useState } from "react";
import useAuthStore from "../store/authStore";
import UseShowToast from "./UseShowToast";
import useUserProfileStore from "../store/UserProfileStore";
import { getDownloadURL, ref, uploadString} from 'firebase/storage';
import { firestore, storage } from '../firebase/firebase';
import { doc, updateDoc } from "firebase/firestore";

const useEditProfile = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const authUser = useAuthStore((state) => state.user);
    const setAuthUser = useAuthStore((state) => state.setUser);
    const showToast = UseShowToast();
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile);

    const editProfile = async (inputs, selectedFile) => {
        if (isUpdating || !authUser) return;
        setIsUpdating(true);
        
        const storageRef = ref(storage, `profilepics/${authUser.uid}`);
        const userDocRef = doc(firestore, "users", authUser.uid);

        let URL = "";

        try {
            if (selectedFile) {
                await uploadString(storageRef, selectedFile, "data_url");
                URL = await getDownloadURL(ref(storage, `profilepics/${authUser.uid}`));
            }

            const updateUser = {
                ...authUser,
                fullname: inputs.fullname || authUser.fullname,
                username: inputs.username || authUser.username,
                bio: inputs.bio || authUser.bio,
                profilePicURL: URL !== undefined ? URL : authUser.profilePicURL,
            };

            await updateDoc(userDocRef, updateUser);
            localStorage.setItem("user-info", JSON.stringify(updateUser));
            setAuthUser(updateUser);
            setUserProfile(updateUser);
            showToast("Success", "Profile updated successfully", "success");
        } catch(error) {
            showToast("Error", error.message, "error");
        } finally {
            setIsUpdating(false);
        }
    };

    return { editProfile, isUpdating };
};

export default useEditProfile;
