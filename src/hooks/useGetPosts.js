import { useEffect } from "react"
import usePostStore from "../store/PostsStore"
import useUserProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"

const useGetUserPosts = () => {
  const {posts, setPosts} = usePostStore()
  const toast = useShowToast()
  const userProfile = useUserProfileStore((state) => state.userProfile)

  useEffect(() => {
    const getPosts = async () => {
        if(!userProfile) return
        setPosts([])

        try {
            const q = query(collection(firestore,"posts"),where("createdBy", "==", userProfile.uid))
            const querySnap = await getDocs(q)

            const posts = []
            querySnap.forEach((doc) => { // each document gets pushed into posts array
                posts.push({...doc.data(), id: doc.id})
            })

            //sort so latest is first
            posts.sort((a,b) => b.createdAt - a.createdAt)
            setPosts(posts)

        } catch (error) {
            toast("Error", error.message,"error")
            setPosts([])
        }
    }
    getPosts()
  }, [setPosts,userProfile,toast])
  return {posts}
}

export default useGetUserPosts