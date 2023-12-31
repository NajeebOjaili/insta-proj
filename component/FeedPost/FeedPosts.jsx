import { Box, Container, Flex, Skeleton, SkeletonCircle, Text, VStack } from "@chakra-ui/react"
import FeedPost from "./Feedpost"
import useGetFeedPost from "../../src/hooks/useGetFeedPost"




 const FeedPosts = () => {
 const { isLoading, Posts} = useGetFeedPost();


  return(
  <Container maxW={"container.sm"} py={10} px={2}>
   {isLoading && 
   [0,1,2].map((_,idx) => (

            <VStack key={idx} gap={4} alignItems={"flex-start"} mb={10}>
        <Flex gap= '2'>
          <SkeletonCircle size={10} />
          <VStack gap={2} alignItems={"flex-start"}>

            <Skeleton height={10} width={"200px"}/>
            <Skeleton height={10} width={"200px"}/>
          </VStack>

        </Flex>
        <Skeleton w={"full"}>
          <Box h={"400px"} > contents wrapped</Box>
        </Skeleton>

            </VStack>

   ))
          }
   
   
   {!isLoading && Posts.length > 0 && Posts.map((post) => <FeedPost key={post.id} post={post}  /> )}
   {!isLoading && Posts.length === 0 && (
    <Flex alignItems={"center"} display={"flex"}flexDir={"column"}>
    <Text fontSize={"md"} color={"red.400"} >
      look like you don&apos;t have any friends.

    </Text>

    <Text color={"red.400"}>STOP CODING AND GO MAKE SOME !!!</Text>
    </Flex>
   )}
  </Container>
  );
 };

export default FeedPosts