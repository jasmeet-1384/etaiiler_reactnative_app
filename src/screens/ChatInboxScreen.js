import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ScrollView, Keyboard } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import { GiftedChat } from 'react-native-gifted-chat'
import ChatInboxHeader from '../components/ChatInboxHeader'
import { io } from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux'
import { getMyMessagesApiCall } from '../store/getMyMessages-slice'
import { getMyMessagesUrl, apiProtocol, rootApiUrl, getParticularConversationIdUrl } from '../api/apiConstant'
import SendIcon from 'react-native-vector-icons/Feather'
import { addChatUrl } from '../api/apiConstant'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default ChatInboxScreen = ({ route }) => {
    const { conversation_id, to_id, to_name, to_image } = route.params
    const dispatch = useDispatch()
    // const socket = io('http://localhost:5001/')
    // const socketRef = useRef();
    const scrollRef = useRef()
    const [messages, setMessages] = useState([]);
    const [typedmessages, setTypedMessages] = useState('');
    const [user_id, setUserId] = useState('');
    const [conversationId, setconversationId] = useState('');
    const msgList = useSelector((state) => state.getMyMessages.getMyMessagesDetails)
    useEffect(() => {
        if (conversation_id === '') {
            getConvoIdFunction()
        } else {
            setconversationId(conversation_id)
        }
    }, [])

    useEffect(() => {
        // getMessagesEverySecondFunction()
        const timer = setInterval(async () => {
            await getMyMessagesFunction()
            console.log("CAlling function after exit")
        }, 3000)
        setUserIdFunction()
        return () => clearInterval(timer);
    }, [conversationId])

    const getConvoIdFunction = async () => {
        try {
            var userId = await AsyncStorage.getItem('_id')
            var data = {
                from: userId,
                to: to_id
            }
            var response = await fetch(getParticularConversationIdUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setconversationId(responseJson.data[0]._id)
            console.log(responseJson.data[0]._id, "getting convoId for first time")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }

    const getMessagesEverySecondFunction = async () => {

        useEffect(() => {
           
        }, [])
    }
    // useEffect(() => {
    //     // socketRef.current = io(`${apiProtocol}${rootApiUrl}`)

    //     const timer = setInterval(async () => {
    //         await getMyMessagesFunction()
    //     }, 5000)

    //     setUserIdFunction()
    //     return () => clearInterval(timer);
    // }, [])

    useEffect(() => {
        console.log("Messages => ", messages)
    }, [messages])

    // useEffect(() => {
    //     socketRef.current.on("message received", (newMessageReceived) => {
    //         console.log("While receiving ======>   ", newMessageReceived)
    //         var data = {
    //             from: newMessageReceived.from,
    //             to: newMessageReceived.to,
    //             message: newMessageReceived.message,
    //             conversation_id: newMessageReceived.room_id
    //         }
    //         setMessages([...messages, data])
    //     })
    // }, [])

    const getMyMessagesFunction = async () => {
        console.log("Getting messages")
        let userId = await AsyncStorage.getItem('_id')
        var data = {
            conversation_id: conversationId,
            userId: userId
        }
        var response = await fetch(getMyMessagesUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        console.log("All Messages >>", responseJson.data)
        setMessages(responseJson.data.reverse())
        // socketRef.current.emit('join chat', conversation_id)
        console.log(conversationId, "<=================")
    }
    const setUserIdFunction = async () => {
        let value = await AsyncStorage.getItem('_id')
        setUserId(value)
    }
    //send message on post api call
    const sendMessageFunction = async () => {
        let user_id = await AsyncStorage.getItem("_id")

        var data = {
            from: user_id,
            to: to_id,
            text: typedmessages
        }

        var socketdata = {
            from: user_id,
            to: to_id,
            message: typedmessages,
            room_id: conversationId
        }



        // console.log("While sending ======>   ", socketdata)
        // socketRef.current.emit("new message", socketdata)
        setMessages([data, ...messages])
        setTypedMessages('')
        Keyboard.dismiss()

        var response = await fetch(addChatUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })



        var responseJson = await response.json()
        if (conversationId == "") {
            // setconversationId(responseJson.data._id)
            console.log(responseJson.data, "<=========CONVERSATION ID")

        } else {
            console.log("conversation id present")
        }
        console.log(responseJson.data, "<=========MESSAGE SEND")

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ChatInboxHeader name={to_name} image={to_image} />
            <FlatList
                inverted
                // ref={(t) => scrollRef = t}
                data={messages}
                style={{ marginBottom: heightToDp('10%') }}
                // on
                renderItem={({ item, key }) => {
                    return (
                        <>
                            <View style={{ width: widthToDp('100%') }}>
                                {
                                    item.from === user_id ? <View style={{ height: heightToDp('5%'), width: widthToDp('30%'), backgroundColor: '#2A18D1', marginTop: heightToDp('2%'), justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 200, borderTopLeftRadius: 200, borderTopRightRadius: 200, borderBottomRightRadius: 50, alignSelf: 'flex-end' }}>
                                        <Text style={{ color: 'white' }}>{item.text}</Text>
                                    </View> : <View style={{ height: heightToDp('5%'), width: widthToDp('30%'), backgroundColor: '#2A18D1', marginTop: heightToDp('2%'), justifyContent: 'center', alignItems: 'center', borderBottomLeftRadius: 40, borderTopLeftRadius: 200, borderTopRightRadius: 200, borderBottomRightRadius: 200, alignSelf: 'flex-start' }}>
                                        <Text style={{ color: 'white' }}>{item.text}</Text>
                                    </View>
                                }
                            </View>
                        </>
                    )
                }}
            />

            <View style={{ backgroundColor: 'gray', height: heightToDp('8%'), width: widthToDp('100%'), justifyContent: 'center', bottom: 0, position: 'absolute' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: widthToDp('90%'), alignSelf: 'center' }}>
                    <TextInput
                        placeholder='Write something ..'
                        placeholderTextColor={'black'}
                        style={{ width: widthToDp('80%'), alignSelf: 'center' }}
                        onChangeText={(text) => setTypedMessages(text)}
                        value={typedmessages}
                    />
                    <TouchableOpacity
                        onPress={() => sendMessageFunction()}
                        style={{ height: heightToDp('10%'), width: widthToDp('20%'), justifyContent: 'center' }}
                    >
                        <SendIcon
                            name='send'
                            size={25}
                        //onPress={() => sendMessageFunction()}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
