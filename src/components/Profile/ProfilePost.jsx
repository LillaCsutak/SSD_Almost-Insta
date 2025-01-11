import { Flex, GridItem, Text, Image, Box } from "@chakra-ui/react"
import { NotificationsLogo, UnlikeLogo } from "../../assets/constants"
import { FaTrashAlt } from "react-icons/fa";
import useAuthStore from "../../store/AuthStore"
import useUserProfileStore from "../../store/userProfileStore";
import useShowToast from "../../hooks/useShowToast"
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import {firestore, storage} from '../../firebase/firebase'
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../store/PostsStore";
import useLikePost from "../../hooks/useLikePost";

const ProfilePost = ({post}) => {

  const {likes, handleLikePost, isLiked} = useLikePost(post)

  const authUser = useAuthStore((state) => state.user)
  const userProfile = useUserProfileStore((state) => state.userProfile)
  const toast = useShowToast()
  const deletePost = usePostStore((state) => state.deletePost)

  const handleDeletePost = async() => {
    if(!window.confirm("Confirm Delete")) return

    try {
      const imgRef = ref(storage, `posts/${post.id}`)
      await deleteObject(imgRef)

      const userRef = doc(firestore,"users",authUser.uid)
      await deleteDoc(doc(firestore,"posts",post.id))

      await updateDoc(userRef, {
        posts: arrayRemove(post.id)
      })

      deletePost(post.id)
      
    } catch (error) {
      toast("Error", error.message, "error")
    }
  }

  return (
    <GridItem cursor={"pointer"} border={"1px solid"} borderColor={"blackAlpha.300"} position={"relative"} aspectRatio={1/1}>
        <Flex opacity={0} _hover={{opacity:1}} position={"absolute"} top={0} left={0} right={0} bottom={0} bg={"blackAlpha.700"} transition={"all 0.3 ease"} zIndex={1} justifyContent={"center"}>
            <Flex alignItems={"center"} justifyContent={"space-between"} gap={4} >
                <Flex>
                    <Box onClick={handleLikePost} cursor={"pointer"} fontSize={20}>
                      {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo/>)}
                    </Box>

                    <Text fontWeight={"bold"} ml={2} color={"white"} marginEnd={"10"}>
                      {likes}
                    </Text>
                </Flex>
                <Flex>
                  {authUser?.uid === userProfile.uid && (
                    <Box cursor={"pointer"} fontSize={18} onClick={handleDeletePost}>
                      <FaTrashAlt color='rgb(255, 48, 64)' fontSize={20}/>
                    </Box>
                  )}
                </Flex>
            </Flex>

        </Flex>
        <Image src={post.imageURL} w={"100%"} h={"100%"} objectFit={"cover"} />
    </GridItem>
  )
}

export default ProfilePost