import { IMessage } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router";
import { CommonResult, TokenUtils } from "../../common";
import Alert from "../../components/Alert";
import Spinner from "../../components/Spinner";
import { ProfileSimpleResp, UserProfileResp } from "../../model/profileModel";
import { fetchListConversationAction, fetchListMessageAction } from "../../redux/actions/chatAction";
import { fetchProfileAction } from "../../redux/actions/profileAction";
import conversationService, { ConversationRespVO } from "../../services/chat/conversationService";
import { MessageCreateReqVO, MessageRespVO } from "../../services/chat/messageService";
import { useStompClient } from "../../utils/useStomp";
import "./Chat.css"



const allMessages = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    sender: i % 2 === 0 ? "You" : "Alex Johnson",
    text: `Message #${i + 1}`,
    time: `${Math.floor(Math.random() * 12) + 10}:${Math.floor(Math.random() * 60)}`,
}));

const MESSAGES_PER_PAGE = 20;

export default function ChatArea(props: any) {
    const location = useLocation()
    const { id } = useParams()
    const [establishedConversation, setEstablishedConversation] = useState<boolean>(false)
    const [messageReq, setMessageReq] = useState<MessageCreateReqVO>({
        conversationId: id,
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
        // setListMsg((prev: any) => [...prev, { id: 2, sender: "You", text: "Not much, just chilling!", time: "10:32 AM" }])
        const req: any = {...messageReq, establishedConversation: establishedConversation}
        if(!establishedConversation && location.state.userId) {
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

        if (!location.pathname.includes("/u/")) {
            setEstablishedConversation(true)
        }

        //@ts-ignore
        dispatch(fetchListMessageAction(id))
        // setListMsg(allMessages)

    }, [])


    const fetchListConversation = () => {
        setTimeout(() => {
            //@ts-ignore
            dispatch(fetchListConversationAction())
        }, 500)
    }

    const [conversation, setConversation] = useState<ConversationRespVO | undefined>(undefined)
    useEffect(() => {
        conversationService.getConversation(id).then(resp => {
            const result: CommonResult<any> = resp.data;
            console.log("result when fetch conversation by id: ", result.data)
            if(result.code === 200) {
                setConversation(result.data)
            }
        }).catch(err => {
            alert("Service is crashed")
        })
    }, [id])

    useEffect(() => {
        if(stompClient?.connected) {
            console.log("connected")
            stompClient?.subscribe(`/topic/chat/user/${TokenUtils.authLogin.userId}`, (msg: IMessage) => {
                fetchListConversation()
             })
             stompClient?.subscribe(`/topic/chat/conversation/${id}`, (msg: IMessage) => {
                fetchListConversation()
                //  console.log("new message coming")
                 const message: MessageRespVO = JSON.parse(msg.body)
                 setListMsg((prev: any) => [...prev, message]) //add message to conversation
             })
        }
    }, [stompClient?.connected])

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
        // const container = scrollContainerRef.current;
        // if (!container || isLoading || !hasMore) return;

        // if (container.scrollTop <= 50) {
        //     loadMoreMessages();
        // }
    };

    const loadMoreMessages = (initial = false) => {
        // setIsLoading(true);

        // const nextPage = page + 1;
        // const start = allMessages.length - nextPage * MESSAGES_PER_PAGE;
        // const end = start + MESSAGES_PER_PAGE;

        // const newMessages = allMessages.slice(Math.max(0, start), end);

        // if (newMessages.length === 0) {
        //     setHasMore(false);
        //     setIsLoading(false);
        //     return;
        // }

        // const scrollYBefore = window.scrollY;
        // const bodyHeightBefore = document.body.scrollHeight;

        // setMessages((prev) => [...newMessages, ...prev]);
        // setPage(nextPage);


        //     const bodyHeightAfter = document.body.scrollHeight;
        //     const scrollDifference = bodyHeightAfter - bodyHeightBefore

        //     window.scrollTo({
        //         top: scrollDifference,
        //         behavior: "smooth",
        //     });

        //     setIsLoading(false);


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



    if (fetchUserState.loading) {
        return <Spinner loading={fetchUserState.loading} />
    }

    if (fetchUserState.hasError) {
        return <Alert message={fetchUserState.message} type={"danger"} />
    }
    return (
        <div className="container d-flex flex-column bg-white h-100"       >
            <div className="d-flex justify-content-between align-items-center p-4 border-bottom  bg-white position-sticky top-0"
                style={{ zIndex: 10 }} >
                <div className="d-flex align-items-center">
                    <img src={fetchUserState.userProfile?.imageUrl || conversation?.thumbnail} alt={props.selectedChat?.name} className="rounded-circle me-3 chat-avatar" />
                    <div className="d-flex flex-column">
                        <Link className="text-dark text-decoration-none" to={`/profile/${fetchUserState.userProfile?.id}`}> <h2 className="fs-5 fw-bold mb-0">{fetchUserState.userProfile ? fetchUserState.userProfile?.firstName + " " + fetchUserState.userProfile?.lastName : conversation?.nickname}</h2>
                        </Link>
                        {fetchUserState.userProfile?.isOnline && <span className="text-success">Online</span>}
                        {!fetchUserState.userProfile?.isOnline && <span className="text-danger">Offline</span>}

                    </div>
                </div>
                <button className="btn btn-outline-secondary">
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

            <div className="flex-grow-1 p-4 overflow-y-auto"
            >

                {listMsg?.map((message, index) => (
                    <div
                        key={index}
                        //@ts-ignore
                        className={`mb-4 d-flex ${message.sender.id === TokenUtils.authLogin.userId ? 'justify-content-end' : 'justify-content-start'}`}
                    >
                        <div
                        //@ts-ignore
                            className={`p-3 rounded-3 chat-message ${message.sender.id === TokenUtils.authLogin.userId  ? 'bg-primary text-white' : 'bg-light text-dark'
                                }`}
                        >
                            <p className="mb-1">{message.message}</p>
                            <span className="fs-6 text-muted">{message.timeAgo}</span>
                        </div>
                    </div>
                ))}

                <div ref={scrollContainerRef}></div>

            </div>

            <div className="p-4 border-top position-sticky bottom-0 bg-white" style={{ zIndex: 10 }}>
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
                    <button className="btn btn-primary rounded-circle" onClick={() => {
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
            </div>
        </div>
    );
}
