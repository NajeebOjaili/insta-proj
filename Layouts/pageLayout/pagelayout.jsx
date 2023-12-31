
import { Box, Flex, Spinner} from "@chakra-ui/react"
import SideBar from "../../component/sidebar/Sidbarr";
import { useLocation } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../src/firebase/firebase";
import Navbar from "../../component/Navbar";


const pagelayout = ({children}) => {
  const { pathname } = useLocation();
  const [user,loading] = useAuthState(auth);
  const canRenderSidebar = pathname !== "/auth" && user;
  const canRenderNavbar =!user && !loading && pathname !== "/auth";
  
  const checkingUserIsAuth = !user && loading;
  if (checkingUserIsAuth) return <pageLayoutSpinner />;
  
  return (
   
   
   <Flex flexDir={canRenderNavbar ? "column" : "row"}>
   {/*  side bar on the left*/}
   {canRenderSidebar ? (
      <Box w={{ base :"70px", md:"240px"}}>
      <SideBar/>
     </Box>
   ) : null}
   {canRenderNavbar ? <Navbar /> : null}
   {/* the page content on the right*/}
   <Box flex={1} w={{ base : "calc(100% - 70px )" , md: "calc(100% - 240px)" }} mx={"auto"}> 
      {children}
   </Box>
  </Flex>
  );
};

export default pagelayout ;

 const pageLayoutSpinner = () =>{
  return(
    <Flex flexDir='column' h='100vh' alignItems='center' justifyContent='center'>
      <Spinner size='xl'/>
    </Flex>
  )
 }