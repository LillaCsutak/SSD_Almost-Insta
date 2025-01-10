import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from '../firebase/firebase'
import useAuthStore from "../store/AuthStore"

const useLogOut = () => {
    const [signOut] = useSignOut(auth)
    const logoutUser = useAuthStore((state) => state.logout)

    const handleLogOut = async () => {
    try {
        await signOut()
        localStorage.removeItem("user-info")
        logoutUser()
    } catch (error) {
        console.log(error)
    }
}

return {handleLogOut}
}

export default useLogOut