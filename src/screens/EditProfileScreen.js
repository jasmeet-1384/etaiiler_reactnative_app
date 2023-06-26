import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, Modal, TouchableOpacity, TextInput, ScrollView, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import PlusIcon from 'react-native-vector-icons/AntDesign'
import { userRegistrationApiCall } from '../store/userRegistration-slice'
import ImagePicker from 'react-native-image-crop-picker';
import GenderIcon from 'react-native-vector-icons/Foundation'
import GenderIcon2 from 'react-native-vector-icons/FontAwesome5'
import DatePicker from 'react-native-date-picker'
import { RNS3 } from 'react-native-aws3'
import { uploadImageToS3 } from '../utilities/uploadAWS'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import { stateList } from '../components/StateList'
import { Picker } from '@react-native-picker/picker';
import { profileUrl, updateProfileUrl } from '../api/apiConstant'
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'


export default EditProfileScreen = ({ route, navigation }) => {
    //const { profileData } = route.params
    // defining dispatch from redux
    const dispatch = useDispatch()
    const addressAray = useSelector((state) => state.setAddress.address)
    const count = useSelector((state) => state.setLocation.location)
    const [profileData, setprofileData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [fullName, setFullName] = useState(profileData.name)
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('YYYY/MM/DD')
    const [bio, setBio] = useState(profileData.bio)
    const [state, setStateInput] = useState(profileData.state)
    const [city, setCity] = useState(profileData.city)
    const [pincode, setPincode] = useState(profileData.pincode)
    const [gender, setGender] = useState(profileData.gender)
    const [phoneNumber, setPhoneNumber] = useState(profileData.phoneNumber)
    const [imageFilePath, setImageFilePath] = useState(profileData.image)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [animating, setanimating] = useState(false)
    const [otherGender, setOtherGender] = useState(false)
    const [imageBeingUploaded, setImageBeingUploaded] = useState(false)
    const isFocused = useIsFocused();

    useEffect(() => {
        getProfileData()
    }, [])

    useEffect(() => {
        for (let i = 0; i < addressAray.length; i++) {
            if (addressAray[i].types[0] == 'postal_code') {
                setPincode(addressAray[i].long_name)
            }
            if (addressAray[i].types[0] == 'administrative_area_level_1') {
                setStateInput(addressAray[i].long_name)
            }
            if (addressAray[i].types[0] == 'locality') {
                setCity(addressAray[i].long_name)
            }

        }
    }, [addressAray])

    const getProfileData = async () => {
        let userId = await AsyncStorage.getItem('_id')
        var response = await fetch(profileUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: userId
            })
        })
        const res = await response.json()
        console.log("Profile res => ", res.data)
        setprofileData(res.data)
        setFullName(res.data.name)
        setBio(res.data.bio)
        setCity(res.data.city)
        setStateInput(res.data.state)
        setPincode(res.data.pincode)
        setGender(res.data.gender)
        setPhoneNumber(res.data.phoneNumber)
        setImageFilePath(res.data.image)
        // const a = await getOwnPostsFetch()
        // console.log("Posts => ", a)
        // setUserPosts(a.data.userPosts)
    }
    //upload profile picture try
    const uploadProfileImage = async () => {
        setImageBeingUploaded(true)
        var imgPath
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true
        }).then(image => {
            console.log(image);
            imgPath = image.path
            setImageFilePath(image.path)
        });

    }
    //modal selection and closing function
    const modalSelectionFunction = (value) => {
        if (value == 'Other') {
            setOtherGender(true)
            setModalVisible(false)
        } else {
            setGender(value)
            setModalVisible(false)
        }
    }
    //dob triming time stamps function
    const dobSetFunction = (value) => {
        const dToString = value.toString()
        const dobTrimmed = dToString.substring(4, 15)
        setDob(dobTrimmed)
        console.log(dobTrimmed)
    }
    //phone number validation
    const phoneNumberValidation = async () => {
        setanimating(true)
        if (imageBeingUploaded === true) {
            let dat = await uploadImageToS3(imageFilePath, 'userProfileImage')
            updateProfileFunction(dat)
            console.log("AFter aws upload => ", dat)
        }
        if (imageBeingUploaded === false) {
            updateProfileFunction(imageFilePath)
            console.log("image not updated=> ")
        }
        //console.log(parseInt(phoneNumber).length)

    }
    //updateProfile Api
    const updateProfileFunction = async (profilePicture) => {
        let user_id = await AsyncStorage.getItem('_id')
        var data = {
            user_id : user_id,
            name: fullName,
            dateOfBirth: dob,
            bio: bio,
            state: state,
            city: city,
            pincode: pincode,
            gender: gender,
            image: profilePicture,
            phoneNumber: profileData.phoneNumber,
            role: 'user',
            latitude : count.latitude ,
            longitude : count.longitude,
            active : false
        }
        var response = await fetch(updateProfileUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()
        console.log("profile updated >>", responseJson.data)
        navigation.reset({
            index: 0,
            routes: [{ name: 'TabNavigation' }]
        })
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
                        <View style={{ height: heightToDp('80%'), width: widthToDp('100%'), marginTop: heightToDp('4%'), alignItems: 'center' }}>

                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%') }}>FULL NAME</Text>
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder=""
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                onChangeText={(text) => setFullName(text)}
                                value={fullName}
                            />

                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>DATE OF BIRTH</Text>
                            <TouchableOpacity
                                onPress={() => setOpen(true)}
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black', justifyContent: 'center' }}
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
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="Bio"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                onChangeText={(text) => setBio(text)}
                                value={bio}
                            />
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>LOCATION OF RESIDENCE</Text>
                            <LinearGradient
                                colors={['#4076E5', '#74AEF4']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('3%'), alignSelf: 'center', justifyContent: 'center' }}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('MapScreen', { from: 'userEdit' })}
                                    style={{ height: heightToDp('5%'), width: widthToDp('80%'), borderWidth: 0, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('0%'), alignItems: 'center', color: 'black', justifyContent: 'center' }}
                                >
                                    <Text style={{ color: 'white' }}>SELECT LOCATION</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="City"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                onChangeText={(text) => setCity(text)}
                                value={city}
                            />
                            <View
                                style={{ flexDirection: 'row', height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black', justifyContent: 'center' }}

                            >
                                <Picker
                                    style={{ height: heightToDp('6%'), width: widthToDp('50%'), color: 'black' }}
                                    selectedValue={state}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setStateInput(itemValue)
                                    }
                                >
                                    {stateList.map(i => {
                                        return (
                                            <Picker.Item label={i.name} value={i.name} />
                                        )
                                    })}
                                </Picker>
                                <PlusIcon
                                    name='caretdown'
                                    color={"#201E6E"}
                                    style={{ marginLeft: widthToDp('-10%') }}
                                />
                            </View>

                            {/* <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="State"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                onChangeText={(text) => setStateInput(text)}
                            /> */}

                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="Pincode"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                onChangeText={(text) => setPincode(text)}
                                keyboardType='number-pad'
                                value={`${pincode}`}
                            />
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>GENDER</Text>
                            {
                                otherGender == false ? <TouchableOpacity
                                    onPress={() => setModalVisible(true)}
                                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black', justifyContent: 'center', flexDirection: 'row' }}
                                >
                                    <Text style={{ color: '#201E6E' }}>{gender}</Text>
                                    <PlusIcon
                                        name='caretdown'
                                        color={"#201E6E"}
                                        style={{ marginLeft: widthToDp('5%') }}
                                    />
                                </TouchableOpacity> : <TextInput
                                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                    placeholder="Enter a gender"
                                    placeholderTextColor={'#201E6E'}
                                    textAlign={'center'}
                                    onChangeText={(text) => setGender(text)}
                                />
                            }
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>Phone Number</Text>
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="+91"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                onChangeText={(text) => setPhoneNumber(text)}
                                keyboardType='number-pad'
                                value={`${phoneNumber}`}
                                editable={false}
                            />
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>PASSWORD</Text>
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder=""
                                placeholderTextColor={'#201E6E'}
                                secureTextEntry={true}
                                textAlign={'center'}
                                onChangeText={(text) => setPassword(text)}
                                editable={false}
                            />
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>UPLOAD PROFILE</Text>
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('0%') }}>PHOTO</Text>
                            <TouchableOpacity
                                onPress={() => uploadProfileImage()}
                                style={{ height: heightToDp('10%'), width: widthToDp('20'), borderWidth: 1, borderRadius: 20, marginTop: heightToDp('3%'), justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    imageFilePath == '' ?
                                        <PlusIcon
                                            name='plus'
                                            size={20}
                                            color={'black'}
                                        /> : <Image
                                            source={{ uri: imageFilePath }}
                                            style={{ height: heightToDp('10%'), width: widthToDp('20'), borderWidth: 1, borderRadius: 20, marginTop: heightToDp('0%') }}
                                        />
                                }
                            </TouchableOpacity>

                            <LinearGradient
                                colors={['#4076E5', '#74AEF4']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('10%'), alignSelf: 'center', justifyContent: 'center' }}
                            >
                                {
                                    animating === true ? <ActivityIndicatorComponent size="small" color="#ffff" /> :
                                        <TouchableOpacity
                                            onPress={() => phoneNumberValidation()}
                                            style={{ height: heightToDp('5%'), width: widthToDp('50%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                            <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                                        </TouchableOpacity>
                                }
                            </LinearGradient>
                        </View>
                        <View style={{ height: heightToDp('80%') }}></View>
                    </ScrollView>
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
                                <View style={{ backgroundColor: 'white', height: heightToDp('20%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20, justifyContent: 'center' }}>
                                    <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('0%') }}>
                                        <TouchableOpacity
                                            onPress={() => modalSelectionFunction('Male')}
                                            style={{ flexDirection: 'row', height: heightToDp('2%'), alignItems: 'center' }}>
                                            <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                <GenderIcon
                                                    name='male-symbol'
                                                    size={20}
                                                    color={'black'}
                                                />
                                            </View>
                                            <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Male</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => modalSelectionFunction('Female')}
                                            style={{ flexDirection: 'row', height: heightToDp('2%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                            <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                <GenderIcon
                                                    name='female-symbol'
                                                    size={20}
                                                    color={'black'}
                                                />
                                            </View>
                                            <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Female</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => modalSelectionFunction('Other')}
                                            style={{ flexDirection: 'row', height: heightToDp('2%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                            <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                <GenderIcon2
                                                    name='transgender'
                                                    size={20}
                                                    color={'black'}
                                                />
                                            </View>
                                            <Text style={{ color: 'gray', marginLeft: widthToDp('2%') }}>Other</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}