import request from "./axios.service";
import { GET, POST, PUT, PATCH, DELETE, BASE_URL, USER, OPTION, COUNT_PER_PAGE, Property, ADMIN, ADVERTISE, COMMON } from "../app.config";
import { Decryption } from "./common.service";

// <-----------------auth------------------>

export const getCountryList = () => {
  return request(`${BASE_URL}/auth/country_list`, GET, false, {})
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error('API Error:', error);
      throw error;
    });
};

export const sendOtpApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/sendOtp`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const resendOtpApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/resendOtp`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const signupApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/signup`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const profileApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/complete_profile`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const login = (body) => {
  return request(`${BASE_URL}/auth/${USER}/signin`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.log('error :', error);
      throw error;
    });
};

export const forgotPasswordApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/forgotpassword`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const forgotOtpVerifyApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/forgototpverify`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const resetPasswordApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/reset_password`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const changePasswordApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/change_password`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};


export const editProfileApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/edit_profile`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const editProfileByOtpApi = (body) => {
  return request(`${BASE_URL}/auth/${USER}/editProfileByOtpVerification`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const logout = () => {
  return request(`${BASE_URL}/auth/${USER}/logout`, POST, true, {})
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const getUserDetails = (body) => {
  return request(`${BASE_URL}/auth/${USER}/userdetails`, GET, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

// Properties

/** Category List */

export const categoryList = (body) => {
  return request(`${BASE_URL}/properties/${Property}/property_category`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Property Type List */

export const propertyList = (body) => {
  return request(`${BASE_URL}/properties/${Property}/property_type`, GET, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Attribute List */

export const attributeList = (body) => {
  return request(`${BASE_URL}/properties/${Property}/property_attribute_type`, GET, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Amenities List */

export const amenitiesList = (body) => {
  return request(`${BASE_URL}/properties/${Property}/property_amenities_type`, GET, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Add property */

export const addProperty = (body) => {
  return request(`${BASE_URL}/properties/${Property}/addproperty`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Edit property */

export const editProperty = (property_id, body) => {
  return request(`${BASE_URL}/properties/${Property}/editproperty/${property_id}`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** My property */

export const myProperty = (page) => {
  return request(`${BASE_URL}/properties/${Property}/myproperty?page=${page}`, POST, true, {})
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** My property details */

export const myPropertyDetails = (body) => {
  return request(`${BASE_URL}/properties/${Property}/mypropertydetails`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Send notification to contact */
export const sendConctactNotification = (body) => {
  return request(`${BASE_URL}/properties/${Property}/send-contact-notification`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};


/** Delete My Proeprty */
export const deleteMyPropertyApi = (body) => {
  return request(`${BASE_URL}/properties/${Property}/delete-my-property`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Landing Page Properties */

export const landingProperty = (page, filters) => {
  return request(`${BASE_URL}/properties/${Property}/landingproperty?page=${page}&${filters || ""}`, POST, false, {})
    .then((response) => {
      return response
    })
    .catch((error) => {
      console.error("API call failed:", error);
      throw error;
    });
};

/** Home Page Properties */

export const homeProperty = (page, filters) => {
  return request(`${BASE_URL}/properties/${Property}/homeproperty?page=${page}&${filters || ""}`, POST, true, {})
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};



/** Property-Details */

export const PropertyDetailsApi = (body) => {
  return request(`${BASE_URL}/properties/${Property}/property-details`, POST, false, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Add Property In Fav */

export const addPropertyFavApi = (body) => {
  return request(`${BASE_URL}/properties/${Property}/property-favourite`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Property Fav */

export const PropertyFavApi = (page, filters) => {
  return request(`${BASE_URL}/properties/${Property}/list-fav-property?page=${page}&${filters || ""}`, POST, true, {})
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Delete Fav Proeprty */
export const deletePropertyFavApi = (body) => {
  return request(`${BASE_URL}/properties/${Property}/delete-fav-property`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

/** Fav Property-Details */

export const FavPropertyDetailsApi = (body) => {
  return request(`${BASE_URL}/properties/${Property}/details-fav-property`, POST, true, body)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};


// Static pages

export const getFaqListApi = (data) => {
  return request(`${BASE_URL}/${ADMIN}/${COMMON}/faq_list`, POST, false, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const staticPages = (body) => {
  return request(`${BASE_URL}/${ADMIN}/COMMON/app_content`, POST, false, body)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

export const contactUSAdd = (body) => {
  return request(`${BASE_URL}/${COMMON}/add-contact-us`, POST, false, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

/** Agent */
export const createAgentApi = (body) => {
  return request(`${BASE_URL}/agentlender/agent/web-signup`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

export const getAgentListApi = (data) => {
  return request(`${BASE_URL}/agentlender/agent/agentWebListing`, POST, false, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

/** Lender */
export const createLenderApi = (body) => {
  return request(`${BASE_URL}/agentlender/lender/web-signup`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};


export const getLenderListApi = (data) => {
  return request(`${BASE_URL}/agentlender/lender/lenderWebListing`, POST, false, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

/** Advertisement Banner */
export const createAdvertiseApi = (body) => {
  return request(`${BASE_URL}/advertisement/advertise/add-advertise`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

/** Edit Advertisement Banner */
export const editAdvertiseApi = (body) => {
  return request(`${BASE_URL}/advertisement/advertise/edit-advertise`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

/** Delete Advertisement Banner */
export const deletePropertyAdvertiseApi = (body) => {
  return request(`${BASE_URL}/advertisement/advertise/delete-advertise`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

// Advertisement Banner

export const AdvertisementDetailsApi = (data) => {
  return request(`${BASE_URL}/advertisement/advertise/advertise-details`, POST, true, data)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const AdvertisementLandingApi = (data) => {
  return request(`${BASE_URL}/advertisement/advertise/advertise-landing`, POST, false, data)
    .then((response) => {
      return response
    })
    .catch((error) => {
      throw error;
    });
};

export const estimationPriceApi = (body) => {
  return request(`${BASE_URL}/advertisement/advertise/estimation-price`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

/** Socket */

// ---------> Step - 1
export const createChatApi = (body) => {
  return request(`${BASE_URL}/socket/chat/create-chat`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

// ---------> Step - 2
export const getInBoxChat = (body) => {
  return request(`${BASE_URL}/socket/chat/chatdetails`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

// ---------> Step - 3
export const getChatHistory = (body) => {
  return request(`${BASE_URL}/socket/chat/chathistory`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

// ---------> Step - 4
export const checkChatRoomId = (body) => {
  return request(`${BASE_URL}/socket/chat/checkChatRoomId`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

//////////////////////////////////////////////////////////////////////
//                              Resource                               //
//////////////////////////////////////////////////////////////////////

export const getResourceListApi = (data) => {
  return request(`${BASE_URL}/${ADMIN}/${COMMON}/list-resource`, POST, false, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};


/**Subscription */
export const getSubscriptionListApi = (data) => {
  return request(`${BASE_URL}/${ADMIN}/subscription/subscription-details`, POST, false, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

/** Notifications */

export const listNotificationApi = (body) => {
  return request(`${BASE_URL}/${ADMIN}/${COMMON}/list-web-notification`, POST, true, body)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};