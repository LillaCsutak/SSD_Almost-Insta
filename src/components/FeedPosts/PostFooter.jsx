import { Flex, Box, Text } from "@chakra-ui/react"
import { useState } from "react"
import { NotificationsLogo, UnlikeLogo } from "../../assets/constants"
import useLikePost from "../../hooks/useLikePost"

const PostFooter = ({post, username, creatorProfile}) => {
    const {likes,handleLikePost,isLiked} = useLikePost(post)

  return (
    <Box mb={10}>
    <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"4"}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
            {!isLiked ? (<NotificationsLogo />) : (<UnlikeLogo/>)}
        </Box>
    </Flex>
    <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
    </Text>
    <Text fontSize={"sm"} fontWeight={700}>
        {creatorProfile?.username}{" "}
        <Text as={"span"} fontWeight={400}> 
            {post.caption}
        </Text>
    </Text>

    </Box>
  )
}

export default PostFooter