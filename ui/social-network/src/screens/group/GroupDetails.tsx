import { createContext, useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import { TokenUtils } from "../../common";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { GroupResp } from "../../model/groupModel";
import groupService from "../../services/group/groupService";
import userMemberGroupService from "../../services/group/userMemberGroupService";
import { convertToHeader } from "../../utils/utils";
import GroupAbout from "./GroupAbout";
import { useGroup } from "./GroupProvider";
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
    name: "Management",
    path: "management"
  }
]


export default function GroupDetails() {
  const { groupId } = useParams()
  const { group, setGroup } = useGroup()
  const [checkJoinedGroup, setCheckJoinedGroup] = useState<"JOINED" | "REQUESTED" | "NONE">("NONE")
  const [joinLeaveState, setJoinLeaveState] = useState({
    loading: false,
    error: "",
  })

  useEffect(() => {
    groupService.getDetailGroup(groupId).then(resp => {
      console.log("group: ", resp.data)
      setGroup(resp.data.data)
    })

  }, [groupId])


  useEffect(() => {
    if (!joinLeaveState.loading) {
      userMemberGroupService.checkJoinedGroup(groupId).then(res => {
        setCheckJoinedGroup(res.data.data)
        console.log("dua bo ak: ", res.data.data)
      })
        .catch(err => console.log("err when fetch checkjoingroup: ", err))
    }
  }, [groupId, joinLeaveState])



  const [useNav, setUseNav] = useState<any>("posts");
  const handleJoinLeave = () => {
    setJoinLeaveState((prev) => ({ ...prev, loading: true }))
    if (checkJoinedGroup == "JOINED") {
      //leave
      userMemberGroupService.leaveGroup(groupId).then((resp) => {
        console.log('data after leave: ', resp.data)
      })
        .catch(err => { console.log("leave error: ", err) })
        .finally(() => {
          setJoinLeaveState((prev) => ({ ...prev, loading: false }))
        })
    } else if (checkJoinedGroup == "NONE") {
      //join
      //leave
      userMemberGroupService.requestJoinGroup(groupId).then((res) => {
        console.log('data after join: ', res.data)
      })
        .catch(err => { console.log("join error: ", err) })
        .finally(() => {
          setJoinLeaveState((prev) => ({ ...prev, loading: false }))
        })
    } else {
      userMemberGroupService.rejectUser(groupId, TokenUtils.authLogin.userId).then(resp => {
        console.log("cancel")
      }).catch(err => {
        console.log('cancel error: ', err)
      }).finally(() => {
        setJoinLeaveState((prev) => ({ ...prev, loading: false }))
      })
    }
  }


  console.log('status: ', checkJoinedGroup)

  const header = (
    <>
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
            {checkJoinedGroup == "JOINED" && (<InviteUser groupId={name} />)}

            <div className={`d-flex align-items-center btn btn-${checkJoinedGroup != "NONE" ? "danger" : "secondary"} `} onClick={() => {
              handleJoinLeave()
            }}><Spinner loading={joinLeaveState.loading} /><span style={{ fontSize: "18px", marginLeft: `${joinLeaveState.loading ? "5px" : "0"}` }}>{checkJoinedGroup == "JOINED" ? "Left" : checkJoinedGroup == "REQUESTED" ? "Cancel" : "Join"}</span></div>
          </div>
        </div>
        <p className="text-muted">{convertToHeader(group?.groupType || "")} group · {group?.numberOfMembers} members</p>
      </div>
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
      </div>
    </>
  )


  if (checkJoinedGroup != "JOINED") {
    return <>
      {header}
      <GroupAbout />
    </>
  }

  return (
    <div className="min-vh-100">


      {/* Group Info */}
      <div className="container mt-3">
        {header}
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
  );
}