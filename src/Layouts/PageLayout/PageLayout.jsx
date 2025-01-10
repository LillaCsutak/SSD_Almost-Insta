//sidebar on home page

import { Box, Flex } from "@chakra-ui/react"
import Sidebar from "../../components/Sidebar/Sidebar"
import { useLocation } from "react-router-dom"

// to habe sidebar on every page but the auth: instead of adding the sidebar component to every page, 
// we add it only once to PgaeLyout component and wrap every children with it

const PageLayout = ({children}) => {
    const {pathname} = useLocation()
  return (
    <Flex>
        {/* sidebar on left */}
        {pathname !== '/auth' ? ( // only show sidebar if we are not on auth page
            <Box w={{base: "70px", md:"240px"}}>
            <Sidebar />
            </Box>
        ) : null}

        {/* page content on right */}
        <Box flex={1} w={{base:"calc(100%-70px)", md:"calc(100%-240px)"}}>
            {children}
        </Box>
    </Flex>

  )
}

export default PageLayout