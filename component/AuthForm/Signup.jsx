import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Alert, AlertIcon, Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

import useSignupEmailandPassword from "../../src/hooks/useSignupEmailandPassword";

const Signup = () => {
    const [inputs , setInputs]=useState({
       fullname:'',
       username:'',
        email:'',
        password:'',
        
    });
    const [showpassword, setshowpassword]= useState(false);
    const {loading,error, signup}=useSignupEmailandPassword()

  return (
  <>
  <Input placeholder="username" fontSize={14} type="text"  
   value={setInputs.username}
   size={"sm"}
   onChange={(e) => setInputs({...inputs, username: e.target.value})}
   
   />
   <Input placeholder="full name" fontSize={14} type="text"  
   value={setInputs.fullname}
   size={"sm"}
   onChange={(e) => setInputs({...inputs, fullname: e.target.value})}
   
   />
   <Input placeholder="Email" fontSize={14} type="email"  
   value={setInputs.email}
   size={"sm"}
   onChange={(e) => setInputs({...inputs, email: e.target.value})}
   
   />
  <InputGroup>
      <Input placeholder="Password" fontSize={14} type={showpassword ? "text" :"password"}
        value={setInputs.password}
        size={"sm"}
        onChange={(e) => setInputs({...inputs,password:e.target.value})}
          />

    <InputRightElement h={"full"}>
    <Button variant={"ghost"} size={"sm"} onClick= { () => setshowpassword (!showpassword)}>
      {showpassword ? <ViewIcon/> : <ViewOffIcon/>}
    </Button>
    </InputRightElement>

  </InputGroup>
  
  
 {error && (
   <Alert status='error' fontSize={13} p={2} borderRadius={4} >
        <AlertIcon fontSize={12}/>
        {error.message}
    </Alert>
    )}


  <Button w={"full"} colorScheme="blue" size={"sm"} fontSize={14} 
  isLoading={loading}
  onClick={() => signup(inputs)}
  >
     Sign Up

</Button>

</>
);
  
};

export default Signup