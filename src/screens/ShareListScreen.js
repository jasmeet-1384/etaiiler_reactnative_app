import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getPostLikeApiCall } from '../store/getPostLike-slice'
import { followApiCall } from '../store/follow-slice'
import { unfollowApiCall } from '../store/unFollow-slice'
import { getfollowApiCall } from '../store/getFollow-slice'
import { getPostSharesUrl } from '../api/apiConstant'
import FollowUnfollow from '../components/FollowUnfollow'


export default ShareListScreen = ({ route, navigation }) => {
    const { postDetails } = route.params
    // defining dispatch from redux
    const dispatch = useDispatch()
    const [userid, setuserId] = useState('')
    const [followArr, setFollowArr] = useState([])
    const [tempState, setTempState] = useState(false)

    // useEffect(() => {
    //     setTempState(true)
    //     dispatch(getPostLikeApiCall(postId))
    //     getFollowFunction()
    //     settingUserIdFunction()

    // }, [route])
    // //call get follow list
    // const getFollowFunction = async () => {
    //     let user_id = await AsyncStorage.getItem('_id')
    //     dispatch(getfollowApiCall(user_id))
    // }
    // //set user id
    useEffect(() => {
        getPostSharesFunction(postDetails._id)
        settingUserIdFunction()
    }, [])
    const settingUserIdFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        setuserId(user_id)
    }
    //follow Api call
    const followUserFunction = async (value) => {
        let role = await AsyncStorage.getItem('role')
        setTempState(false)
        dispatch(followApiCall(value, userid, role))

    }
    //unfollow Api call
    const unfollowUserFunction = async (value) => {
        setTempState(true)
        dispatch(unfollowApiCall(value, userid))

    }

    const getPostSharesFunction = async (postId) => {
        try {
            var data = {
                postId: postId
            }
            var response = await fetch(getPostSharesUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setFollowArr(responseJson.data)
            console.log(responseJson, "<...............")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header color="#131128" title="Shares" />
            <FlatList
                data={followArr}
                renderItem={({ item, key }) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ExploreDetailsScreen', { profileData: item.user_id })}
                                style={{ flexDirection: 'row', width: widthToDp('100%'), alignItems: 'center',justifyContent:'space-between',marginTop:heightToDp('1%') }}>
                                <View style={{flexDirection:'row',marginLeft:widthToDp('4%')}}>
                                    <Image
                                        source={{ uri: `${item.user_id.image}` }}
                                        style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300 }}
                                    />
                                    <View style={{ marginLeft: widthToDp('4%') }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.user_id.name}</Text>
                                        <Text style={{ color: 'gray' }}>{item.role} profile</Text>
                                    </View>
                                </View>
                                {/* {
                                    item.user_id._id === userid ? null : ((item.user_id.followers.includes(userid) ?
                                        <TouchableOpacity
                                            onPress={() => unfollowUserFunction(item.user_id._id)}
                                            style={{ height: heightToDp('4%'), width: widthToDp('20%'), backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginLeft: widthToDp('40%') }}>
                                            <Text>Following</Text>
                                        </TouchableOpacity> : <TouchableOpacity
                                            onPress={() => followUserFunction(item.user_id._id)}
                                            style={{ height: heightToDp('4%'), width: widthToDp('20%'), backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginLeft: widthToDp('40%') }}>
                                            <Text>Follow</Text>
                                        </TouchableOpacity>))
                                } */}
                                <FollowUnfollow item={item} addFollowFunction={followUserFunction}
                                    removeFollowFunction={unfollowUserFunction} userid={userid}
                                />

                            </TouchableOpacity>
                        </>
                    )
                }}
            />
        </View>
    )
}