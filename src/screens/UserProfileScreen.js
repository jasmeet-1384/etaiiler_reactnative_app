import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, RefreshControl } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import PencilIcon from 'react-native-vector-icons/EvilIcons'
import LinearGradient from 'react-native-linear-gradient'
import axios from 'axios'
import { profileUrl, getLikesByUserUrl, deletePostsUrl } from '../api/apiConstant'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native';
import { getOwnPostsFetch } from '../api/GetAllPostsApi'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import LocationIcon from 'react-native-vector-icons/Entypo'
import Entypo from 'react-native-vector-icons/Entypo'
import ReportIcon from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Octicons from 'react-native-vector-icons/Octicons'
import { RadioButton } from 'react-native-paper'


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default UserProfileScreen = ({ navigation }) => {

    const [profileDetails, setProfileDetails] = useState('')
    const [userPosts, setUserPosts] = useState('')
    const [likes, setLikes] = useState('')
    const [modalDetails, setModalDetails] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);
    const [ cartVisible, setCartVisible ] = useState(false)
    const [ showReport, setShowReport ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const [ message, setMessage ] = useState(false)

    const onRefresh = () => {
        getProfileData()
        likeListByUserFunction()
    }
    useEffect(() => {

        if (isFocused) {
            getProfileData()
            likeListByUserFunction()
        }
    }, [isFocused])
    const getProfileData = async () => {
        let userId = await AsyncStorage.getItem('_id')
        var response = await fetch(profileUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: userId
            })
        })
        const res = await response.json()
        console.log("Profile res => ", res)
        setProfileDetails(res.data)

        const a = await getOwnPostsFetch(userId)
        console.log("Posts => ", a)
        setUserPosts(a.data.userPosts)
        // console.log("user Postssssssssssssssssssss -----------------------=====>>>>",a.data.userPosts)
    }
    const likeListByUserFunction = async () => {
        let userId = await AsyncStorage.getItem('_id')

        var data = {
            user_id: userId
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

    const longPressFunction = (item) => {
        setModalDetails(item)
        setModalVisible(true)
        console.log(item, "<<<<<<<<<<<<<<<<<<<<<<<<<<")
    }

    const deletePost = async (value) => {
        try {
            var data = {
                postId: value
            }
            var response = await fetch(deletePostsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            getProfileData()
            setModalVisible(false)

            console.log(responseJson.data, "<...............")
        } catch (err) {
            console.log(err, "<====== ")
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
            <Header color="#131128" title="USER PROFILE" />
            {
                likes === '' ? <View style={{ height: heightToDp('100%'), width: widthToDp('100%'), justifyContent: 'center' }}>
                    <ActivityIndicatorComponent size="large" color="blue" />
                </View> : <>
                    <View style={{ flexDirection: 'row' }}>
                        <View>
                            <Image
                                source={{ uri: profileDetails.image === '' ? "https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png" : `${profileDetails.image}` }}
                                style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 300, marginTop: heightToDp('3%'), marginLeft: widthToDp('3%') }}
                            />
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditProfileScreen', { profileData: profileDetails })}
                                style={{ backgroundColor: '#4076E5', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('-5%'), marginLeft: widthToDp('25%'), justifyContent: 'center', alignItems: 'center' }}>
                                <PencilIcon
                                    name='pencil'
                                    size={25}
                                    color={'white'}
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={{  width:widthToDp('55%'),marginLeft: widthToDp('4%'), marginTop: heightToDp('2%') }}>
                                {/* <Text style={{ color: 'black', fontSize: heightToDp('3%') }}>{profileDetails.name}</Text> */}
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                                    <Text style={{ color: 'black', fontSize: heightToDp('2.5%') }}>{profileDetails.name}</Text>
                                    <TouchableOpacity onPress={() => setCartVisible(true)} style={{flexDirection:'row',justifyContent: 'flex-end',paddingTop:heightToDp(1),elevation: widthToDp(1)}}>
                                        <Entypo name='dots-three-vertical' size={widthToDp(5.5)} color={'black'}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{ color: '#8E99AF' }}>{`${profileDetails.city} ${profileDetails.state}`}</Text>
                                <Text style={{ color: '#8E99AF', width: '60%' }}>{profileDetails.bio}</Text>
                                {/* <Text style={{ color: '#8E99AF' }}>{profileDetails.addressLine2}</Text> */}
                                {/* <LinearGradient
                            colors={['#4076E5', '#74AEF4']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{ borderRadius: 15, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', alignItems: 'center',marginTop:heightToDp('0.5%') }}
                        >
                            <TouchableOpacity
                                style={{ height: heightToDp('5%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Follow</Text>
                                
                            </TouchableOpacity>
                        </LinearGradient> */}
                            </View>
                        </View>
                    </View>

                    <View style={{ backgroundColor: 'white', width: widthToDp('90%'), height: heightToDp('10%'), alignSelf: 'center', marginTop: heightToDp('3%'), borderRadius: 20, elevation: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('LikedPostByUserScreen', { data: likes })}
                            style={{ width: widthToDp('20%') }}>
                            <Text style={{ color: 'black', fontSize: heightToDp('3%'), alignSelf: 'center' }}>{likes === undefined ? `` : likes.length}</Text>
                            <Text style={{ color: '#8E99AF', alignSelf: 'center' }}>Activity</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('FollowingScreen', { userId: profileDetails._id })}
                            style={{ width: widthToDp('20%'), alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontSize: heightToDp('3%') }}>{profileDetails.following == undefined ? `` : profileDetails.following.length}</Text>
                            <Text style={{ color: '#8E99AF' }}>Following</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('FollowersListScreen', { userId: profileDetails._id })}
                            style={{ width: widthToDp('20%') }}>
                            <Text style={{ color: 'black', fontSize: heightToDp('3%'), alignSelf: 'center' }}>{profileDetails.followers == undefined ? `` : profileDetails.followers.length}</Text>
                            <Text style={{ color: '#8E99AF', alignSelf: 'center' }}>Followers</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ width: widthToDp('100%'),marginTop:heightToDp(1) }}>
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
                                                style={{ height: heightToDp('16%'), width: widthToDp('30%'), marginLeft: widthToDp('2.5%'), marginTop: heightToDp('1%'),marginBottom:heightToDp(1)}}
                                                onLongPress={() => longPressFunction(item)}
                                            >
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
                </>
            }


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
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback >
                        <View style={{ backgroundColor: 'white', height: heightToDp('30%'), width: widthToDp('85%'), borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: heightToDp('3%') }}>Confirm Delete</Text>
                            <View style={{ flexDirection: 'row', height: heightToDp('10%'), width: widthToDp('65%'), justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: modalDetails.image }}
                                    style={{ height: heightToDp('7%'), width: widthToDp('15%'), borderRadius: 200 }}
                                />
                                <View style={{ width: widthToDp('45%'), backgroundColor: 'white' }}>
                                    <Text>
                                        <Text style={{ color: 'gray', width: widthToDp('30%') }}>{`Are you sure you wish to delete this post`}</Text>
                                        {/* <Text style={{ color: 'gray', width: widthToDp('30%'), fontWeight: 'bold' }}>{`${item.user_id.name}`}</Text> */}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ backgroundColor: 'white', height: heightToDp('11%'), width: widthToDp('68%'), alignItems: 'center', justifyContent: 'space-between' }}>


                                <LinearGradient
                                    colors={['#4076E5', '#74AEF4']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ height: heightToDp('4.5%'), width: widthToDp('36%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <TouchableOpacity
                                        onPress={() => deletePost(modalDetails._id)}
                                        style={{ height: heightToDp('4%'), width: widthToDp('35%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Text style={{ color: 'white' }}>OK</Text>
                                    </TouchableOpacity>
                                </LinearGradient>


                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={{ height: heightToDp('5%'), width: widthToDp('30%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ color: 'gray' }}>CANCEL</Text>
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
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', height: heightToDp('15%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('2.5%') }}>
                                {/* <TouchableOpacity onPress={() => {setShowReport(true) ; setCartVisible(false)}} style={{flexDirection:'row',alignItems:'center'}}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('4%'), width: widthToDp('8.5%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <ReportIcon
                                            name='report'
                                            size={15}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{color:'black',fontSize:widthToDp(4.5),paddingLeft:widthToDp(2)}}>Report this Account</Text>
                                </TouchableOpacity> */}
                                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:heightToDp('1.5%')}}>
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
                        <View style={{ backgroundColor: 'white', width: widthToDp('90%'), borderRadius: 20,padding: widthToDp(4)}}>
                        
                            <Text style={{color:'#292929',fontSize:widthToDp(5)}}>Please Specify the reason for reporting posts:</Text>

                            {account()}
                            
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:heightToDp(2)}}>
                                <TouchableOpacity onPress={() => {setMessage(true) ; setShowReport(false)}} style={{width:widthToDp(20),height:heightToDp(5),backgroundColor:'#240471',alignItems:'center',justifyContent:'center',borderRadius: widthToDp(4)}}>
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
                visible={message}
                onRequestClose={() => {
                    setMessage(!message);
                }}
            >
                <TouchableOpacity
                    onPress={() => setMessage(false)}
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
        </View>
    )
}