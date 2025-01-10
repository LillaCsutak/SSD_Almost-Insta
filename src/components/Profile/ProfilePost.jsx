import { Flex, GridItem, Text, Image } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"

const ProfilePost = ({img}) => {
  return (
    <GridItem cursor={"pointer"} border={"1px solid"} borderColor={"blackAlpha.300"} position={"relative"} aspectRatio={1/1}>
        <Flex opacity={0} _hover={{opacity:1}} position={"absolute"} top={0} left={0} right={0} bottom={0} bg={"blackAlpha.700"} transition={"all 0.3 ease"} zIndex={1} justifyContent={"center"}>
            <Flex alignItems={"center"} justifyContent={"center"}>
                <Flex>
                    <AiFillHeart size={20} />
                    <Text fontWeight={"bold"} ml={2} color={"gray"}>nrOFLikes</Text>
                </Flex>
            </Flex>

        </Flex>
        <Image src={img} w={"100%"} h={"100%"} objectFit={"cover"} />
    </GridItem>
  )
}

export default ProfilePost