import { getChatHistory } from "../../utils/api.service";
import { PUBLICURL } from "../../utils/common.service";
import { useEffect, useState } from "react";
import moment from "moment";
import useDebounce from "../../hooks/useDebounce";
import { SEARCH_DELAY } from "../../app.config";
import { Badge } from "react-bootstrap";
import { useTranslation } from "react-i18next";

export const LeftSideBar = (
    {
        chatDetails,
        handleUser,
        isActive
    }
) => {
    const [search, setSearch] = useState("");
    const debounce = useDebounce(search, SEARCH_DELAY);
    const { t } = useTranslation();

    const [filteredChatDetails, setFilteredChatDetails] = useState(chatDetails);

    useEffect(() => {
        const filterChatDetails = () => {
            if (!debounce.trim()) {
                setFilteredChatDetails(chatDetails);
            } else {
                const filtered = chatDetails.filter((detail) =>
                    detail.userDetails[0].fullname.toLowerCase().includes(debounce.toLowerCase()) ||
                    detail.userDetails[0].property_name.toLowerCase().includes(debounce.toLowerCase())
                );
                setFilteredChatDetails(filtered);
            }
        };

        filterChatDetails();
    }, [chatDetails, debounce]);

    return (
        <div className="col-xl-3 col-lg-4 col-md-12 col-sm-12 col-12" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
            <div className="chat_box">
                <div className="serch">
                    <form className="serch_bar_box">
                        <span><img src={PUBLICURL + "/assets/imges/icons/search.svg"} alt="search" /></span>
                        <input
                            className="form-control "
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={search} onChange={(e) => setSearch(e.target.value)} />
                    </form>
                </div>
                <div className="chat-user_list">
                    <div className="tab-content" id="pills-tabContent">

                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" style={{ overflowY: "scroll" }}>
                            <ul>
                                {
                                    chatDetails && filteredChatDetails && filteredChatDetails?.map((e, index) =>
                                        e?.userDetails && e?.userDetails.map((user) =>
                                            <li className={isActive == true ? "user_profile_item active_box" : "user_profile_item unactive"} key={index} onClick={() => handleUser(e?.chat_room_id, user.id, e?.property_id)}>
                                                <div className="user_profile" style={{cursor : "pointer"}}>
                                                    <div className={user.active == 1 ? "use_img" : "use_img_ofline"} >
                                                        <img height={50} width={50} className="rounded-circle" src={user?.profile_picture ? user?.profile_picture : PUBLICURL + "/assets/imges/user.png"} alt="user" />
                                                    </div>
                                                    <div className="user_name">
                                                        <h6>{user?.fullname}</h6>
                                                        <h6>{user?.property_name}</h6>
                                                        {
                                                            user?.lastMessage &&
                                                            <p> <span className="me-2 seen"><i className="fa-solid fa-check"></i>
                                                                {user?.is_read == '1' && <i className="fa-solid fa-check done"></i>}
                                                            </span>{user?.lastMessage}
                                                            </p>
                                                        }

                                                    </div>
                                                </div>
                                                {
                                                    user?.created_at == null ? <></> : <p className="time"> {moment(user?.created_at).format('h:mm A')}</p>
                                                }
                                                {
                                                    user?.unreadmessages > 0 &&
                                                    <button className="rounded-circle" style={{height : "30px" , backgroundColor : "lightblue" , border : "none" , marginTop : "5vh"}}>
                                                    <span className="badge badge-primary text-primary">{user?.unreadmessages}</span>
                                                    </button>
                                                }
                                            </li>
                                        )
                                    )
                                }
                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
