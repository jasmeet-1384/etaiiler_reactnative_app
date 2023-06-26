import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { getMyConversationApiCall } from '../store/getMyConversation-slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { io } from 'socket.io-client'
import { apiProtocol, rootApiUrl } from '../api/apiConstant'
import LinearGradient from 'react-native-linear-gradient'
import { useIsFocused } from '@react-navigation/native';

export default InboxScreen = ({ navigation }) => {
    const isFocused = useIsFocused();

    const dispatch = useDispatch()
    const [user, setUser] = useState('')
    const [unreadCounter, setUnreadCounter] = useState(0)
    let socket
    const convoList = useSelector((state) => state.getMyConversation.getMyConversationDetails)
    console.log(convoList.data, "<============== CONVOLIST")
    console.log(convoList.unreadCounts, "<============== unreadCounts")
    useEffect(() => {
        async function getUser() {
            const a = await AsyncStorage.getItem('_id')
            setUser(a)
        }

        getUser()
    }, [])
    useEffect(() => {
        getMyConversationFunction()
        // socket = io(`${apiProtocol}${rootApiUrl}`)
        // connectWithSocketFunction()
    }, [isFocused])
    // get my conversation api
    const getMyConversationFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        dispatch(getMyConversationApiCall(user_id))
    }
    //connect with socket function
    const connectWithSocketFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        socket.emit("setup", user_id)
        socket.on("connection", () => getMyConversationFunction())
    }
    const CHATLIST = [{ seen: true }, { seen: false }, { seen: false }, { seen: true }, { seen: true }, { seen: true }]

    const renderEmpltyComponent = () => {
        return (
            <View style={{ height: heightToDp('90%'), justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'gray' }}>No messages in inbox</Text>
            </View>
        )
    }

    const returnCount = (item) => {

        console.log("item>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        console.log(item)
        console.log(convoList.unreadCounts)
        let count = convoList.unreadCounts.filter((e) => e.conversation_id === item._id)
        console.log(count)
        console.log(count[0].unreadLength)
        let countOfUnread = Number(count[0].unreadLength)
        console.log("item>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", countOfUnread)
        let node = []



        return (
            <>
                {
                    countOfUnread > 0 ? <LinearGradient
                        colors={['#4076E5', '#74AEF4']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 20, width: widthToDp('6%'), height: heightToDp('3%'), marginLeft: heightToDp('6%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                    > 
                    <Text>{countOfUnread}</Text>
                    </LinearGradient> : null
                }
            </>
        )

    }

    return (
        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: '#131127', width: widthToDp('100%'), height: heightToDp('6%'), alignItems: 'center', flexDirection: 'row' }}>
                <PencilIcon
                    name='left'
                    size={30}
                    color={'white'}
                    style={{ marginLeft: widthToDp('4%') }}
                    onPress={() => navigation.goBack()}
                />
                {/* <Text style={{ color: 'white', marginLeft: widthToDp('4%'), fontWeight: 'bold' }}>username</Text> */}
            </View>

            <Text style={{ color: 'black', fontSize: heightToDp('4%'), marginLeft: widthToDp('5%') }}>Messages</Text>

            <FlatList
                data={convoList.data === undefined ? [] : convoList.data}
                ListEmptyComponent={renderEmpltyComponent}
                renderItem={({ item, key }) => {
                    return (
                        <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ChatInboxScreen', { conversation_id: item._id, to_id: user === item.users[1]._id ? item.users[0]._id : item.users[1]._id, to_name: user === item.users[1]._id ? item.users[0].name : item.users[1].name, to_image: user === item.users[1]._id ? item.users[0].image : item.users[1].image })}
                                style={{ flexDirection: 'row', height: heightToDp('7%'), width: widthToDp('100%'), alignItems: 'center' }}>
                                <Image
                                    source={{ uri: user === item.users[1]._id ? item.users[0].image : item.users[1].image }}
                                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ marginLeft: widthToDp('4%'), width: widthToDp('50%') }}>
                                        <Text style={{ color: 'black', fontWeight: 'bold' }}>{user === item.users[1]._id ? item.users[0].name : item.users[1].name}</Text>
                                        {
                                            item.read ? <Text style={{ color: 'gray', fontWeight: '400' }}>{item.recentMessage}</Text> : <Text style={{ color: 'gray', fontWeight: 'bold' }} numberOfLines={2}>{item.recentMessage}</Text>
                                        }
                                    </View>

                                    {
                                        returnCount(item)
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