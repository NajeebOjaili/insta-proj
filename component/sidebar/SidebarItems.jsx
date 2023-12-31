import CraetePost from "./CreatePost"
import Home from "./Home"
import Notification from "./Notification"
import ProfileLink from "./ProfileLink"
import Search from "./Search"


const  SidebarItems = () =>  {
  return (
  <>
  <Home/>
  <Search/>
 <Notification/>
 <CraetePost/>
 <ProfileLink/>
  </>
  )
}

export default SidebarItems