import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { sendSupportMessage } from '../api/apiConstant'


export default SupportScreen = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'All our executives are busy at this moment, kindly drop a message or drop a mail on support@haastag.com.     Thank You !',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Customer Support',
                    avatar: '',
                },
            },
        ])
    }, [])

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        console.log(messages[0].text,"LLLLLLLLLL")
        addMsgToDbFunction(messages[0].text)
    }, [])

    const addMsgToDbFunction = async (value) => {
        try {
            var userId = await AsyncStorage.getItem('_id')
            var role = await AsyncStorage.getItem('role')
            var data = {
                user_id: userId,
                text: value,
                role: role
            }
            var response = await fetch(sendSupportMessage, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            console.log(responseJson, "<......MESSAGE SUPPORT.........")
        } catch (error) { console.log(error) }
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={messages => onSend(messages)}
                user={{
                    _id: 1,
                }}
                textInputProps={{style:{color:'black',width:widthToDp('80%')}}}
            />

        </View>
    )
}