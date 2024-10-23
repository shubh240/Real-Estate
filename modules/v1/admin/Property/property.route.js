const { decryption, checkValidationRules, checkBodyInline, checkToken, checkApiKey, checkTokenAdmin } = require('../../../../middleware/headerValidator');
const express = require('express');
const router = express.Router();
const propertyModel = require('./property.model');
const property_rules = require('./rules/property.rules.json');

//////////////////////////////////////////////////////////////////////
//                      Dashboard Count                             //
//////////////////////////////////////////////////////////////////////

router.get("/property/dashboard-count",checkApiKey,checkTokenAdmin,decryption,propertyModel?.Property?.getDashboardCount);

//////////////////////////////////////////////////////////////////////
//                      Properties  Category                        //
//////////////////////////////////////////////////////////////////////

router.post("/property/add_category", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(property_rules["add-category"]), propertyModel?.Property?.addCategory);

router.post("/property/property_category", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.CategoryListing);

router.post("/property/edit_category/:id", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(property_rules["edit-category"]), propertyModel?.Property?.editCategory);

router.post("/property/delete_category", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(property_rules["delete-category"]), propertyModel?.Property?.deleteCategory);



//////////////////////////////////////////////////////////////////////
//                      Properties  Type                            //
//////////////////////////////////////////////////////////////////////

router.post("/property/property_type", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.propetiesTypeListing);

router.post("/property/add_propertiestype", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(property_rules["add-property_type"]), propertyModel?.Property?.addPropertiesType);

router.post("/property/edit_properties_type/:id", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(property_rules["edit-property_type"]), propertyModel?.Property?.editPropertiesType);

router.post("/property/delete_properties_type", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(property_rules["delete-property_type"]), propertyModel?.Property?.deletePropertyType);



//////////////////////////////////////////////////////////////////////
//                      Properties                                  //
//////////////////////////////////////////////////////////////////////

router.post("/property/property_listing", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.PropertyListing);

router.post("/property/active-inactive-property", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.activeInActiveProperty);

router.post("/property/change-status", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.changePropertyStatus);

router.post("/property/delete-property", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.deleteProperty);


//////////////////////////////////////////////////////////////////////
//                      Attribute Type                              //
//////////////////////////////////////////////////////////////////////

router.post("/property/attribute_type", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.AttributeType);

router.post("/property/add_attribute_type", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(property_rules["add-attribute_type"]), propertyModel?.Property?.addAttributeType);

router.post("/property/delete-attribute_type", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.deleteAttributeType);

router.post("/property/edit-attribute_type/:id", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(property_rules["edit-attribute_type"]), propertyModel?.Property?.editAttributeType);



//////////////////////////////////////////////////////////////////////
//                      Amenity Category                            //
//////////////////////////////////////////////////////////////////////

router.post("/property/amenity_category", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.AmenityCategory);

router.post("/property/add-amenity_category", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(property_rules["add-amenity_category"]), propertyModel?.Property?.addAmenityCategory);

router.post("/property/delete-amenity_category", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.deleteAmenityCategory);

router.post("/property/edit-amenity_category/:id", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(property_rules["add-amenity_category"]), propertyModel?.Property?.editAmenityCategory);



//////////////////////////////////////////////////////////////////////
//                           Amenity                                //
//////////////////////////////////////////////////////////////////////

router.post("/property/amenity", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.AmenityDetails);

router.post("/property/add-amenity", checkApiKey,checkTokenAdmin, decryption,checkBodyInline(property_rules["add-amenity"]), propertyModel?.Property?.addAmenity);

router.post("/property/delete-amenity", checkApiKey,checkTokenAdmin, decryption, propertyModel?.Property?.deleteAmenity);

router.post("/property/edit-amenity/:id", checkApiKey,checkTokenAdmin,decryption,checkBodyInline(property_rules["add-amenity"]), propertyModel?.Property?.editAmenity);


module.exports = router;