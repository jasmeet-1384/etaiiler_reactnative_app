import React, { useState, useEffect, useRef } from 'react'
import { View, Text, Linking, Image, FlatList, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, ToastAndroid, ImageBackground , Share } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import ShareIcon from 'react-native-vector-icons/AntDesign'
import DotIcon from 'react-native-vector-icons/Entypo'
import CloseIcon from 'react-native-vector-icons/AntDesign'
import ThreeDotsIcon from 'react-native-vector-icons/Entypo'
import LocationIcon from 'react-native-vector-icons/Entypo'
import ChatIcon from 'react-native-vector-icons/Ionicons'
import WhatsappIcon from 'react-native-vector-icons/FontAwesome'
import Header2 from '../components/Header2'
import ReadMore from '@fawazahmed/react-native-read-more'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPostsApiCall } from '../store/getAllPosts-slice'
import { addPostLikeApiCall } from '../store/addPostLike-slice'
import { removePostLikeApiCall } from '../store/removePostLike-slice'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import FloatingButton from '../components/FloatingButton'
import PostLikeUnlike from '../components/PostLikeUnlike'
import PostShare from '../components/PostShare'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import { addHidePostUrl, getHiddenPostsUrl, reportPostsUrl, searchProfileUrl, sharePostsUrl } from '../api/apiConstant'
import SharedNameAndOthers from '../components/SharedNameAndOthers'
import HomeScreenModalComponent from '../components/HomeScreenModalComponent'
import HomeScreenDistanceComponent from '../components/HomeScreenDistanceComponent'
import PromoCardsComponent from '../components/PromoCardsComponent'
import { useScrollToTop } from '@react-navigation/native'
import { DoubleTapComponent } from '../components/DoubleTapComponent'
import { getAllHomePostsFetch } from '../api/GetAllPostsApi'
// import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';

let lastPress = 0;

