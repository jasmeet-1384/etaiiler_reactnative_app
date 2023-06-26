import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import LeftIcon from 'react-native-vector-icons/AntDesign'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotIcon from 'react-native-vector-icons/Entypo'
import LocationIcon from 'react-native-vector-icons/Entypo'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { searchProfileUrl } from '../api/apiConstant'
import DistanceCalculationComponent from '../components/DistanceCalculationComponent'
import FollowUnfollow from '../components/FollowUnfollow'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default SearchScreen = ({ navigation }) => {
    const [searchData,setSearchData] = useState([])
    const [hashData,setHashData] = useState([])
    const [userid, setuserId] = useState('')
    const [searchTextValue, setSearchTextValue] = useState('')

    useEffect(() => {
        searchText('')
        settingUserIdFunction()
    }, [])
    const settingUserIdFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        setuserId(user_id)
    }
    //follow Api call
    const followUserFunction = async (value) => {
        let role = await AsyncStorage.getItem('role')
        dispatch(followApiCall(value, userid, role))

    }
    //unfollow Api call
    const unfollowUserFunction = async (value) => {
        dispatch(unfollowApiCall(value, userid))
    }
    const searchText = async (value) => {
        try {
            let hashTagValue=value;
            if(hashTagValue.indexOf("#")==0){
                hashTagValue=hashTagValue.substring(1)
            }
            // setTagName(value)
            console.log(hashTagValue)
            var data = {
                name: hashTagValue,
                hashTag: hashTagValue
            }
            var response = await fetch(searchProfileUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()

            

            if(value.indexOf("#")==0){
                setSearchData(responseJson.data.filter((e)=>e._id.includes(hashTagValue)))

                
            }else{
                setSearchData(responseJson.data)

            }

            console.log("search data=>>>>>>>>>>>>>>>>>>>",responseJson?.data)
        } catch (err) {
            console.log(err, "<====== ")
        }

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#131127', width: widthToDp('100%'), height: heightToDp('8%'), justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', width: widthToDp('100%') }}>
                    <LeftIcon
                        name='arrowleft'
                        size={30}
                        color={'white'}
                        style={{ marginLeft: widthToDp('5%'), marginTop: heightToDp('0.5%') }}
                        onPress={() => navigation.goBack()}
                    />
                    <View style={{ backgroundColor: 'white', height: heightToDp('5%'), width: widthToDp('75%'), marginLeft: widthToDp('7%'), borderRadius: 10 }}>
                        <TextInput
                            placeholder='Search'
                            placeholderTextColor={'gray'}
                            style={{ marginLeft: widthToDp('2%'), color: 'black' }}
                            onChangeText = {(text) => searchText(text)}
                        />
                    </View>
                </View>
            </View>



            <FlatList
                data={searchData}
                renderItem={({ item, index }) => {
                    return (
                        <>
                            <TouchableOpacity
                            onPress={() => navigation.navigate(item.count?'ExploreHashtag':'ExploreDetailsScreen', { profileData: item })}
                            style={{ flexDirection: 'row', height: heightToDp('20%'), alignItems: 'center' }}>
                                <Image
                                    source={{ uri: item?.image?item?.image:item?.postDetails[0]?.image }}
                                    style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                                />

                                <View style={{ height: heightToDp('20%'), width: widthToDp('50%'), marginLeft: widthToDp('4%'), marginTop: heightToDp('6%') }}>
                                    {
                                        (item.name)?
                                        <Text style={{ color: 'black', fontSize: heightToDp('2.2%') }}>{item.name}</Text>
                                        :
                                        <View style={{marginTop:heightToDp(4)}}>
                                            <Text style={{ color: 'black', fontSize: heightToDp('2.2%') }}>#{item._id}</Text>
                                        </View>
                                    }
                                    {
                                        (item?.gpsAddress?.latitude && item?.gpsAddress?.longitude ) ? 
                                        <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                            <LocationIcon
                                                name='location'
                                                size={12}
                                                color={'#707070'}
                                                style={{ marginTop: heightToDp('0.5%') }}
                                            />
                                            <Text style={{ marginLeft: widthToDp('1%'), color: 'black' }}>{item.gpsAddress == undefined ? null :<DistanceCalculationComponent lat2={item.gpsAddress.latitude} lon2={item.gpsAddress.longitude}/>} | {item.state},{item.city}</Text>
                                        </View>
                                        :
                                        <View>
                                            <Text style={{ marginLeft: widthToDp('1%'), color: 'black' }}>{item.count} posts with this hashtag</Text>
                                        </View>
                                    }
                                </View>
                            </TouchableOpacity>
                        </>
                    )
                }}
            />
            
        </View>
    )
}