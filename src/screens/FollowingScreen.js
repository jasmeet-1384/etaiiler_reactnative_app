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
import { getFollowersListUrl, getFollowingListUrl, getPostSharesUrl } from '../api/apiConstant'
import FollowUnfollow from '../components/FollowUnfollow'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'

export default FollowingScreen = ({route,navigation}) => {
    const { userId} = route.params
    // defining dispatch from redux
    const dispatch = useDispatch()
    const [userid, setuserId] = useState('')
    const [followerArr, setFollowerArr] = useState([])
    const [animating, setanimating] = useState(true)
    console.log(userId,"<<<<<<<<<")
    useEffect(() => {
        getPostSharesFunction()
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

    const getPostSharesFunction = async () => {
        try {
            let user_id = await AsyncStorage.getItem('_id')

            var data = {
                user_id: userId
            }
            var response = await fetch(getFollowingListUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setFollowerArr(responseJson.data)
            setanimating(false)
            console.log(responseJson, "<...............")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header color="#131128" title="Following" />
            {
                animating ? <View style={{height:heightToDp('80%'),width:widthToDp('100%'),justifyContent:'center'}}>
                    <ActivityIndicatorComponent size="large" color="blue" />
                </View> : <>
                    <FlatList
                        data={followerArr}
                        renderItem={({ item, key }) => {
                            return (
                                <>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ExploreDetailsScreen', { profileData: item })}
                                        style={{ flexDirection: 'row', height: heightToDp('7%'), width: widthToDp('100%'), alignItems: 'center', marginTop:heightToDp('2%') }}>
                                        <Image
                                            source={{ uri: `${item.image}` }}
                                            style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                                        />
                                        <View style={{ marginLeft: widthToDp('4%'), width: widthToDp('40%') }}>
                                            <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                                            <Text style={{ color: 'gray' }}>{item.role} profile</Text>
                                        </View>

                                        {/* <FollowUnfollow item={item} addFollowFunction={followUserFunction}
                                    removeFollowFunction={unfollowUserFunction} userid={userid}
                                /> */}

                                    </TouchableOpacity>
                                </>
                            )
                        }}
                    />
                </>
            }
        </View>
    )
}