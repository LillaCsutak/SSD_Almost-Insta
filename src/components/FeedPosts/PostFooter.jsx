import { Flex, Box, Text } from "@chakra-ui/react"
import { useState } from "react"
import { CommentLogo, NotificationsLogo } from "../../assets/constants"
import { UnlikeLogo } from "../../assets/constants"

const PostFooter = ({username}) => {
    const [like, setLike] = useState(false)
    const [nrOfLikes, setNrOfLikes] = useState(100)

    const handleLike = () => {
        if(like) {
            setLike(false)
            setNrOfLikes(nrOfLikes - 1)
        } else {
            setLike(true)
            setNrOfLikes(nrOfLikes + 1)
        }
    }

  return (
    <Box mb={10}>
    <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"4"}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
            {!like ? (<NotificationsLogo />) : (<UnlikeLogo/>)}
        </Box>
    </Flex>
    <Text fontWeight={600} fontSize={"sm"}>
        {nrOfLikes} likes
    </Text>
    <Text fontSize={"sm"} fontWeight={700}>
        {username}{" "}
        <Text as={"span"} fontWeight={400}> caption</Text>
    </Text>

    </Box>
  )
}

export default PostFooter