import { Box, Flex, Grid, Skeleton, Text, VStack } from "@chakra-ui/react"

import ProfilePost from "./ProfilePost";
import useGetUserpost from "../../src/hooks/useGetUserPost";

const ProfilePosts = () => {
    const {isLoading, Posts} = useGetUserpost();


    const noPostFouns = !isLoading && Posts.length === 0;
    if (noPostFouns) return <NoPostFound/> ;
    
  
  return (
        <Grid
        templateColumns={{
            sm:"repeat(1 , 1fr)",
            md:"repeat(3,1fr)",
        }}
        gap={1}
        columnGap={1}
        >
    {isLoading &&
        [0,1,2,3].map((_,idx)=>(
            <VStack key={idx} justifyContent={"flex-start"}>
                <Skeleton w={"full"}>
                 <Box h="300px"> content wrapper</Box>
                </Skeleton>

            </VStack>
        )) }


    {!isLoading && (
        <>
       {Posts.map((post) =>(
          <ProfilePost post={post} key={post.id}/> 
       )) }
         
     </>
    

    )}

  </Grid>

  ); 
};

export default ProfilePosts;



const NoPostFound = () => {
   
    return (
        <Flex flexDir='column' textAlign={"center"} mx={"auto"} mt={10}>
         <Text fontSize={"2XL"}>
            NO POST FOUND 🤔
         </Text>

        </Flex>

    );



};