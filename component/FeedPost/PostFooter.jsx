import { Box, Button, Flex , Input, InputGroup, InputRightElement, Text, useDisclosure } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { CommentLogo, NotificationsLogo, UnlikeLogo } from "../../assets/constants";
import usePostComments from "../../src/hooks/usePostComments";
import useAuthStore from "../../src/store/authStore";
import useLikePost from "../../src/hooks/useLikePost";
import { timeAgo } from "../../urils/timeAgo";
import CommentModals from "../../src/Modals/CommentModals";




const PostFooter = ({ post, isProfilePage, creatorProfile}) => {
   
    const {isCommenting, handlePostComment} = usePostComments()
   const [comment , setComment] = useState("");
   const authUser = useAuthStore((state) => state.user);
   const commentRef = useRef(null);
   const {isLiked, likes, handleLikePost} = useLikePost(post);
   const { isOpen, onOpen, onClose } = useDisclosure();


 const handleSubmitComment = async () => {
  await handlePostComment(post.id, comment);
   setComment("");
 };

 
  return (
    <Box mb={10} marginTop={"auto"}>
    <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"4"}>
        <Box onClick={handleLikePost} cursor={"pointer"} fontSize={18}>
            {!isLiked ? (<NotificationsLogo/>) : (<UnlikeLogo/>)

            }
        </Box>
        <Box fontSize={18} cursor={"pointer"} 
        
        onClick={()=> commentRef.current.focus()}>
            <CommentLogo />

        </Box>
         </Flex>

         <Text fontWeight={600} fontSize={"sm"} >

            {likes} likes
         </Text>
     {isProfilePage && (
        <Text fontSize={12} color={"gray"}>
             posted {timeAgo( post.createdAt)}
        </Text>
     )}
         
        {!isProfilePage && (
            <>
                <Text fontSize='sm' fontWeight={700}>
                {creatorProfile?.username}{""}

            </Text>
         {post.comments.length > 0 && (
 <Text as='span' color={"gray"} cursor={"pointer"} onClick={onOpen}>
 view all {post.comments.length} comments
</Text>
         )}
          
{isOpen ? <CommentModals isOpen={isOpen} onClose={onClose} post={post} /> : null}
           
            </>

         )}
        

        
        {authUser && (
             <Flex 
             alignItems={"center"}
             gap={2}
             justifyContent={"space-between"}
            w={"full"}
             >
                <InputGroup>
                <Input variant={"flushed"} 
                 placeholder={"Add comments ..."} 
                 fontSize={14} onChange={(e) => setComment(e.target.value)} 
                 value={comment} 
                 ref={commentRef}
                 
                 />
                <InputRightElement>
                <Button 
                fontSize={14}
                color={"blue.500"}
                fontWeight={600}
                cursor={"pointer"}
                _hover={{color:"white"}}
                bg={"transparent"}
                onClick={handleSubmitComment}
                isLoading={isCommenting}
                
                >Post</Button>
                
                </InputRightElement>
                </InputGroup>
                </Flex> 
    
        )}


            </Box>
  )
   

        }

export default PostFooter