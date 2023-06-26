import {configureStore} from '@reduxjs/toolkit'
import userRegistrationSlice from './userRegistration-slice'
import businessRegistrationSlice from './businessRegistration-slice'
import loginMobileOtpSlice from './loginMobileOtp-slice'
import otpVericationSlice from './otpVerification-slice'
import passwordLoginSlice from './passwordLogin-slice'
import uploadImagetoDBSlice from './uploadImageToDB-slice'
import getAllPostsSlice from './getAllPosts-slice'
import addPostLikeSlice from './addPostLike-slice'
import addCommentSlice from './addComment-slice'
import removePostLikeSlice from './removePostLike-slice'
import getPostLikeSlice from './getPostLike-slice'
import getCommentSlice from './getComment-slice'
import getAllUsersSlice from './getAllUsers-slice'
import getAllBusinessSlice from './getAllBusiness-slice'
import followSlice from './follow-slice'
import unfollowSlice from './unFollow-slice'
import getfollowSlice from './getFollow-slice'
import getAllPostLikesSlice from './getAllPostLikes-slice'
import updateTokenSlice from './updateToken-slice'
import getNotificationsSlice from './getAllNotifications-slice'
import getOwnPostsSlice from './getOwnPost-slice'
import addChatSlice from './addChat-slice'
import getMyConversationSlice from './getMyConversation-slice'
import getMyMessagesSlice from './getMyMessages-slice'
import setLocationReducer from './setLocation-slice'
import setAddressReducer from './setAddress-slice'
import setPromoPosstDetailsReducer from './setPromoPostDetails-slice'
import storePaymentReducer from './storePaymentDetails-slice'

const store = configureStore({
    reducer:{
        userRegistration : userRegistrationSlice.reducer,
        businessRegistration : businessRegistrationSlice.reducer,
        loginMobileNumberOtp : loginMobileOtpSlice.reducer,
        otpVerificationDetails : otpVericationSlice.reducer,
        passwordLogin: passwordLoginSlice.reducer,
        uploadImageToDBDetails : uploadImagetoDBSlice.reducer,
        getAllPostsDetails : getAllPostsSlice.reducer,
        addPostLike : addPostLikeSlice.reducer,
        addComment : addCommentSlice.reducer,
        removePostLike : removePostLikeSlice.reducer,
        getPostLike : getPostLikeSlice.reducer,
        getComment : getCommentSlice.reducer,
        getAllUsers : getAllUsersSlice.reducer,
        getAllBusiness : getAllBusinessSlice.reducer,
        follow : followSlice.reducer,
        unfollow : unfollowSlice.reducer,
        getfollow : getfollowSlice.reducer,
        getAllPostLikes : getAllPostLikesSlice.reducer,
        updateToken : updateTokenSlice.reducer,
        getNotifications : getNotificationsSlice.reducer,
        getOwnPosts : getOwnPostsSlice.reducer,
        addChat : addChatSlice.reducer,
        getMyConversation : getMyConversationSlice.reducer,
        getMyMessages : getMyMessagesSlice.reducer,
        setLocation : setLocationReducer,
        setAddress : setAddressReducer,
        promoPostDetails : setPromoPosstDetailsReducer,
        payment : storePaymentReducer
    }
})
export default store
