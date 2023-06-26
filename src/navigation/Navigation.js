import React, { useEffect } from 'react'
import { Text } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './RootNavigation';
import SplashScreen from '../screens/SplashScreen'
import SelectLanguageScreen from '../screens/SelectLanguageScreen'
import SignInScreen from '../screens/SignInScreen'
import RoleSelectionScreen from '../screens/RoleSelectionScreen'
import SignUpScreen from '../screens/SignUpScreen'
import OtpScreen from '../screens/OtpScreen'
import MyProfileScreen from '../screens/MyProfileScreen'
import TabNavigation from './TabNavigation'
import UploadPhotoScreen from '../screens/UploadPhotoScreen'
import BusinessScreen from '../screens/BusinessScreen'
import UserFormScreen from '../screens/UserFormScreen'
import BusinessFormScreen from '../screens/BusinessFormScreen'
import AddPostScreen from '../screens/AddPostScreen'
import SearchScreen from '../screens/SearchScreen'
import AddProductScreen from '../screens/AddProductScreen'
import ProductDetailsScreenLink from '../screens/ProductDetailsScreenLink'
import ProductDetailsScreen from '../screens/ProductDetailsScreen'
import ChatInboxScreen from '../screens/ChatInboxScreen'
import InboxScreen from '../screens/InboxScreen'
import LikeListScreen from '../screens/LikeListScreen'
import SupportScreen from '../screens/SupportScreen'
import CommentsScreen from '../screens/CommentsScreen'
import ExploreDetailsScreen from '../screens/ExploreDetailsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import EditBusinessScreen from '../screens/EditBusinessScreen';
import MapScreen from '../screens/MapScreen';
import ShareListScreen from '../screens/ShareListScreen';
import TagListScreen from '../screens/TagListScreen';
import AddPromoScreen from '../screens/AddPromoScreen';
import PromoPlanSelectionScreen from '../screens/PromoPlanSelectionScreen'
import PromoPaymentSummaryScreen from '../screens/PromoPaymentSummaryScreen';
import FollowersListScreen from '../screens/FollowersListScreen'
import CheckoutScreen from '../screens/CheckoutScreen'
import LikedPostByUserScreen from '../screens/LikedPostByUserScreen';
import FollowingScreen from '../screens/FollowingScreen';
import ForgotPasswordMobileScreen from '../screens/ForgotPasswordMobileScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import NoInternetScreen from '../screens/NoInternetScreen';
import TermsAndConditionScreen from '../screens/TermsAndConditionScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import ExploreHashtag from '../screens/ExploreHashtag'
import ExploreTrendingScreen from '../screens/ExploreTrendingScreen';
import SecurityScreen from '../screens/SecurityScreen';
import DeleteAccountScreen from '../screens/DeleteAccountScreen';
import DeleteConfirmationScreen from '../screens/DeleteConfirmationScreen';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {getBusinessProfileById, getPostById, getUserProfileById} from '../api/apiConstant'

const Stack = createNativeStackNavigator()
const config = {
    screens: {
        ProductDetailsScreen: {
            path: 'post/:id',
            parse: {
                id: (id) => `post-${id}`
            },
            stringify: {
                id: (id) => id.replace(/^post-/, ''),
            },
        }
    }
}
const linking = {
    prefixes: ['iuniverse://'],
    config
}

