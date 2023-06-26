import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { getNotificationsApiCall } from '../store/getAllNotifications-slice'
import { getOwnPostsApiCall } from '../store/getOwnPost-slice'
import { getAllUsersApiCall } from '../store/getAllUsers-slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import Header2 from '../components/Header2'

export default NotificationScreen = () => {
    // defining dispatch from redux
    const isFocused = useIsFocused();
    const dispatch = useDispatch()
    useEffect(() => {
        if (isFocused) {
            dispatch(getAllUsersApiCall())
            dispatch(getOwnPostsApiCall())
            getAllPostsFunction()
        }
    }, [isFocused])
    const postList = useSelector((state) => state.getNotifications.getNotificationsDetails)
    const ownpostList = useSelector((state) => state.getOwnPosts.getOwnPostsDetails)

    //call get all posts api
    const getAllPostsFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        let role = await AsyncStorage.getItem('role')
        dispatch(getNotificationsApiCall(user_id,role))
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
           <Header2/>
            {
                postList.data === undefined ? <View style={{ height: heightToDp('100%'), width: widthToDp('100%'), justifyContent: 'center' }}>

                    <ActivityIndicatorComponent size="large" color="blue" />
                </View> : <FlatList
                    data={postList.data === undefined ? [] : postList.data}
                    renderItem={({ item, key }) => {
                        return (
                            <>
                                {
                                    item.postedBy ? <View style={{ flexDirection: 'row', height: heightToDp('5%'), alignItems: 'center', marginTop: heightToDp('2%') }}>

                                        <Image
                                            source={{ uri: item.postedBy.image }}
                                            style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('3%') }}
                                        />
                                        <View style={{ width: widthToDp('72%'), flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ color: 'black', marginLeft: widthToDp('4%'), width: widthToDp('42%') }}>{`${item.postedBy.name} commented "${item.text}"`}</Text>
                                            <Text style={{ color: 'gray', marginLeft: widthToDp('0%') }}>   {(item.createdAt).toString().split('T')[0]}</Text>
                                        </View>
                                        <Image
                                            source={{ uri: item.postImage }}
                                            style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                                        />
                                    </View> :
                                        <View style={{ flexDirection: 'row', height: heightToDp('5%'), alignItems: 'center', marginTop: heightToDp('2%') }}>
                                            <Image
                                                source={{ uri: item.likedBy.image }}
                                                style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('3%') }}
                                            />
                                            <View style={{ width: widthToDp('72%'), flexDirection: 'row' }}>
                                                <Text style={{ color: 'black', marginLeft: widthToDp('4%'), width: widthToDp('42%') }}>{`${item.likedBy.name} liked your post`}</Text>
                                                <Text style={{ color: 'gray', marginLeft: widthToDp('0%') }}>  {(item.createdAt).toString().split('T')[0]}</Text>
                                            </View>
                                            <Image
                                                source={{ uri: item.postImage }}
                                                style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                                            />
                                        </View>
                                }
                            </>
                        )
                    }}
                />
            }

            {/* <Text style={{ color: 'black', marginLeft: widthToDp('2%'), marginTop: heightToDp('2%') }}>This Week</Text>
            <View style={{ flexDirection: 'row', height: heightToDp('5%'), alignItems: 'center', marginTop: heightToDp('2%') }}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('3%') }}
                />
                <View style={{ width: widthToDp('74%'), flexDirection: 'row' }}>
                    <Text style={{ color: 'black', marginLeft: widthToDp('4%') }}>Commented on your post.</Text>
                    <Text style={{ color: 'gray', marginLeft: widthToDp('0%') }}>3d</Text>
                </View>
                <Image
                    source={{ uri: 'https://www.ulcdn.net/images/products/338715/original/Madeleine_Floor_Lamp_Walnut_LP.JPG?1621323150' }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                />
            </View>
            <Text style={{ color: 'black', marginLeft: widthToDp('2%'), marginTop: heightToDp('2%') }}>This Month</Text>
            <View style={{ flexDirection: 'row', height: heightToDp('5%'), alignItems: 'center', marginTop: heightToDp('2%') }}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('3%') }}
                />
                <View style={{ width: widthToDp('74%'), flexDirection: 'row' }}>
                    <Text style={{ color: 'black', marginLeft: widthToDp('4%') }}>Commented on your post.</Text>
                    <Text style={{ color: 'gray', marginLeft: widthToDp('0%') }}>1w</Text>
                </View>
                <Image
                    source={{ uri: 'https://www.ulcdn.net/images/products/338715/original/Madeleine_Floor_Lamp_Walnut_LP.JPG?1621323150' }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                />
            </View>
            <View style={{ flexDirection: 'row', height: heightToDp('5%'), alignItems: 'center', marginTop: heightToDp('2%') }}>
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('3%') }}
                />
                <View style={{ width: widthToDp('74%'), flexDirection: 'row' }}>
                    <Text style={{ color: 'black', marginLeft: widthToDp('4%') }}>Commented on your post.</Text>
                    <Text style={{ color: 'gray', marginLeft: widthToDp('0%') }}>1w</Text>
                </View>
                <Image
                    source={{ uri: 'https://www.ulcdn.net/images/products/338715/original/Madeleine_Floor_Lamp_Walnut_LP.JPG?1621323150' }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                />
            </View> */}
        </View>
    )
}