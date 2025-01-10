import { Flex, Text, Image } from "@chakra-ui/react"
import { auth, firestore } from "../../firebase/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import useShowToast from "../../hooks/useShowToast";
import { setDoc, doc, getDoc } from "firebase/firestore";
import useAuthStore from "../../store/AuthStore";

const GoogleAuth = ({prefix}) => {
  const [signInWithGoogle, error] = useSignInWithGoogle(auth)
  const toast = useShowToast()
  const loginUser = useAuthStore((state) => state.login)

  const handleGoogleAuth = async () => {
    try {
      const newUser = await signInWithGoogle()
      if(!newUser && error) {
        toast("Error", error.message, "error")
        return
      }
      const userRef = doc(firestore, "users", newUser.user.uid)
      const userSnap = await getDoc(userRef)


      if(userSnap.exists()) {
        //Log in
        const userDoc = userSnap.data()
        localStorage.setItem("user-info",JSON.stringify(userDoc))
        loginUser(userDoc)
      } else {
        //Sign up
        const userDoc = { //create userDocument in Firestore
          uid:newUser.user.uid,
          email:newUser.user.email,
          username:newUser.user.email.split("@")[0],
          profilePicURL:newUser.user.photoURL,
          followers:[],
          following:[],
          posts:[],
          createdAt:Date.now()
      }

      await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
      localStorage.setItem("user-info",JSON.stringify(userDoc))
      loginUser(userDoc)
      }
    } catch (error) {
      toast("Error", error.message, "error")
    }
  }

  return (
    <>
    <Flex alignItems={"center"} justifyContent={"center"} cursor={"pointer"} onClick={handleGoogleAuth}>
        <Image src='/google.png' w={5} alt='Google logo' />
        <Text mx={2} color={"blue.500"}>{prefix} with Google</Text>
    </Flex>
    </>
  )
}

export default GoogleAuth
