import { useEffect, useState } from "react"
import useAuthStore from "../store/AuthStore"
import useUserProfileStore from "../store/userProfileStore"
import useShowToast from "./useShowToast"
import { firestore } from "../firebase/firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

const useFollowUser = (userId) => {
    const [isFollowing, setIsFollowing ] = useState(false)
    const {user, setUser} = useAuthStore()
    const {userProfile,setUserProfile} = useUserProfileStore()
    const toast = useShowToast()

    const handleFollowUser = async () => {
        try {
            const currentUserRef = doc(firestore,"users", user.uid)
            const otherUserRef = doc(firestore, "users", userId)

            await Promise.all([
                updateDoc(currentUserRef,{
                    following: isFollowing ? arrayRemove(userId) : arrayUnion(userId)
                }),
                updateDoc(otherUserRef, {
                    followers: isFollowing ? arrayRemove(user.uid) : arrayUnion(user.uid)
                })

            ])

            if(isFollowing) {
                // UNFOLLOW
                setUser({
                    ...user,
                    following: user.following.filter((uid) => uid !== userId)  
                })
                setUserProfile({
                    ...userProfile,
                    followers: userProfile.followers.filter((uid) => uid !== user.uid) 
                })
                localStorage.setItem("user-info",JSON.stringify({
                    ...user,
                    following: user.following.filter((uid) => uid !== userId)  
                }))
                setIsFollowing(false)
            } else {
                // FOLLOW
                setUser({
                    ...user,
                    following: [...user.following, userId]
                })
                setUserProfile({
                    ...userProfile,
                    followers: [...userProfile.followers, user.uid]
                })
                localStorage.setItem("user-info",JSON.stringify({
                    ...user,
                    following: [...user.following, userId]
                }))
                setIsFollowing(true)
            }
            
        } catch (error) {
            toast("Error", error.message, "error")
        }
    }

    useEffect(() => {
        if(user) {
            const isFollowing = user.following.includes(userId)
            setIsFollowing(isFollowing)
        }
    },[user, userId])
    return {isFollowing, handleFollowUser}
}

export default useFollowUser