import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import ShareIcon from 'react-native-vector-icons/Entypo'
import UploadIcon from 'react-native-vector-icons/Feather'
import { heightToDp, widthToDp } from './Responsive'
import { useNavigation } from '@react-navigation/native';

const PostShare = ({ item, addShareFunction, userid }) => {
    // console.log("share Item -------------------------------===============>>>>>",item)

    const [shareColor, setShareColor] = useState('notSet')
    const [modalVisible, setModalVisible] = useState(false);
    const [shares, setShares] = useState(Number(item.share.length))
    const [shareContents, setShareContents] = useState(item.share)
    const navigation = useNavigation();

    const postShareFunction = () => {
        setShareColor('red')
        addShareFunction(item._id)
        setModalVisible(false)
        setShares(shares+1)
        setShareContents([...shareContents,{sharedBy : userid}])
    }
    return (
        <View style={{ flexDirection: 'row' }}>
            <View
                style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
            >
                {
                    shareContents.some(el => el.sharedBy === userid) ? <ShareIcon
                        name={'share'}
                        size={23}
                        color={'red'}
                        onPress={() => { console.log("no share") }}
                    /> : <ShareIcon
                        name={'share'}
                        size={23}
                        color={shareColor == 'notSet' ? 'black' : 'red'}
                        //onPress={() => { setShareColor('red'); addShareFunction(item._id) }}
                        onPress={() => setModalVisible(true)}
                    />
                }
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate('ShareListScreen', { postDetails: item })}
                style={{ width: widthToDp('10%'), backgroundColor: 'white', height: heightToDp('5%'), justifyContent: 'center', alignItems: 'center' }}
            >
                <Text style={{ color: 'gray' }}>{shares}</Text>
            </TouchableOpacity>
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
                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: heightToDp('3%') }}>Confirm Sharing</Text>
                            <View style={{ flexDirection: 'row', height: heightToDp('10%'), width: widthToDp('65%'), justifyContent: 'space-between', alignItems: 'center' }}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={{ height: heightToDp('7%'), width: widthToDp('15%'), borderRadius: 200 }}
                                />
                                <View style={{ width: widthToDp('45%'), backgroundColor: 'white',alignItems:'center',justifyContent:'center' }}>
                                    <Text>
                                        <Text style={{ color: 'gray', width: widthToDp('30%') }}>{`Are you sure you wish to share this post from `}</Text>
                                        <Text style={{ color: 'gray', width: widthToDp('30%'), fontWeight: 'bold' }}>{`${item?.user_id[0]?.name}`}</Text>
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
                                        onPress={() => postShareFunction()}
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
        </View>
    )
}

export default PostShare