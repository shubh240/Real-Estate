import Cookies from "js-cookie";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import DashboardLayout from "../component/DashboardLayout";

export const Loadable = (Component) => (props) => {
    return (
        <Suspense>
            <Component {...props} />
        </Suspense>
    );
};

const PageNotFound = Loadable(lazy(() => import("../pages/PageNotFound")))
const Dashboard = Loadable(lazy(() => import("../pages/DashBoard")));
const ListOfProperty = Loadable(lazy(() => import("../pages/ListOfProperty")));
const Agent = Loadable(lazy(() => import("../pages/Agent")));
const Lenders = Loadable(lazy(() => import("../pages/Lenders")));
const Help = Loadable(lazy(() => import("../pages/Help")));
const Resources = Loadable(lazy(() => import("../pages/Resources")));
const ListProperty = Loadable(lazy(() => import("../pages/ListProperty")));
const PropertyDetails = Loadable(lazy(() => import("../pages/Property-Details")));
const Categories = Loadable(lazy(() => import("../pages/Categories")));
const GeneralListing = Loadable(lazy(() => import("../pages/GeneralListing")));
const PropertyAdvertisement = Loadable(lazy(() => import("../pages/PropertyAdvertisement")));
const MyProperties = Loadable(lazy(() => import("../pages/MyProperties")));
const MyPropertiesDetails = Loadable(lazy(() => import("../pages/MyPropertiesDetails")));
const TearmConditions = Loadable(lazy(() => import("../pages/TearmConditions")));
const PrivacyPolicy = Loadable(lazy(() => import("../pages/PrivacyPolicy")));
const AboutUs = Loadable(lazy(() => import("../pages/AboutUs")));
const ContactUs = Loadable(lazy(() => import("../pages/ContactUs")));
const Favorite = Loadable(lazy(() => import("../pages/Favorite")));
const FavPropertyDetails = Loadable(lazy(() => import("../pages/FavPropertyDetails")));
const Chat = Loadable(lazy(() => import("../pages/Chat")));
const Notification = Loadable(lazy(() => import("../pages/Notification")));

const Router = () => {
    const token = Cookies.get('tokenCA');

    return (
        <Routes>

            <Route path="*" element={<PageNotFound />}></Route>

            <Route path="/boyo-realestate/terms-condtions" element={<TearmConditions />}></Route>
            <Route path="/boyo-realestate/privacy-policy" element={<PrivacyPolicy />}></Route>
            <Route path="/boyo-realestate/about-us" element={<AboutUs />}></Route>

            <Route element={<DashboardLayout />}>

                <Route path="/" element={<Dashboard />}></Route>

                <Route path="/boyo-realestate/list-of-property" element={<ListOfProperty />}></Route>

                <Route path="/boyo-realestate/buy" element={<ListOfProperty />}></Route>
                <Route path="/boyo-realestate/rent" element={<ListOfProperty />}></Route>
                <Route path="/boyo-realestate/sale" element={<ListProperty />}></Route>

                <Route path="/boyo-realestate/agent" element={<Agent />}></Route>
                <Route path="/boyo-realestate/lenders" element={<Lenders />}></Route>

                <Route path="/boyo-realestate/help" element={<Help />}></Route>
                <Route path="/boyo-realestate/resources" element={<Resources />}></Route>

                <Route path="/boyo-realestate/list-property" element={<ListProperty />}></Route>

                <Route path="/boyo-realestate/property-details" element={<PropertyDetails />}></Route>

                {/* <Route path="/boyo-realestate/residential" element={<Residential />}></Route> */}

                <Route path="/boyo-realestate/properties-categories" element={<Categories />}></Route>

                <Route path="/boyo-realestate/advertise-your-property" element={<GeneralListing />}></Route>
                <Route path="/boyo-realestate/edit-advertise-property" element={<GeneralListing />}></Route>
                <Route path="/boyo-realestate/property-advertisement" element={<PropertyAdvertisement />}></Route>

                <Route path="/boyo-realestate/my-properties" element={<MyProperties />}></Route>
                <Route path="/boyo-realestate/edit-my-properties/:id" element={<ListProperty />}></Route>
                <Route path="/boyo-realestate/my-property-details" element={<MyPropertiesDetails />}></Route>

                <Route path="/boyo-realestate/favorite-property" element={<Favorite />}></Route>
                <Route path="/boyo-realestate/fav-property-details" element={<FavPropertyDetails />}></Route>

                <Route path="/boyo-realestate/chat" element={<Chat />}></Route>

                <Route path="/boyo-realestate/notification" element={<Notification />}></Route>

                <Route path="/boyo-realestate/contact-us" element={<ContactUs />}></Route>
                
            </Route>
        </Routes>
    )
}

export default Router;
