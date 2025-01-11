import { useState } from "react"
import useShowToast from '../hooks/useShowToast'

import { ref, getDownloadURL, uploadString } from "firebase/storage"
import { firestore, storage } from '../firebase/firebase'
import { doc, updateDoc } from "firebase/firestore"

import useUserProfileStore from "../store/userProfileStore"
import useAuthStore from "../store/AuthStore"

const usePreviewImg = () => {
  const  [selectedFile, setSelectedFile] = useState(null)
  const toast = useShowToast()
  const maxFileSizeInBytes = 2 * 1024 * 1024 //2MB


    

  const handleImgChange = (e) => {
    const file = e.target.files[0]
    if(file && file.type.startsWith("image/")) {
        if(file.size > maxFileSizeInBytes) {
            toast("Error", "File size must be less than 2MB!", "error")
            setSelectedFile(null)
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setSelectedFile(reader.result)
        }

        reader.readAsDataURL(file)
    
    } else {
        toast("Error", "Please select image file!", "error")
        setSelectedFile(null)
    }
  }

  const saveImgInDatabase = async () => {
    const authUser = useAuthStore((state) => state.user)
    const setAuthUser = useAuthStore((state) => state.setUser)
    const setUserProfile = useUserProfileStore((state) => state.setUserProfile)

    const storageRef = ref(storage,`profilePics/${authUser.uid}`)
    const userDocRef = doc(firestore,"users",authUser.uid)

    let URL = ""

    try {
        if(selectedFile) {
            await uploadString(storageRef,selectedFile,"data_url")
            URL = await getDownloadURL(ref(storage,`profilePics/${authUser.uid}`))
        }
        const updatedUser = {
            ...authUser,
            profilePicURL:URL || authUser.profilePicURL
        }

        await updateDoc(userDocRef, updatedUser)
        localStorage.setItem("user-info",JSON.stringify(updatedUser))
        setAuthUser(updatedUser)
        setUserProfile(updatedUser)
    } catch (error) {
        toast("Error", error.message, "error")
    }
    }

  return { selectedFile, handleImgChange, saveImgInDatabase, setSelectedFile }
}

export default usePreviewImg