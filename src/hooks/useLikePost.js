import { useState } from "react"
import useAuthStore from "../store/AuthStore"
import useShowToast from "./useShowToast"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { firestore } from "../firebase/firebase"

const useLikePost = (post) => {
  const authUser = useAuthStore((state) => state.user)
  const [likes,setLikes] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(post.likes.includes(authUser?.uid))
  const toast = useShowToast()
  
    const handleLikePost = async () => {
        if(!authUser) return toast("Error", "You must be logged in to use like!", "error")

        try {
            const postRef = doc(firestore,"posts",post.id)
            await updateDoc(postRef, {
                likes: isLiked ? arrayRemove(authUser.uid) : arrayUnion(authUser.uid)
            })

            setIsLiked(!isLiked)
            isLiked ? setLikes(likes - 1) : setLikes(likes + 1)

        } catch (error) {
            toast("Error", error.message, "error")
        }
    }
    return {isLiked, likes, handleLikePost}
}

export default useLikePost