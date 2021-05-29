export default {
  // Common
  GET_S3_SIGNATURE: 'POST /api/v1/common/s3_signature',
  GET_CONSTANTS: 'GET /api/v1/common/constants',
  TRACK_USER: 'POST /api/v1/common/track_user',
  ADD_DEVICE: 'POST /api/v1/common/add_device',
  CONVERT_CURRENCY_RATE: 'POST /api/v1/currency/convert_rate',

  // Phone
  LOGIN_PHONE: 'POST /api/v1/app/login_phone',
  VERIFY_OTP: 'POST /api/v1/app/verify_otp',
  RESEND_OTP: 'POST /api/v1/app/resend_otp',

  // Email
  LOGIN_EMAIL: 'POST /api/v1/app/login_mail',
  VERIFY_OTP_EMAIL: 'POST /api/v1/app/verify_otp_mail',
  RESEND_OTP_EMAIL: 'POST /api/v1/app/resend_otp_mail',

  // Admin
  LOGOUT_APP_ADMIN: 'DELETE /api/v1/admin/me/logout',
  STAFF_LIST_MEMBER: 'GET /api/v1/app/staff/member/list',
  STAFF_ADD_ADMIN_MEMBER: 'POST /api/v1/app/staff/member',
  STAFF_GET_ADMIN_MEMBER: 'GET /api/v1/app/staff/member/:id',
  STAFF_UPDATE_ADMIN_MEMBER: 'PUT /api/v1/app/staff/member/:id',

  STAFF_ADD_LAUNDRY: 'POST /api/v1/app/staff/laundry',
  STAFF_LIST_LAUNDRY: 'GET /api/v1/app/staff/laundry/list',
  STAFF_SEARCH_LAUNDRY: 'GET /api/v1/app/staff/laundry/search',
  STAFF_LIST_LAUNDRY_COORDINATE: 'GET /api/v1/app/staff/laundry/list_coordinate',
  STAFF_GET_LAUNDRY: 'GET /api/v1/app/staff/laundry/:id',
  STAFF_UPDATE_LAUNDRY: 'PUT /api/v1/app/staff/laundry/:id',

  STAFF_LIST_MATCHING: 'GET /api/v1/app/staff/matching/list',
  STAFF_GET_MATCHING: 'GET /api/v1/app/staff/matching/:id',

  STAFF_LIST_DELIVERY: 'GET /api/v1/app/staff/delivery/list',
  STAFF_ASSIGN_DELIVERY: 'POST /api/v1/app/staff/delivery/assign',

  STAFF_STATS_CUMULATIVE: 'GET /api/v1/app/staff/stats/cumulative',
  STAFF_STATS_LAUNDRY_EARNING_DETAILS: 'GET /api/v1/app/staff/stats/laundry_earning_details',
  STAFF_STATS_LAUNDRY_EARNING: 'GET /api/v1/app/staff/stats/laundry_earnings',
  STAFF_STATS_REVENUE: 'GET /api/v1/app/staff/stats/revenue',

  STAFF_LIST_PRICE_SETTING: 'GET /api/v1/app/staff/setting/list_price_setting',
  STAFF_UPDATE_PRICE_SETTING: 'PUT /api/v1/app/staff/setting/update_price_setting',

  STAFF_ASSIGN_LAUNDRY: 'PUT /api/v1/app/staff/swop/:id/assign_laundry',
  STAFF_CHANGE_DATE_TIME: 'PUT /api/v1/app/staff/swop/:id/change_date_time',
  STAFF_CHANGE_ADDRESS: 'PUT /api/v1/app/staff/swop/:id/change_address',

  STAFF_MARK_SWOP_STATUS: 'PUT /api/v1/app/staff/swop/:id/mark_as_:status',

  STAFF_DEACTIVATE_USER: 'DELETE /api/v1/app/staff/user/:id/deactivate',
  STAFF_DELIST_DRESS_PAGE: 'PUT /api/v1/app/staff/user/dress/:id/toggle_delist',

  // Laundry
  LAUNDRY_LIST_MATCHING: 'GET /api/v1/app/laundry/matching/list',
  LAUNDRY_GET_MATCHING: 'GET /api/v1/app/laundry/matching/:id',

  LAUNDRY_LIST_MEMBER: 'GET /api/v1/app/laundry/member/list',
  LAUNDRY_ADD_MEMBER: 'POST /api/v1/app/laundry/member',
  LAUNDRY_GET_MEMBER: 'GET /api/v1/app/laundry/member/:id',
  LAUNDRY_UPDATE_MEMBER: 'PUT /api/v1/app/laundry/member/:id',
  LAUNDRY_DELETE_MEMBER: 'DELETE /api/v1/app/laundry/member/:id',
  LAUNDRY_GET_MY_LAUNDRY: 'GET /api/v1/app/laundry/my_laundry',
  LAUNDRY_UPDATE_MY_LAUNDRY: 'PUT /api/v1/app/laundry/my_laundry',

  LAUNDRY_LIST_SWOP: 'GET /api/v1/app/laundry/list_swops',
  MARK_AS_DIFFERENT: 'PUT /api/v1/app/laundry/swop/:id/mark_as_different',
  MARK_AS_PICKED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_picked',
  MARK_AS_READY: 'PUT /api/v1/app/laundry/swop/:id/mark_as_ready',
  MARK_AS_RECEIVED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_received',
  MARK_AS_UN_PICKED_UP: 'PUT /api/v1/app/laundry/swop/:id/mark_as_un_picked',
  MARK_AS_EXPIRED: 'PUT /api/v1/app/user/swop/:id/mark_as_expired',
  MARK_AS_DELIVERED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_delivered',
  MARK_AS_UN_DELIVERED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_un_delivered',
  MARK_AS_SHIPPED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_shipped',

  MARK_AS_RETURN_DELIVERED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_return_delivered',
  MARK_AS_RETURN_DIFFERENT: 'PUT /api/v1/app/laundry/swop/:id/mark_as_return_different',
  MARK_AS_RETURN_PICKED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_return_picked',
  MARK_AS_RETURN_READY: 'PUT /api/v1/app/laundry/swop/:id/mark_as_return_ready',
  MARK_AS_RETURN_RECEIVED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_return_received',
  MARK_AS_RETURN_SHIPPED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_return_shipped',
  MARK_AS_RETURN_UN_DELIVERED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_return_un_delivered',
  MARK_AS_RETURN_UN_PICKED: 'PUT /api/v1/app/laundry/swop/:id/mark_as_return_un_picked',

  MARK_AS_SEND_BACK: 'PUT /api/v1/app/laundry/swop/:id/mark_as_send_back',

  LAUNDRY_STATS_LAUNDRY_EARNING_DETAILS: 'GET /api/v1/app/laundry/stats/laundry_earning_details',
  LAUNDRY_STATS_LAUNDRY_EARNINGS: 'GET /api/v1/app/laundry/stats/laundry_earnings',

  // User
  LOGOUT_APP_USER: 'DELETE /api/v1/app/user/me/logout',
  UPDATE_MY_PROFILE: 'PUT /api/v1/app/user/me',
  GET_MY_CREDITS: 'GET /api/v1/app/user/me/credits',
  GET_REFERRAL_LINK: 'GET /api/v1/app/user/me/referral_link',
  UPDATE_MY_LOCATION: 'PUT /api/v1/app/user/me/update_location',
  GET_MY_PROFILE: 'GET /api/v1/app/user/me',
  TOGGLE_DELIST_WARDROBE: 'PUT /api/v1/app/user/me/toggle_delist_dresses',

  USER_COLLECTION_LIST: 'GET /api/v1/app/user/collection/list',
  USER_COLLECTION_LOOKS: 'GET /api/v1/app/user/collection/:id/looks',

  USER_DRESSES_WITH_LOOKS: 'GET /api/v1/app/user/look/list',
  USER_ME_CREDITS: 'GET /api/v1/app/user/me/credits',

  // Payment
  APPLE_VERIFY_PRODUCT: 'POST /api/v1/app/user/payment/apple/verify_product',
  GOOGLE_VERIFY_PRODUCT: 'POST /api/v1/app/user/payment/google/verify_product',

  MY_WARDROBE: 'GET /api/v1/app/user/dress/list',
  LIST_OTHER_DRESSES: 'GET /api/v1/app/user/dress/list_others',
  GET_DRESS_DETAIL: `GET /api/v1/app/user/dress/:id`,
  SWOP_DRESS: `POST /api/v1/app/user/dress/:id/swop`,
  GET_LIKED_DRESSES: 'GET /api/v1/app/user/dress/:id/list_liked',
  TOGGLE_IGNORE_USER: `PUT /api/v1/app/user/dress/toggle_ignore_user`,
  LIKE_DRESS: 'PUT /api/v1/app/user/dress/:id/like',
  DISLIKE_DRESS: 'DELETE /api/v1/app/user/dress/:id/dislike',
  CREATE_DRESS: 'POST /api/v1/app/user/dress',
  UPLOAD_DRESS_PHOTOS: 'POST /api/v1/app/user/dress/upload_photos',
  TOGGLE_DELIST_DRESS: 'PUT /api/v1/app/user/dress/:id/toggle_delist',

  LIST_SWOP: 'GET /api/v1/app/user/swop/list',
  GET_SWOP_DETAILS: 'GET /api/v1/app/user/swop/:id',
  GET_SWOP_TRACKINGS: 'GET /api/v1/app/user/swop/:id/trackings',
  FIND_LAUNDRY: 'POST /api/v1/app/user/swop/find_laundry',
  FIND_OTHER_USER: 'POST /api/v1/app/user/swop/find_other_user',

  CONFIRM_SWOP: 'PUT /api/v1/app/user/swop/:id/confirm',
  MASK_SWOP_EXPIRED: 'PUT /api/v1/app/user/swop/:id/mark_as_expired',
  DENY_SWOP: 'DELETE /api/v1/app/user/swop/:id/deny',
  CANCEL_SWOP: 'DELETE /api/v1/app/user/swop/:id/cancel',

  EARLY_RETURN_REQUEST: 'PUT /api/v1/app/user/swop/:id/early_return_request',
  RETENTION_REQUEST: 'PUT /api/v1/app/user/swop/:id/retention_request',
  EXTENSION_REQUEST: 'PUT /api/v1/app/user/swop/:id/extension_request',

  EARLY_RETURN_DENY: 'PUT /api/v1/app/user/swop/:id/early_return_deny',
  RETENTION_DENY: 'PUT /api/v1/app/user/swop/:id/retention_deny',
  EXTENSION_DENY: 'PUT /api/v1/app/user/swop/:id/extension_deny',

  BLUR_PHOTO: 'POST /api/v1/app/user/dress/blur_photo',
  SAVE_DRAFT: 'POST /api/v1/app/user/dress/save_draft',
  UPDATE_DRESS: 'PUT /api/v1/app/user/dress/:id',

  CHANGE_PHONE_USER: 'POST /api/v1/app/user/me/change_phone',
  CHANGE_EMAIL_USER: 'POST /api/v1/app/user/me/change_email',

  DRESS_LIST_MATCHING: 'GET /api/v1/app/user/dress/:id/list_matching',
  DELETE_DRESS: 'DELETE /api/v1/app/user/dress/:id',
  DRESS_LIST_SWOPS: 'GET /api/v1/app/user/dress/:id/list_swops',

  GET_DEFAULT_SWOPS: 'GET /api/v1/app/user/me/default_swops',

  // Chat Apis
  LIST_CHAT_MESSAGE: 'GET /api/v1/app/matching/:id/messages',
  GET_MATCHING_DETAILS: 'GET /api/v1/app/matching/:id',
  SEND_CHAT_MESSAGE: 'POST /api/v1/app/matching',

  // Verify
  VERIFY_OTP_APP: 'POST /api/v1/app/user/me/verify_otp',
  VERIFY_OTP_EMAIL_APP: 'POST /api/v1/app/user/me/verify_otp_mail',

  RESEND_OTP_APP: 'POST /api/v1/app/user/me/resend_otp',
  RESEND_OTP_EMAIL_APP: 'POST /api/v1/app/user/me/resend_otp_mail',

  //User Report
  USER_REPORT_DRESS: 'POST /api/v1/app/user/dress/:id/report',

  //Count Swop propose and swop available
  USER_COUNT_SWOPS: 'GET /api/v1/app/user/me/count_swops',
  USER_COUNT_SWOPABLE: 'GET /api/v1/app/user/me/total_swopable',

  //Change date time and address
  USER_CHANGE_ADDRESS: 'PUT /api/v1/app/user/swop/:id/change_address',
  USER_CHANGE_DATE_TIME: 'PUT /api/v1/app/user/swop/:id/change_date_time',
};
