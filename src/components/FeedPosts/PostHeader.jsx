import { Avatar, Flex, Box, Text, Button} from "@chakra-ui/react"
import { Link } from "react-router-dom"
import useFollowUser from "../../hooks/useFollowUser"
import {timeAgo} from "../../utils/timeAgo"

const PostHeader = ({post,creatorProfile}) => {
  const {handleFollowUser,isFollowing} = useFollowUser(post.createdBy)

  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} my={2}>
        <Flex alignItems={"center"} gap={2}>
            <Avatar src={creatorProfile.profilePicURL} size={"sm"}/>
            <Link to={`/${creatorProfile.username}`}>
            <Flex fontSize={12} fontWeight={"bold"} gap={2}>
                {creatorProfile.username}
                <Box color={"gray.500"}>
                  {timeAgo(post.createdAt)}
                </Box>
            </Flex>
            </Link>
        </Flex>
        <Box cursor={"pointer"}>
            <Button size={"xs"} bg={"transparent"} fontSize={12} color={"blue.500"} fontWeight={"bold"} _hover={{color: "black"}} transition={"0.2s ease-in-out"} onClick={handleFollowUser}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
        </Box>
    </Flex>
  )
}

export default PostHeader