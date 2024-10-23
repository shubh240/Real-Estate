import { useTranslation } from "react-i18next";
import { PUBLICURL } from "../../utils/common.service"
import moment from "moment";

let prevDate = null;

export const ChatItems = ({
    chatHistory,
    senderId,
    getDateLabel
}) => {
    const { t } = useTranslation();

    return (
        <div className="messgae_box_card mb-5" id="chat-box" style={{ overflowY: 'auto', maxHeight: '70vh' }}>
            {
                chatHistory?.chatList?.length > 0 ?
                    chatHistory?.chatList?.map((e) => {
                        var message_append = e.message.replace(
                            /\\u([0-9A-F]{4})/gi,
                            (_, g) => String.fromCharCode(`0x${g}`)
                        );
                        message_append = message_append.replace(/\\/g, "");

                        const currentDate = getDateLabel(e.created_at);
                        const renderDateLabel = currentDate !== prevDate;
                        prevDate = currentDate;

                        return (

                            <>
                                {renderDateLabel && (
                                    <div className="day_info text-center my-2">
                                        <span>{currentDate}</span>
                                    </div>
                                )}
                                <div className={e?.sender_id == senderId ? "chating_right mb-3" : "chating_left mb-3"} >
                                    <div className="cheting_messg">
                                        {e?.image && (
                                            <div className="chat-image-wrapper">
                                                <img height={50} width={50} src={e.uploadedimg} alt="chat" className="chat-image" />
                                            </div>
                                        )}
                                        {e?.file && (
                                            <div className="chat-file-wrapper">
                                                <a href={e?.uploadedfile} download>
                                                    {e?.file_name}
                                                </a>
                                            </div>
                                        )}
                                        <h6>{message_append}</h6>
                                    </div>
                                    <p className="time"> {moment(e?.created_at).format('h:mm A')}
                                        {
                                            e?.sender_id == senderId &&
                                            (e?.is_read == 1 ? <i style={{ color: "green" }} className="fa-solid fa-check-double"></i> :
                                                <i className="fa-solid fa-check"></i>)
                                        }
                                    </p>
                                </div>
                            </>
                        )
                    })
                    :
                    <h4 className="mt-5 text-center ">{t("No_Conversations")}</h4>
            }

        </div>
    )
}