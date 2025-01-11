import { Box, Flex, Tooltip, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, useDisclosure, Button, Image, CloseButton } from "@chakra-ui/react";
import { CreatePostLogo } from "../../assets/constants";
import { BsFillImageFill } from "react-icons/bs";
import { useRef, useState } from "react";
import usePreviewImg from '../../hooks/usePreviewImg'
import useShowToast from "../../hooks/useShowToast";
import useAuthStore from "../../store/AuthStore";
import usePostStore from "../../store/PostsStore";
import { useLocation } from "react-router-dom";
import { arrayUnion, collection, doc, updateDoc, addDoc } from "firebase/firestore";
import { firestore, storage } from "../../firebase/firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import useUserProfileStore from "../../store/userProfileStore";

const CreatePost = () => {
const {isOpen,onClose,onOpen} = useDisclosure()
const [caption,setCaption] = useState('')
const imgRef = useRef(null)
const toast = useShowToast()

const {handleImgChange, selectedFile, setSelectedFile} = usePreviewImg()
const {handleCreatePost} = useCreatePost()

const handlePostCreation = async () => {
	try {
		await handleCreatePost(selectedFile, caption) //post has been created
		onClose() //close Create Post model
		setCaption("")
		setSelectedFile(null)
	} catch (error) {
		toast("Error", error.message, "error")
	}
}

return (
	<>
		<Tooltip hasArrow label={"Create"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
			<Flex alignItems={"center"} gap={4} _hover={{ bg: "whiteAlpha.400" }} borderRadius={6} p={2} w={{ base: 10, md: "full" }} justifyContent={{ base: "center", md: "flex-start" }} onClick={onOpen}>
				<CreatePostLogo />
				<Box display={{ base: "none", md: "block" }}>Create</Box>
			</Flex>
		</Tooltip>


	 	<Modal isOpen={isOpen} onClose={onClose} size='xl'>
			<ModalOverlay />

			<ModalContent bg={"white"} border={"1px solid black"}>
				<ModalHeader>Create Post</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Textarea placeholder='Post caption...' value={caption} onChange={(e) => setCaption(e.target.value)}/>

					<Input type='file' hidden ref={imgRef} onChange={handleImgChange}/>

					<BsFillImageFill style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }} size={16} onClick={() => imgRef.current.click()}/>
					{selectedFile && (
						<Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
							<Image src={selectedFile} alt="Selected img"/>
							<CloseButton position={"absolute"} top={2} right={2} onClick={() => {setSelectedFile("")}}/>
						</Flex>
					)}
				</ModalBody>

				<ModalFooter>
					<Button mr={3} onClick={handlePostCreation}>Post</Button>
				</ModalFooter>
			</ModalContent>
		</Modal> 
	</>
    );
};

export default CreatePost;

function useCreatePost() {
	const toast = useShowToast()
	const authUser = useAuthStore((state) => state.user)
	const createPost = usePostStore((state) => state.createPost)

	const {pathname} = useLocation()
	const userProfile = useUserProfileStore((state) => state.userProfile)

	const handleCreatePost = async (selectedFile,caption) => {
		if(!selectedFile) throw new Error("Please select image!")

		const newPost = {
			caption: caption,
			likes:[],
			createdAt:Date.now(),
			createdBy:authUser.uid
		}

		try {
			const postDocRef = await addDoc(collection(firestore,"posts"),newPost)
			const userDocRef = doc(firestore,"users",authUser.uid)
			const imgRef = ref(storage,`posts/${postDocRef.id}`)

			await updateDoc(userDocRef,{posts:arrayUnion(postDocRef.id)})
			await uploadString(imgRef,selectedFile,"data_url")
			const downloadURL = await getDownloadURL(imgRef)

			await updateDoc(postDocRef,{imageURL:downloadURL})

			newPost.imageURL = downloadURL;

			//post should be added only for creator, no matter from which page we add 
			// (like we are on another users page, adding a post, post should not be added to page from which we called create)
			if(userProfile.uid === authUser.uid) createPost({ ...newPost, id: postDocRef.id });

			toast("Success", "Post created successfully", "success")

		} catch (error) {
			toast("Error", error.message, "error")
		}
	}
	return {handleCreatePost}
}