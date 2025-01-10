import { useState } from "react"
import useShowToast from "./useShowToast"
import { collection, getDocs, query, where } from "firebase/firestore"
import { firestore } from "../firebase/firebase"
import { useNavigate } from "react-router-dom";

const useSearchUser = () => {
  const [user,setUser] = useState(null)
  const toast = useShowToast()
  const navigate = useNavigate()

  const getUserProfile = async (username) => {
    try {
        const q = query(collection(firestore, "users"), where("username", "==", username))
        const querySnap = await getDocs(q)

        if(querySnap.empty) return toast("Error", "User not found", "error")
        
        querySnap.forEach((doc) => {
            setUser(doc.data())
            navigate(`/${doc.data().username}`)
        })
    } catch (error) {
        toast("Error", error.message, "error")
        setUser(null)
    }
  }
  return {getUserProfile,user}
}

export default useSearchUser