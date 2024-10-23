import { PUBLICURL, TOAST_ERROR } from "../../utils/common.service";
import { uploadImageOnAWS } from "../../utils/aws.service";
import { NotificationManager } from "react-notifications";
import { useTranslation } from "react-i18next";
import AudioRecorderPolyfill from "audio-recorder-polyfill";
import Mp3Encoder from "audio-recorder-polyfill";
import io from "socket.io-client";
import { Helmet } from "react-helmet";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { LeftSideBar, MessageCenter, RightSideBar } from "./LeftSideBar";
import { useEffect, useRef, useState } from "react";
import * as API from "../../utils/api.service";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { ChatItems } from "./ChatItem";
import { MessageHeader } from "./MessageHeader";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchChatHistory, fetchChatHistoryApi, getInBoxChatApi, setChats } from "../../store/slice/chatSlice";
import Cookies from "js-cookie";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { WhatsAppWeb } from "./WhatsAppWeb";

// Apply the polyfill
window.MediaRecorder = AudioRecorderPolyfill;
AudioRecorderPolyfill.encoder = Mp3Encoder;
AudioRecorderPolyfill.prototype.mimeType = "audio/mp3";

const Chat = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const dispatch = useDispatch();
    const { getInBoxChat: { data: getInBoxChat }, chatHistory: { data: chatHistory } } = useSelector((state) => state.chat);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const location = useLocation();
    const { chatRoomData } = location.state || {};
    const [propertyId, setpropertyId] = useState(chatRoomData?.property_id);
    const [chatRoomId, setChatRoomId] = useState(chatRoomData?.chat_room_id);
    const [receiverId, setReceiverId] = useState(chatRoomData?.user_details?.receiver_id);
    const fileInputRef = useRef(null);
    const userDetails = JSON.parse(Cookies.get('dataCA')) || {};
    const [inputValue, setInputValue] = useState("");
    const [messageType, setMessageType] = useState("message");
    const [isRead, setIsRead] = useState(false);

    let socket;

    if (userDetails && userDetails?.user_id) {
        if (process.env.REACT_APP_SOCKET == 'LIVE') {
            socket = io(
                `https://api.bboyo.com/socket?user_id=${userDetails?.user_id}`
            );
        }
        else {
            socket = io(
                `http://localhost:8678/socket?user_id=${userDetails?.user_id}`
            );
        }
    }

    useEffect(() => {
        dispatch(getInBoxChatApi({ property_id: propertyId }));
        if (chatRoomId && receiverId && propertyId) {
            dispatch(fetchChatHistoryApi({
                chat_room_id: chatRoomId,
                receiver_id: receiverId,
                property_id: propertyId,
            }))
        }
    }, [chatRoomId, receiverId, propertyId]);

    useEffect(() => {
        const handleMessageReceived = (message) => {
            if (message) {
                dispatch(fetchChatHistoryApi({
                    chat_room_id: chatRoomId,
                    receiver_id: receiverId,
                    property_id: propertyId
                }));
            }
        };
        const handleMessageSent = (message) => {
            if (message) {
                dispatch(fetchChatHistoryApi({
                    chat_room_id: chatRoomId,
                    receiver_id: receiverId,
                    property_id: propertyId
                }));
            }
        };

        socket.on("received_message", handleMessageReceived);
        socket.on("message_sent", handleMessageSent);

        return () => {
            socket.off('received_message', handleMessageReceived);
            socket.off('message_sent', handleMessageReceived);
        };
    }, [socket]);

    const scrollToBottom = () => {
        const chatElement = document.getElementById('chat-box');
        if (chatElement) {
            chatElement.scrollTop = chatElement.scrollHeight;
        }
    };

    const handleUser = (chat_room_id, receiver_id, propertyId) => {
        navigate('/boyo-realestate/chat', {
            state: {
                chatRoomData: {
                    property_id: propertyId,
                    user_details: {
                        receiver_id: receiver_id
                    },
                    chat_room_id: chat_room_id
                }
            }
        });
        setChatRoomId(chat_room_id);
        setReceiverId(receiver_id);
        setpropertyId(propertyId);
    };

    const sendMessage = async () => {
        try {
            if ((inputValue.trim() !== "" || selectedFiles.length > 0)) {
                let uploadedImg = "";
                let uploadedFile = "";
                let imagePath = "";
                let filePath = "";

                if (selectedFiles.length > 0) {
                    const file = selectedFiles[0];
                    if (file.type.startsWith("image/")) {
                        uploadedImg = await uploadImageOnAWS(file, "chatImages");
                    } else if (file.type.startsWith("application/") || file.type.startsWith("text/")) {
                        uploadedFile = await uploadImageOnAWS(file, "chatFiles");
                    }
                }

                imagePath = `${process.env.REACT_APP_AWS_BASE_URL}Auth/${uploadedImg}`;
                filePath = `${process.env.REACT_APP_AWS_BASE_URL}Auth/${uploadedFile}`;

                const newMessage = {
                    chat_room_id: chatRoomId,
                    message: inputValue,
                    message_type: messageType,
                    loginuser_id: userDetails?.user_id,
                    reciever_id: receiverId,
                    property_id: propertyId,
                    image: uploadedImg ? uploadedImg : null,
                    file: uploadedFile ? uploadedFile : null,
                    file_name: selectedFiles.length > 0 ? selectedFiles[0].name : "",
                    sender_id: userDetails?.user_id,
                    created_at: new Date().toISOString(),
                    is_read: 0,
                    is_deleted: 0,
                };

                await socket.emit("send_message", newMessage);

                dispatch(fetchChatHistoryApi({ chat_room_id: chatRoomId, receiver_id: receiverId, property_id: propertyId }));

                setSelectedFiles([]);
                setInputValue("");
                scrollToBottom();
            } else {
                NotificationManager.error("Please enter a message", "Error");
            }
        } catch (e) {
            TOAST_ERROR(e.message);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    const getDateLabel = (timestamp) => {
        const messageDate = new Date(timestamp);
        const currentDate = new Date();

        // Check if the message date is today
        if (
            messageDate.getDate() === currentDate.getDate() &&
            messageDate.getMonth() === currentDate.getMonth() &&
            messageDate.getFullYear() === currentDate.getFullYear()
        ) {
            return "Today";
        }

        // Check if the message date is yesterday
        const yesterday = new Date(currentDate);
        yesterday.setDate(currentDate.getDate() - 1);
        if (
            messageDate.getDate() === yesterday.getDate() &&
            messageDate.getMonth() === yesterday.getMonth() &&
            messageDate.getFullYear() === yesterday.getFullYear()
        ) {
            return "Yesterday";
        }

        // For other dates, return the actual date
        const options = { month: "long", day: "numeric", year: "numeric" };
        return messageDate.toLocaleDateString(undefined, options);
    };

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        let files = Array.from(e.target.files);
        if (
            files[0].type === "application/pdf" ||
            files[0].type === "image/jpeg" ||
            files[0].type === "image/png" ||
            files[0].type === "application/vnd.ms-excel" ||
            files[0].type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            setSelectedFiles(files);
            setMessageType("file");
        } else {
            TOAST_ERROR("invalid file type")
        }
    };

    const removeSelectedFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    return (

        <main className="page_wrepper" >
            <div className="top_line mb-50"></div>
            <section className="main_chat px-80 pb-100">
                <div className="container-fluid">

                    <div className="row">

                        {/* Inbox Chat */}
                        <LeftSideBar chatDetails={getInBoxChat} handleUser={handleUser} isActive={isActive} />

                        {/* Chat Box */}
                        <div className="col-xl-9 col-lg-8 col-md-12 col-sm-12 col-12">
                            <div className="chat_box">
                                {
                                    propertyId && chatRoomId && receiverId ?
                                        <>

                                            {/* Chat header */}
                                            < MessageHeader chatHistory={chatHistory} isActive={isActive} />

                                            {/* Message Box */}
                                            <ChatItems chatHistory={chatHistory} senderId={userDetails?.user_id} getDateLabel={getDateLabel} isRead={isRead} />

                                            {/* Footer */}
                                            <div className="chat_input mt-3 d-block">
                                                {selectedFiles.length > 0 && (
                                                    <div className="selected-files-preview">
                                                        {selectedFiles.map((file, index) => (
                                                            <div key={index} className="selected-file">
                                                                <button className="btn btn-outline-danger btn-sm rounded-circle border-none" style={{ border: "none" }} onClick={() => removeSelectedFile(index)}><span className="fs-5">x</span></button>
                                                                {file.type.startsWith("image/") ? (
                                                                    <img src={URL.createObjectURL(file)} height={50} width={50} alt="preview" />
                                                                ) : (
                                                                    <span>{file.name}</span>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                                <div className="d-flex align-items-center justify-content-between gap-3">
                                                    <a href="javascript:void(0);" onClick={handleFileInputClick}>
                                                        <img src={PUBLICURL + "/assets/imges/icons/attachment.svg"} alt="attachment" />
                                                    </a>

                                                    <div className="type_messgae-input">
                                                        <input
                                                            type="text"
                                                            ref={inputRef}
                                                            className="form-control"
                                                            value={inputValue}
                                                            onKeyPress={(e) => handleKeyPress(e)}
                                                            onChange={(e) => setInputValue(e.target.value)}
                                                            placeholder="Type a message"
                                                        />

                                                    </div>
                                                    <button
                                                        className="btn blue_btn"
                                                        onClick={sendMessage}
                                                    >{t("Send")}</button>
                                                    <input
                                                        type="file"
                                                        ref={fileInputRef}
                                                        style={{ display: 'none' }}
                                                        onChange={handleFileChange}
                                                        multiple
                                                    />
                                                </div>
                                            </div>

                                        </>
                                        :
                                        <WhatsAppWeb />
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
}

export default Chat;
