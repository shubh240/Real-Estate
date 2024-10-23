module.exports = {
    'APP_NAME': process.env.APP_NAME,
    'PER_PAGE': '8',
    'PER_PAGE_TEN': '10',
    'PER_PAGE_FOURTINE': '14',
    'PER_PAGE_SIX': '6',
    'PER_PAGE_SIXTY': '30',
    'PER_PAGE_TWELVE': '8',
    'IS_PRODUCTION': true,

    // 'LOGO': 'images/logo.png',
    'APP_LOGO': '/images/arrow-right.gif',
    'ARROW_IMAGE': '/images/arrow-right.gif',
    'LOADER_IMAGE': 'images/book.gif',
    'API_BASE_URL': process.env.BASE_URL,
    'BASE_URL_WITHOUT_API': process.env.BASE_URL_WITHOUT_API,
    'LOGO': process.env.LOGO,
    'WEBSITE_BASE_URL': process.env.WEBSITE_BASE_URL,
    'BASE_URL_WITHOUT_API_DOC': process.env.BASE_URL_WITHOUT_API_DOC,
    'PORT_BASE_URL': process.env.PORT_BASE_URL,

    'BUNDLE_ID': '',
    'PUSH_KEY': '',
    'P8_CERTIFICATE': '',
    'KEY_ID': '',
    'TEAM_ID': '',

    'BASE_URL': process.env.AWS_S3_BASE_URL,
    'BUCKET_NAME': process.env.AWS_STORAGE_BUCKET_NAME,
    'BUCKET_KEY_ID': process.env.AWS_ACCESS_KEY_ID,
    'BUCKET_SECRET_KEY': process.env.AWS_SECRET_ACCESS_KEY,
    'BUCKET_REGION_NAME': process.env.AWS_S3_REGION_NAME,
    'PROFILE_IMAGE': 'profile_image/',
    'DOCUMENTS': 'documents/',
    'PROJECT_DOCUMENT': 'project_document/',
    'ADVERTISE_IMAGE' : `${process.env.AWS_S3_BASE_URL}/advertise_image/`,
    'USER_PROFILE' : `${process.env.AWS_S3_BASE_URL}/user_profile/`,
    'PROPERTY_IMAGE' : `${process.env.AWS_S3_BASE_URL}/property_images/`,
    'ATTRIBUTE_TYPE_IMAGE' : `${process.env.AWS_S3_BASE_URL}/attribute_type_image/`,
    'AMENITY_CATEGORY_IMAGE' : `${process.env.AWS_S3_BASE_URL}/amenity_category_image/`,
    'AMENITY_IMAGE' : `${process.env.AWS_S3_BASE_URL}/amenity_image/`,
    'PROPERTY_TYPE_IMAGE' : `${process.env.AWS_S3_BASE_URL}/property_type_image/`,

    // Socket
    'upload_url' : `${process.env.AWS_S3_BASE_URL}`,
    
    //////////////////////////////////////////////////////////////////////
    //                           development                            //
    //////////////////////////////////////////////////////////////////////

    // 'ENCRYPTION_BYPASS': true,
    'ENCRYPTION_BYPASS': false,

    'PUBLICURL' : process.env.PUBLIC_URL
};
