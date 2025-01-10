import { Tooltip, Box, Flex } from "@chakra-ui/react"
import { NotificationsLogo } from "../../assets/constants"

const Notifications = () => {
  return (
    <Tooltip hasArrow label={"Notifications"} placement="right" ml={1} openDelay={500} display={{base:"block",md:"none"}}>
        <Flex alignItems={"center"} gap={4} _hover={{bg:"blackAlpha.400"}} borderRadius={6} p={2} w={"full"} justifyContent={{base:"center", md:"flex-start"}}>
            <NotificationsLogo />
            <Box display={{base:"none",md:"block"}}>
                Notifications
            </Box>
        </Flex>
    </Tooltip>
  )
}

export default Notifications