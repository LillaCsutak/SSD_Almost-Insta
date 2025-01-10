import useShowToast from "./useShowToast"
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth"
import { auth, firestore } from "../firebase/firebase"
import { getDoc, doc } from "firebase/firestore"
import useAuthStore from "../store/AuthStore"

const useLogIn = () => {
    const toast = useShowToast()
    const [
        signInwithEmailAndPassword,
        error,
    ] = useSignInWithEmailAndPassword(auth)
    const loginUser = useAuthStore((state) => state.login)


    const logIn = async(inputs) => {
        if(!inputs.email || !inputs.password) {
            toast("Error", "All fields are mandatory!", "error")
            return
        }
        try {
            const userCred = await signInwithEmailAndPassword(inputs.email, inputs.password)
            if(!userCred) {
                toast("Error", "Incorrect email or password!", "error")
                return
            }
            if(userCred) {
                const docRef = doc(firestore, "users", userCred.user.uid)
                const docSnap = await getDoc(docRef)
                localStorage.setItem("user-info",JSON.stringify(docSnap.data()))
                loginUser(docSnap.data())
            }

        } catch (error) {
            console.log(error)
        }
    }
    return { error, logIn}
}

export default useLogIn 
