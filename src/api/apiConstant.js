// export const apiProtocol = 'http://'
// export const rootApiUrl = 'localhost:5000/'
export const apiProtocol = 'http://'
export const rootApiUrl = '157.230.29.3:5000/'
// export const apiProtocol = 'https://'
// export const rootApiUrl = 'etailerapi.teceads.co.in/'

export const postRegisterUserUrl = `${apiProtocol}${rootApiUrl}users/userRegister`
export const resetPasswordUrl = `${apiProtocol}${rootApiUrl}users/resetPassword`
export const postRegisterBusinessUrl = `${apiProtocol}${rootApiUrl}business/businessRegister`
export const loginUrl = `${apiProtocol}${rootApiUrl}users/userOtp`
export const otpVerification = `${apiProtocol}${rootApiUrl}users/userOtpVerification`
export const passwordLoginInUrl = `${apiProtocol}${rootApiUrl}users/userLogin`
export const getAllUsers = `${apiProtocol}${rootApiUrl}users/getAllUser`
export const updateTokenUrl = `${apiProtocol}${rootApiUrl}users/userTokenUpdate`
export const updateProfileUrl = `${apiProtocol}${rootApiUrl}users/profileUpdate`
export const searchProfileUrl = `${apiProtocol}${rootApiUrl}users/searchProfile`
export const searchHashUrl = `${apiProtocol}${rootApiUrl}hash/searchHashTag`
export const getGpsAddressDetailsUrl = `${apiProtocol}${rootApiUrl}users/getGpsAddressDetails`
export const getUserAddressesUrl = `${apiProtocol}${rootApiUrl}users/getUserAddresses`
export const addNewAddressUrl = `${apiProtocol}${rootApiUrl}users/addNewAddress`
export const getProfileDetailsUrl = `${apiProtocol}${rootApiUrl}users/getProfileDetails`
// export const followUserUrl = `${apiProtocol}${rootApiUrl}users/followUser`
// export const unfollowUserUrl = `${apiProtocol}${rootApiUrl}users/unfollowUser`
export const getNotificationsUrl = `${apiProtocol}${rootApiUrl}notification/getNotifications`

export const followUrl = `${apiProtocol}${rootApiUrl}users/followUser`
export const unfollowUrl = `${apiProtocol}${rootApiUrl}users/unfollowUser`
export const getfollowUrl = `${apiProtocol}${rootApiUrl}follow/getFollow`
export const getFollowersListUrl = `${apiProtocol}${rootApiUrl}follow/getFollowersList`
export const getFollowingListUrl = `${apiProtocol}${rootApiUrl}follow/getFollowingList`


export const getAllBusinessUrl = `${apiProtocol}${rootApiUrl}business/getAllBusiness`


export const uploadImageToDBUrl = `${apiProtocol}${rootApiUrl}post/addPost`
export const getAllPostsUrl = `${apiProtocol}${rootApiUrl}post/getAllPosts`
export const getAllHomePostsUrl = `${apiProtocol}${rootApiUrl}post/getAllPostsHome`
export const getOwnPostsUrl = `${apiProtocol}${rootApiUrl}post/getOwnPosts`
export const addPostLike = `${apiProtocol}${rootApiUrl}post/addPostLike`
export const removePostLike = `${apiProtocol}${rootApiUrl}post/removePostLike`
export const getPostLike = `${apiProtocol}${rootApiUrl}post/getPostLikes`
export const getAllPostLikes = `${apiProtocol}${rootApiUrl}post/getAllPostLikes`
export const addCommentUrl = `${apiProtocol}${rootApiUrl}post/addComment`
export const getCommentUrl = `${apiProtocol}${rootApiUrl}post/getPostComment`
export const getLikesByUserUrl =`${apiProtocol}${rootApiUrl}post/getLikesByUser`
export const sharePostsUrl =`${apiProtocol}${rootApiUrl}post/sharePosts`
export const getPostSharesUrl =`${apiProtocol}${rootApiUrl}post/getPostShares`
export const getPostTagsUrl =`${apiProtocol}${rootApiUrl}post/getPostTags`
export const addHidePostUrl =`${apiProtocol}${rootApiUrl}post/addHidePost`
export const getHiddenPostsUrl =`${apiProtocol}${rootApiUrl}post/getHiddenPosts`
export const reportPostsUrl =`${apiProtocol}${rootApiUrl}post/reportPosts`
export const deletePostsUrl =`${apiProtocol}${rootApiUrl}post/deletePosts`
export const getPromoPostsUrl =`${apiProtocol}${rootApiUrl}post/getPromoPosts`
export const getPromoPlansUrl =`${apiProtocol}${rootApiUrl}post/getPromoPlans`
export const getDiscountPlansUrl =`${apiProtocol}${rootApiUrl}post/getDiscountPlans`
export const getPaymentUrl =`${apiProtocol}${rootApiUrl}post/getPayment`
export const getPaymentOrderIdUrl =`${apiProtocol}${rootApiUrl}post/getPaymentOrderId`
export const getRazorpayDetailsUrl =`${apiProtocol}${rootApiUrl}post/getRazorpayDetails`
export const getRelatedPostsUrl = `${apiProtocol}${rootApiUrl}post/getRelatedPosts`
export const getPostById = `${apiProtocol}${rootApiUrl}post/getPostById`

export const profileUrl = `${apiProtocol}${rootApiUrl}users/getUser`
export const profileUrlBusiness = `${apiProtocol}${rootApiUrl}users/getBusiness`
export const sendSupportMessage = `${apiProtocol}${rootApiUrl}users/sendSupportMessage`
export const deleteProfile = `${apiProtocol}${rootApiUrl}users/deleteProfile`
export const getBusinessProfileById = `${apiProtocol}${rootApiUrl}users/getBusinessProfileById`
export const getUserProfileById = `${apiProtocol}${rootApiUrl}users/getUserProfileById`

export const addChatUrl = `${apiProtocol}${rootApiUrl}chat/addChat`
export const getMyConversationUrl = `${apiProtocol}${rootApiUrl}chat/getMyConversation`
export const getMyMessagesUrl = `${apiProtocol}${rootApiUrl}chat/getMyMessages`
export const getParticularConversationIdUrl = `${apiProtocol}${rootApiUrl}chat/getParticularConversationId`
