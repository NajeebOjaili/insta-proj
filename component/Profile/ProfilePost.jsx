import { Flex, GridItem ,
   Text , Image,
   useDisclosure,  
   Avatar, Divider,
    VStack, Button,
     Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import { MdDelete } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa6";
import Comment from "../Comments/Comment";
import PostFooter from '../feedpost/PostFooter';
import useuserProfileStore from "../../src/store/UserProfileStore";
import useAuthStore from "../../src/store/authStore";
import UseShowToast from "../../src/hooks/UseShowToast";
import { useState } from "react";
import { deleteObject, ref } from "firebase/storage";
import { firestore, storage } from "../../src/firebase/firebase";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import usePostStore from "../../src/store/PostStor";
import Caption from '../Comments/Caption';


const ProfilePost = ({ post }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const userProfile  = useuserProfileStore ((state) => state.userProfile);
    const authUser = useAuthStore ((state) => state.user);
    const showToast = UseShowToast();
    const [isDeleting , setIsDeleting] = useState(false);
    const deletePost = usePostStore((state) => state.deletePost);
    const decrementPostCount = useuserProfileStore((state) => state.deletePost);

   const handledeletPost = async () => {
  if (!window.confirm("Are you sure you want to delete this post ?")) return ;
  if (isDeleting) return;

try {
     const imageRef = ref (storage, `Posts/${post.id}`);
     await deleteObject(imageRef);
     const userRef = doc(firestore, "users", authUser.uid);
     await deleteDoc(doc(firestore, "Posts", post.id));
     
     await updateDoc(userRef, {
      Posts: arrayRemove(post.id),

     });

   deletePost(post.id);
   decrementPostCount(post.id);
   showToast("Success"," post deleted successfully", "success");

} catch (error) {
  showToast("Error", error.message, "error");
}finally{
  setIsDeleting(false);
}
};







  return( 
    <>
  <GridItem
  cursor={"pointer"}
  borderRadius={4}
  overflow={"hidden"}
  border={"1px solid"}
  borderColor={"whiteAlpha.300"}
  position={"relative"}
  aspectRatio={1/1}
  onClick={onOpen}
  
  >
    <Flex 
    
    opacity={0}
    _hover={{opacity:1}}
    position={"absolute"}
    top={0}
    lang={0}
    right={0}
    bottom={0}
    bg={"blackAlpha.700"}
    transition={"all 0.3s ease"}
    zIndex={1}
    justifyContent={"center"}
    w={"full"}
    
    > 
    <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
        <Flex>
            <AiFillHeart size={25} />
            <Text  fontWeight={"bold"} ml={2}>
              {post.likes.length}
            </Text>
        </Flex>

        <Flex>
            <FaComment size={25} />
            <Text  fontWeight={"bold"} ml={2}>
              {post.comments.length}
            </Text>
        </Flex>

    </Flex>

    </Flex>
<Image src={post.imageURL} alt="profile post"  w={"100%"} h={"100%"} objectFit={"cover"}></Image>

  </GridItem>
  <Modal isOpen={isOpen} onClose={onClose}
  isCentered={true}
  size={{base:"3xl",md:"5xl"}}


  
  >
        <ModalOverlay />
        <ModalContent>
       
          <ModalCloseButton />
          <ModalBody bg={"black"} pb={5}>
            <Flex gap={4} w={{base:"90%",sm:"70%"}} mx={"auto"}
            maxH={"90vh"}
            minH={"50vh"}
            >
              <Flex
              borderRadius={4}
              overflow={"hidden"}
              border={"1px solid "}
              borderColor={"whiteAlpha.300"}
              flex={10}
              justifyContent={"center"}
              alignItems={"center"}
              
              >
                <Image src={post.imageURL} alt="profile post" w={"100%"} h={"70%"} objectFit={"cover"}  />
</Flex>
<Flex  flex={10} flexDir={"column"} px={10} display={{base:"none" , md:"flex"}} >
  <Flex alignItems={"center"} justifyContent={"space-between"} >
      <Flex alignItems={"center"} gap={4} flex={2}> 
      <Avatar src={userProfile.profilePicURL} size={"sm"}/>
      <Text fontWeight={"bold"} fontSize={12}>
      {userProfile.username}

      </Text>

     </Flex>


     {authUser?.uid  === userProfile.uid && (
      <Button size={"sm"} bg={"transparent"}  _hover={{bg:"whiteAlpha.300",color:"red.600"}}
       borderRadius={4} p={1} onClick={handledeletPost}
       isLoading={isDeleting}
       >
      <MdDelete size={20}  cursor='pointer' marginRight={4}/>

    </Button>
     )}
  </Flex>
  <Divider
  my={4}
  bg={"gray.500"}
/>
<VStack w={"full"} alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
{post.caption && <Caption post= {post} />}

{post.comments.map((comment) => (
  <Comment key={comment.id}  comment={comment} />
))}











</VStack>
<Divider my={4} bg={"gray.8000"}/>
    <PostFooter  isProfilePage={true} post={post}/>

  </Flex>
  </Flex>
  </ModalBody>

          
        </ModalContent>
      </Modal>

      </>
  );
};

export default ProfilePost;