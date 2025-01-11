import { Grid, Box, Flex, Text } from "@chakra-ui/react"
import ProfilePost from "./ProfilePost"
import useGetUserPosts from "../../hooks/useGetPosts"

const ProfilePosts = () => {
  const {posts} = useGetUserPosts()

  if(posts.length === 0) return <NoPostsFound />

  return (
    <Grid templateColumns={{sm:"reapeat(1, 1fr)",md:"repeat(3, 1fr)"}} gap={1} columnGap={1}>
        <>
        {posts.map((post) => (
          <ProfilePost post={post} key={post.id}/>
        ))}
        </>
    </Grid>

  )
}

export default ProfilePosts

const NoPostsFound = () => {
	return (
		<Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
			<Text fontSize={"2xl"}>No Posts Found</Text>
		</Flex>
	);
};