function Navigation() {
    const HandleDynamicLink = () => {
        const navigation = useNavigation()
        const handleDynamicLink = async(link) => {
            let productId = link.url.split('=').pop()
            console.log("link:", productId)
            // Handle dynamic link inside your own application
            if (link.url.includes('business')) {
                var data = {
                    user_id: productId
                }
                var response = await fetch(getBusinessProfileById, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                var responseJson = await response.json()
                navigation.navigate('ExploreDetailsScreen', { profileData: responseJson.data })
            }else if(link.url.includes('user')){
                var data = {
                    user_id: productId
                }
                var response = await fetch(getUserProfileById, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                var responseJson = await response.json()
                navigation.navigate('ExploreDetailsScreen', { profileData: responseJson.data })
            }else if(link.url.includes('product')){
                var data = {
                    id: productId
                }
                var response = await fetch(getPostById, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                var responseJson = await response.json()
                let createdObj = {...responseJson.data,user_id : [responseJson.data.user_id]}
                console.log(createdObj,"DUDUDUDUDUDUDUDUDUUDUDUDUDUDUDUDUDUDUDUDUDUDUDUDUUDUDUDUDUDUDUDUDUDUDUDDU")
                navigation.navigate('ProductDetailsScreen', { postData: createdObj })
            }
        };

        useEffect(() => {
            const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
            // When the component is unmounted, remove the listener
            return () => unsubscribe();
        }, []);
        return null
    }
    return (
        <NavigationContainer ref={navigationRef} linking={linking} fallback={<Text>Loading....</Text>}>
            <HandleDynamicLink />
            <Stack.Navigator>
                <Stack.Screen name='SplashScreen' component={SplashScreen} options={{ headerShown: false }} />
                <Stack.Screen name='SelectLanguageScreen' component={SelectLanguageScreen} options={{ headerShown: false }} />
                <Stack.Screen name='SignInScreen' component={SignInScreen} options={{ headerShown: false }} />
                <Stack.Screen name='RoleSelectionScreen' component={RoleSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name='SignUpScreen' component={SignUpScreen} options={{ headerShown: false }} />
                <Stack.Screen name='OtpScreen' component={OtpScreen} options={{ headerShown: false }} />
                <Stack.Screen name='MyProfileScreen' component={MyProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name='TabNavigation' component={TabNavigation} options={{ headerShown: false }} />
                <Stack.Screen name='UploadPhotoScreen' component={UploadPhotoScreen} options={{ headerShown: false }} />
                <Stack.Screen name='BusinessScreen' component={BusinessScreen} options={{ headerShown: false }} />
                <Stack.Screen name='UserFormScreen' component={UserFormScreen} options={{ headerShown: false }} />
                <Stack.Screen name='BusinessFormScreen' component={BusinessFormScreen} options={{ headerShown: false }} />
                <Stack.Screen name='AddPostScreen' component={AddPostScreen} options={{ headerShown: false }} />
                <Stack.Screen name='SearchScreen' component={SearchScreen} options={{ headerShown: false }} />
                <Stack.Screen name='AddProductScreen' component={AddProductScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ChatInboxScreen' component={ChatInboxScreen} options={{ headerShown: false }} />
                <Stack.Screen name='InboxScreen' component={InboxScreen} options={{ headerShown: false }} />
                <Stack.Screen name='LikeListScreen' component={LikeListScreen} options={{ headerShown: false }} />
                <Stack.Screen name='SupportScreen' component={SupportScreen} options={{ headerShown: false }} />
                <Stack.Screen name='CommentsScreen' component={CommentsScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ExploreDetailsScreen' component={ExploreDetailsScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ExploreScreen' component={ExploreScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ExploreTrendingScreen' component={ExploreTrendingScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ExploreHashtag' component={ExploreHashtag} options={{ headerShown: false }} />
                <Stack.Screen name='EditProfileScreen' component={EditProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name='EditBusinessScreen' component={EditBusinessScreen} options={{ headerShown: false }} />
                <Stack.Screen name='MapScreen' component={MapScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ShareListScreen' component={ShareListScreen} options={{ headerShown: false }} />
                <Stack.Screen name='TagListScreen' component={TagListScreen} options={{ headerShown: false }} />
                <Stack.Screen name='AddPromoScreen' component={AddPromoScreen} options={{ headerShown: false }} />
                <Stack.Screen name='PromoPlanSelectionScreen' component={PromoPlanSelectionScreen} options={{ headerShown: false }} />
                <Stack.Screen name='PromoPaymentSummaryScreen' component={PromoPaymentSummaryScreen} options={{ headerShown: false }} />
                <Stack.Screen name='FollowersListScreen' component={FollowersListScreen} options={{ headerShown: false }} />
                <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} options={{ headerShown: false }} />
                <Stack.Screen name='LikedPostByUserScreen' component={LikedPostByUserScreen} options={{ headerShown: false }} />
                <Stack.Screen name='FollowingScreen' component={FollowingScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ForgotPasswordMobileScreen' component={ForgotPasswordMobileScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ResetPasswordScreen' component={ResetPasswordScreen} options={{ headerShown: false }} />
                <Stack.Screen name='NoInternetScreen' component={NoInternetScreen} options={{ headerShown: false }} />
                <Stack.Screen name='TermsAndConditionScreen' component={TermsAndConditionScreen} options={{ headerShown: false }} />
                <Stack.Screen name='PrivacyPolicyScreen' component={PrivacyPolicyScreen} options={{ headerShown: false }} />
                <Stack.Screen name='SecurityScreen' component={SecurityScreen} options={{ headerShown: false }} />
                <Stack.Screen name='DeleteAccountScreen' component={DeleteAccountScreen} options={{ headerShown: false }} />
                <Stack.Screen name='DeleteConfirmationScreen' component={DeleteConfirmationScreen} options={{ headerShown: false }} />
                <Stack.Screen name='ProductDetailsScreenLink' component={ProductDetailsScreenLink} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation