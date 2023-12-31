import { Tooltip,  Box, Flex, Modal, ModalOverlay, ModalContent,
   ModalHeader, ModalCloseButton, ModalBody, Textarea, Input, ModalFooter, Button, useDisclosure, Image, CloseButton, Stat } from "@chakra-ui/react"

import { BsFillImageFill } from "react-icons/bs";
import { CreatePostLogo } from "../../assets/constants";
import { useState, useRef } from "react";
import usePreviewImg from "../../src/hooks/usePreviewImg";
import UseShowToast from "../../src/hooks/UseShowToast";
import useAuthStore from "../../src/store/authStore";
import useuserProfileStore from "../../src/store/UserProfileStore";
import { useLocation } from "react-router-dom";
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { firestore , storage} from "../../src/firebase/firebase"

import usePostStore from "../../src/store/PostStor";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const CraetePost = () => {
  const {isOpen, onClose, onOpen} = useDisclosure();
  const showToast = UseShowToast ();
  const [caption , setCaption] = useState("");
  const imageRef = useRef(null);
   const {handleImageChange, selectedFile, setSelectedFile} = usePreviewImg();
   const {isLoading, handleCraetPost} = useCreatePost();
   
   const handlePostCreation = async ( ) => {
    try {
     
      await handleCraetPost(selectedFile, caption);
			onClose();
			setCaption("");
			setSelectedFile(null);

    } catch (error) {

      showToast( "Error", error.message, "error");
      
    }
   };
  
  return (
    <>
    <Tooltip 
    hasArrow
    label={"Create"}
    placement="right"
    ml={1}
    openDelay={500}
    display={{ base:'block', md:"none"}}
    >
    <Flex
      alignItems={"center"}
      gap={4}
      borderRadius={6}
      _hover={{ bg:"whiteAlpha.400"}}
      p={2}
      w={{ base:10,md:"full"}}
      justifyContent={{ base: "center",md:"flex-start" }}
      onClick={onOpen}
     >
      
      <CreatePostLogo/>
      <Box display={{ base:"none",md:"block"}}>Create</Box>
      </Flex>
     </Tooltip>
    
     <Modal isOpen={isOpen} onClose={onClose} size='xl'>
				<ModalOverlay />

				<ModalContent bg={"black"} border={"1px solid gray"}>
					<ModalHeader>Create Post</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<Textarea
							placeholder='Post caption...'
              value={caption}
              onChange={(e)=> setCaption(e.target.value)}
						
						/>

						<Input type='file' hidden ref={imageRef}  onChange={handleImageChange}/>

						<BsFillImageFill
							onClick={() => imageRef.current.click()}
							style={{ marginTop: "15px", marginLeft: "5px", cursor: "pointer" }}
							size={16}
						/>
            {selectedFile && (
              <Flex mt={5} w={"full"} position={"relative"} justifyContent={"center"}>
                <Image src={selectedFile} alt='selectedimg'/>
                <CloseButton
                  position={"absolute"}
                  top={2}
                  right={2}
                  onClick={() => { setSelectedFile(null); 
                  
                  }}/>
              </Flex>
            )}
				
					</ModalBody>

					<ModalFooter>
						<Button mr={3} onClick={handlePostCreation} isLoading={isLoading} >
							Post
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
    



     </>
  )
}

export default CraetePost;




function useCreatePost (){
  const showToast = UseShowToast();
  const [isLoading, setIsLoading] = useState(false);
  const authUser = useAuthStore((state) => state.user);
  const createPost = usePostStore((state) => state.createPost)
  const addPost = useuserProfileStore((state) => state.addPost);
  const userProfile = useuserProfileStore((state) => state.userProfile);
  
  const  {pathname} = useLocation();


  const handleCraetPost  = async (selectedFile, caption ) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error('please select an image');
    setIsLoading(true);
    const newPost = {
      caption: caption,
      likes: [],
      comments:[],
      createdAt: Date.now(),
      createdBy: authUser.uid,
    };

  try{
   const postDocRef = await addDoc(collection(firestore,"Posts"),newPost);
   const userDocRef = doc(firestore, "users", authUser.uid);
   const imageRef = ref(storage, `Posts/${postDocRef.id}`);
   await updateDoc(userDocRef,{Posts: arrayUnion(postDocRef.id)});
   await uploadString(imageRef, selectedFile, "data_url");
   const downloadURL = await getDownloadURL(imageRef);
   await updateDoc(postDocRef, {imageURL: downloadURL});
   


   newPost.imgURL = downloadURL;
    if (userProfile.uid === authUser.uid) createPost({ ...newPost, id:  postDocRef.id});
   if (pathname !== "/" && userProfile.uid === authUser.uid) addPost({ ...newPost, id: postDocRef.id});
    
   showToast("Success", "Post created successfully", "success");







      
    } catch (error) {
      showToast("Error", error.message, "error");
      
    }finally{
      setIsLoading(false);
    }


  }
  return {isLoading , handleCraetPost};
};