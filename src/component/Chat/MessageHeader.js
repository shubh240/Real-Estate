import { PUBLICURL } from "../../utils/common.service"

export const MessageHeader = ({
    chatHistory
}) => {
    return (
        <div className="user_chat_name">
            <div className="user_profile" style={{cursor : "pointer"}}>
                <div className="use_img">
                    <img src={chatHistory?.owner_image ? chatHistory?.owner_image : PUBLICURL + "/assets/imges/user.png"} alt="user" />
                </div>
                <div className="user_name">
                    <h6>{chatHistory?.full_name}</h6>
                    <p className={chatHistory?.active == 1 ? "green_txt" : "red_txt"}>{chatHistory?.active == 1 ? "Active" : "Offline"}</p>
                </div>
            </div>
            <div className="home_img_card" style={{cursor : "pointer"}}>
                <div>
                    <h5 className="card-title mt-2">{chatHistory?.property_name}.</h5>
                    <p className="card-text"><img src={PUBLICURL + "/assets/imges/icons/location.svg"} alt="location" className="me-1" />
                        {chatHistory?.location}</p>
                </div>
                <img src={chatHistory?.property_images > 0 ? chatHistory?.property_images[0] : PUBLICURL + "/assets/imges/home.png"} alt="home" className="home_img" />
            </div>
        </div>
    )
}