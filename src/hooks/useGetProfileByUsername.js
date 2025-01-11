import { useEffect } from "react"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import useUserProfileStore from "../store/userProfileStore"

const useGetProfileByUsername = (username) => {
  const toast = useShowToast()
  const {userProfile,setUserProfile} = useUserProfileStore()

  useEffect(() => {
    const getUserProfile = async () => {
        try {
            const q = query(collection(firestore, "users"),where("username", "==", username))
            const querySnap = await getDocs(q)

            if(querySnap.empty) {
              return setUserProfile(null)
            }
            let userDoc
            querySnap.forEach((doc) => {
                userDoc = doc.data()
            })

            setUserProfile(userDoc)
            
        } catch (error) {
            toast("Error", error.message, "error")
        }
    }
    getUserProfile()
  }, [setUserProfile, username, toast])

  return { userProfile }
}

export default useGetProfileByUsername 