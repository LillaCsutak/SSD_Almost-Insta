import { create } from "zustand";

const usePostStore = create((set) => ({
    posts:[],
    //taking post, calling setter function, which takes prev state and 
    // updates with first post, the latest one, then spread the other posts
    createPost: (post) => set(state => ({posts:[post,...state.posts]})),
    deletePost: (id) => set((state) => ({posts: state.posts.filter(post => post.id !== id)})),
    setPosts: (posts) => set({posts})
}))

export default usePostStore