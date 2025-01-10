import { setDoc, doc, collection, query, where, getDocs } from "firebase/firestore"
import { auth, firestore } from "../firebase/firebase"
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import useShowToast from "./useShowToast"
import useAuthStore from "../store/AuthStore"

const useSignUpWithEmailAndPassword = () => {
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth)

    const toast = useShowToast()
    const loginUser = useAuthStore(state => state.login)

    const signup = async (inputs) => {
        if(!inputs.email || !inputs.password || !inputs.username) {
            toast("Error", "All fields are mandatory!", "error")
            return
        }

        const usersRef = collection(firestore, "users")
        const q = query(usersRef, where("username", "==", inputs.username))
        const querySnap = await getDocs(q)

        if(!querySnap.empty) {
            toast("Error", "Username already exist!", "error")
            return
        }

        try {
            const newUser = await createUserWithEmailAndPassword(inputs.email, inputs.password)
            if(!newUser && error) {
                console.log(error)
                return
            }
            if(newUser) { //if user is created in auth then create userDoc in db
                const userDoc = { //create userDocument in Firestore
                    uid:newUser.user.uid,
                    email:inputs.email,
                    username:inputs.username,
                    profilePicURL:"",
                    followers:[],
                    following:[],
                    posts:[],
                    createdAt:Date.now()
                }

                await setDoc(doc(firestore, "users", newUser.user.uid), userDoc)
                localStorage.setItem("user-info", JSON.stringify(userDoc))
                loginUser(userDoc)
            }
        } catch (error) {
            console.log(error)
        }
    }

  return {loading,error,signup}
}

export default useSignUpWithEmailAndPassword