import { useEffect, useRef, useState } from 'react'
import { Link, Outlet, replace, useLocation, useNavigate } from 'react-router'
import Modal from '../../components/Modal';
import ModalCustome from '../../components/modal/ModalCustom';
import SearchComponent from '../../components/searchInput/SearchComponent';
import { GroupResp } from '../../model/groupModel';
import groupService from '../../services/group/groupService';
import NewFeed from '../feed/NewFeed'
import './Group.css'
import GroupForm from './GroupForm';
const LINK = [
    {
        name: "Your feed",
        path: "feed"
    },
    {
        name: "Your groups",
        path: "my"
    },
    {
        name: "Create group"
    }
]
const GROUP_FAKE = [
    {
        slug: "hang-mu",
        name: "hang mu",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png/250px-Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png"
    },
    {
        slug: "hoc-tieng-nhat-ban-nihongo",
        name: "Hoc tieng nhat ban nihongo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png/250px-Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png"
    },
    {
        slug: "hoc-tieng-nhat-ban-nihongo",
        name: "Hoc tieng nhat ban nihongo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png/250px-Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png"
    },
    {
        slug: "hoc-tieng-nhat-ban-nihongo",
        name: "Hoc tieng nhat ban nihongo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png/250px-Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png"
    },
    {
        slug: "hoc-tieng-nhat-ban-nihongo",
        name: "Hoc tieng nhat ban nihongo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png/250px-Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png"
    },
    {
        slug: "hoc-tieng-nhat-ban-nihongo",
        name: "Hoc tieng nhat ban nihongo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png/250px-Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png"
    },
    {
        slug: "hoc-tieng-nhat-ban-nihongo",
        name: "Hoc tieng nhat ban nihongo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png/250px-Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png"
    },
    {
        slug: "hoc-tieng-nhat-ban-nihongo",
        name: "Hoc tieng nhat ban nihongo",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png/250px-Aespa_KARINA_Airport_Departure_on_20250226_02_%28cropped%29.png"
    }
]
function Group() {
    const navigate = useNavigate();
    const hasRedirected = useRef(false); // ✅ only redirect once
    const location = useLocation()
    const [useLink, setUseLink] = useState<any>("Your feed")
    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<any>()
    const [groupsJoined, setGroupsJoined] = useState<GroupResp[]>([])

    useEffect(() => {
        if (location.pathname.includes("feed")) {
            if (!hasRedirected.current) {
                hasRedirected.current = true;
                navigate('feed', { replace: true });
            }
        }
    }, []);


    useEffect(() => {
        groupService.getListJoined().then(resp => {
            setGroupsJoined(resp.data.data)
        }).catch(err => {
            alert("err when fetch list joined")
            console.error("err: ", err)
        })
    }, [])

    return (
        <>
            <div className="row mt-3 m-1">

                <div className="col-3 sticky-sidebar hide-scrollbar">
                    <div>
                        
                        <div className='mt-2 mb-2'>
                        <SearchComponent
                            placeholder='Search groups'
                            handleSearch={(query: string) => {
                            console.log("query search: ", query)
                        }} />
                        </div>
                        {LINK.map(link => {
                            if (link.path) {
                                return <Link to={link.path} className={`btn ${link.name === useLink ? "btn-secondary" : "btn-light"} w-100`}
                                    onClick={() => {
                                        setUseLink(link.name)
                                    }}
                                >{link.name}</Link>
                            }
                            return (
                                <button className={`btn ${link.name === useLink ? "btn-secondary" : "btn-light"} w-100`}
                                    onClick={() => {
                                        setOpenCreateModal(true)
                                        setUseLink(link.name)

                                    }}
                                >{link.name}</button>
                            )
                        })}
                    </div>
                    <ModalCustome
                        children={<GroupForm />}
                        onClose={() => {
                            setOpenCreateModal(false)
                            setUseLink("loz")
                        }}
                        show={openCreateModal}
                        title="Form create group"
                        closable={false}
                    />
                    <hr style={{ backgroundColor: "red" }} />
                    <h4>Groups you've joined</h4>
                    <div className='sticky-sidebar hide-scrollbar'>
                        {groupsJoined && groupsJoined.map(fake => {
                            return (
                                <Link onClick={() => {
                                    setSelectedGroup(fake.name)
                                }} style={{ textDecoration: "none" }} to={"/groups/" + fake.id} className={'btn short-cut-group d-flex align-items-center mb-3 ' + (fake.name == selectedGroup ? "btn-secondary" : "")}>
                                    <img src={fake.coverPhoto}
                                        width={"60px"}
                                    />
                                    <div className='mx-2 text-start' style={{ fontSize: "20px" }}><span>{fake.name}</span></div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                {/* <div className='col-1'></div> */}
                <div className="col-9 vertical-line">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
export default Group