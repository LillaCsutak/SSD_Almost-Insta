import { Grid } from "@chakra-ui/react"
import ProfilePost from "./ProfilePost"

const ProfilePosts = () => {
  return (
    <Grid templateColumns={{sm:"reapeat(1, 1fr)",md:"repeat(3, 1fr)"}} gap={1} columnGap={1}>
        <ProfilePost img="/img1.png" />
    </Grid>
  )
}

export default ProfilePosts