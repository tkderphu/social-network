import { createContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { GroupResp } from "../../model/groupModel";
import groupService from "../../services/group/groupService";
import userMemberGroupService from "../../services/group/userMemberGroupService";
import { convertToHeader } from "../../utils/utils";
import InviteUser from "./InviteUser";



const NAV = [
  {
    name: "About",
    path: "about"
  },
  {
    name: "Posts",
    path: "posts"
  },
  {
    name: "Members",
    path: "members"
  },
  {
    name: "Media",
    path: "media"
  },
  {
    name: "Setting",
    path: "setting"
  },
  {
    name: "Management",
    path: "management"
  }
]

export const GroupContext = createContext(undefined)

export default function GroupDetails() {
  const { name } = useParams()
  const [group, setGroup] = useState<GroupResp>()
  const [checkJoinedGroup, setCheckJoinedGroup] = useState(false)
  const [joinLeaveState, setJoinLeaveState] = useState({
    loading: false,
    error: "",
  })

  useEffect(() => {
    groupService.getDetailGroup(name).then(resp => {
      console.log("group: ", resp.data)
      setGroup(resp.data.data)
    })

  }, [name])

  useEffect(() => {
    if (!joinLeaveState.loading) {
      userMemberGroupService.checkJoinedGroup(name).then(res => { setCheckJoinedGroup(res.data.data) })
        .catch(err => console.log("err when fetch checkjoingroup: ", err))
    }
  }, [name && joinLeaveState])



  const [useNav, setUseNav] = useState<any>("posts");
  const handleJoinLeave = () => {
    setJoinLeaveState((prev) => ({...prev, loading: true}))
    if (checkJoinedGroup) {
      //leave
      userMemberGroupService.leaveGroup(name).then((resp) => {
        console.log('data after leave: ', resp.data)
      })
      .catch(err => {console.log("leave error: ", err)})
      .finally(() => {
        setJoinLeaveState((prev) => ({...prev, loading: false}))
      })
    } else {
      //join
      //leave
      userMemberGroupService.requestJoinGroup(name).then((res) => {
        console.log('data after join: ', res.data)
      })
      .catch(err => {console.log("join error: ", err)})
      .finally(() => {
        setJoinLeaveState((prev) => ({...prev, loading: false}))
      })
    }
  }
  return (
    <GroupContext.Provider value={group}>
      <div className="min-vh-100">
        {/* Cover Photo */}
        <div className="">
          <img
            src={group?.coverPhoto}
            alt="Cover"
            className="w-100"
            style={{ height: "300px", objectFit: "cover" }}
          />
          {/* <div className="d-flex justify-content-between mt-2"> */}
          <div className="bottom-0 start-0  bg-primary px-3 py-1">
            Group by <strong>{group?.owner?.firstName + " " + group?.owner?.lastName}</strong>
          </div>
          {/* <button className="btn btn-secondary me-2">Joined</button> */}
          {/* </div> */}

        </div>

        {/* Group Info */}
        <div className="container mt-3">
          <div className="d-flex justify-content-between">
            <h3>{group?.name}</h3>
            <div className="d-flex">
              <InviteUser groupId={name} />
              <div className={`d-flex align-items-center btn btn-${checkJoinedGroup ? "danger" : "secondary"} `} onClick={() => {
                handleJoinLeave()
              }}><Spinner loading={joinLeaveState.loading}/><span style={{fontSize: "18px", marginLeft: `${joinLeaveState.loading ? "5px" : "0"}`}}>{checkJoinedGroup ? "Left" : "Join"}</span></div>
            </div>
          </div>
          <p className="text-muted">{convertToHeader(group?.groupType || "")} group · {group?.numberOfMembers} members</p>

          {/* Avatars */}
          <div className="d-flex mb-3">
            {[...Array(10)].map((_, i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/40?img=${i + 1}`}
                alt="avatar"
                className="rounded-circle me-1"
                width={32}
                height={32}
              />
            ))}
            {/* <img
              key={i}
              src={`https://i.pravatar.cc/40?img=${i + 1}`}
              alt="avatar"
              className="rounded-circle me-1"
              width={32}
              height={32}
            /> */}
            {/* <i className="bi bi-plus rounded-circle me-1" style={{height: "32px", width: "32px", fontSize: "18px"}} ></i> */}
          </div>

          {/* Action Buttons */}

          {/* Navigation Tabs */}
          <ul className="nav nav-tabs">
            {NAV.map(nav => {
              return (
                <li className="nav-item" onClick={() => {
                  setUseNav(nav.path)
                }}>
                  <Link className={"nav-link " + (nav.path === useNav ? "active" : "")} to={nav.path}>
                    {nav.name}
                  </Link>
                </li>
              )
            })}
          </ul>
          <Outlet />

          {/* Post Input */}
          {/* <div className="bg-secondary rounded p-3 mt-3">
          <input
            className="form-control mb-2"
            placeholder="Write something..."
          />
          <div className="d-flex justify-content-between">
            <button className="btn btn-outline-light">📊 Poll</button>
          </div>
        </div> */}

        </div>
      </div>
    </GroupContext.Provider>
  );
}
