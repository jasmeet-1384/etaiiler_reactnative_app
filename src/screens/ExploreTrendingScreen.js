import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Modal,TouchableWithoutFeedback } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { getAllPostsApiCall } from '../store/getAllPosts-slice'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import ReportIcon from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ExplorePostLikeUnlike from '../components/ExplorePostLikeUnlike'
import { removePostLikeApiCall } from '../store/removePostLike-slice'
import Header2 from '../components/Header2'
import { RadioButton } from 'react-native-paper'
import { addPostLikeApiCall } from '../store/addPostLike-slice'
import Share from 'react-native-share';

export default ExploreTrendingScreen = ({ navigation }) => {

    const [userid, setuserId] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [ showReport, setShowReport ] = useState(false)
    const [ cartVisible, setCartVisible ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const [temState, setTempState] = useState(false)

    // defining dispatch from redux
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    const postList = useSelector((state) => state.getAllPostsDetails.getAllPostsData)

    const shareLink = async() => {
        const shareOptions = {
            message: `https://www.google.com`
        }
        try {
            const shareResponse = await Share.open(shareOptions)
        } catch (error) {
            console.log("Error =>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",error)
        }
    }

    useEffect(() => {
        if (isFocused) {
            getAllPostsFunction()
            settingUserIdFunction()
            setTempState(true)
        }
    }, [isFocused])
    useEffect(() => {
    // console.log("Bibhu =========>>>>",postList.data)
        // console.log("postList",postList)
    },[postList])
    //call get all posts api
    const getAllPostsFunction = () => {
        dispatch(getAllPostsApiCall())
    }

    //set user id
    const settingUserIdFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        let role = await AsyncStorage.getItem('role')
        setuserId(user_id)
        // setRole(role)
    }
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
        <View style={{ flex: 1 }}>

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
                                    <Text style={{color:'black',fontSize:widthToDp(4.5),paddingLeft:widthToDp(2)}}>Report this Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={shareLink} style={{flexDirection:'row',alignItems:'center',marginTop:heightToDp('1.5%')}}>
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
                        <View style={{ backgroundColor: 'white',  width: widthToDp('90%'), borderRadius: 20,padding: widthToDp(4)}}>
                        
                            <Text style={{color:'#292929',fontSize:widthToDp(5)}}>Please Specify the reason for reporting posts:</Text>

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

            <FlatList
                data={postList.data === undefined ? [] : postList.data}
                numColumns={2}
                extraData={temState}
                renderItem={({ item, key }) => {
                    // console.log("exploreeeeeeeeeeee ========------------>>",item)
                    return (
                        <>
                            {
                                item.postType == 'promo' ? null : 
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetailsScreen', { postData: item })}
                                    style={{ height: heightToDp('20%'),width: widthToDp('48%'), marginLeft: widthToDp('1.5%'), marginTop: heightToDp('0.5%'),marginBottom: heightToDp('0.5%') }}>
                                    <ImageBackground
                                        source={{ uri: item.image }}
                                        style={{ height: heightToDp('20%'),width: widthToDp('48%')}}
                                    >
                                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection:'row',justifyContent: 'flex-end',paddingTop:heightToDp(1),elevation: widthToDp(1)}}>
                                            <Entypo name='dots-three-vertical' size={widthToDp(5.5)} color={'#fff'}/>
                                        </TouchableOpacity>
                                        <View style={{flex:1,justifyContent:'flex-end',paddingLeft:widthToDp(2),paddingRight:widthToDp(2)}}>
                                            
                                            <ExplorePostLikeUnlike item={item} addPostLikeFunction={addPostLikeFunction}
                                                removePostLikeFunction={removePostLikeFunction} userid={userid} />
                                           
                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            }
                        </>
                    )
                }}
            />
        </View>
    )
}