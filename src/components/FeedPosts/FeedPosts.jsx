import { Container, Text } from "@chakra-ui/react"
import FeedPost from "./FeedPost"
import useGetFeedPosts from "../../hooks/useGetFeedPosts"

const FeedPosts = () => {
  const {posts} = useGetFeedPosts()

  return (
    <Container maxW={"container.sm"} py={10} px={2}>
        {posts.length > 0 && posts.map((post) => <FeedPost key={post.id} post={post}/>)}
        {posts.length === 0 && (
          <>
          <Text fontSize={"md"} color={"red.400"}>
            You do not follow anyone yet!
          </Text>
          <Text fontSize={"md"} color={"red.400"}>
            Follow some people to see any posts!
          </Text>
          </>
        )}
    </Container>
  )
}

export default FeedPosts