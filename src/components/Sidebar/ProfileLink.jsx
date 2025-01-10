import { Tooltip, Link, Box, Avatar } from "@chakra-ui/react"
import { Link as RouterLink } from "react-router-dom"
import useAuthStore from "../../store/AuthStore"

const ProfileLink = () => {
    const authUser = useAuthStore((state) => state.user)
  return (
    <Tooltip hasArrow label={"Profile"} placement="right" ml={1} openDelay={500} display={{base:"block",md:"none"}}>
        <Link display={"flex"} to={`/${authUser?.username}`} as={RouterLink} alignItems={"center"} gap={4} _hover={{bg:"blackAlpha.400"}} borderRadius={6} p={2} w={"full"} justifyContent={{base:"center", md:"flex-start"}}>
            <Avatar size={"sm"} src={authUser?.profilePicURL || ""} />
            <Box display={{base:"none",md:"block"}}>
                Profile
            </Box>
        </Link>
    </Tooltip>
  )
}

export default ProfileLink