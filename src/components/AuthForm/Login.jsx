import { Input, Button, Alert, AlertIcon } from "@chakra-ui/react"
import { useState } from "react"
import useLogIn from "../../hooks/useLogIn"

const Login = () => {
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
      })
      
    const {error,logIn} = useLogIn()

  return (
    <>
    {/* email and password */}
    <Input placeholder='Email' fontSize={14} type='email'
        value={inputs.email}
        onChange={(e) => setInputs({...inputs,email:e.target.value})} 
    />
    <Input placeholder='Password' fontSize={14} type='password'
        value={inputs.password}
        onChange={(e) => setInputs({...inputs,password:e.target.value})} //what is typed into password field only gonna change the password state
    />

    {error && (
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
            <AlertIcon fontSize={12} />
            {error.message}
        </Alert>
    )}

    <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} onClick={() => logIn(inputs)} >
        Log in
    </Button>
    </>
  )
}

export default Login