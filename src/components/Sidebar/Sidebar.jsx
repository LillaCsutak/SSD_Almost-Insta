import { Box, Flex, Link, Tooltip, Button } from "@chakra-ui/react"
import { Link as RouterLink } from 'react-router-dom'
import { InstagramLogo } from "../../assets/constants"
import { BiLogOut } from "react-icons/bi"
import useLogOut from "../../hooks/useLogOut"
import SidebarItems from "./SidebarItems"
import useAuthStore from "../../store/AuthStore"

const Sidebar = () => {

    const {handleLogOut} = useLogOut()
    const authUser = useAuthStore((state) => state.user)

  return (
    <Box height={"100vh"} borderRight={"1px solid"} borderColor={"blackAlpha.300"} py={8} position={"sticky"} top={0} left={0} px={{base:2, md:4}}>
        <Flex direction={"column"} gap={10} w={"full"} height={"full"}>
            {/* using as router link but adding additional styling from chackra*/}
           <Link to={"/"} as={RouterLink} p={2} display={{base:"none", md:"block"}} cursor={"pointer"}>
                <InstagramLogo/> 
           </Link> 
           <Flex direction={"column"} gap={5} cursor={"pointer"}>
                <SidebarItems />
           </Flex>

           {/* LOG OUT */}
           {authUser && (<Tooltip hasArrow label={"Log out"} placement="right" ml={1} openDelay={500}>
                <Flex onClick={handleLogOut} alignItems={"center"} gap={4} _hover={{bg:"blackAlpha.400"}} borderRadius={6} padding={2} w={"full"} justifyContent={{base:"center", md:"flex-start"}} mt={"auto"}>
                    <BiLogOut size={25} />
                    <Button display={{base:"none",md:"block"}} variant={"ghost"} _hover={{bg:"transparent"}}  >
                        Log out
                    </Button>
                </Flex>
            </Tooltip>)}
        </Flex>
    </Box>
  )
}

export default Sidebar
