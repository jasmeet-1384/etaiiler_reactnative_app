import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ScrollView, Modal, TouchableWithoutFeedback, ToastAndroid } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LinearGradient from 'react-native-linear-gradient'
import PlusIcon from 'react-native-vector-icons/AntDesign'
import ImagePicker from 'react-native-image-crop-picker';
import UploadIcon from 'react-native-vector-icons/Octicons'
import { useDispatch, useSelector } from 'react-redux'
import { businessRegistrationApiCall } from '../store/businessRegistration-slice'
import { uploadImageToS3 } from '../utilities/uploadAWS'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import { Picker } from '@react-native-picker/picker';
import { stateList } from '../components/StateList'

export default BusinessFormScreen = ({ route, navigation }) => {
    // defining dispatch from redux
    const dispatch = useDispatch()
    const addressAray = useSelector((state) => state.setAddress.address)
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [state, setStateInput] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [addressLine1, setAddressLine1] = useState('')
    const [addressLine2, setAddressLine2] = useState('')
    const [pincode, setPincode] = useState('')
    const [productCategory, setProductCategory] = useState('Select One')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [natureOfBusiness, setNatureOfBusiness] = useState('Select One')
    const [website, setWebsite] = useState('')
    const [imageFilePath, setImageFilePath] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDataController, setModalDataController] = useState('')
    const [animating, setanimating] = useState(false)
    const [imageBeingUploaded, setImageBeingUploaded] = useState(false)
    const [otherPressedInProductCategory, setotherPressedInProductCategory] = useState(false)
    const [otherPressedInNatureOfBusiness, setotherPressedInNatureOfBusiness] = useState(false)
    const count = useSelector((state) => state.setLocation.location)

    useEffect(() => {
        for (let i = 0; i < addressAray.length; i++) {
            if (addressAray[i].types[0] == 'postal_code') {
                setPincode(addressAray[i].long_name)
                // console.log(addressAray[i])
            }
            if (addressAray[i].types[0] == 'administrative_area_level_1') {
                setStateInput(addressAray[i].long_name)
            }
            if (addressAray[i].types[0] == 'locality') {
                setCity(addressAray[i].long_name)
            }
            if (addressAray[i].types[2] == 'sublocality_level_1') {
                setAddressLine2(addressAray[i].long_name)
            }
            // if(addressAray[i].types[2] == 'sublocality_level_2'){
            //     setAddressLine2(addressAray[i].long_name)
            // }
        }
    }, [addressAray])
    //registration api call
    const getBusinessRegistrationApiFunction = async (profilePicture) => {
        dispatch(businessRegistrationApiCall(fullName, password, state, city, addressLine1, addressLine2, pincode, productCategory, phoneNumber, natureOfBusiness, website, "business",count.latitude, count.longitude, profilePicture))
    }
    //toggle menus of modal
    const toggleModalData = (value) => {
        if (value == 0) {
            setModalDataController('product category')
            setModalVisible(true)
        } else if (value == 1) {
            setModalDataController('nature of business')
            setModalVisible(true)
        }
    }
    //selection of product category function
    const productSelectionFunction = (value) => {
        if (value == 'Other') {
            setotherPressedInProductCategory(true)
            setModalVisible(false)
        } else {
            setProductCategory(value)
            setModalVisible(false)
        }
    }
    //selection of nature of business function
    const natureOfBusinessSelectionFunction = (value) => {
        if (value == 'Other') {
            setotherPressedInNatureOfBusiness(true)
            setModalVisible(false)
        } else {
            setNatureOfBusiness(value)
            setModalVisible(false)
        }
    }
    //phone number validation
    const phoneNumberValidation = async () => {
        setanimating(true)
        if (imageBeingUploaded === true && phoneNumber.length == 10) {
            let dat = await uploadImageToS3(imageFilePath, 'businessProfileImage')
            getBusinessRegistrationApiFunction(dat)
            console.log("AFter aws upload => ", dat)
        } else {
            setanimating(false)

            ToastAndroid.show("Please enter a valid phone number or picture", ToastAndroid.LONG)
        }
    }
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

    const setPhoneNumberFunction = (value) => {
        setanimating(false)
        setPhoneNumber(value)
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

                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%') }}>Name of the Shop / Business / Agency</Text>
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder=""
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                multiline={true}
                                onChangeText={(text) => setFullName(text)}
                            />
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>Shop Location</Text>
                            <LinearGradient
                                colors={['#4076E5', '#74AEF4']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('3%'), alignSelf: 'center', justifyContent: 'center' }}
                            >
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('MapScreen', { from: 'business' })}
                                    style={{ height: heightToDp('5%'), width: widthToDp('80%'), borderWidth: 0, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('0%'), alignItems: 'center', color: 'black', justifyContent: 'center' }}
                                >
                                    <Text style={{ color: 'white' }}>SELECT LOCATION</Text>
                                </TouchableOpacity>
                            </LinearGradient>
                           
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="Address Line 1"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                multiline={true}
                                onChangeText={(text) => setAddressLine1(text)}
                                value={addressLine1}
                            />

                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="Address Line 2"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                multiline={true}
                                onChangeText={(text) => setAddressLine2(text)}
                                value={addressLine2}
                            />
                            {/* <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="Country"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                multiline={true}
                                onChangeText={(text) => setCountry(text)}
                                value={country}
                            /> */}
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="City"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                multiline={true}
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
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="Pincode"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                multiline={true}
                                keyboardType="number-pad"
                                onChangeText={(text) => setPincode(text)}
                                value={`${pincode}`}
                            />
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>Product Category</Text>
                            {
                                otherPressedInProductCategory == false ? <>
                                    <TouchableOpacity
                                        onPress={() => toggleModalData(0)}
                                        style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black', justifyContent: 'center', flexDirection: 'row' }}
                                    >
                                        <Text style={{ color: '#201E6E' }}>{productCategory}</Text>
                                        <PlusIcon
                                            name='caretdown'
                                            color={"#201E6E"}
                                            style={{ marginLeft: widthToDp('5%') }}
                                        />
                                    </TouchableOpacity>
                                </> :
                                    <TextInput
                                        style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                        placeholder="Enter product category"
                                        placeholderTextColor={'#201E6E'}
                                        textAlign={'center'}
                                        multiline={true}
                                        onChangeText={(text) => setProductCategory(text)}
                                    />
                            }
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>Whatsapp Number</Text>
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="+91"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                multiline={true}
                                keyboardType="number-pad"
                                onChangeText={(text) => setPhoneNumberFunction(text)}
                            />
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>PASSWORD</Text>
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder=""
                                placeholderTextColor={'#201E6E'}
                                secureTextEntry={true}
                                textAlign={'center'}
                                multiline={true}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <Text style={{ color: '#201E6E', fontSize: heightToDp('2%'), marginTop: heightToDp('3%') }}>Nature of Business</Text>
                            {
                                otherPressedInNatureOfBusiness == false ? <><TouchableOpacity
                                    onPress={() => toggleModalData(1)}
                                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black', justifyContent: 'center', flexDirection: 'row' }}
                                >
                                    <Text style={{ color: '#201E6E' }}>{natureOfBusiness}</Text>
                                    <PlusIcon
                                        name='caretdown'
                                        color={"#201E6E"}
                                        style={{ marginLeft: widthToDp('5%') }}
                                    />
                                </TouchableOpacity></> :
                                    <TextInput
                                        style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                        placeholder="Enter nature of business"
                                        placeholderTextColor={'#201E6E'}
                                        textAlign={'center'}
                                        multiline={true}
                                        onChangeText={(text) => setNatureOfBusiness(text)}
                                    />
                            }
                            <TextInput
                                style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                                placeholder="website"
                                placeholderTextColor={'#201E6E'}
                                textAlign={'center'}
                                multiline={true}
                                onChangeText={(text) => setWebsite(text)}
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
                                    animating === true ? <ActivityIndicatorComponent size="small" color="#ffff" /> : <TouchableOpacity
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
                                <View style={{ backgroundColor: 'white', height: heightToDp('32%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                                    {
                                        modalDataController == 'product category' ?
                                            <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('4%') }}>
                                                <TouchableOpacity
                                                    onPress={() => productSelectionFunction('Electronics')}
                                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                        <UploadIcon
                                                            name='dot-fill'
                                                            size={40}
                                                            color={'black'}
                                                        />
                                                    </View>
                                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%'),fontSize:widthToDp(4.5) }}>Electronics</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => productSelectionFunction('Hardware')}
                                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                        <UploadIcon
                                                            name='dot-fill'
                                                            size={40}
                                                            color={'black'}
                                                        />
                                                    </View>
                                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%'),fontSize:widthToDp(4.5) }}>Hardware</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => productSelectionFunction('Gadgets')}

                                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                        <UploadIcon
                                                            name='dot-fill'
                                                            size={40}
                                                            color={'black'}
                                                        />
                                                    </View>
                                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%'),fontSize:widthToDp(4.5) }}>Gadgets</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => productSelectionFunction('Other')}

                                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                        <UploadIcon
                                                            name='dot-fill'
                                                            size={40}
                                                            color={'black'}
                                                        />
                                                    </View>
                                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%'),fontSize:widthToDp(4.5) }}>Other</Text>
                                                </TouchableOpacity>
                                            </View> :
                                            <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('4%') }}>
                                                <TouchableOpacity
                                                    onPress={() => natureOfBusinessSelectionFunction('Wholeseller')}

                                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                        <UploadIcon
                                                            name='dot-fill'
                                                            size={40}
                                                            color={'black'}
                                                        />
                                                    </View>
                                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%'),fontSize:widthToDp(4.5) }}>Wholeseller</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => natureOfBusinessSelectionFunction('Retailer')}

                                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                        <UploadIcon
                                                            name='dot-fill'
                                                            size={40}
                                                            color={'black'}
                                                        />
                                                    </View>
                                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%'),fontSize:widthToDp(4.5) }}>Retailer</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => natureOfBusinessSelectionFunction('Service')}

                                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                        <UploadIcon
                                                            name='dot-fill'
                                                            size={40}
                                                            color={'black'}
                                                        />
                                                    </View>
                                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%'),fontSize:widthToDp(4.5) }}>Service</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => natureOfBusinessSelectionFunction('Other')}

                                                    style={{ flexDirection: 'row', height: heightToDp('3%'), alignItems: 'center', marginTop: heightToDp('4%') }}>
                                                    <View style={{ backgroundColor: 'gray', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                                        <UploadIcon
                                                            name='dot-fill'
                                                            size={40}
                                                            color={'black'}
                                                        />
                                                    </View>
                                                    <Text style={{ color: 'gray', marginLeft: widthToDp('2%'),fontSize:widthToDp(4.5) }}>Other</Text>
                                                </TouchableOpacity>
                                            </View>
                                    }
                                </View>

                            </TouchableWithoutFeedback>
                        </TouchableOpacity>
                    </Modal>
                </View>
            </ImageBackground>
        </KeyboardAwareScrollView>
    )
}