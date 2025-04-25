import { useEffect, useState } from 'react'

import './App.css'
import { Routes, BrowserRouter, Route, useLocation } from 'react-router'
import LoginScreen from './screens/authen/LoginScreen'
import ForgotPassworScreen from './screens/authen/ForgotPasswordScreen'
import RegisterScreen from './screens/authen/RegisterScreen'
import ProfileScreen from './screens/profile/ProfileScreen'
import Header from './components/Header'
import Friend from './screens/friend/Friend'
import Suggestion from './screens/friend/Suggestion'
import UserChatBox from './screens/chat/UserChatBox'
import ChatContainer from './screens/chat/ChatContainer'
import SearchResult from './screens/search/SearchResult'
import PostSearchResult from './screens/search/PostSearchResult'
import Home from './screens/home/Home'
import Group from './screens/group/Group'
import { Provider } from 'react-redux'
import store from './redux/store'
import { TokenUtils } from './common'
import FriendRequest from './screens/friend/FriendRequest'
import ListFriend from './screens/friend/ListFriend'
import FriendAccept from './screens/friend/FriendAccept'
import ChatList from './screens/chat/ChatList'
import NewFeed from './screens/feed/NewFeed'
import GroupPage from './screens/group/GroupPage'
import UserSearchResult from './screens/search/UserSearchResult'
import Post from './screens/post/Post'
import PostGlobal from './screens/post/PostGlobal'
import PostDetailDialog from './screens/post/PostDetailDialog'
import Messenger from './screens/chat/Messenger'
import GroupChatForm from './screens/chat/GroupChatForm'
import { ac } from 'react-router/dist/development/route-data-BmvbmBej'
export interface HandleChat {
  handleClickChat: any,
  handleCloseChat: any
}
function App() {

  const [activeChats, setActiveChats] = useState<any>([]);

  const handleClickChat = (chatComponent: any) => {
    // Kiểm tra nếu user chưa có trong danh sách chat thì mới thêm
    // if (!activeChats.find(chat => chat.id === user.id)) {
    //   setActiveChats([...activeChats, user]);
    // }
    console.log("add new chat")
    setActiveChats([...activeChats, chatComponent])
  };

  const handleCloseChat = () => {
    // setActiveChats(activeChats.filter(chat => chat.id !== id));
  };

  const [userChatBoxs, setUserChatBoxs] = useState<Array<any>>()
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  console.log("location: ", location)
  if (!["/login", "/forgot-password", "/register"].includes(location.pathname) && !TokenUtils.tokenIsExpired) {

  }

  return (
    <>
      <Provider store={store}>
        {!["/login", "/forgot-password", "/register"].includes(location.pathname) &&
          <Header container={userChatBoxs || new Array<any>()} fn={(arr: Array<any>) => {
            setUserChatBoxs(arr)
          }} />}
        <Routes location={state?.backgroundLocation || location}>
          <Route path='/' element={<Home />} />
          <Route path='friends' element={<Friend />}>
            <Route element={<ListFriend type='MY' />} index></Route>
            <Route path='suggestions' element={<Suggestion />} />
            <Route path='requests' element={<FriendRequest />} />
            <Route path='accepts' element={<FriendAccept />} />
            <Route path='profile/:id' element={<ProfileScreen handleChat={{handleClickChat, handleCloseChat}}/>} />
          </Route>
          <Route path='messages' element={<Messenger />} >
            <Route path='group' element={<GroupChatForm />} />
            {/* <Route index path=':conversationId' element={<UserChatBox removeThisUserChatboxFn={() => { }} />} /> */}
          </Route>
          <Route path='login' element={<LoginScreen />}></Route>
          <Route path='register' element={<RegisterScreen />}></Route>
          <Route path='forgot-password' element={<ForgotPassworScreen />}></Route>
          <Route path='profile/:id' element={<ProfileScreen handleChat={{handleClickChat, handleCloseChat}}/>} ></Route>
          <Route path='search' element={<SearchResult />}>
            <Route index element={<UserSearchResult />} />
            <Route path='profile/:id' element={<ProfileScreen  handleChat={{handleClickChat, handleCloseChat}}/>}  />
          </Route>
          <Route path='search/posts' element={<PostSearchResult />}></Route>
          <Route path='groups' element={<Group />}>
            {/* <Route path='joined' element={<GroupPage/>} /> */}
            <Route path='feed' element={<NewFeed />} />
            <Route path=':name' element={<GroupPage />} />
          </Route>
          {/* <Route path='posts' element={<Post />}>

            </Route> */}
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/posts/:id" element={<PostDetailDialog />} />
          </Routes>
        )}
        <ChatContainer userChatBoxs={activeChats} />

      </Provider>
    </>
  )
}

export default App
