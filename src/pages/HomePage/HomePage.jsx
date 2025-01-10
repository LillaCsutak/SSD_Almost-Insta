import { Container, Flex, Box } from "@chakra-ui/react"
import FeedPosts from "../../components/FeedPosts/FeedPosts"

const HomePage = () => {
  return (
    <Container maxW={"container.lg"}>
        <Box flex={2} py={10} >
            <FeedPosts />
        </Box>
    </Container>
  )
}

export default HomePage