import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking, Modal, TouchableWithoutFeedback, ScrollView , Share } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LocationIcon from 'react-native-vector-icons/Entypo'
import Entypo from 'react-native-vector-icons/Entypo'
import WhatsappIcon from 'react-native-vector-icons/FontAwesome'
import { followApiCall } from '../store/follow-slice'
import { unfollowApiCall } from '../store/unFollow-slice'
import DistanceCalculationComponent from '../components/DistanceCalculationComponent'
import { getGpsAddressDetailsUrl, getLikesByUserUrl, getProfileDetailsUrl } from '../api/apiConstant'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useIsFocused } from '@react-navigation/native';
import FollowUnfollowExploreComponent from '../components/FollowUnfollowExploreComponent'
import { RadioButton } from 'react-native-paper'
import Octicons from 'react-native-vector-icons/Octicons'
import ReportIcon from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { getOwnPostsFetch } from '../api/GetAllPostsApi'
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default ExploreDetailsScreen = ({ route, navigation }) => {
    const { profileData } = route.params
    console.log(profileData,"DUDUDEBONA")
    // defining dispatch from redux
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const [userid, setuserId] = useState('')
    const [userPosts, setUserPosts] = useState('')
    const [filteredArr, setFilterdArr] = useState([])
    const [postsAndProds, setPostsAndProds] = useState([])
    const [followState, setFollowState] = useState(profileData)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [mylatitude, setmyLatitude] = useState('')
    const [mylongitude, setmyLongitude] = useState('')
    const [likes, setLikes] = useState('')
    const [buttonText, setButtonText] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [ showReport, setShowReport ] = useState(false)
    const [ cartVisible, setCartVisible ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const [ tab, setTab ] = useState('posts')

    const postList = useSelector((state) => state.getAllPostsDetails.getAllPostsData)
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = () => {
        getUserDetails()
        settingUserIdFunction()
        getGpsAddressDetailsFunction()
        likeListByUserFunction()
    }
    useEffect(() => {
        getUserDetails()
        settingUserIdFunction()
        getGpsAddressDetailsFunction()
        likeListByUserFunction()
    }, [tab])

    useEffect(() => {
        // getUserDetails()
        setFollowState(followState)
        // console.log("seconf render", followState)
    }, [followState])

    const generateLink = async() => {
        try {
            var linkParam;
            if(profileData?.role == 'business'){
                linkParam = `https://haastag.page.link/share?business=${profileData?._id}`
            }else {
                linkParam = `https://haastag.page.link/share?user=${profileData?._id}`
            }
            const link = await dynamicLinks().buildShortLink({
                link : linkParam,
                domainUriPrefix : 'https://haastag.page.link',
                android : {
                    packageName : 'com.etaiiler'
                }
            }, dynamicLinks.ShortLinkType.DEFAULT)

            return link
        } catch (error) {
            console.log('ERROR DYNAMIC LINK',error)
        }
    }

    const shareLink = async() => {
        const getLink = await generateLink()
        try {
            Share.share({
                message : getLink,
            })
        } catch (error) {
            console.log("share error",error)
        }
    }

    const getUserDetails = async () => {
        var userId = await AsyncStorage.getItem('_id')
        var data = {
            user_id: profileData?._id
        }
        var response = await fetch(getProfileDetailsUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()
        setFollowState(res.data)
        res?.data?.followers?.some(el => el === userId) ? setButtonText('Following') : setButtonText('Follow')
        // console.log("Profile DETAILS================== => ", res.data.followers.some(el => el == userId))
        const a = await getOwnPostsFetch(profileData?._id)
        setFilterdArr(a.data.businessPosts)
        setUserPosts(a.data.userPosts)
        if(tab === 'posts') {
           let psts = a?.data?.businessPosts?.filter(item => item.postType != 'product' && item.postType != 'promo')
           setPostsAndProds([...psts])
        }
        else {
            let prds = a?.data?.businessPosts?.filter(item => item.postType == 'product')
            setPostsAndProds([...prds])
        }
    }


    const getGpsAddressDetailsFunction = async () => {
        try {
            var data = {
                role: profileData?.role,
                phoneNumber: profileData?.phoneNumber
            }
            var response = await fetch(getGpsAddressDetailsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setLatitude(responseJson.data.gpsAddress.latitude)
            setLongitude(responseJson.data.gpsAddress.longitude)
            // console.log(responseJson.data.gpsAddress.longitude, "<...............GPS")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }
    //set user id
    const settingUserIdFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        let lat1 = await AsyncStorage.getItem('latitude')
        let lon1 = await AsyncStorage.getItem('longitude')
        setuserId(user_id)
        setmyLatitude(lat1)
        setmyLongitude(lon1)
        const found = postList.data.filter(element => element?.user_id?._id === profileData?._id)
        setFilterdArr(found)
        setPostsAndProds([])
    }
    // //set state follow
    // const followStateFunction = async () => {
    //     let user_id = await AsyncStorage.getItem('_id')
    //     if (profileData?.followers.includes(user_id)) {
    //         setFollowState([...followState, user_id])
    //     }
    // }
    //follow Api call
    const followUserFunction = async (value) => {
        let role = await AsyncStorage.getItem('role')
        dispatch(followApiCall(value, userid, role))
    }
    //unfollow Api call
    const unfollowUserFunction = async (value) => {
        dispatch(unfollowApiCall(value, userid))
    }

    const likeListByUserFunction = async () => {
        let userId = await AsyncStorage.getItem('_id')

        var data = {
            user_id: profileData?._id
        }
        var response = await fetch(getLikesByUserUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()
        // console.log("Profile likes================== => ", res)
        setLikes(res.data)
    }

    const followUnfollowButtonChangeFunction = () => {
        if (buttonText == 'Follow') {
            // alert("lol")
            setButtonText('Following')
            followUserFunction(profileData?._id)
        } else if (buttonText == 'Following') {
            setButtonText('Follow')
            unfollowUserFunction(profileData?._id)
        }
    }

    const accountList = [
        {
            key:'1',
            name: 'Harashment and Cyberbullying',
        },
        {
            key:'2',
            name: 'Inappropriate content/Post on profile',
        },
        {
            key:'3',
            name: 'Fake News/Name/Account',
        },
        {
            key:'4',
            name: 'Others',
        },
        {
            key:'5',
            name: 'Block',
        },
    ]

    const account = () => {
        return accountList.map((item) => {
            return(
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Octicons name='arrow-right' size={widthToDp(4.7)} color={'grey'}/>
                        <Text style={{color:'#292929',fontSize:widthToDp(4),paddingLeft:widthToDp(2)}}>{item.name}</Text>
                    </View>
                    <RadioButton 
                        value= "checked"
                        status={ checked==item.key ? 'checked' : 'unchecked' }
                        onPress={() => setChecked(item.key)}
                        uncheckedColor="black"
                        color="#240471"
                    />
                </View>
            )
        })
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
            
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', height: heightToDp('15%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('2.5%') }}>
                                <TouchableOpacity onPress={() => setShowReport(true)?setModalVisible(false):setModalVisible(false)} style={{flexDirection:'row',alignItems:'center'}}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('4%'), width: widthToDp('8.5%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <ReportIcon
                                            name='report'
                                            size={15}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{color:'black',fontSize:widthToDp(4.5),paddingLeft:widthToDp(2)}}>Report this Account</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => shareLink()}
                                style={{flexDirection:'row',alignItems:'center',marginTop:heightToDp('1.5%')}}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('4%'), width: widthToDp('8.5%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <AntDesign
                                            name='link'
                                            size={15}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{color:'black',fontSize:widthToDp(4.5),paddingLeft:widthToDp(2)}}>Share Profile Link</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={showReport}
                onRequestClose={() => {
                    setShowReport(!showReport);
                }}
            >
                <TouchableOpacity
                    onPress={() => setShowReport(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', height: heightToDp('42%'), width: widthToDp('90%'), borderRadius: 20,padding: widthToDp(4)}}>
                        
                            <Text style={{color:'#292929',fontSize:widthToDp(5)}}>Please Specify the reason for reporting account</Text>

                            {account()}
                            
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:heightToDp(2)}}>
                                <TouchableOpacity onPress={() => setCartVisible(true)?setShowReport(false):setShowReport(false)} style={{width:widthToDp(20),height:heightToDp(5),backgroundColor:'#240471',alignItems:'center',justifyContent:'center',borderRadius: widthToDp(4)}}>
                                    <Text style={{color:'#fff'}}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
            
            <Modal
                animationType='fade'
                transparent={true}
                visible={cartVisible}
                onRequestClose={() => {
                    setCartVisible(!cartVisible);
                }}
            >
                <TouchableOpacity
                    onPress={() => setCartVisible(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', width: widthToDp('85%'), borderRadius: 20, alignItems:'center',padding:widthToDp(4)}}>
                            <Text style={{color:'#292929',fontSize:widthToDp(4.5),textAlign:'center'}}>Thank you for submitting report and will notify you of our action after reviewing your report</Text>
                            {/* <TouchableOpacity onPress={() => setCartVisible(false)} style={{width:widthToDp(15),height:heightToDp(5),backgroundColor:'#240471',borderRadius:widthToDp(2),alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:widthToDp(4.5)}}>Ok</Text>
                            </TouchableOpacity> */}
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            <Header color="#131128" title={`${(profileData?.role).toUpperCase()} PROFILE`} />
            {
                profileData?.role === 'user' ?
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            <View>
                                <Image
                                    source={{ uri: `${profileData?.image}` }}
                                    style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 300, marginTop: heightToDp('3%'), marginLeft: widthToDp('3%') }}
                                />
                                <TouchableOpacity style={{ backgroundColor: '#4076E5', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('-5%'), marginLeft: widthToDp('25%'), justifyContent: 'center', alignItems: 'center' }}>
                                    <PencilIcon
                                        name='checkcircle'
                                        size={20}
                                        color={'white'}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <View style={{ width:widthToDp('55%'),marginLeft: widthToDp('6%'), marginTop: heightToDp('2%') }}>
                                    {/* <Text style={{ color: 'black', fontSize: heightToDp('3%') }}>{profileData?.name}</Text> */}
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                        <Text style={{ color: 'black', fontSize: heightToDp('3%') }}>{profileData?.name}</Text>
                                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection:'row',justifyContent: 'flex-end',paddingTop:heightToDp(1),elevation: widthToDp(1)}}>
                                            <Entypo name='dots-three-vertical' size={widthToDp(5.5)} color={'black'}/>
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity
                                    // onPress={() => Linking.openURL(
                                    //     `https://www.google.com/maps/dir/?api=1&origin=` +
                                    //     mylatitude +
                                    //     `,` +
                                    //     mylongitude +
                                    //     `&destination=` +
                                    //     latitude +
                                    //     `,` +
                                    //     longitude +
                                    //     `&travelmode=driving`
                                    // )}
                                    >
                                        <Text>
                                            {/* <DistanceCalculationComponent lat2={latitude} lon2={longitude} /> */}
                                            <Text style={{ color: '#8E99AF' }}>  {`${profileData?.city} ${profileData?.state}`}</Text>
                                        </Text>
                                    </TouchableOpacity>
                                    <Text style={{ color: '#8E99AF' }}>{profileData?.bio}</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        {/* {
                                            followState.followers.some(el => el == userid) ? <LinearGradient
                                                colors={['#4076E5', '#74AEF4']}
                                                start={{ x: 0, y: 1 }}
                                                end={{ x: 1, y: 1 }}
                                                style={{ borderRadius: 15, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', alignItems: 'center', marginTop: heightToDp('0.5%') }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => unfollowUserFunction(profileData?._id)}
                                                    style={{ height: heightToDp('5%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Following</Text>

                                                </TouchableOpacity>
                                            </LinearGradient> : <LinearGradient
                                                colors={['#4076E5', '#74AEF4']}
                                                start={{ x: 0, y: 1 }}
                                                end={{ x: 1, y: 1 }}
                                                style={{ borderRadius: 15, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', alignItems: 'center', marginTop: heightToDp('0.5%') }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => followUserFunction(profileData?._id)}
                                                    style={{ height: heightToDp('5%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Follow</Text>

                                                </TouchableOpacity>
                                            </LinearGradient>
                                        } */}
                                        <LinearGradient
                                            colors={['#4076E5', '#74AEF4']}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{ borderRadius: 15, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', alignItems: 'center', marginTop: heightToDp('0.5%') }}
                                        >
                                            <TouchableOpacity
                                                // onPress={() => followUserFunction(profileData?._id)}
                                                onPress={() => followUnfollowButtonChangeFunction()}
                                                style={{ height: heightToDp('5%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>{buttonText}</Text>

                                            </TouchableOpacity>
                                        </LinearGradient>
                                        {/* <FollowUnfollowExploreComponent item={followState} userid={userid} addFollowFunction={followUserFunction}
                                            removeFollowFunction={unfollowUserFunction} /> */}
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('ChatInboxScreen', { conversation_id: "", to_id: profileData?._id, to_name: profileData?.name, to_image: profileData?.image })}
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
                        </View>

                        <View style={{ backgroundColor: 'white', width: widthToDp('90%'), height: heightToDp('10%'), alignSelf: 'center', marginTop: heightToDp('3%'), marginBottom:heightToDp(2), borderRadius: 20, elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('LikedPostByUserScreen', { data: likes })}
                                style={{ width: widthToDp('20%') }}>
                                <Text style={{ color: 'black', fontSize: heightToDp('3%'), alignSelf: 'center' }}>{likes === undefined ? `` : likes.length}</Text>
                                <Text style={{ color: '#8E99AF', alignSelf: 'center' }}>Activity</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('FollowingScreen', { userId: profileData?._id })}

                                style={{ width: widthToDp('20%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black', fontSize: heightToDp('3%') }}>{profileData?.following?.length}</Text>
                                <Text style={{ color: '#8E99AF' }}>Following</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('FollowersListScreen', { userId: profileData?._id })}

                                style={{ width: widthToDp('20%') }}>
                                <Text style={{ color: 'black', fontSize: heightToDp('3%'), alignSelf: 'center' }}>{profileData?.followers?.length}</Text>
                                <Text style={{ color: '#8E99AF', alignSelf: 'center' }}>Followers</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ width: widthToDp('100%') }}>
                            <View style={{ height: heightToDp('7%'),flexDirection: 'row', width: widthToDp('100%'), justifyContent: 'space-between', alignItems: 'center',backgroundColor:'white',elevation:widthToDp(0.5)}}>
                                <Text style={{ color: 'black', fontSize: heightToDp('4%'), marginLeft: widthToDp('5%') }}>Posts</Text>
                                {/* <LocationIcon
                                    name='dots-three-horizontal'
                                    size={20}
                                    color={'black'}
                                    style={{ marginRight: widthToDp('5%') }}
                                /> */}
                            </View>

                            <FlatList
                                data={userPosts}
                                numColumns={3}
                                // style={{ alignSelf: 'center' }}
                                onRefresh={onRefresh}
                                refreshing={refreshing}
                                renderItem={({ item, key }) => {
                                    return (
                                        <>
                                            {
                                                item.postType == 'product' ? null : item.postType == 'promo' ? null :
                                                <TouchableOpacity
                                                    onPress={() => navigation.navigate('ProductDetailsScreen', { postData: item })}
                                                    style={{ height: heightToDp('16%'), width: widthToDp('30%'), marginLeft: widthToDp('2.5%'), marginTop: heightToDp('1%'),marginBottom:heightToDp(1)}}>
                                                    <Image
                                                        source={{ uri: item.image }}
                                                        style={{ height: heightToDp('16%'), width: widthToDp('30%'), borderRadius: 20 }}
                                                    />
                                                </TouchableOpacity>
                                            }
                                        </>
                                    )
                                }}
                            />
                        </View>
                    </> :
                    <>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                source={{ uri: `${profileData?.image}` }}
                                style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 10, marginTop: heightToDp('3%'), marginLeft: widthToDp('3%') }}
                            />

                            <View>
                                <View style={{ marginLeft: widthToDp('3%'), marginTop: heightToDp('3%') }}>
                                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                        <Text style={{ color: 'black', fontSize: heightToDp('3%') }}>{profileData?.name}</Text>
                                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection:'row',justifyContent: 'flex-end',paddingTop:heightToDp(1),elevation: widthToDp(1)}}>
                                            <Entypo name='dots-three-vertical' size={widthToDp(5.5)} color={'black'}/>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ borderWidth: 1, height: heightToDp('3%'), width: widthToDp('40%'), borderColor: 'black', borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginTop: heightToDp('0.5%') }}>
                                        <Text style={{ color: 'black', fontSize: heightToDp('1.3%') }}>{`${profileData?.productCategory} ${profileData?.natureOfBusiness}`}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(
                                            `https://www.google.com/maps/dir/?api=1&origin=` +
                                            mylatitude +
                                            `,` +
                                            mylongitude +
                                            `&destination=` +
                                            latitude +
                                            `,` +
                                            longitude +
                                            `&travelmode=driving`
                                        )}
                                        style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                        <LocationIcon
                                            name='location'
                                            size={12}
                                            color={'#707070'}
                                            style={{ marginTop: heightToDp('0.5%') }}
                                        />
                                        <DistanceCalculationComponent lat2={latitude} lon2={longitude} />
                                        <Text style={{ marginLeft: widthToDp('1%'), color: '#707070' }}>{`${profileData?.city} ${profileData?.state}`}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => Linking.openURL(`https://${profileData?.website}`)}

                                        style={{ flexDirection: 'row', marginTop: heightToDp('0.3%') }}>
                                        <LocationIcon
                                            name='globe'
                                            size={12}
                                            color={'#707070'}
                                            style={{ marginTop: heightToDp('0.5%') }}
                                        />
                                        <Text style={{ marginLeft: widthToDp('1.5%'), color: '#707070' }}>{profileData?.website}</Text>
                                    </TouchableOpacity>
                                    <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                        {/* {
                                            followState.followers.some(el => el == userid) ? <LinearGradient
                                                colors={['#4076E5', '#74AEF4']}
                                                start={{ x: 0, y: 1 }}
                                                end={{ x: 1, y: 1 }}
                                                style={{ borderRadius: 15, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', alignItems: 'center', marginTop: heightToDp('0.5%') }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => unfollowUserFunction(profileData?._id)}
                                                    style={{ height: heightToDp('5%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Following</Text>

                                                </TouchableOpacity>
                                            </LinearGradient> : <LinearGradient
                                                colors={['#4076E5', '#74AEF4']}
                                                start={{ x: 0, y: 1 }}
                                                end={{ x: 1, y: 1 }}
                                                style={{ borderRadius: 15, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', alignItems: 'center', marginTop: heightToDp('0.5%') }}
                                            >
                                                <TouchableOpacity
                                                    onPress={() => followUserFunction(profileData?._id)}
                                                    style={{ height: heightToDp('5%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                    <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Follow</Text>

                                                </TouchableOpacity>
                                            </LinearGradient>
                                        } */}

                                        <LinearGradient
                                            colors={['#4076E5', '#74AEF4']}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{ borderRadius: 15, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', alignItems: 'center', marginTop: heightToDp('0.5%') }}
                                        >
                                            <TouchableOpacity
                                                // onPress={() => followUserFunction(profileData?._id)}
                                                onPress={() => followUnfollowButtonChangeFunction()}
                                                style={{ height: heightToDp('5%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>{buttonText}</Text>

                                            </TouchableOpacity>
                                        </LinearGradient>

                                        <LinearGradient
                                            colors={['#67C401', '#7BFE6E']}
                                            start={{ x: 0, y: 1 }}
                                            end={{ x: 1, y: 1 }}
                                            style={{ borderRadius: 15, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', alignItems: 'center', marginLeft: widthToDp('2%') }}
                                        >
                                            <TouchableOpacity
                                                style={{ height: heightToDp('5%'), width: widthToDp('25%'), borderRadius: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                                <Text style={{ fontSize: heightToDp('1.8%'), color: 'white', }} onPress={() => Linking.openURL(`https://wa.me/+91${profileData?.phoneNumber}`)}>Whatsapp</Text>
                                                <WhatsappIcon
                                                    name='whatsapp'
                                                    size={15}
                                                    color={'white'}
                                                    style={{ marginLeft: widthToDp('2%') }}
                                                />
                                            </TouchableOpacity>
                                        </LinearGradient>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: 'white', width: widthToDp('90%'), height: heightToDp('10%'), alignSelf: 'center', marginTop: heightToDp('2%'), borderRadius: 20, elevation: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('LikedPostByUserScreen', { data: likes })}
                                style={{ width: widthToDp('20%'), alignSelf: 'center' }}>
                                <Text style={{ color: 'black', fontSize: heightToDp('3%'), alignSelf: 'center' }}>{likes === undefined ? `` : likes.length}</Text>
                                <Text style={{ color: '#8E99AF', alignSelf: 'center' }}>Activity</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('FollowingScreen', { userId: profileData?._id })}

                                style={{ width: widthToDp('20%'), alignSelf: 'center' }}>
                                <Text style={{ color: 'black', fontSize: heightToDp('3%'), alignSelf: 'center' }}>{profileData?.following?.length}</Text>
                                <Text style={{ color: '#8E99AF', alignSelf: 'center' }}>Following</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('FollowersListScreen', { userId: profileData?._id })}

                                style={{ width: widthToDp('20%') }}>
                                <Text style={{ color: 'black', fontSize: heightToDp('3%'), alignSelf: 'center' }}>{profileData?.followers?.length}</Text>
                                <Text style={{ color: '#8E99AF', alignSelf: 'center' }}>Followers</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: 'white', height: heightToDp('8%'), width: widthToDp('100%'), justifyContent: 'center', elevation: 5,marginTop:heightToDp('0.5%') }}>
                            <View style={{ flexDirection: 'row',  justifyContent: 'space-evenly', alignItems: 'center' }}>
                                <TouchableOpacity
                                    onPress={() => setTab('posts')}
                                    style={{ width: widthToDp('25%'),height:'100%' }}>
                                    <Text style={{ color: 'black', fontSize: heightToDp('2.5%') }}>Posts</Text>
                                    {
                                        tab == 'posts' ? <View style={{ backgroundColor: 'blue', width: widthToDp('14%'), height: heightToDp('0.2%') }}></View> : null
                                    }
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setTab('products')}
                                    style={{ marginLeft: widthToDp('6%'), width: widthToDp('25%') }}>
                                    <Text style={{ color: 'black', fontSize: heightToDp('2.5%') }}>Products</Text>
                                    {
                                        tab == 'products' ?
                                            <View style={{ backgroundColor: 'blue', width: widthToDp('22%'), height: heightToDp('0.2%') }}></View>
                                            : null
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                <View style={{width: '100%'}}>
                    {
                        tab === 'posts' ? <FlatList
                        data={postsAndProds}
                        numColumns={3}
                        scrollEnabled={false}
                        renderItem={({ item, key }) => {
                            
                            return (
                                <>
                                    <TouchableOpacity
                                            onPress={() => navigation.navigate('ProductDetailsScreen', { postData: item })}
                                        >
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{ height: heightToDp('15%'), width: widthToDp('30%'), marginLeft: widthToDp('2.5%'), marginTop: heightToDp('1.5%'), borderRadius: 15 }} />
                                        </TouchableOpacity>
                                </>
                            )
                        }}
                    /> : <FlatList
                    data={postsAndProds}
                    numColumns={3}
                    scrollEnabled={false}
                    renderItem={({ item, key }) => {
                        return (
                            <>
                                <TouchableOpacity
                                        onPress={() => navigation.navigate('ProductDetailsScreen', { postData: item })}
                                    >
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ height: heightToDp('15%'), width: widthToDp('30%'), marginLeft: widthToDp('2.5%'), marginTop: heightToDp('1.5%'), borderRadius: 15 }} />
                                    </TouchableOpacity>
                            </>
                        )
                    }}
                />
                    }
                    
                </View>
                {/* {
                    tab == 'posts'?
                    <View>
                        <FlatList
                            data={filteredArr}
                            numColumns={3}
                            scrollEnabled={false}
                            renderItem={({ item, key }) => {

                                return (
                                    <>
                                        {
                                            item.postType == 'product' ? null : item.postType == 'promo' ? null : <TouchableOpacity
                                                onPress={() => navigation.navigate('ProductDetailsScreen', { postData: item })}
                                                style={{backgroundColor: '#f00', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                            >
                                                <Image
                                                    source={{uri: 'https://i.picsum.photos/id/719/200/300.jpg?hmac=ROd_JjwPBNsmDhuN2yXu9bdtg0T4Nyl1iYA0WDXYpxM'}}
                                                    // source={{ uri: item.image }}
                                                    style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 15 }} 
                                                />
                                            </TouchableOpacity>
                                        }
                                    </>
                                )
                            }}
                        />
                    </View>
                    :
                    <View>
                        <FlatList
                            data={filteredArr}
                            numColumns={3}
                            scrollEnabled={false}
                            renderItem={({ item, key }) => {
                                return (
                                    <>
                                        {
                                            item.postType == 'product' ? <TouchableOpacity
                                                onPress={() => navigation.navigate('ProductDetailsScreen', { postData: item })}
                                            >
                                                <Image
                                                    source={{ uri: item.image }}
                                                    style={{ height: heightToDp('15%'), width: widthToDp('25%'), marginLeft: widthToDp('2.5%'), marginTop: heightToDp('1.5%'), borderRadius: 15 }} />
                                            </TouchableOpacity> : null
                                        }
                                    </>
                                )
                            }}
                        />
                    </View>
                } */}
                        {/* <View style={{ marginTop: heightToDp('50%'), backgroundColor: '#00f'}}></View> */}
                    </>
            }
        </ScrollView>
    )
}


