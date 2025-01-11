import usePostStore from "../store/PostsStore"
import useAuthStore from "../store/AuthStore"
import useShowToast from "./useShowToast"
import useUserProfileStore from "../store/userProfileStore"
import { useEffect } from "react"
import { query, collection, where, getDocs } from "firebase/firestore"
import {firestore} from "../firebase/firebase"

const useGetFeedPosts = () => {
  const {posts, setPosts} = usePostStore()
  const authUser = useAuthStore((state) => state.user)
  const toast = useShowToast()
  const {setUserProfile} = useUserProfileStore()

  useEffect(() => {
    const getFeedPosts = async () => {
      if(authUser.following.length === 0) {
        setPosts([])
        return
      }
      const q = query(collection(firestore, "posts"),where("createdBy", "in",authUser.following))

      try {
        const querySnap = await getDocs(q)
        const feedPosts = []

        querySnap.forEach((doc) => {
          feedPosts.push({id:doc.id, ...doc.data()})
        })

        feedPosts.sort((a,b) => b.createdAt - a.createdAt)
        setPosts(feedPosts)

      } catch (error) {
        toast("Error", error.message, "error")
      }
    }
    if(authUser) getFeedPosts()
  }, [authUser,toast,setPosts,setUserProfile])

  return {posts}
}

export default useGetFeedPosts