import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { useIsFocused } from '@react-navigation/native';
import { getAllPostsApiCall } from '../store/getAllPosts-slice'
import Entypo from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ExplorePostLikeUnlike from '../components/ExplorePostLikeUnlike'
import { removePostLikeApiCall } from '../store/removePostLike-slice'
import Header2 from '../components/Header2'
import {getRelatedPostsUrl} from '../api/apiConstant'
import { RadioButton } from 'react-native-paper'
import Octicons from 'react-native-vector-icons/Octicons'
import ReportIcon from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { addPostLikeApiCall } from '../store/addPostLike-slice'

export default ExploreTrendingScreen = ({ navigation, route }) => {

    const [userid, setuserId] = useState('')
    const [ hashData, setHashData ] = useState(undefined)
    const { profileData } = route.params
    const [modalVisible, setModalVisible] = useState(false);
    const [ showReport, setShowReport ] = useState(false)
    const [ cartVisible, setCartVisible ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const [ modalSort, setModalSort ] = useState(false)
    const [temState, setTempState] = useState(false)
    const [role, setRole] = useState('')


    // const a = props.route.params.hashId

    // defining dispatch from redux
    const dispatch = useDispatch()
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            getAllPostsFunction()
            settingUserIdFunction()
            setTempState(true)
        }
    }, [isFocused])
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

    useEffect(() => {
        async function showHashData(){
            console.log("hsdhfchsdvhv => ", profileData._id)
            try {
                var data={
                    hashId: profileData._id
                }
                var response = await fetch(getRelatedPostsUrl,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                var responseJson = await response.json()
                
                setHashData(responseJson.data)
                console.log("hashData ======>>>",responseJson.data)
            } catch (error) {
                console.log(error)
            }
        }

        showHashData()
        // console.log("profileData>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>",profileData)
    },[])
    
    // console.log("Bibhu =========>>>>",postList.data)

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

    const sortByDate = () => {
        let s = [...hashData]
        let sortedByDate = s.sort((a, b) => a.createdAt - b.createdAt)
        setHashData([...sortedByDate])
        setModalSort(false)
    }

    const sortByLikes = () => {
        let s = [...hashData]
        let sortedByLike = s.sort((a, b) => a.likes.length - b.likes.length)
        setHashData([...sortedByLike])
        setModalSort(false)
    }


    return (
        <View style={{ flex: 1, width:'100%' }}>

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalSort}
                onRequestClose={() => {
                    setModalSort(!modalSort);
                }}
            >
                <TouchableOpacity
                    onPress={() => setModalSort(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', height: heightToDp('15%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <TouchableOpacity onPress={sortByDate} style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('2.5%')}}>
                                <Text style={{color: 'black'}}>Sort By - Date</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={sortByLikes} style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('2.5%')}}>
                                <Text style={{color: 'black'}}>Sort By - Likes</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
                
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
                                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:heightToDp('1.5%')}}>
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
                        <View style={{ backgroundColor: 'white', height: heightToDp('40%'), width: widthToDp('90%'), borderRadius: 20,padding: widthToDp(4)}}>
                        
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

            <Header2 />
            <FlatList
                data={hashData === undefined ? [] : hashData}
                numColumns={2}
                extraData={temState}
                renderItem={({ item, key }) => {
                    return (
                        <>
                            {
                                item.postType == 'promo' ? null : 
                                <TouchableOpacity onPress={() => navigation.navigate('ProductDetailsScreen', { postData: item })}
                                    style={{ height: heightToDp('20%'),width: widthToDp('48%'), marginLeft: widthToDp('1.5%'), marginTop: heightToDp('0.5%'),marginBottom: heightToDp('0.5%') }}>
                                    <ImageBackground
                                        source={{ uri: item?.image }}
                                        style={{ height: heightToDp('20%'),width: widthToDp('48%')}}
                                    >
                                        <TouchableOpacity onPress={() => setModalVisible(true)} style={{flexDirection:'row',justifyContent: 'flex-end',paddingTop:heightToDp(1)}}>
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
            <View style={{width: '100%', bottom: 0, height: heightToDp('7%'), flexDirection: 'row', justifyContent: 'flex-end', position: 'absolute', bottom: 25, right: 25}}>
                <TouchableOpacity
                    onPress={() => {
                        setModalSort(true)
                    }}
                >
                    <View style={{backgroundColor: '#000', height: heightToDp('7%'), width: widthToDp('14.5%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name='sort' color='#fff' size={heightToDp(3)}/>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}