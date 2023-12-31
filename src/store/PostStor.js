import { create } from "zustand";
const usePostStore = create((set) => ({
    Posts: [],
    createPost: (post) => set ((state) => ({Posts:[post, ...state.Posts]})),
   
    deletePost: (id) => set((state) => ({ posts: state.Posts.filter((post) => post.id !== id) })),
	
    //
    setPosts: (Posts) => set({ Posts }),

    addcomment: (postId, comment) =>
    set((state) => ({
        Posts: state.Posts.map((post) => {
            if (post.id === postId){
                return {
                    ...post,
                    comments: [...post.comments, comment],
                };
            }
            return post;
        }),
    })),
}));
export default usePostStore;