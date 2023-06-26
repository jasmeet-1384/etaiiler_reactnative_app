import React, { useState } from 'react'
import { View, Text, Linking, Image, FlatList, TouchableOpacity, TextInput, Modal, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import DotIcon from 'react-native-vector-icons/Entypo'
import { heightToDp, widthToDp } from './Responsive'
import UploadIcon from 'react-native-vector-icons/Feather'
import ReportIcon from 'react-native-vector-icons/Octicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { followApiCall } from '../store/follow-slice'
import { unfollowApiCall } from '../store/unFollow-slice'
import LinearGradient from 'react-native-linear-gradient'
import ShareIcon from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import { RadioButton } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'

const HomeScreenModalComponent = ({ postDetails, hidePostFunction , reportPostFunction , userId, shareLink}) => {
    // defining dispatch from redux
    const dispatch = useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
    const [ cartVisible, setCartVisible ] = useState(false)
    const [ showReport, setShowReport ] = useState(false)
    const [ checked, setChecked ] = useState(false)
    const [details, setDetails] = useState({});
    const [followUnfollowText, setfollowUnfollowText] = useState('');
    const [reportReason, setReportReason] = useState('');
    const [removeFollowColumn, setRemoveFollowColumn] = useState(false)

    const setDetailsFunction = async (value) => {
        let userId = await AsyncStorage.getItem('_id')
        if (value.user_id._id == userId) {
            setRemoveFollowColumn(true)
        } else if (value?.user_id?.followers?.includes(userId)) {
            setfollowUnfollowText('Unfollow')
            setRemoveFollowColumn(false)
        } else {
            setfollowUnfollowText('Follow')
            setRemoveFollowColumn(false)
        }
        setModalVisible(true)
    }

    //follow Api call
    const followUnfollowFunction = async () => {
        let userId = await AsyncStorage.getItem('_id')
        let role = await AsyncStorage.getItem('role')
        if (followUnfollowText == 'Follow') {
            dispatch(followApiCall(postDetails.user_id._id, userId, role))
            setfollowUnfollowText('Unfollow')
        } else if (followUnfollowText == 'Unfollow') {
            dispatch(unfollowApiCall(postDetails.user_id._id, userId))
            setfollowUnfollowText('Follow')
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
        <>
            <DotIcon
                name='dots-three-vertical'
                color={'black'}
                size={20}
                style={{ marginLeft: widthToDp('0%'), marginTop: heightToDp('0%') }}
                onPress={() => setDetailsFunction(postDetails)}
            />

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
                    <TouchableWithoutFeedback >
                        <View style={{ backgroundColor: 'white', width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('2%'), marginBottom:heightToDp('2%') }}>
                                {
                                    removeFollowColumn == false ? <TouchableOpacity
                                        onPress={() => followUnfollowFunction()}
                                        style={{ flexDirection: 'row',  alignItems: 'center' }}>
                                        <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                            <UploadIcon
                                                name='user-x'
                                                size={20}
                                                color={'black'}
                                            />
                                        </View>
                                        <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>{followUnfollowText}</Text>
                                    </TouchableOpacity> : null
                                }
                                <TouchableOpacity
                                    onPress={() => { hidePostFunction(postDetails._id); setModalVisible(false) }}
                                    style={{ flexDirection: 'row',  alignItems: 'center', marginTop: heightToDp('2%') }}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <DotIcon
                                            name='sound-mute'
                                            size={20}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Hide Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                onPress={() => {setModalVisible(false) ; setModalVisible2(true)}}
                                style={{ flexDirection: 'row',  alignItems: 'center', marginTop: heightToDp('2%') }}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <ReportIcon
                                            name='report'
                                            size={20}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Report this Account</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={shareLink} style={{ flexDirection: 'row',  alignItems: 'center', marginTop: heightToDp('2%') }}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <AntDesign
                                            name='link'
                                            size={15}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Share Link</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            {/* <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(!modalVisible2);
                }}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible2(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback >
                        <View style={{ backgroundColor: 'white', height: heightToDp('30%'), width: widthToDp('85%'), borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: heightToDp('3%') }}>Confirm Report</Text>
                            <View style={{ flexDirection: 'row', height: heightToDp('10%'), width: widthToDp('65%'), justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: postDetails.image }}
                                    style={{ height: heightToDp('7%'), width: widthToDp('15%'), borderRadius: 200 }}
                                />
                                <View style={{ width: widthToDp('45%'), backgroundColor: 'white', height: heightToDp('4%') ,justifyContent:'center'}}>
                                    <Text>
                                        <Text style={{ color: 'gray', width: widthToDp('30%') }}>{`Please specify the reason for reporting `}</Text>
                                    </Text>
                                    <TextInput
                                    placeholder='type reason here...'
                                    placeholderTextColor={'gray'}
                                    style={{color:'black'}}
                                    onChangeText={(text) => setReportReason(text)}
                                    />
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
                                        onPress={() => {reportPostFunction(userId,postDetails._id,postDetails.user_id._id,reportReason) ; setModalVisible2(false)}}
                                        style={{ height: heightToDp('4%'), width: widthToDp('35%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}
                                    >
                                        <Text style={{ color: 'white' }}>OK</Text>
                                    </TouchableOpacity>
                                </LinearGradient>


                                <TouchableOpacity
                                    onPress={() => setModalVisible2(false)}
                                    style={{ height: heightToDp('5%'), width: widthToDp('30%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}
                                >
                                    <Text style={{ color: 'gray' }}>CANCEL</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal> */}

            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible2}
                onRequestClose={() => {
                    setModalVisible2(!modalVisible2);
                }}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible2(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', height: heightToDp('40%'), width: widthToDp('90%'), borderRadius: 20,padding: widthToDp(4)}}>
                        
                            <Text style={{color:'#292929',fontSize:widthToDp(5)}}>Please Specify the reason for reporting account</Text>

                            {account()}
                            
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:heightToDp(2)}}>
                                <TouchableOpacity onPress={() => setCartVisible(true)?setModalVisible2(false):setModalVisible2(false)} style={{width:widthToDp(20),height:heightToDp(5),backgroundColor:'#240471',alignItems:'center',justifyContent:'center',borderRadius: widthToDp(4)}}>
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
        </>
    )
}

export default HomeScreenModalComponent