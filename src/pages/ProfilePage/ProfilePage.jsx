import { Container, Flex, Text, Link } from "@chakra-ui/react"
import ProfileHeader from "../../components/Profile/ProfileHeader"
import ProfilePosts from "../../components/Profile/ProfilePosts"
import useGetProfileByUsername from "../../hooks/useGetProfileByUsername"
import { useParams } from "react-router-dom"
import { Link as RouterLink } from "react-router-dom"

const ProfilePage = () => {
  const { username } = useParams()
  const { userProfile } = useGetProfileByUsername(username)
  
  if(!userProfile) return <UserNotFound />

  return (
    <Container maxW={"container.lg"} py={5}>
        <Flex py={10} px={4} pl={{base:4, md:10}} w={"full"} mx={"auto"} flexDirection={"column"}>
            {userProfile && <ProfileHeader />}
            
        </Flex>
        <Flex px={{base:2,sm:4}} maxW={"full"} mx={"auto"} borderTop={"1px solid"} borderColor={"blackAlpha.300"} direction={"column"}>
            <ProfilePosts />
        </Flex>
    </Container>
  )
}

export default ProfilePage

const UserNotFound = () => {
  return (
    <Flex flexDir={"column"} textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link as={RouterLink} to={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
        Go Home
      </Link>
    </Flex>
  )
}