export default HomeScreen = ({ navigation }) => {

    const isFocused = useIsFocused();


    // defining dispatch from redux
    const dispatch = useDispatch()
    const flatListRef = useRef(null)
    useScrollToTop(flatListRef)
    const [heartIconName, setHeartIconName] = useState('hearto')
    const [userid, setuserId] = useState('')
    const [role, setRole] = useState('')
    const [shared, setShared] = useState('')
    const [flatListData, setFlatListData] = useState([])
    const [temState, setTempState] = useState(false)
    const [isFetching, setisFetching] = useState(false)
    const [hiddenPosts, setHiddenPosts] = useState([])
    // const postList = useSelector((state) => state.getAllPostsDetails.getAllPostsData)
    const [postList,setPostList] = useState(undefined)

    const generateLink = async(item) => {
        try {
            const link = await dynamicLinks().buildShortLink({
                link : `https://haastag.page.link/share?product=${item}`,
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

    const shareLink = async(item) => {
        const getLink = await generateLink(item)
        try {
            Share.share({
                message : getLink,
            })
        } catch (error) {
            console.log("share error",error)
        }
    }

    useEffect(() => {
        let callPostApi = async ()=>{
            console.log("posts api called")

            let posts=await getAllHomePostsFetch()
            setPostList(posts)
        }

        callPostApi()
    }, [])


    useEffect(() => {
        if (isFocused) {
            getAllPostsFunction()
            setTempState(true)
        }
    }, [isFocused])
    //call get all posts api
    const getAllPostsFunction = () => {
        dispatch(getAllPostsApiCall())
        getHiddenPostDetailsFunction()
        settingUserIdFunction()
        setisFetching(false)
    }

    const getHiddenPostDetailsFunction = async () => {
        try {
            let user_id = await AsyncStorage.getItem('_id')
            let role = await AsyncStorage.getItem('role')
            var data = {
                user_id: user_id,
            }
            var response = await fetch(getHiddenPostsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            // setSearchResult(responseJson.data)
            // setHiddenPosts(responseJson.data)
            for (let i = 0; i < responseJson.data.length; i++) {
                setHiddenPosts([...hiddenPosts, responseJson.data[i].postId])
            }
            // console.log(responseJson.data[0].postId, "<...............Hidddeeeennnnnnnnnn")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }
    //set user id
    const settingUserIdFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        let role = await AsyncStorage.getItem('role')
        setuserId(user_id)
        setRole(role)
    }
    // add post like api
    const addPostLikeFunction = async (value) => {
        let user_id = await AsyncStorage.getItem('_id')
        let role = await AsyncStorage.getItem('role')
        dispatch(addPostLikeApiCall(value, user_id, role))
        getAllPostsFunction()
        setTempState(false)
    }
    // remove post like api
    const removePostLikeFunction = async (value, index) => {
        let user_id = await AsyncStorage.getItem('_id')
        dispatch(removePostLikeApiCall(value, user_id))
        getAllPostsFunction()
        setTempState(true)
    }

    const onRefresh = () => {
        setisFetching(true)
        getAllPostsFunction()
    }

    const sharePostFunction = async (value) => {
        try {
            let user_id = await AsyncStorage.getItem('_id')
            let role = await AsyncStorage.getItem('role')
            var data = {
                user_id: user_id,
                postId: value,
                role: role
            }
            var response = await fetch(sharePostsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            // setSearchResult(responseJson.data)
            setShared('shared')
            console.log(responseJson, "<...............")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }

    const hidePostFunction = async (value) => {
        try {
            let user_id = await AsyncStorage.getItem('_id')
            let role = await AsyncStorage.getItem('role')
            var data = {
                user_id: user_id,
                postId: value,
                role: role
            }
            var response = await fetch(addHidePostUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            // setSearchResult(responseJson.data)
            getHiddenPostDetailsFunction()
            console.log(responseJson, "<...............")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }

    const reportPostFunction = async (user_id, postId, postedBy, remarks) => {
        try {
            var data = {
                user_id: user_id,
                postId: postId,
                postedBy: postedBy,
                remarks: remarks
            }
            var response = await fetch(reportPostsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            ToastAndroid.show("Report Submitted", ToastAndroid.LONG)
            // setSearchResult(responseJson.data)
            // getHiddenPostDetailsFunction()
            console.log(responseJson.data, "<...............REPORTTTTTTTTTTTTTTTTTTTTTTTTTT")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }

    const scrollToTop = () => {
        flatListRef.current.scrollToOffset({ animated: true, offset: 0 })
    }

    const onDoublePress = () => {
        const time = new Date().getTime();
        const delta = time - lastPress;

        const DOUBLE_PRESS_DELAY = 400;
        if (delta < DOUBLE_PRESS_DELAY) {
            // Success double press
            console.log('double press');


        }
        lastPress = time;
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
            <Header2 />
            {
                postList?.data === undefined ? <View style={{ height: heightToDp('100%'), width: widthToDp('100%'), justifyContent: 'center' }}>

                    <ActivityIndicatorComponent size="large" color="blue" />
                </View> :
                    <FlatList
                        data={postList.data}
                        contentContainerStyle={{ paddingBottom: heightToDp('4%') }}
                        keyExtractor={(item) => item._id.toString()}
                        extraData={temState}
                        ref={flatListRef}
                        onRefresh={() => onRefresh()}
                        refreshing={isFetching}
                        renderItem={({ item, index }) => {
                            // console.log('HashTags ===========================>>>',item?.hashTags)
                            return (
                                <>
                                    {
                                        item.role == 'user' ?
                                            <View style={{ backgroundColor: 'white', width: widthToDp('100%'), alignItems: 'center' }}>
                                                {
                                                    hiddenPosts.includes(item._id) ? null :
                                                        <>
                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: heightToDp('16%'), width: widthToDp('95%'), alignItems: 'center' }}>
                                                                <TouchableOpacity onPress={() => item?.user_id[0]?._id === userid ? navigation.navigate('Profile') : navigation.navigate('ExploreDetailsScreen', { profileData: item?.user_id[0] })}>
                                                                    <Image
                                                                        source={{ uri: `${item?.user_id[0]?.image}` }}
                                                                        style={{ height: heightToDp('12%'), width: widthToDp('25%'), borderRadius: 200 }}
                                                                    />
                                                                </TouchableOpacity>
                                                                <View style={{ backgroundColor: 'white', height: heightToDp('12%'), width: widthToDp('60%'), marginLeft: widthToDp('2%'), justifyContent: 'center' }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => item?.user_id[0]?._id === userid ? navigation.navigate('Profile') : navigation.navigate('ExploreDetailsScreen', { profileData: item?.user_id[0] })}
                                                                    >
                                                                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: heightToDp('2.5%') }}>{item?.user_id[0]?.name}</Text>
                                                                    </TouchableOpacity>
                                                                    <HomeScreenDistanceComponent phoneNumber={item?.user_id[0]?.phoneNumber} role={item?.user_id[0]?.role} item={item} />

                                                                    <Text style={{ marginLeft: widthToDp('0.5%'), color: 'black', marginTop: heightToDp('0.5%') }}>{new Date(item?.createdAt).toString().split(' G')[0]}</Text>
                                                                    {
                                                                        item?.share?.length <= 0 ? <Text style={{ color: 'black' }}></Text> : <SharedNameAndOthers postDetails={item?._id} />
                                                                    }
                                                                </View>
                                                                <HomeScreenModalComponent postDetails={item} hidePostFunction={hidePostFunction} userId={userid} reportPostFunction={reportPostFunction} shareLink={() => shareLink(item._id)}/>
                                                            </View>

                                                            <View
                                                                onStartShouldSetResponder={(evt) => onDoublePress()}
                                                                style={{ height: heightToDp('50%'), width: widthToDp('95%'), borderRadius: 20 }}
                                                            >
                                                                <Image
                                                                    source={{ uri: item?.image }}
                                                                    style={{ height: heightToDp('50%'), width: widthToDp('95%'),borderRadius: 20, resizeMode:'contain' }}
                                                                />
                                                            </View>
                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: heightToDp('5%'), width: widthToDp('100%'), justifyContent: 'space-evenly', alignItems: 'center' }}>

                                                                <PostLikeUnlike item={item} addPostLikeFunction={addPostLikeFunction}
                                                                    removePostLikeFunction={removePostLikeFunction} userid={userid} />


                                                                {/* <TouchableOpacity
                                                                style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}

                                                                onPress={() => navigation.navigate('LikeListScreen', { postId: item._id })}
                                                            >
                                                                <Text style={{ color: 'gray' }}>{item.likes.length}</Text>
                                                            </TouchableOpacity> */}
                                                                <ChatIcon
                                                                    name='chatbubble-outline'
                                                                    size={20}
                                                                    color={'black'}
                                                                />
                                                                <TouchableOpacity
                                                                    style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}

                                                                    onPress={() => navigation.navigate('CommentsScreen', { postDetails: item })}
                                                                >
                                                                    <Text style={{ color: 'gray' }}>{item?.comments?.length}</Text>
                                                                </TouchableOpacity>

                                                                <PostShare
                                                                    item={item}
                                                                    addShareFunction={sharePostFunction}
                                                                    userid={userid}
                                                                />
                                                                {/* <TouchableOpacity
                                                                onPress={() => navigation.navigate('ShareListScreen', { postDetails: item })}
                                                                style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
                                                            >
                                                                <Text style={{ color: 'gray' }}>{item.share.length}</Text>
                                                            </TouchableOpacity> */}
                                                                <ShareIcon
                                                                    name='user'
                                                                    size={20}
                                                                    color={'black'}
                                                                />
                                                                <TouchableOpacity
                                                                    onPress={() => navigation.navigate('TagListScreen', { postDetails: item })}
                                                                    style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
                                                                >
                                                                    <Text style={{ color: 'gray' }}>{item.tags == undefined ? 0 : item?.tags?.length}</Text>
                                                                </TouchableOpacity>

                                                            </View>
                                                            <View style={{ width: '100%', backgroundColor: '#fff', flex: 1 }}>
                                                                <View style={{ width: widthToDp('100%'), flexDirection: 'row', marginTop: heightToDp('2%'), justifyContent: 'flex-start' }}>
                                                                    <View style={{ width: widthToDp('90%'), marginLeft: widthToDp('4%'), flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                                                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item?.user_id[0]?.name} </Text>
                                                                        <ReadMore numberOfLines={2} style={{ color: 'black' }} seeMoreStyle={{ color: 'gray', fontWeight: 'bold' }} seeLessStyle={{ color: 'gray', fontWeight: 'bold' }}>
                                                                            {
                                                                                item?.description
                                                                            }
                                                                        </ReadMore>
                                                                        <View style={{flexDirection: 'row'}}>
                                                                        {
                                                                            item?.hashTags && item?.hashTags.map(e => {
                                                                                // console.log("dfhvjhdfh ====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", item)
                                                                                return (
                                                                                    <TouchableOpacity onPress={() => navigation.navigate(item?.hashTags?'ExploreHashtag':'ExploreDetailsScreen',{profileData: {...item, _id: e}})}>
                                                                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>#{e}{' '}</Text>
                                                                                    </TouchableOpacity>
                                                                                )
                                                                            })
                                                                        }
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </>
                                                }
                                            </View> :
                                            <>
                                                {
                                                    item?.homeScreen == false ? null : hiddenPosts.includes(item?._id) ? null : item?.homeScreen == true ?
                                                        <PromoCardsComponent item={item} /> : <>
                                                            <View style={{ backgroundColor: 'white', width: widthToDp('100%'), marginTop: heightToDp('3%') }}>
                                                                <View style={{ flexDirection: 'row' }}>
                                                                    <TouchableOpacity
                                                                        onPress={() => item?.user_id[0]?._id === userid ? navigation.navigate('Profile') : navigation.navigate('ExploreDetailsScreen', { profileData: item?.user_id[0] })}
                                                                    >

                                                                        <Image
                                                                            source={{ uri: `${item?.user_id[0]?.image}` }}
                                                                            style={{ height: heightToDp('12%'), width: widthToDp('25%'), borderRadius: 200, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                                                                        />
                                                                    </TouchableOpacity>
                                                                    <View style={{ marginLeft: widthToDp('5%'), marginTop: heightToDp('0%'), width: widthToDp('55%') }}>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <TouchableOpacity
                                                                                onPress={() => item?.user_id[0]?._id === userid ? navigation.navigate('Profile') : navigation.navigate('ExploreDetailsScreen', { profileData: item?.user_id[0] })}
                                                                            >
                                                                                {/* {console.log("name ================================================>",item?.user_id[0]?.name)} */}
                                                                                <Text style={{ color: 'black', fontWeight: 'bold', fontSize: heightToDp('2.5%') }}>{item?.user_id[0]?.name}</Text>

                                                                            </TouchableOpacity>
                                                                            <LinearGradient
                                                                                colors={['#67C401', '#7BFE6E']}
                                                                                start={{ x: 0, y: 1 }}
                                                                                end={{ x: 1, y: 1 }}
                                                                                style={{ borderRadius: 200, width: widthToDp('6%'), height: heightToDp('3%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: widthToDp('3%'), marginTop: heightToDp('0.5%') }}
                                                                            >
                                                                                <TouchableOpacity style={{ width: widthToDp('6%'), height: heightToDp('3%'), justifyContent: 'center', alignItems: 'center' }} onPress={() => Linking.openURL(`https://wa.me/+91${item?.user_id[0]?.phoneNumber}`)}>
                                                                                    <WhatsappIcon
                                                                                        name='whatsapp'
                                                                                        size={15}
                                                                                        color={'white'}
                                                                                        style={{ marginLeft: widthToDp('0%') }}
                                                                                    />
                                                                                </TouchableOpacity>
                                                                            </LinearGradient>

                                                                        </View>
                                                                        <View style={{ borderWidth: 1, height: heightToDp('3%'), width: widthToDp('40%'), borderColor: 'black', borderRadius: 7, justifyContent: 'center', alignItems: 'center', marginTop: heightToDp('0.5%') }}>
                                                                            <Text style={{ color: 'black', fontSize: heightToDp('1.3%') }}>{`${item?.user_id[0]?.productCategory}  ${item?.user_id[0]?.natureOfBusiness}`}</Text>
                                                                        </View>
                                                                        <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>

                                                                            <HomeScreenDistanceComponent phoneNumber={item?.user_id[0]?.phoneNumber} role={item?.user_id[0]?.role} item={item} />

                                                                        </View>
                                                                        <View style={{ flexDirection: 'row' }}>
                                                                            <Text style={{ marginLeft: widthToDp('0.5%'), color: 'black', marginTop: heightToDp('0.5%') }}>{new Date(item?.createdAt).toString().split(' G')[0]}</Text>
                                                                            {
                                                                                item?.sponsored == true ?
                                                                                    <Text style={{ marginLeft: widthToDp('2%'), color: 'gray', marginTop: heightToDp('0.5%') }}>Sponsored</Text>
                                                                                    : null
                                                                            }
                                                                        </View>
                                                                        {
                                                                            item?.share?.length <= 0 ? <Text style={{ color: 'black' }}></Text> : <SharedNameAndOthers postDetails={item?._id} />
                                                                        }
                                                                    </View>

                                                                    <HomeScreenModalComponent postDetails={item} hidePostFunction={hidePostFunction} shareLink={() => shareLink(item._id)}/>
                                                                </View>
                                                                <View style={{ height: heightToDp('48%'), width: widthToDp('93%'), borderRadius: 20, alignSelf: 'center' }}>
                                                                    <ImageBackground
                                                                        source={{ uri: `${item?.image}` }}
                                                                        style={{ height: heightToDp('48%'), width: widthToDp('93%'), alignSelf: 'center',resizeMode:'contain' }}
                                                                        imageStyle={{ borderRadius: 20 }}
                                                                    >
                                                                        {
                                                                            item?.user_id[0]?.website == "" ? null :
                                                                                <LinearGradient
                                                                                    colors={['#4076E5', '#74AEF4']}
                                                                                    start={{ x: 0, y: 1 }}
                                                                                    end={{ x: 1, y: 1 }}
                                                                                    style={{ height: heightToDp('4%'), width: widthToDp('30%'), alignSelf: 'flex-end', bottom: 20, position: 'absolute', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                                                                >
                                                                                    <LocationIcon
                                                                                        name='globe'
                                                                                        size={12}
                                                                                        color={'#fff'}
                                                                                        style={{ marginRight: widthToDp('1%') }}
                                                                                    />
                                                                                    <TouchableOpacity

                                                                                        onPress={() => Linking.openURL(`https://${item?.user_id[0]?.website}`)}
                                                                                    >
                                                                                        <Text style={{ color: 'white' }}>Explore Now</Text>
                                                                                    </TouchableOpacity>
                                                                                </LinearGradient>

                                                                        }
                                                                    </ImageBackground>
                                                                </View>
                                                            </View>
                                                            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'space-evenly', alignItems: 'center', width: widthToDp('100%') }}>
                                                                {/* {
                                                                    item.likes.some(el => el.likedBy === userid) ? <HeartIcon
                                                                        name={'heart'}
                                                                        size={20}
                                                                        color={'red'}
                                                                        onPress={() => removePostLikeFunction(item._id)}
                                                                    /> : <HeartIcon
                                                                        name={'hearto'}
                                                                        size={20}
                                                                        color={'red'}
                                                                        onPress={() => addPostLikeFunction(item._id)}
                                                                    />
                                                                } */}
                                                                <PostLikeUnlike item={item} addPostLikeFunction={addPostLikeFunction}
                                                                    removePostLikeFunction={removePostLikeFunction} userid={userid} />

                                                                {/* <TouchableOpacity
                                                                    style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
                                                                    onPress={() => navigation.navigate('LikeListScreen', { postId: item._id })}
                                                                >
                                                                    <Text style={{ color: 'gray' }}>{item.likes.length}</Text>
                                                                </TouchableOpacity> */}
                                                                <ChatIcon
                                                                    name='chatbubble-outline'
                                                                    size={20}
                                                                    color={'black'}
                                                                />
                                                                <TouchableOpacity
                                                                    style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}

                                                                    onPress={() => navigation.navigate('CommentsScreen', { postDetails: item })}
                                                                >
                                                                    <Text style={{ color: 'gray' }}>{item?.comments?.length}</Text>
                                                                </TouchableOpacity>
                                                                <PostShare
                                                                    item={item}
                                                                    addShareFunction={sharePostFunction}
                                                                    userid={userid}
                                                                />
                                                                {/* <TouchableOpacity
                                                                    onPress={() => navigation.navigate('ShareListScreen', { postDetails: item })}
                                                                    style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
                                                                >
                                                                    <Text style={{ color: 'gray' }}>{item.share.length}</Text>
                                                                </TouchableOpacity> */}
                                                                <ShareIcon
                                                                    name='user'
                                                                    size={20}
                                                                    color={'black'}
                                                                />
                                                                <TouchableOpacity
                                                                    style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
                                                                    onPress={() => navigation.navigate('TagListScreen', { postDetails: item })}

                                                                >
                                                                    <Text style={{ color: 'gray' }}>{item?.tags == undefined ? 0 : item?.tags?.length}</Text>
                                                                </TouchableOpacity>
                                                            </View>
                                                            {/* <View style={{ flexDirection: 'row', width: widthToDp('80%'), marginLeft: widthToDp('4%'), marginRight: widthToDp('4%') }}>
                                                                <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.user_id.name} </Text>
                                                                <ReadMore numberOfLines={2} style={{ color: 'black', alignSelf: 'center' }} seeMoreStyle={{ color: 'gray', fontWeight: 'bold' }}>
                                                                    {
                                                                        item.description
                                                                    }
                                                                </ReadMore>
                                                            </View> */}
                                                            <View style={{ width: '100%', backgroundColor: '#fff', flex: 1 }}>
                                                                <View style={{ width: widthToDp('100%'), flexDirection: 'row', marginTop: heightToDp('2%'), justifyContent: 'flex-start' }}>
                                                                    <View style={{ width: widthToDp('90%'), marginLeft: widthToDp('4%'), flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                                                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{item?.user_id[0]?.name} </Text>
                                                                        <ReadMore numberOfLines={2} style={{ color: 'black' }} seeMoreStyle={{ color: 'gray', fontWeight: 'bold' }} seeLessStyle={{ color: 'gray', fontWeight: 'bold' }}>
                                                                            {
                                                                                item?.description
                                                                            }
                                                                        </ReadMore>
                                                                        <View style={{flexDirection: 'row'}}>
                                                                        {
                                                                            item?.hashTags && item?.hashTags.map(e => {
                                                                                // console.log("dfhvjhdfh ====================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ", item)
                                                                                return (
                                                                                    <TouchableOpacity onPress={() => navigation.navigate(item?.hashTags?'ExploreHashtag':'ExploreDetailsScreen',{profileData: {...item, _id: e}})}>
                                                                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>#{e}{' '}</Text>
                                                                                    </TouchableOpacity>
                                                                                )
                                                                            })
                                                                        }
                                                                        </View>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </>
                                                }
                                            </>
                                    }
                                </>
                            )
                        }}
                    />
            }


            <FloatingButton userRole={role} />
        </View>
    )
}