import { Avatar, AvatarGroup, Flex, VStack, Text, Button, Input} from "@chakra-ui/react"
import useUserProfileStore from "../../store/userProfileStore"
import useAuthStore from "../../store/AuthStore"
import { useRef } from "react"
import usePreviewImg from "../../hooks/usePreviewImg"
import useFollowUser from "../../hooks/useFollowUser"

const ProfileHeader = () => {
const {userProfile} = useUserProfileStore()
const authUser = useAuthStore(state => state.user)

const visitOwnProfile = authUser && authUser.username === userProfile.username
const visitOtherProfile = authUser && authUser.username !== userProfile.username

const fileRef = useRef(null)

const {isFollowing,handleFollowUser} = useFollowUser(userProfile?.uid)

const {selectedFile, handleImgChange, saveImgInDatabase} = usePreviewImg()

  return (
    <Flex gap={{base:4,sm:10}} py={10} direction={{base:"column",sm:"row"}} alignItems={"center"} > 
        <AvatarGroup size={{base:"xl", md:"2xl"}} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
            <Avatar src={selectedFile || userProfile.profilePicURL} />
        </AvatarGroup>

        <VStack alignItems={"start"} gap={5} mx={"auto"} flex={1}>
            <Flex gap={4} direction={{base:"column",sm:"row"}} justifyContent={{base:"center",sm:"flex-start"}} alignItems={"center"} w={"full"}>
                <Text fontSize={{base:"lg",sm:"lg"}} fontWeight={"bold"}>
                {userProfile.username}
                </Text>
                {visitOwnProfile && (
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                        <Button bg={"blue.500"} color={"white"} _hover={{bg:"blue.600"}} size={{base:"xs", md:"sm"}} onClick={() => fileRef.current.click()}>
                            Add profile picture
                        </Button>
                        <Input type="file" hidden ref={fileRef}  onChange={handleImgChange} />
                        {selectedFile && (
                            <Button bg={"blue.500"} color={"white"} _hover={{ bg: "blue.600" }} size={{ base: "xs", md: "sm" }} onClick={saveImgInDatabase} >
                            Save
                            </Button>)}
                    </Flex>
                )}
                {visitOtherProfile && (
                    <Flex gap={4} alignItems={"center"} justifyContent={"center"}>
                        <Button bg={"blue.500"} color={"white"} _hover={{bg:"blue.600"}} size={{base:"xs", md:"sm"}} onClick={handleFollowUser}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                    </Flex>
                )}
            </Flex>
            <Flex alignItems={"center"} gap={{base:2,sm:4}}>
                
                <Text>
                    <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.followers.length}</Text>
                    Followers
                </Text>
                <Text>
                    <Text as="span" fontWeight={"bold"} mr={1}>{userProfile.following.length}</Text>
                    Following
                </Text>
            </Flex>
        </VStack>
    </Flex>
  )
}

export default ProfileHeader

