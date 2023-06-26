import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { loginMobileNumberOtpApiCall } from '../store/loginMobileOtp-slice'
import { loginUrl } from '../api/apiConstant'


export default ForgotPasswordMobileScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [animating, setAnimating] = React.useState(false);
    const postList = useSelector((state) => state.loginMobileNumberOtp.otpData)
    // defining dispatch from redux
    const dispatch = useDispatch()
    //generate otp api call

    const checkInputFunction = () => {
        phoneNumber == '' ? ToastAndroid.show('Please Enter Phone Number',ToastAndroid.LONG) : getOtpApiFunction()
    }
    const getOtpApiFunction = async () => {
        setAnimating(true)
        // dispatch(loginMobileNumberOtpApiCall(phoneNumber)) 
        // const interval = setInterval(() => {
        //     setAnimating(false)
        // }, 2000)

        // setTimeout(function () {
        //     clearInterval(interval);
        // }, 2500)
        try {
            var data = {
                phoneNumber: phoneNumber
            }

            var response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            navigation.navigate('OtpScreen',{from : "Reset",number : phoneNumber})
            setAnimating(false)
            // console.log(responseJson,"LLLLLLLLLLLLLLssssssssssssssssssssssss")
        } catch (error) { console.log(error) }
    }
    return (
        <ImageBackground source={require('../../assets/bgImage.png')} style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', height: heightToDp('100%') }}>
                <Image
                    source={require('../../assets/blackTop.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('54%') }}
                />
                <Image source={require('../../assets/logo_.png')} style={{ height: heightToDp('10%'), width: widthToDp('80%'), alignSelf: 'center', marginTop: heightToDp('10%') , borderRadius:20 }} />
                <Text style={{ color: '#201E6E', alignSelf: 'center', marginTop: heightToDp('10%') }}>ENTER YOUR MOBILE NUMBER TO RESET PASSWORD</Text>
                <TextInput
                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                    placeholder=""
                    placeholderTextColor={'#201E6E'}
                    textAlign={'center'}
                    keyboardType={'number-pad'}
                    onChangeText={(text) => setPhoneNumber(text)}
                />

                <LinearGradient
                    colors={['#4076E5', '#74AEF4']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('3%'), alignSelf: 'center', justifyContent: 'center' }}
                >
                    {
                        animating ? <ActivityIndicatorComponent size="small" color="#ffff" />
                            : <TouchableOpacity
                                onPress={() => checkInputFunction()}
                                style={{ height: heightToDp('5%'), width: widthToDp('80%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                            </TouchableOpacity>
                    }
                </LinearGradient>
                <Image
                    source={require('../../assets/blackBottom.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('60%'), bottom: 0, position: 'absolute', alignSelf: 'flex-end' }}
                />
                <View style={{ height: heightToDp('4%'), width: widthToDp('80%'), justifyContent: 'space-between', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('RoleSelectionScreen')}
                    >
                        <Text style={{ color: '#201E6E', fontWeight: 'bold' }}>Create New Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignInScreen')}
                    >
                        <Text style={{ color: '#201E6E', fontWeight: 'bold' }}>Alternate Login</Text>
                    </TouchableOpacity>

                </View>
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('OtpScreen')}
                    style={{ height: heightToDp('5%'), width: widthToDp('60%'), backgroundColor: 'rgba(116,174,244,0.9)', borderRadius: 20, marginTop:heightToDp('10%'), alignItems: 'center', justifyContent: 'center',alignSelf:'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                </TouchableOpacity> */}
            </View>
        </ImageBackground>
    )
}