import { Box, Container, Flex } from "@chakra-ui/react";
import FeedPosts from "../component/feedpost/feedposts";
import SuggestedUsers from "../component/SuggestedUsers/SuggestedUsers";



const Homepag = () => {
  return (
    <Container maxW={"container.lg"}>
    <Flex gap={20}>
    <Box flex={2} py={10}>
    <FeedPosts />
    </Box>


    <Box flex={3} mr={20} display={{base:"none" , md:"block"}} maxW={"300px"}>
    <SuggestedUsers/>
    </Box>
    </Flex>
    </Container>
  )
}
export default Homepag