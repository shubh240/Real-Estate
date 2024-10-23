import { configureStore } from "@reduxjs/toolkit";
import masterSlice from "./slice/masterSlice";
import userSlice from "./slice/userSlice";
import categorySlice from "./slice/categorySlice";
import amenitiyModalSlice from "./slice/amenitiyModalSlice";
import myPropertySlice from "./slice/myPropertySlice";
import landingSlice from "./slice/landingSlice";
import propertySlice from "./slice/propertySlice";
import favPropertySlice from "./slice/favPropertySlice";
import faqSlice from "./slice/faqSlice";
import agentSlice from "./slice/agentSlice";
import lenderSlice from "./slice/lenderSlice";
import agentLenderSlice from "./slice/agentLenderSlice";
import chatSlice from "./slice/chatSlice";
import thunk from 'redux-thunk';
import resourceSlice from "./slice/resourceSlice";
import subscriptionSlice from "./slice/subscriptionSlice";

const store = configureStore({
  reducer: {
    master: masterSlice,
    user: userSlice,
    category: categorySlice,
    amenity: amenitiyModalSlice,
    myProperty: myPropertySlice,
    landing: landingSlice,
    propertyDetails : propertySlice,
    favourite : favPropertySlice,
    faq : faqSlice,
    agent : agentSlice,
    lender : lenderSlice,
    agentLender: agentLenderSlice,
    chat : chatSlice,
    resource: resourceSlice,
    subscription: subscriptionSlice
  }

});

export default store;