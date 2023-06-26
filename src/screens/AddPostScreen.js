import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ScrollView, ToastAndroid, Keyboard } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import LinearGradient from 'react-native-linear-gradient'
import { RNS3 } from 'react-native-aws3'
import { useDispatch, useSelector } from 'react-redux'
import { uploadImageToDBApiCall } from '../store/uploadImageToDB-slice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { uploadImageToS3 } from '../utilities/uploadAWS'
import { searchProfileUrl, searchHashUrl } from '../api/apiConstant'
import CrossIcon from 'react-native-vector-icons/Entypo'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'


export default AddPostScreen = ({ route }) => {
    const { imageDetails, postType } = route.params
    const [caption, setCaption] = useState('')
    const [tagName, setTagName] = useState('')
    const [hashName, setHashName] = useState('')
    const [role, setRole] = useState('')
    const [taggedId, setTaggedId] = useState([])
    const [inputFocus, setInputFocus] = useState(false)
    const [hashTagFocus, setHashTagFocus] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [searchHashResult, setSearchHashResult] = useState([])
    const [searchType, setSearchType] = useState('')
    const [peopleTagged, setPeopleTagged] = useState([])
    const [animating, setanimating] = useState(false)
    const [updateComponent, setUpdateComponent] = useState('yup')
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80')
    const dispatch = useDispatch()
    useEffect(() => {
        profileImageFunction()
    }, [])

    const profileImageFunction = async () => {
        let image = await AsyncStorage.getItem('profileImage')
        let role = await AsyncStorage.getItem('role')
        setProfileImage(image)
        setRole(role)
    }
    //upload image to s3 from react native function
    const imageUploadFunction = async () => {
        setanimating(true)
        if (caption.length < 10) {
            ToastAndroid.show("Minimum 10 characters of caption required",ToastAndroid.LONG)
            console.log(caption.length)
            setanimating(false)
        } else {
            let dat = await uploadImageToS3(imageDetails.path, 'post')
            console.log("AFter aws upload => ", dat)
            imageUploadDBFunction(dat)
        }
    }
    // upload image to mongoDB database
    const imageUploadDBFunction = async (value) => {
        setanimating(true)
        const user_id = await AsyncStorage.getItem('_id')
        const role = await AsyncStorage.getItem('role')
        if (postType == 'post') {
            dispatch(uploadImageToDBApiCall(user_id, value, caption, role, taggedId, "", hashName))
        } else if (postType == 'product') {
            dispatch(uploadImageToDBApiCall(user_id, value, caption, role, taggedId, "product", ""))
        }
    }
    //search text
    const searchText = async (value) => {
        try {
            setSearchType('text')
            setTagName(value)
            var data = {
                name: value
            }
            var response = await fetch(searchProfileUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setSearchResult(responseJson.data)
            console.log(responseJson, "<...............")
        } catch (err) {
            console.log(err, "<====== ")
        }

    }
    
    const searchHashTag = async (value) => {
        try {
            setSearchType('hash')
            setHashName(value)
            let allHashes = value.split('#')
            let hash = allHashes[allHashes.length - 1]
            var data = {
                name: hash
            }
            var response = await fetch(searchHashUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setSearchHashResult(responseJson.data)
            console.log(responseJson, "hash<...............")
        } catch (err) {
            console.log(err, "<====== ")
        }

    }
    //name select
    const selectname = (value, tagged_id) => {
        setTaggedId([...taggedId, tagged_id])
        let data = { name: value, taggedId: tagged_id }
        setTagName('')

        setPeopleTagged([...peopleTagged, data])
        Keyboard.dismiss()
    }
    //delete from the list
    const deleteTaggedPeopleFunction = (e) => {
        // let test = peopleTagged.splice(index, 1)
        // setPeopleTagged(test)
        // console.log(peopleTagged,"<<<<<<<?///////")
        let filteredArray = peopleTagged.filter(item => item !== e)
        setPeopleTagged(filteredArray)
        // console.log(filteredArray,"PEOPLE TAGGED")
    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header color="#131128" />
            {updateComponent == 'yup' ? null : null}
            <View style={{ backgroundColor: 'white', height: heightToDp('8%'), width: widthToDp('100%'), marginTop: heightToDp('2%'), alignItems: 'center', flexDirection: 'row' }}>
                <Image
                    source={{ uri: profileImage }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('3%') }}
                />
                <TextInput
                    placeholder='Write a caption ...'
                    placeholderTextColor={'black'}
                    style={{ color: 'black', width: widthToDp('65%'), marginLeft: widthToDp('4%') }}
                    onChangeText={(text) => setCaption(text)}
                />
                <Image
                    source={{ uri: imageDetails.path == '' ? 'https://www.ulcdn.net/images/products/338715/original/Madeleine_Floor_Lamp_Walnut_LP.JPG?1621323150' : imageDetails.path }}
                    style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                />
            </View>
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>

            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>
            <FlatList
                data={peopleTagged}
                numColumns={2}
                extraData={peopleTagged}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ borderWidth: 1, borderColor: 'black', height: heightToDp('4%'), width: widthToDp('40%'), justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: heightToDp('2%'), borderRadius: 20, marginLeft: widthToDp('6%') }}>
                            <Text style={{ color: 'black', width: widthToDp('20%') }} numberOfLines={1}>{item.name}</Text>
                            <CrossIcon
                                name='cross'
                                size={30}
                                color={'black'}
                                style={{ marginLeft: widthToDp('10%') }}
                                onPress={() => deleteTaggedPeopleFunction(item)}
                            />
                        </View>
                    )
                }}
            />
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>
            <View style={{ height: heightToDp('5%'), justifyContent: 'center' }}>
                <TextInput
                    style={{ height: heightToDp('6%'), width: widthToDp('95%'), borderWidth: 0, borderColor: '#201E6E', borderRadius: 20, marginTop: heightToDp('0%'), alignItems: 'center', color: 'black', alignSelf: 'center' }}
                    placeholder="Please add hashtags"
                    placeholderTextColor={'#201E6E'}
                    textAlign='left'
                    onChangeText={(hashText) => searchHashTag(hashText)}
                    onBlur={() => setHashTagFocus(false)}
                    onFocus={() => setHashTagFocus(true)}
                    value={hashName}
                />
            </View>
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%')}}></View>
            <View style={{ height: heightToDp('5%'), justifyContent: 'center'}}>
                <TextInput
                    style={{ height: heightToDp('6%'), width: widthToDp('95%'), borderWidth: 0, borderColor: '#201E6E', borderRadius: 20, marginTop: heightToDp('0%'), alignItems: 'center', color: 'black', alignSelf: 'center' }}
                    placeholder="Tag People"
                    placeholderTextColor={'#201E6E'}
                    textAlign='left'
                    onChangeText={(text) => searchText(text)}
                    onBlur={() => setInputFocus(false)}
                    onFocus={() => setInputFocus(true)}
                    value={tagName}
                />
            </View>
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>

            {
                inputFocus == false ?
                    <>
                        <View style={{ backgroundColor: 'white', height: heightToDp('65%') }}>
                            <LinearGradient
                                colors={['#4076E5', '#74AEF4']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('10%'), alignSelf: 'center', justifyContent: 'center' }}
                            >
                                {
                                    animating == true ? <ActivityIndicatorComponent size="small" color="#ffff" /> : <TouchableOpacity
                                        onPress={() => imageUploadFunction()}
                                        style={{ height: heightToDp('5%'), width: widthToDp('50%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>UPLOAD</Text>
                                    </TouchableOpacity>
                                }
                            </LinearGradient>
                        </View>
                    </>
                    : searchType === 'text' ? 
                    <>
                        <FlatList
                            data={searchResult}
                            keyboardShouldPersistTaps={'handled'}
                            style={{ height: heightToDp('100%'), paddingBottom: 30 }}
                            contentContainerStyle={{ paddingBottom: 20 }}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => selectname(item.name, item._id)}
                                        style={{ height: heightToDp('7%'), width: widthToDp('90%'), marginTop: heightToDp('1.5%'), backgroundColor: 'white', elevation: 10, alignSelf: 'center', justifyContent: 'center', borderRadius: 20 }}>
                                        <View style={{ flexDirection: 'row', marginLeft: widthToDp('4%'), alignItems: 'center' }}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200 }}
                                            />
                                            <Text style={{ color: 'black', marginLeft: widthToDp("5%") }}>{item.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </>
                : <>
                <FlatList
                    data={searchHashResult}
                    keyboardShouldPersistTaps={'handled'}
                    style={{ height: heightToDp('100%'), paddingBottom: 30 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => selecthash(item.name, item._id)}
                                style={{ height: heightToDp('7%'), width: widthToDp('90%'), marginTop: heightToDp('1.5%'), backgroundColor: 'white', elevation: 10, alignSelf: 'center', justifyContent: 'center', borderRadius: 20 }}>
                                <View style={{ flexDirection: 'row', marginLeft: widthToDp('4%'), alignItems: 'center' }}>
                                    <Image
                                        source={{ uri: item.image }}
                                        style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200 }}
                                    />
                                    <Text style={{ color: 'black', marginLeft: widthToDp("5%") }}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </>
            }
            <View style={{ borderWidth: 0.5, borderColor: 'black', width: widthToDp('100%') }}></View>


        </View>
    )
}