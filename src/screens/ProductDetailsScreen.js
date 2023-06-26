import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ToastAndroid, Keyboard, Modal, TouchableWithoutFeedback , Share } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import HeartIcon from 'react-native-vector-icons/AntDesign'
import ShareIcon from 'react-native-vector-icons/AntDesign'
import DotIcon from 'react-native-vector-icons/Entypo'
import LocationIcon from 'react-native-vector-icons/Entypo'
import ChatIcon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native';
import { addPostLikeApiCall } from '../store/addPostLike-slice'
import { removePostLikeApiCall } from '../store/removePostLike-slice'
import { addCommentApiCall } from '../store/addComment-slice'
import { getCommentApiCall } from '../store/getComment-slice'
import { useDispatch, useSelector } from 'react-redux'
import SendIcon from 'react-native-vector-icons/Feather'
import { getCommentUrl, sharePostsUrl } from '../api/apiConstant'
import PostLikeUnlike from '../components/PostLikeUnlike'
import SharedNameAndOthers from '../components/SharedNameAndOthers'
import PostShare from '../components/PostShare'
import ReadMore from '@fawazahmed/react-native-read-more'
import HomeScreenDistanceComponent from '../components/HomeScreenDistanceComponent'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import { RadioButton } from 'react-native-paper'
import ReportIcon from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import dynamicLinks from '@react-native-firebase/dynamic-links';

