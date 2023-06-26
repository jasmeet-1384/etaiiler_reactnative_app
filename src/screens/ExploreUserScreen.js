import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LocationIcon from 'react-native-vector-icons/Entypo'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersApiCall } from '../store/getAllUsers-slice'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { followApiCall } from '../store/follow-slice'
import { unfollowApiCall } from '../store/unFollow-slice'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import DistanceCalculationComponent from '../components/DistanceCalculationComponent'
import FollowUnfollow from '../components/FollowUnfollow'
import FollowUnfollowExploreComponent from '../components/FollowUnfollowExploreComponent'

export default ExploreUserScreen = ({ navigation }) => {
    const isFocused = useIsFocused();
    // defining dispatch from redux
    const dispatch = useDispatch()
    const [userid, setuserId] = useState('')
    const [tempState, setTempState] = useState(false)
    const [mylatitude, setmyLatitude] = useState('')
    const [mylongitude, setmyLongitude] = useState('')
    const userList = useSelector((state) => state.getAllUsers.getAllUsersDetails)
    const [isFetching, setisFetching] = useState(false)

    useEffect(() => {
        if (isFocused) {
            getAllUsersFunction()
            setTempState(!tempState)
        }
    }, [isFocused])

    //call get all posts api
    const getAllUsersFunction = () => {
        dispatch(getAllUsersApiCall())
        settingUserIdFunction()
    }
    //set user id
    const settingUserIdFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        let lat1 = await AsyncStorage.getItem('latitude')
        let lon1 = await AsyncStorage.getItem('longitude')
        setmyLatitude(lat1)
        setmyLongitude(lon1)
        setuserId(user_id)
        setisFetching(false)
    }
    //follow Api call
    const followUserFunction = async (value) => {
        let role = await AsyncStorage.getItem('role')
        setTempState(false)
        dispatch(followApiCall(value, userid, role))
        dispatch(getAllUsersApiCall())
    }
    //unfollow Api call
    const unfollowUserFunction = async (value) => {
        setTempState(true)
        dispatch(unfollowApiCall(value, userid))
        dispatch(getAllUsersApiCall())
    }

    const onRefresh = () => {
        setisFetching(true)
        getAllUsersFunction()
    }
    return (
        <View style={{ flex: 1 }}>
            {
                userList.data === undefined ? <View style={{ height: heightToDp('60%'), width: widthToDp('100%'), justifyContent: 'center' }}>

                    <ActivityIndicatorComponent size="large" color="blue" />
                </View> : <FlatList
                    data={userList.data}
                    keyExtractor={(item) => item._id.toString()}
                    extraData={tempState}
                    onRefresh={() => onRefresh()}
                    refreshing={isFetching}
                    renderItem={({ item, key }) => {
                        return (
                            <>
                                {
                                    item._id === userid ? null : <>
                                        <View

                                            style={{ flexDirection: 'row', height: heightToDp('20%'), alignItems: 'center' }}>
                                            <TouchableOpacity
                                                onPress={() => navigation.navigate('ExploreDetailsScreen', { profileData: item })}
                                            >
                                                <Image
                                                    source={{ uri: item.image === '' ? "https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png" : item.image }}
                                                    style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('2%') }}
                                                />
                                            </TouchableOpacity>

                                            <View style={{ height: heightToDp('20%'), width: widthToDp('50%'), marginLeft: widthToDp('2%'), marginTop: heightToDp('6%') }}>
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('ExploreDetailsScreen', { profileData: item })}

                                                >
                                                    <Text style={{ color: 'black', fontSize: heightToDp('2.2%') }}>{item.name}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    // onPress={() => Linking.openURL(
                                                    //     `https://www.google.com/maps/dir/?api=1&origin=` +
                                                    //     mylatitude +
                                                    //     `,` +
                                                    //     mylongitude +
                                                    //     `&destination=` +
                                                    //     item.gpsAddress.latitude +
                                                    //     `,` +
                                                    //     item.gpsAddress.longitude +
                                                    //     `&travelmode=driving`
                                                    // )}
                                                    style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                                    <LocationIcon
                                                        name='location'
                                                        size={12}
                                                        color={'#707070'}
                                                        style={{ marginTop: heightToDp('0.5%') }}
                                                    />
                                                    {/* {item.gpsAddress == undefined ? null : <DistanceCalculationComponent lat2={item.gpsAddress.latitude} lon2={item.gpsAddress.longitude} />} */}
                                                    <Text style={{ marginLeft: widthToDp('1%'), color: 'black' }}>{item.state},{item.city} </Text>
                                                </TouchableOpacity>
                                                <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                                    {/* <FollowUnfollow item={item} addFollowFunction={followUserFunction}
                                                        removeFollowFunction={unfollowUserFunction} userid={userid}
                                                    /> */}
                                                    <FollowUnfollowExploreComponent item={item} userid={userid} addFollowFunction={followUserFunction}
                                                        removeFollowFunction={unfollowUserFunction} />
                                                    {/* {
                                                        item.followers.includes(userid) ? <LinearGradient
                                                            colors={['#4076E5', '#74AEF4']}
                                                            start={{ x: 0, y: 1 }}
                                                            end={{ x: 1, y: 1 }}
                                                            style={{ borderRadius: 200, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', marginLeft: widthToDp('0%') }}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() => unfollowUserFunction(item._id)}
                                                                style={{ height: heightToDp('4%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                                <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Following</Text>

                                                            </TouchableOpacity>
                                                        </LinearGradient> : <LinearGradient
                                                            colors={['#4076E5', '#74AEF4']}
                                                            start={{ x: 0, y: 1 }}
                                                            end={{ x: 1, y: 1 }}
                                                            style={{ borderRadius: 200, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', marginLeft: widthToDp('0%') }}
                                                        >
                                                            <TouchableOpacity
                                                                onPress={() => followUserFunction(item._id)}
                                                                style={{ height: heightToDp('4%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                                <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Follow</Text>

                                                            </TouchableOpacity>
                                                        </LinearGradient>
                                                    } */}
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('ChatInboxScreen', { conversation_id: "", to_id: item._id, to_name: item.name, to_image: item.image })}
                                                        style={{ backgroundColor: '#f0915d', width: widthToDp('10%'), height: heightToDp('4%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center', marginLeft: widthToDp('2%') }}>
                                                        <MessageIcon
                                                            name='message-text-outline'
                                                            color={'white'}
                                                            size={20}
                                                            style={{ marginLeft: widthToDp('0%') }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </>
                                }
                            </>
                        )
                    }}
                />
            }

        </View>
    )
}