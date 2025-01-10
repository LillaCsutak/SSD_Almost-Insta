import { Input, Button, AlertIcon, Alert } from "@chakra-ui/react"
import { useState } from "react"
import useSignUpWithEmailAndPassword from "../../hooks/useSignUpWithEmailAndPassword"

const SignUp = () => {
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: '',
    })

    const {loading,error,signup} = useSignUpWithEmailAndPassword()

  return (
    <>
    {/* email and password */}
    <Input placeholder='Email' fontSize={14} type='email' size={"sm"}
        value={inputs.email}
        onChange={(e) => setInputs({...inputs,email:e.target.value})} 
    />

    <Input placeholder='Username' fontSize={14} type='text' size={"sm"}
        value={inputs.username}
        onChange={(e) => setInputs({...inputs,username:e.target.value})} 
    />

    <Input placeholder='Password' fontSize={14} type='password' size={"sm"}
        value={inputs.password}
        onChange={(e) => setInputs({...inputs,password:e.target.value})} //what is typed into password field only gonna change the password state
    />

    {error && (
        <Alert status='error' fontSize={13} p={2} borderRadius={4}>
            <AlertIcon fontSize={12} />
            {error.message}
        </Alert>
    )}

    <Button w={"full"} colorScheme='blue' size={"sm"} fontSize={14} isLoading={loading} onClick={() => signup(inputs)} >
        Sign up
    </Button>

    </>
  )
}

export default SignUp