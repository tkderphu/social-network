import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router";
import { GroupResp } from "../../model/groupModel";
import groupService from "../../services/group/groupService";
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

export default function GroupDetails() {
  const { name } = useParams()
  const [group, setGroup] = useState<GroupResp>()
  useEffect(() => {
    groupService.getDetailGroup(name).then(resp => {
      console.log("group: ", resp.data)
      setGroup(resp.data.data)
    })
  }, [])
  const [useNav, setUseNav] = useState<any>("posts");
  return (
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
         <div>
          <InviteUser/>
          <button className="btn btn-secondary me-2">Joined</button>
         </div>
        </div>
        <p className="text-muted">{group?.groupType} group · {group?.numberOfMembers} members</p>

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
  );
}
