import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase";

const useGetUserProfileById = (userId) => {
	const [userProfile, setUserProfile] = useState(null);

	const toast = useShowToast();

	useEffect(() => {
		const getUserProfile = async () => {
			
			try {
				const userRef = await getDoc(doc(firestore, "users", userId));
				if (userRef.exists()) {
					setUserProfile(userRef.data());
				}
			} catch (error) {
				toast("Error", error.message, "error");
			}
		}
		getUserProfile();
	}, [toast, setUserProfile, userId]);

	return { userProfile, setUserProfile };
};

export default useGetUserProfileById;