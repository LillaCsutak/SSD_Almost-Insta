import Home from './Home'
import Notifications from './Notifications'
import ProfileLink from './ProfileLink'
import CreatePost from './CreatePost'
import Search from './Search'
import useAuthStore from '../../store/AuthStore'

const SidebarItems = () => {
  const authUser = useAuthStore((state) => state.user)

  return (
    <>
    <Home />
    <Search />
    <Notifications />
    {authUser && (<CreatePost />)}
    <ProfileLink />
    </>
  )
}

export default SidebarItems