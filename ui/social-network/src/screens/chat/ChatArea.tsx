import { IMessage } from "@stomp/stompjs";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import { toast } from "react-toastify";
import { CommonResult, TokenUtils } from "../../common";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { MemberConversationRespVO } from "../../model/chatModel";
import { BlockedUserStatusResp, ProfileSimpleResp, UserProfileResp } from "../../model/profileModel";
import { fetchListConversationAction, fetchListMessageAction } from "../../redux/actions/chatAction";
import { fetchProfileAction } from "../../redux/actions/profileAction";
import conversationService, { ConversationRespVO } from "../../services/chat/conversationService";
import memberConversationService from "../../services/chat/memberConversationService";
import { MessageCreateReqVO, MessageRespVO } from "../../services/chat/messageService";
import profileService from "../../services/profile/profileService";
import { useStompClient } from "../../utils/useStomp";
import { convertToHeader } from "../../utils/utils";
import "./Chat.css"


export default function ChatArea(props: any) {
    const location = useLocation()
    const { id } = useParams()
    const [establishedConversation, setEstablishedConversation] = useState<boolean>(false)
    const [messageReq, setMessageReq] = useState<MessageCreateReqVO>({
        message: ''
    })
    const [listMsg, setListMsg] = useState<MessageRespVO[]>()
    const fetchListMessageState: {
        loading: boolean,
        message: any,
        hasError: boolean,
        messages: MessageRespVO[]
    } = useSelector((state: any) => {
        return state.fetchListMessage
    })
    const fetchUserState: {
        userProfile: ProfileSimpleResp,
        loading: boolean,
        hasError: boolean,
        message: any
    } = useSelector((state: any) => {
        return state.fetchProfile
    })


    const stompClient = useStompClient({ path: "chat/ws" })


    const sendMessageToConversation = () => {
        const req: any = { ...messageReq, establishedConversation: establishedConversation, conversationId: id }
        console.log("message req: ", req)
        if (!establishedConversation && location.state?.userId) {
            req.toUserId = location.state.userId
        }
        stompClient?.publish({
            destination: "/app/chat/send",
            body: JSON.stringify(req)
        })

        setMessageReq((prev) => ({
            ...prev,
            "message": "",
            files: undefined,
            images: undefined
        }))
    }


    useEffect(() => {
        setListMsg(fetchListMessageState.messages)
    }, [fetchListMessageState])


    const dispatch = useDispatch()

    useEffect(() => {

        if (location.state && location.state.userId) {
            //@ts-ignore
            dispatch(fetchProfileAction(location.state.userId))
        }
    }, [])



    const [conversation, setConversation] = useState<ConversationRespVO | undefined>(undefined)
    useEffect(() => {
        conversationService.getConversation(id).then(resp => {
            const result: CommonResult<any> = resp.data;
            console.log("result when fetch conversation by id: ", result.data)
            if (result.code === 200) {
                setConversation(result.data)
                setEstablishedConversation(true)
            } else {
                setEstablishedConversation(false)
            }
        }).catch(err => {
            alert("Service is crashed")
        })



        //@ts-ignore
        dispatch(fetchListMessageAction(id))
        // setListMsg(allMessages)
    }, [id])



    const [memberConversation, setMemberConversation] = useState<MemberConversationRespVO>()
    const [listMemberConversation, setListMemberConversation] = useState<MemberConversationRespVO[]>()
    const [blockedUserStatusResp, setBlockedUserStatusResp] = useState<BlockedUserStatusResp>()
    useEffect(() => {
        if (conversation) {
            memberConversationService.getMemberConversationDetail(conversation.id)
                .then(resp => {
                    console.log("detail: ", resp.data)
                    setMemberConversation(resp.data.data)
                }).catch(err => {
                    console.log("established conversation failed with conversation: ", conversation)
                })

            memberConversationService.getListMemberConversation(conversation.id)
                .then(resp => {
                    setListMemberConversation(resp.data.data)
                }).catch(err => {
                    console.log("established conversation failed with conversation: ", conversation)
                })

        }
    }, [conversation])

    const getOtherMemberFromPrivateConversation = () => {
        return listMemberConversation?.filter(v => {
            return v.member.id != TokenUtils.authLogin.userId
        })?.at(0)
    }

    useEffect(() => {
        setBlockedUserStatusResp(undefined)
        if (conversation && conversation.conversationType == "PRIVATE" && listMemberConversation && !blockedUserStatusResp) {
            profileService.getStatusBlocked(getOtherMemberFromPrivateConversation()?.member.id).then(resp => {
                console.log("blocked: ", resp.data)
                setBlockedUserStatusResp(resp.data.data)
            }).catch(err => {
                console.log("err fetch blocked status")
            })
        }
    }, [listMemberConversation, conversation])




    useEffect(() => {
        let userSubscription: any;
        let conversationSubscription: any;

        if (stompClient?.connected) {
            console.log("connected");

            // Subscribe to conversation-specific topic
            conversationSubscription = stompClient.subscribe(
                `/topic/chat/conversation/${id}`,
                (msg: IMessage) => {
                    // fetchListConversation();
                    const message: MessageRespVO = JSON.parse(msg.body);
                    setListMsg((prev: any) => [...prev, message]);
                }
            );
        }

        // Cleanup function to unsubscribe when `id` changes or on unmount
        return () => {
            if (userSubscription) {
                userSubscription.unsubscribe();
            }
            if (conversationSubscription) {
                conversationSubscription.unsubscribe();
            }
        };
    }, [id, stompClient?.connected]);

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Load initial messages
    useEffect(() => {
        loadMoreMessages(false);
    }, []);

    useEffect(() => {
        scrollContainerRef.current?.scrollIntoView({
            behavior: "auto"
        })
    }, [listMsg?.length])

    // Scroll handler
    const handleScroll = () => {
        console.log('vcl')

    };

    const loadMoreMessages = (initial = false) => {


    };


    useEffect(() => {
        const handleWindowScroll = () => {
            console.log("win down scroll")
            if (window.scrollY <= 50 && !isLoading && hasMore) {
                loadMoreMessages();
            }
        };

        window.addEventListener("scroll", handleWindowScroll);

        return () => {
            window.removeEventListener("scroll", handleWindowScroll);
        };
    }, [isLoading, hasMore]);


    const [openDetailConversation, setOpenDetailConversation] = useState(false)


    if (fetchUserState.loading) {
        return <Spinner loading={fetchUserState.loading} />
    }

    if (fetchUserState.hasError) {
        return <Alert message={fetchUserState.message} type={"danger"} />
    }


    const onChangeNotification = (e: any) => {
        const { name, checked } = e.target
        const req = {
            conversationId: conversation?.id,
            [name]: checked
        }

        memberConversationService.updateNotify(req)
            .then(resp => {
                if (resp.data.code == 200) {
                    setMemberConversation((prev: any) => ({
                        ...prev,
                        [name]: checked
                    }))
                    toast.success("Updated successfully")
                } else throw new Error("please check server")
            }).catch(err => {
                toast.error("Error")
                console.log("err: ", err)
            })
    }

    if (fetchUserState) {
        // console.log("================user profile, conversation=================", fetchUserState.userProfile, conversation, conversation ? conversation?.nickname : fetchUserState.userProfile?.firstName)

    }
    return (
        <div className="row " >
            <div className={` ${openDetailConversation ? "col-8" : ""}  container d-flex flex-column bg-white  position-relative`} style={{ height: "98vh" }}   >
                <div className="d-flex justify-content-between align-items-center p-4 border-bottom  bg-white position-sticky top-0"
                    style={{ zIndex: 10, height: "10vh" }} >
                    <div className="d-flex align-items-center">
                        <img src={conversation != undefined ? conversation?.thumbnail : fetchUserState.userProfile?.avatar} alt={props.selectedChat?.name} className="border rounded-circle me-3 chat-avatar" />
                        <div className="d-flex flex-column">
                            <Link className="text-dark text-decoration-none" to={`/profile/${fetchUserState.userProfile?.id}`}> <h2 className="fs-5 fw-bold mb-0">{conversation ? conversation?.nickname : fetchUserState.userProfile?.firstName + " " + fetchUserState.userProfile?.lastName}</h2>
                            </Link>
                            {(conversation?.online) && <span className="text-success">Online</span>}
                            {(!conversation?.online) && <span className="text-danger">Offline</span>}

                        </div>
                    </div>
                    <button className="btn btn-outline-secondary"
                        onClick={() => setOpenDetailConversation(!openDetailConversation)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-info-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 <TurnEnd>1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                            <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                    </button>
                </div>


                {/* <div className="container hid"> */}
                <div className="flex-grow-1 p-4 hide-scrollbar" style={{ overflowY: "scroll", height: "80vh" }}>

                    {listMsg?.map((message, index) => (
                        <div
                            key={index}
                            //@ts-ignore
                            className={`mb-4 d-flex ${message.sender.id === TokenUtils.authLogin.userId ? 'justify-content-end' : 'justify-content-start'}`}
                        >
                            <div
                                //@ts-ignore
                                className={`p-3 rounded-3 chat-message ${message.sender.id === TokenUtils.authLogin.userId ? 'bg-primary text-white' : 'bg-light text-dark'
                                    }`}
                            >
                                <p className="mb-1">{message.message}</p>
                                <span className="fs-6 text-muted">{message.timeAgo}</span>
                            </div>
                        </div>
                    ))}


                    <div ref={scrollContainerRef}></div>

                </div>
                {/* </div> */}

                <div className="p-4 border-top position-sticky bottom-0 bg-white" style={{ zIndex: 10 }}>
                    {blockedUserStatusResp?.blocked ?
                        (
                            blockedUserStatusResp.direction == "FROM" ? (
                                <div className="d-flex justify-content-center">
                                    <h4 >You have blocked {getOtherMemberFromPrivateConversation()?.member.fullName}</h4>
                                    <button className="btn btn-danger mx-3">Unblock</button>
                                </div>
                            ) : (<h4 className="text-center">You had been blocked by {getOtherMemberFromPrivateConversation()?.member.fullName}</h4>)
                        )
                        :
                        (
                            <div className="d-flex align-items-center">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={messageReq.message}
                                    onChange={(e: any) => {
                                        setMessageReq((prev) => ({
                                            ...prev,
                                            message: e.target.value
                                        }));
                                    }}
                                    className="form-control rounded-pill flex-grow-1 me-2"
                                    aria-label="Message input"
                                />
                                <button className="btn btn-primary  rounded-circle" onClick={() => {
                                    sendMessageToConversation()
                                }}>
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </button>
                            </div>
                        )}

                </div>

            </div>

            {
                openDetailConversation && (
                    <div className="vertical-line container col-4 d-flex flex-column bg-white position-sticky top-0 sticky-sidebar"       >
                        <div className=" p-4 border-bottom  bg-white mb-2"
                            style={{ zIndex: 10 }} >
                            <h3>Details</h3>
                        </div>
                        <div className="hide-scrollbar">
                            <h5>Notification</h5>
                            <div className="d-flex align-items-center p-3 justify-content-between  mb-3 border-bottom">
                                <div style={{ fontSize: "20px" }}><i className="bi bi-volume-up"></i></div>
                                <span>Sound</span>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked"
                                        name="enableSoundNotification"
                                        onChange={(e) => onChangeNotification(e)}
                                        checked={memberConversation?.enableSoundNotification} />
                                </div>
                            </div>
                            <div className="d-flex align-items-center p-3 justify-content-between  mb-2 border-bottom">
                                <div style={{ fontSize: "20px" }}><i className="bi bi-bell"></i></div>
                                <span>Push</span>
                                <div className="form-check form-switch">
                                    <input className="form-check-input"
                                        name="enablePushNotification"
                                        onChange={onChangeNotification}
                                        type="checkbox" id="flexSwitchCheckChecked" checked={memberConversation?.enablePushNotification} />
                                </div>
                            </div>
                            <div>
                                <h5>
                                    Self
                                </h5>
                                <div className="d-flex justify-content-between align-items-center border-bottom">
                                    <div className="d-flex mt-2 p-2 mb-2">
                                        <img src={memberConversation?.member?.avatar} className="rounded-circle border me-3 chat-avatar" />
                                        <div className="d-flex flex-column">
                                            <Link className="text-dark text-decoration-none" to={`/profile/${memberConversation?.id}`}> <h2 className="fs-5 fw-bold mb-0">{memberConversation?.member?.fullName}</h2>
                                            </Link>
                                            {memberConversation?.member?.isOnline && <span className="text-success">Online</span>}
                                            {!memberConversation?.member?.isOnline && <span className="text-danger">Offline</span>}

                                        </div>
                                    </div>
                                    {conversation?.conversationType == "PUBLIC" && (<div ><strong>{convertToHeader(memberConversation?.role || "")}</strong></div>)}
                                </div>
                            </div>

                            <h5>Members</h5>
                            {listMemberConversation?.map(mc => {
                                if (mc.id == memberConversation?.id) return null
                                return (
                                    <div className="d-flex justify-content-between align-items-center border-bottom">
                                    <div className="d-flex mt-2  p-2">
                                        <img src={mc?.member?.avatar} className="rounded-circle border me-3 chat-avatar" />

                                        <div className="d-flex flex-column">
                                            <Link className="text-dark text-decoration-none" to={`/profile/${mc?.member?.id}`}> <h2 className="fs-5 fw-bold mb-0">
                                                {mc?.member?.fullName}</h2>
                                            </Link>
                                            {mc?.member?.isOnline && <span className="text-success">Online</span>}
                                            {!mc?.member?.isOnline && <span className="text-danger">Offline</span>}

                                        </div>
                                    </div>
                                   {conversation?.conversationType == "PUBLIC" && ( <div ><strong>{convertToHeader(mc.role)}</strong></div>)}
                                </div>
                                )
                            })}

                        </div>
                        <div className="p-4 border-top position-sticky bottom-0 bg-white" style={{ zIndex: 10 }}>
                            <div style={{ color: "red", cursor: "pointer" }} className="p-2" onClick={() => {
                                confirmDialog({
                                    message: "Are you sure you want to block this user? You can't see them on your social",
                                    header: 'Confirmation',
                                    icon: 'pi pi-exclamation-triangle',
                                    accept: () => {
                                        // Handle accept
                                        console.log('Accepted');
                                    },
                                    // reject: () => {
                                    //     // Handle reject
                                    //     console.log('Rejected');
                                    // }
                                });
                            }}>Report</div>
                            <div style={{ color: "red", cursor: "pointer" }} className="p-2" onClick={() => {
                                confirmDialog({
                                    message: 'Are you sure you want to delete this conversation?',
                                    header: 'Confirmation',
                                    icon: 'pi pi-exclamation-triangle',
                                    accept: () => {
                                        // Handle accept
                                        console.log('Accepted');
                                    },
                                    // reject: () => {
                                    //     // Handle reject
                                    //     console.log('Rejected');
                                    // }
                                });
                            }}>Delete chat</div>
                            {conversation?.conversationType == "PRIVATE" && (
                                <div style={{ color: "red", cursor: "pointer" }} className="p-2" onClick={() => {
                                    confirmDialog({
                                        message: `Are you sure you want to block ${getOtherMemberFromPrivateConversation()?.member.fullName} `,
                                        header: 'Confirmation',
                                        icon: 'pi pi-exclamation-triangle',
                                        accept: () => {
                                            profileService.updateBlockUser({
                                                blockType: true,
                                                toUserId: getOtherMemberFromPrivateConversation()?.member.id
                                            }).then(resp => {
                                                const commonResult: CommonResult<any> = resp.data
                                                if (commonResult.code == 200) {
                                                    toast.success("You have blocked this user")
                                                } else {
                                                    toast.error("Error: " + commonResult.message)
                                                }
                                            }).catch(err => {
                                                toast.error("Error block")
                                            })
                                        },
                                        // reject: () => {
                                        //     // Handle reject
                                        //     console.log('Rejected');
                                        // }
                                    });
                                }}>Block</div>
                            )}
                        </div>
                    </div>
                )
            }
            <ConfirmDialog />
        </div >
    );
}
