const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const propertyModel = require('./property.model');
const property_rules = require('./rules/property.rules.json');

//////////////////////////////////////////////////////////////////////
//                              Properties                          //
//////////////////////////////////////////////////////////////////////

router.post("/property/property_category", checkApiKey, decryption, propertyModel?.Property?.propertyCategoryListing);

router.get("/property/property_type", checkApiKey, decryption, propertyModel?.Property?.propertyTypeListing);

router.get("/property/property_attribute_type", checkApiKey, decryption, propertyModel?.Property?.attributeTypeListing);

router.get("/property/property_amenities_type", checkApiKey, decryption, propertyModel?.Property?.amenitiesListing);

router.post("/property/addproperty", checkApiKey,checkToken, decryption,checkBodyInline(property_rules["add-property"]), propertyModel?.Property?.addProperty);

router.post("/property/editproperty/:id", checkApiKey,checkToken, decryption,checkBodyInline(property_rules["edit-property"]), propertyModel?.Property?.editProperty);

router.post("/admin/editproperty/:id", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(property_rules["edit-property"]), propertyModel?.Property?.editPropertyByAdmin);

/** My Property With Token */
router.post("/property/myproperty", checkApiKey,checkToken, decryption, propertyModel?.Property?.myProperties);

router.post("/property/mypropertydetails", checkApiKey,checkToken, decryption,checkBodyInline(property_rules["property-details"]), propertyModel?.Property?.myPropertiesDetails);

router.post("/property/delete-my-property", checkApiKey,checkToken, decryption,checkBodyInline(property_rules["property-fav"]), propertyModel?.Property?.deleteMyProperty);

router.post("/property/landingproperty", checkApiKey, decryption, propertyModel?.Property?.landingPageProperties);

router.post("/property/homeproperty", checkApiKey,checkToken, decryption, propertyModel?.Property?.homePageProperties);

/** Property-Deatils Without Token */
router.post("/property/property-details", checkApiKey, decryption,checkBodyInline(property_rules["property-details"]), propertyModel?.Property?.PropertiesDetails);

router.post("/property/property-favourite", checkApiKey,checkToken, decryption,checkBodyInline(property_rules["property-fav"]), propertyModel?.Property?.propertyFav);

router.post("/property/list-fav-property", checkApiKey,checkToken, decryption, propertyModel?.Property?.listFavProperties);

router.post("/property/delete-fav-property", checkApiKey,checkToken, decryption,checkBodyInline(property_rules["property-fav"]), propertyModel?.Property?.deleteFavProperty);

router.post("/property/details-fav-property", checkApiKey,checkToken, decryption,checkBodyInline(property_rules["property-fav"]), propertyModel?.Property?.favPropertyDetails);

router.post("/property/send-contact-notification", checkApiKey,checkToken,decryption,checkBodyInline(property_rules["send-notification"]), propertyModel?.Property?.sendNotification);

router.post("/property/admin-send-contact-notification", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(property_rules["send-notification"]), propertyModel?.Property?.sendAdminNotification);

module.exports = router;