import { useToast } from "@chakra-ui/react"
import { useCallback } from "react"

const useShowToast = () => {
    const toast = useToast()
    
    //useCallBack prevents infinite loop, by caching function (otherwise toast is stored in memory each time it is called)
    const showToast = useCallback(
        (title, description,status) => {
        toast({
            title: title,
            description: description,
            status: status,
            duration: 3000,
            isClosable: true
        })
    }, 
    [toast]
)

  return showToast
}

export default useShowToast