export default ProductDetailsScreen = ({ route, navigation }) => {
    // defining dispatch from redux
    const dispatch = useDispatch()
    const { postData } = route.params
    console.log(postData,"DUDUCHUSBOBOROBORO")
    const [userid, setuserId] = useState('')
    const [comments, setComments] = useState('')
    const [heartIcon, setHeartIcon] = useState('hearto')
    const [postLikes, setPostLikes] = useState(postData.likes.length)
    const [commentLength, setCommentLength] = useState(0)
    const [tempState, setTempState] = useState(false)
    const [commentList, setCommentList] = useState([])
    const [shared, setShared] = useState('')
    const isFocused = useIsFocused();
    // const commentList = useSelector((state) => state.getComment.getCommentDetails)
    const [modalVisible, setModalVisible] = useState(false);
    const [ showReport, setShowReport ] = useState(false)
    const [ cartVisible, setCartVisible ] = useState(false)
    const [ checked, setChecked ] = useState(false)

    useEffect(() => {
        if (isFocused) {
            getCommentsFunction()
            settingUserIdFunction()
        }
    }, [isFocused])

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
    const getCommentsFunction = async () => {
        try {
            var data = {
                postId: postData._id
            }
            var response = await fetch(getCommentUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setCommentList(responseJson.data)
            console.log(responseJson.data, "<...............Comments")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }
    //set user id
    const settingUserIdFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        postData.likes.includes(user_id) ? setHeartIcon('heart') : setHeartIcon('hearto')
        setPostLikes(postData.likes.length)
        setCommentLength(postData.comments.length)
        setuserId(user_id)
    }
    // add post like api
    const addPostLikeFunction = async (value) => {
        // ToastAndroid.show("Please go to home page to like post", ToastAndroid.LONG)
        let user_id = await AsyncStorage.getItem('_id')
        let role = await AsyncStorage.getItem('role')
        dispatch(addPostLikeApiCall(value, user_id, role))
        setHeartIcon('heart')
        setPostLikes(postData.likes.length + 1)
        // setTempState(true)

    }
    // remove post like api
    const removePostLikeFunction = async (value) => {
        // ToastAndroid.show("Please go to home page to unlike postsssssss", ToastAndroid.LONG)
        let user_id = await AsyncStorage.getItem('_id')
        dispatch(removePostLikeApiCall(value, user_id))
        setHeartIcon('hearto')
        setPostLikes(postData.likes.length - 1)
        // setTempState(false)
    }
    // //comment on post api call
    // const commentFunction = async () => {
    //     let user_id = await AsyncStorage.getItem("_id")
    //     let role = await AsyncStorage.getItem('role')
    //     dispatch(addCommentApiCall(user_id, postDetails._id, comment, role))
    //     setComment('')
    //     Keyboard.dismiss()
    //     dispatch(getCommentApiCall(postDetails._id))
    // }
    //comment on post api call
    const commentFunction = async () => {
        let user_id = await AsyncStorage.getItem("_id")
        let role = await AsyncStorage.getItem('role')
        let profileImage = await AsyncStorage.getItem('profileImage')
        let commentObject = {
            text: comments,
            user_id: {
                image: profileImage
            }
        }
        dispatch(addCommentApiCall(user_id, postData._id, comments, role))
        setCommentList([...commentList, commentObject])
        setCommentLength(commentLength + 1)
        setComments('')
        Keyboard.dismiss()
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
    console.log(postData, "<====productDetails")

    const accountList = [
        {
            key:'1',
            name: 'Spam and scams'
        },
        {
            key:'2',
            name: 'Sexually inappropriate'
        },
        {
            key:'3',
            name: 'Offensive'
        },
        {
            key:'4',
            name: 'Violence'
        },
        {
            key:'5',
            name: 'Prohibited content'
        },
        {
            key:'6',
            name: 'Fake news'
        },
        {
            key:'7',
            name: 'Abusive or hateful'
        },
        {
            key:'8',
            name: 'Political candidate or issue'
        },
        {
            key:'9',
            name: 'Something else'
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
                        status={ checked == item.key ? 'checked' : 'unchecked' }
                        onPress={() => setChecked(item.key)}
                        uncheckedColor="black"
                        color="#240471"
                    />
                </View>
            )
        })
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

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
                                <TouchableOpacity onPress={() => {setShowReport(true) ; setModalVisible(false)}} style={{flexDirection:'row',alignItems:'center'}}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('4%'), width: widthToDp('8.5%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <ReportIcon
                                            name='report'
                                            size={15}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{color:'black',fontSize:widthToDp(4.5),paddingLeft:widthToDp(2)}}>Report this Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => shareLink(postData._id)}
                                style={{flexDirection:'row',alignItems:'center',marginTop:heightToDp('1.5%')}}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('4%'), width: widthToDp('8.5%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <AntDesign
                                            name='link'
                                            size={15}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{color:'black',fontSize:widthToDp(4.5),paddingLeft:widthToDp(2)}}>Share Link</Text>
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
                        <View style={{ backgroundColor: 'white', width: widthToDp('90%'), borderRadius: 20,padding: widthToDp(4)}}>
                        
                            <Text style={{color:'#292929',fontSize:widthToDp(5)}}>Please Specify the reason for reporting posts:</Text>

                            {account()}
                            
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:heightToDp(2)}}>
                                <TouchableOpacity onPress={() => {setCartVisible(true) ; setShowReport(false)}} style={{width:widthToDp(20),height:heightToDp(5),backgroundColor:'#240471',alignItems:'center',justifyContent:'center',borderRadius: widthToDp(4)}}>
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

            <Header title="POST DETAILS" color="#131128" />
            {console.log(postData?.user_id[0]?.image, "<<<<<<<DDDDDDDDDDDDDDDDDDDDDDDD")}
             <View style={{ flexDirection: 'row', backgroundColor: 'white', height: heightToDp('16%'), width: widthToDp('95%'),alignItems:'center' }}>
                <TouchableOpacity onPress={() => postData.user_id[0]._id === userid ? navigation.navigate('Profile') : navigation.navigate('ExploreDetailsScreen', { profileData: postData.user_id[0] })}>
                    <Image
                        source={{ uri: `${postData?.user_id[0]?.image}` }}
                        style={{ height: heightToDp('12%'), width: widthToDp('25%'), borderRadius: 200 }}
                    />
                </TouchableOpacity>
                <View style={{ backgroundColor: 'white', height: heightToDp('12%'), width: widthToDp('60%'), marginLeft: widthToDp('2%'), justifyContent: 'center' }}>
                    <TouchableOpacity
                        onPress={() => postData.user_id[0]._id === userid ? navigation.navigate('Profile') : navigation.navigate('ExploreDetailsScreen', { profileData: postData.user_id[0] })}
                    >
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: heightToDp('2.5%') }}>{postData?.user_id[0]?.name}</Text>
                    </TouchableOpacity>
                    <HomeScreenDistanceComponent phoneNumber={postData?.user_id[0]?.phoneNumber} role={postData?.user_id[0]?.role} item={postData} />

                    <Text style={{ marginLeft: widthToDp('0.5%'), color: 'black', marginTop: heightToDp('0.5%') }}>{new Date(postData.createdAt).toString().split(' G')[0]}</Text>
                    {
                        postData.share.length <= 0 ? <Text style={{ color: 'black' }}></Text> : <SharedNameAndOthers postDetails={postData._id} />
                    }
                </View>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{paddingLeft:widthToDp(4),paddingBottom:widthToDp(5)}}>
                    <Entypo name='dots-three-vertical' size={widthToDp(5.5)} color={'#292929'}/>
                </TouchableOpacity>
            </View>

            <View
            >
                <Image
                    source={{ uri: postData.image }}
                    style={{ height: heightToDp('48%'), width: widthToDp('93%'), borderRadius: 20, alignSelf:'center' }}
                />
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', height: heightToDp('5%'), width: widthToDp('100%'), justifyContent: 'space-evenly', alignItems: 'center' }}>

                <PostLikeUnlike item={postData} addPostLikeFunction={addPostLikeFunction}
                    removePostLikeFunction={removePostLikeFunction} userid={userid} />

                <ChatIcon
                    name='chatbubble-outline'
                    size={20}
                    color={'black'}
                />
                <TouchableOpacity
                    style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}

                    onPress={() => navigation.navigate('CommentsScreen', { postDetails: postData })}
                >
                    <Text style={{ color: 'gray' }}>{postData.comments.length}</Text>
                </TouchableOpacity>

                <PostShare
                    item={postData}
                    addShareFunction={sharePostFunction}
                    userid={userid}
                />
              
                <ShareIcon
                    name='user'
                    size={20}
                    color={'black'}
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('TagListScreen', { postDetails: postData })}
                    style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
                >
                    <Text style={{ color: 'gray' }}>{postData.tags == undefined ? 0 : postData.tags.length}</Text>
                </TouchableOpacity>

            </View>
            <View style={{ width: '100%', backgroundColor: '#fff', flex: 1 }}>
                <View style={{ width: widthToDp('100%'), flexDirection: 'row', marginTop: heightToDp('2%'), justifyContent: 'flex-start' }}>
                    <View style={{ width: widthToDp('90%'), marginLeft: widthToDp('4%'), flex: 1, flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{postData?.user_id[0]?.name} </Text>
                        <ReadMore numberOfLines={2} style={{ color: 'black' }} seeMoreStyle={{ color: 'gray', fontWeight: 'bold' }} seeLessStyle={{ color: 'gray', fontWeight: 'bold' }}>
                            {
                                postData.description
                            }
                        </ReadMore>
                        <View style={{flexDirection: 'row'}}>
                        {
                            postData?.hashTags && postData?.hashTags.map(e => {
                                return (
                                    <TouchableOpacity onPress={() => navigation.navigate(postData?.hashTags?'ExploreHashtag':'ExploreDetailsScreen',{profileData: {...postData, _id: e}})}>
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>#{e}{' '}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        </View>
                    </View>
                </View>
            </View> 
        </View>
    )
}