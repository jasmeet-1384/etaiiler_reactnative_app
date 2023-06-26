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
import { searchProfileUrl, uploadImageToDBUrl } from '../api/apiConstant'
import CrossIcon from 'react-native-vector-icons/Entypo'
import DatePicker from 'react-native-date-picker'
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { setPromoPostDetails } from '../store/setPromoPostDetails-slice'
import moment from 'moment'


export default AddPromoScreen = ({ route, navigation }) => {
    const { imageDetails, postType } = route.params
    const [caption, setCaption] = useState('')
    const [tagName, setTagName] = useState('')
    const [role, setRole] = useState('')
    const [promoFromHrs, setPromoFromHrs] = useState('00:00')
    const [promoToHrs, setPromoToHrs] = useState('00:00')
    const [promoOfferDetails, setPromoOfferDetails] = useState('')
    const [promoEnterLink, setPromoEnterLink] = useState('')
    const [promoTotalPayable, setPromoTotalPayable] = useState('')
    const [taggedId, setTaggedId] = useState([])
    const [inputFocus, setInputFocus] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [peopleTagged, setPeopleTagged] = useState([])
    const [dob, setDob] = useState('YYYY/MM/DD')
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [dob2, setDob2] = useState('YYYY/MM/DD')
    const [date2, setDate2] = useState(new Date())
    const [open2, setOpen2] = useState(false)
    const [openTime, setOpenTime] = useState(false)
    const [openTime2, setOpenTime2] = useState(false)
    const [animating, setanimating] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [timeDisclaimer, setTimeDisclaimer] = useState(false)
    const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80')
    const dispatch = useDispatch()
    const postDetail = useSelector((state) => state.promoPostDetails.postDetails)

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
        let dat = await uploadImageToS3(imageDetails.path, 'post')
        console.log("AFter aws upload => ", dat)
        imageUploadDBFunction(dat)
    }
    // upload image to mongoDB database
    const imageUploadDBFunction = async (value) => {
        const user_id = await AsyncStorage.getItem('_id')
        const role = await AsyncStorage.getItem('role')
        var data = {
            user_id: user_id,
            image: value,
            description: caption,
            role: role,
            tagged_id: taggedId,
            postType: postType,
            promoFromhrs: promoFromHrs,
            promoToHrs: promoToHrs,
            promoFromDate: dob,
            promoToDate: dob2,
            promoOfferDetails: promoOfferDetails,
            promoLink: promoEnterLink,
            promoTotalPayable: promoTotalPayable,
            homeScreen: false
        }
        dispatch(setPromoPostDetails(data))
        navigation.navigate('PromoPlanSelectionScreen')
        setanimating(false)
        // try {
        //     const user_id = await AsyncStorage.getItem('_id')
        //     const role = await AsyncStorage.getItem('role')
        //     var data = {
        //         user_id: user_id,
        //         image: value,
        //         description: caption,
        //         role: role,
        //         tagged_id: taggedId,
        //         postType: postType,
        //         promoFromhrs: promoFromHrs,
        //         promoToHrs: promoToHrs,
        //         promoFromDate: dob,
        //         promoToDate: dob2,
        //         promoOfferDetails: promoOfferDetails,
        //         promoLink: promoEnterLink,
        //         promoTotalPayable: promoTotalPayable,
        //         homeScreen: false
        //     }

        //     var response = await fetch(uploadImageToDBUrl, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     })

        //     var responseJson = await response.json()
        //     navigation.reset({
        //         index: 0,
        //         routes: [{ name: 'TabNavigation' }]
        //     })
        //     console.log(responseJson.data, ">>>>>>>>>>>>????????????????????")
        // } catch (err) {
        //     console.log(err, "<====== upload picture")
        // }

    }
    //console.log(postDetail, "<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
    //search text
    const searchText = async (value) => {
        try {
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
    //dob triming time stamps function
    const dobSetFunction = (value) => {
        const dToString = value.toString()
        const dobTrimmed = dToString.substring(4, 15)
        setDob(dobTrimmed)
        console.log(dobTrimmed, "<<<<<<<<Trimmed")
    }
    //dob triming time stamps function
    const dobSetFunction2 = (value) => {
        const dToString = value.toString()
        const dobTrimmed = dToString.substring(4, 15)
        setDob2(dobTrimmed)
        console.log(dobTrimmed, "mmm")
    }
    //from hours
    const fromHrsFunction = (value) => {
        let tempTime = new Date(value)
        console.log(tempTime)
        setPromoFromHrs(`${tempTime.getHours()}:${tempTime.getMinutes()}`)
    }
    //from hours
    const toHrsFunction = (value) => {
        let tempTime = new Date(value)
        // console.log(tempTime.getHours())
        setPromoToHrs(`${tempTime.getHours()}:${tempTime.getMinutes()}`)
    }
    //check time limit
    const validateTime = () => {
        const startTime = new Date(`${dob} ${promoFromHrs}`).getTime()
        const endTime = new Date(`${dob2} ${promoToHrs}`).getTime()
        const difference = endTime - startTime
        const differenceInHrs = (difference / 60000) / 60
        if (parseInt(differenceInHrs) >= 1 && parseInt(differenceInHrs) <= 48) {
            setTimeDisclaimer(false)
            imageUploadFunction()

            console.log("right date")
        } else {
            setTimeDisclaimer(true)
            console.log("wronf date")

        }
        console.log(parseInt(differenceInHrs), "VALIDATION<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    }
    //count description words
    const countWordsFunction = (value) => {
        setPromoOfferDetails(value)
        if (value.length < 10) {
            setDisabled(true)
        }
        if (value.length >= 10) {
            setDisabled(false)
        }
    }
    return (
        <KeyboardAwareScrollView>
            <ImageBackground source={require('../../assets/bgImage.png')} style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', height: heightToDp('100%') }}>
                    <ScrollView>
                        <Image
                            source={require('../../assets/blackTop.png')}
                            style={{ height: heightToDp('13%'), width: widthToDp('54%') }}
                        />
                        <View style={{ height: heightToDp('100%'), width: widthToDp('100%'), marginTop: heightToDp('4%'), alignItems: 'center' }}>

                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>UPLOAD PHOTO</Text>
                            <TouchableOpacity
                                // onPress={() => uploadProfileImage()}
                                style={{ height: heightToDp('10%'), width: widthToDp('20'), borderWidth: 1, borderRadius: 20, marginTop: heightToDp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    imageDetails.path == '' ?
                                        <PlusIcon
                                            name='plus'
                                            size={20}
                                            color={'black'}
                                        /> : <Image
                                            source={{ uri: imageDetails.path }}
                                            style={{ height: heightToDp('10%'), width: widthToDp('20'), borderWidth: 1, borderRadius: 20, marginTop: heightToDp('0%') }}
                                        />
                                }
                            </TouchableOpacity>
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>STARTING FROM</Text>
                            <View
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black', justifyContent: 'space-evenly', flexDirection: 'row' }}
                            >
                                <TouchableOpacity
                                    onPress={() => setOpenTime(true)}
                                >
                                    <Text style={{ color: '#201E6E' }}>{promoFromHrs} hrs</Text>
                                </TouchableOpacity>
                                <View style={{ borderWidth: 1, borderColor: '#201E6E', height: heightToDp('2%'), width: widthToDp('0.5%') }}></View>
                                <TouchableOpacity
                                    onPress={() => setOpen(true)}
                                >
                                    <Text style={{ color: '#201E6E' }}>{dob}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    mode='date'
                                    open={open}
                                    date={date}
                                    onConfirm={(date) => {
                                        setOpen(false)
                                        setDate(date)
                                        dobSetFunction(date)
                                    }}
                                    onCancel={() => {
                                        setOpen(false)
                                    }}
                                />
                                <DatePicker
                                    modal
                                    mode='time'
                                    open={openTime}
                                    date={date}
                                    onConfirm={(date) => {
                                        setOpenTime(false)
                                        fromHrsFunction(date)

                                    }}
                                    onCancel={() => {
                                        setOpenTime(false)
                                    }}
                                />

                            </View>

                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>ENDING AT</Text>
                            <View
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black', justifyContent: 'space-evenly', flexDirection: 'row' }}
                            >
                                <TouchableOpacity
                                    onPress={() => setOpenTime2(true)}
                                >
                                    <Text style={{ color: '#201E6E' }}>{promoToHrs} hrs</Text>
                                </TouchableOpacity>
                                <View style={{ borderWidth: 1, borderColor: '#201E6E', height: heightToDp('2%'), width: widthToDp('0.5%') }}></View>
                                <TouchableOpacity
                                    onPress={() => setOpen2(true)}
                                >
                                    <Text style={{ color: '#201E6E' }}>{dob2}</Text>
                                </TouchableOpacity>
                                <DatePicker
                                    modal
                                    mode='date'
                                    open={open2}
                                    date={date2}
                                    onConfirm={(date) => {
                                        setOpen2(false)
                                        setDate2(date)
                                        dobSetFunction2(date)
                                    }}
                                    onCancel={() => {
                                        setOpen2(false)
                                    }}
                                />
                                <DatePicker
                                    modal
                                    mode='time'
                                    open={openTime2}
                                    date={date}
                                    onConfirm={(date) => {
                                        setOpenTime2(false)
                                        toHrsFunction(date)

                                    }}
                                    onCancel={() => {
                                        setOpenTime2(false)
                                    }}
                                />

                            </View>
                            {
                                timeDisclaimer ? <Text style={{ color: 'red', alignSelf: 'flex-start', marginLeft: widthToDp('13%') }}>min 1 hr and max 48hr should be selected</Text> :
                                    null

                            }
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>OFFER DETAILS</Text>
                            <View
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%') }}
                            >
                                <TextInput
                                    placeholder='Type Here*'
                                    placeholderTextColor={'#201E6E'}
                                    multiline={true}
                                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), color: 'black', alignSelf: 'center' }}
                                    onChangeText={(text) => countWordsFunction(text)}

                                />
                            </View>
                            {
                                disabled ? <Text style={{ color: 'red', alignSelf: 'flex-start', marginLeft: widthToDp('13%') }}>min 10 characters , max 30 characters</Text> :
                                    null

                            }

                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>ENTER LINK</Text>
                            <View
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black', justifyContent: 'space-evenly' }}
                            >
                                <TextInput
                                    placeholder='Website/App/Profile Link'
                                    placeholderTextColor={"#201E6E"}
                                    style={{ color: 'black' }}
                                    onChangeText={(text) => setPromoEnterLink(text)}
                                />
                            </View>
                            {/* <LinearGradient
                                colors={['#4076E5', '#74AEF4']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('2%'), alignSelf: 'center', justifyContent: 'center' }}
                            >
                                {
                                    animating == true ? <ActivityIndicatorComponent size="small" color="#ffff" /> : <TouchableOpacity
                                        onPress={() => imageUploadFunction()}
                                        style={{ height: heightToDp('5%'), width: widthToDp('50%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                        <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>UPLOAD</Text>
                                    </TouchableOpacity>
                                }
                            </LinearGradient> */}
                            {
                                disabled ? <View style={{ borderRadius: 200, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('2%'), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#cccccc', alignItems: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>

                                </View> : <LinearGradient
                                    colors={['#4076E5', '#74AEF4']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('2%'), alignSelf: 'center', justifyContent: 'center' }}
                                >
                                    {
                                        animating == true ? <ActivityIndicatorComponent size="small" color="#ffff" /> : <TouchableOpacity
                                            // onPress={() => navigation.navigate('PromoPlanSelectionScreen')}
                                            onPress={() => validateTime()}
                                            style={{ height: heightToDp('5%'), width: widthToDp('50%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                                        </TouchableOpacity>
                                    }
                                </LinearGradient>
                            }
                        </View>

                    </ScrollView>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}