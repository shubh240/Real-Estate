import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";
import InnerHeader from "./Inner-Header";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();
    const searchParams = new URLSearchParams(location.search);

    const [token, setToken] = useState(Cookies.get('tokenCA'));
    const [address, setAddress] = useState(localStorage.getItem('location') || '');
    const { isModalOpen } = useSelector((state) => state.master);
    const [selectedStatus, setSelectedStatus] = useState(searchParams.get('selectedStatus') || '');
    const [selectPropCategory, setSelectPropCategory] = useState(searchParams.get('property_category_id') || '');
    const [selectSearchParams, setSelectSearchParams] = useState(searchParams.get('search') || '');
    const { userDetails: { data: userDetails } } = useSelector((state) => state.user);
    const [attributes, setAttributes] = useState([]);
    const [amenities, setAmenities] = useState([]);

    //socket
    const [chatDetails, setChatDetails] = useState([]);
    const [chatHistory, setChatHistory] = useState({ chatList: [] });
    const [senderId, setSenderId] = useState(localStorage.getItem('sender_id'));
    const [propertyId, setpropertyId] = useState(localStorage.getItem('property_id'));
    const [chatRoomId, setChatRoomId] = useState(localStorage.getItem('chat_room_id'));
    const [receiverId, setReceiverId] = useState(localStorage.getItem('reciever_id'));


    useEffect(() => {
        const handleTokenChange = () => {
            const newToken = Cookies.get('tokenCA');
            console.log('Token updated:', newToken);
            setToken(newToken);

            // Optionally navigate or perform other actions
            if (!newToken) {
                // Optionally redirect or clean up state
            }
        };

        // Listen for the custom 'tokenChanged' event
        window.addEventListener('tokenChanged', handleTokenChange);

        // Check the token on component mount
        handleTokenChange();

        return () => {
            window.removeEventListener('tokenChanged', handleTokenChange);
        };
    }, []);


    useEffect(() => {
        const currentLanguage = Cookies.get('languageCW');
        let setLang = ""
        if (currentLanguage == "en") {
            setLang = "English"
        } else {
            setLang = "French"
        }
        if (currentLanguage) {
            i18n.changeLanguage(currentLanguage);
        }
    }, []);

    useEffect(() => {
        setSelectedStatus(searchParams.get('selectedStatus') || '');
        setSelectPropCategory(searchParams.get('property_category_id') || '');
        setSelectSearchParams(searchParams.get('search') || '');
        const params = new URLSearchParams(location.search);
        const query = params.get('query');
        if (query) {
            setAddress(localStorage.getItem('location') || '');
        }
    }, [location.search]);

    return (
        <>
            {token ?
                <InnerHeader
                    address={address}
                    setAddress={setAddress}
                    setToken={setToken}
                    attributes={attributes}
                    setAttributes={setAttributes}
                    amenities={amenities}
                    setAmenities={setAmenities}
                    selectedStatus={selectedStatus}
                    selectPropCategory={selectPropCategory}
                    chatDetails={chatDetails}
                    setChatDetails={setChatDetails}
                    chatHistory={chatHistory}
                    setChatHistory={setChatHistory}
                    propertyId={propertyId}
                    setpropertyId={setpropertyId}
                    chatRoomId={chatRoomId}
                    setChatRoomId={setChatRoomId}
                    senderId={senderId}
                    setSenderId={setSenderId}
                    receiverId={receiverId}
                    setReceiverId={setReceiverId}
                    selectSearchParams={selectSearchParams}
                    setSelectSearchParams={setSelectSearchParams}
                />
                :
                <Header
                    address={address}
                    setAddress={setAddress}
                    setToken={setToken}
                    selectedStatus={selectedStatus}
                    selectPropCategory={selectPropCategory}
                    selectSearchParams={selectSearchParams}
                    setSelectSearchParams={setSelectSearchParams}
                />
            }

            {children}
            <Outlet
                context={{
                    address, setAddress,
                    setToken,
                    attributes, setAttributes,
                    amenities, setAmenities,
                    selectedStatus, selectPropCategory,
                    selectSearchParams, setSelectSearchParams,
                    chatDetails, setChatDetails,
                    chatHistory, setChatHistory,
                    propertyId, setpropertyId,
                    chatRoomId, setChatRoomId,
                    receiverId, setReceiverId,
                    senderId, setSenderId
                }}
            />
            <Footer />
        </>
    )
}

export default DashboardLayout;