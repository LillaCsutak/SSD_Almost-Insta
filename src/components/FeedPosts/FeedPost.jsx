import PostFooter from "./PostFooter"
import PostHeader from "./PostHeader"
import { Box, Image } from "@chakra-ui/react"
import useGetUserProfileById from "../../hooks/useGetUserProfileById"

const FeedPost = ({post}) => {
  
  const {userProfile} = useGetUserProfileById(post.createdBy)
  
  return (
    <>
    {userProfile && (
      <PostHeader post={post} creatorProfile={userProfile}/>
    )}
    
    <Box my={2}>
        <Image src={post.imageURL} />
    </Box>
    { userProfile && (
      <PostFooter post={post} creatorProfile={userProfile}/>
    )}
    </>
  )
}

export default FeedPost