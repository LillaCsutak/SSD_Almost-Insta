import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Tooltip, useDisclosure } from "@chakra-ui/react";
import { SearchLogo } from "../../assets/constants";
import useSearchUser from '../../hooks/useSearchUser'
import { useRef } from "react";


const Search = () => {
	const {isOpen,onOpen,onClose} = useDisclosure()
	const searchRef = useRef(null)
	const {user,getUserProfile} = useSearchUser()
	

const handleSearchUser = async(e) => {
	e.preventDefault()
	getUserProfile(searchRef.current.value)

	
}


	console.log(user)
	return (
		<>
			<Tooltip hasArrow label={"Search"} placement='right' ml={1} openDelay={500} display={{ base: "block", md: "none" }}>
				<Flex alignItems={"center"} gap={4} _hover={{ bg: "whiteAlpha.400" }} borderRadius={6} p={2} w={{ base: 10, md: "full" }} justifyContent={{ base: "center", md: "flex-start" }} onClick={onOpen}>
 					<SearchLogo />
 					<Box display={{ base: "none", md: "block" }}>Search</Box>
 				</Flex>
 			</Tooltip>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent bg={"white"} border={"1px solid black"} maxW={"400px"}>
					<ModalHeader>
						Search user
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<form onSubmit={handleSearchUser}>
							<FormControl>
								<FormLabel>username</FormLabel>
								<Input placeholder="abc" ref={searchRef}/>
							</FormControl>

							<Flex w={"full"} justifyContent={"flex-end"}>
								<Button type="submit" ml={"auto"} size={"sm"} my={4}>
									Search
								</Button>
							</Flex>
						</form>
					</ModalBody>
				</ModalContent>
			</Modal>
 		</>
 	);
 };

export default Search;