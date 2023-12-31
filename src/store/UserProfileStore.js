import { create } from "zustand";
const useuserProfileStore = create ((set) => ({
    userProfile: null,
    setUserProfile: (userProfile) => set ({userProfile}),


    addPost: (post) =>
    set((state) => ({
        userProfile: { ...state.userProfile, Posts: [post.id, ...state.userProfile.Posts] }
    })),
  deletePost : (postId) => set((state) => ({
        userProfile: {
            ...state.userProfile,
            Posts: state.userProfile.Posts.filter((id) => id !== postId)
        }
    }))


    }));

 export default useuserProfileStore ;