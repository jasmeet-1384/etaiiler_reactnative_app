import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import SendIcon from 'react-native-vector-icons/Feather'
import ReadMore from '@fawazahmed/react-native-read-more'
import { addCommentApiCall } from '../store/addComment-slice'
import { getCommentApiCall } from '../store/getComment-slice'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentUrl } from '../api/apiConstant'



export default CommentsScreen = ({ route }) => {
    const { postDetails } = route.params
    // defining dispatch from redux
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [commentList, setCommentList] = useState([])
    const [animating, setanimating] = useState(true)
    // const commentList = useSelector((state) => state.getComment.getCommentDetails)
    // console.log(commentList, "<=== comment list")
    useEffect(() => {
        getCommentsFunction()
    }, [])
    const getCommentsFunction = async () => {
        try {
            var data = {
                postId: postDetails._id
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
            setanimating(false)
            console.log(responseJson.data, "<...............Comments")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }
    //comment on post api call
    const commentFunction = async () => {
        let user_id = await AsyncStorage.getItem("_id")
        let role = await AsyncStorage.getItem('role')
        let profileImage = await AsyncStorage.getItem('profileImage')
        let commentObject = {
            text: comment,
            user_id: {
                image: profileImage
            }
        }
        dispatch(addCommentApiCall(user_id, postDetails._id, comment, role))
        setCommentList([...commentList, commentObject])

        setComment('')
        Keyboard.dismiss()
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header color="#131128" title="Comments" />
            <View style={{ width: widthToDp('100%'), flexDirection: 'row', alignItems: 'center', marginTop: heightToDp('2%') }}>
                <Image
                    source={{ uri: `${postDetails.user_id.image}` }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                />
                <View style={{ flexDirection: 'row', width: widthToDp('60%'), marginLeft: widthToDp('4%'), marginRight: widthToDp('0%') }}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{postDetails.user_id.name} </Text>
                    <ReadMore numberOfLines={2} style={{ color: 'black', alignSelf: 'flex-start', width: widthToDp('41%') }} seeMoreStyle={{ color: 'gray', fontWeight: 'bold' }} >
                        {
                            postDetails.description
                        }
                    </ReadMore>
                </View>
            </View>
            {
                animating ? <View style={{ height: heightToDp('70%'), width: widthToDp('100%'), justifyContent: 'center' }}>
                    <ActivityIndicatorComponent size="large" color="blue" />
                </View> :
                    <FlatList
                        data={commentList}
                        contentContainerStyle={{ height: heightToDp('78%'), backgroundColor: 'white' }}
                        renderItem={({ item, key }) => {
                            return (
                                <>
                                    <View style={{ flexDirection: 'row', height: heightToDp('5%'), alignItems: 'center', marginTop: heightToDp('2%') }}>
                                        <Image
                                            source={{ uri: `${item.user_id.image}` }}
                                            style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('3%') }}
                                        />
                                        <View style={{ width: widthToDp('74%'), flexDirection: 'row' }}>
                                            <Text style={{ color: 'black', marginLeft: widthToDp('4%') }}>{item.text}</Text>
                                            {/* <Text style={{ color: 'gray', marginLeft: widthToDp('0%') }}>1w</Text> */}
                                        </View>
                                    </View>
                                </>
                            )
                        }}
                    />
            }
            <View style={{ backgroundColor: 'gray', height: heightToDp('8%'), width: widthToDp('100%'), justifyContent: 'center', bottom: 0, position: 'absolute' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: widthToDp('90%'), alignSelf: 'center' }}>
                    <TextInput
                        placeholder='Write something ..'
                        placeholderTextColor={'black'}
                        style={{ width: widthToDp('80%'), alignSelf: 'center' }}
                        onChangeText={(text) => setComment(text)}
                        value={comment}
                    />
                    <SendIcon
                        name='send'
                        size={25}
                        onPress={() => commentFunction()}
                    />
                </View>
            </View>
        </View>
    )
}