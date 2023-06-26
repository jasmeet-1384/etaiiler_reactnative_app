import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { otpVerificationApiCall } from '../store/otpVerification-slice'
import { loginUrl, otpVerification } from '../api/apiConstant'


export default OtpScreen = ({ route, navigation }) => {
    const { from, number } = route.params
    // console.log(from, "FFFFFFFFFFFFFFFRRRRRRRRRRRRRRRRRRRRRRROOOOOOOOOOOOOOOOOOOOMMMMMMMMMMMMMMMMM")
    const [otp, setOtp] = useState('')
    const [animating, setAnimating] = React.useState(false);
    const [resendVisible, setResendVisible] = React.useState(false);
    const [time, setTime] = React.useState(120);
    const timerRef = React.useRef(time);


    useEffect(() => {
        timerFunction()
    }, [])

    useEffect(() => {
        return() => {
            setOtp('')
            console.log('cleared')
        }
    },[])

    const timerFunction = () => {
        setResendVisible(false)
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                setResendVisible(true)
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }

    const resetTimer = () => {
        setTime(120)
        timerRef.current = 120
        timerFunction()
    }

    const phoneNumber = useSelector((state) => state.loginMobileNumberOtp.otpData)
    // defining dispatch from redux
    const dispatch = useDispatch()
    //generate otp api call
    const getOtpApiFunction = async () => {
        setAnimating(true)
        if (from == 'Login') {
            dispatch(otpVerificationApiCall(phoneNumber.data.phoneNumber, otp))
            const interval = setInterval(() => {
                setAnimating(false)
            }, 2000)
            setTimeout(function () {
                clearInterval(interval);
            }, 2500)
        } else if (from == 'Reset') {
            try {
                var data = {
                    phoneNumber: JSON.parse(number),
                    otp: otp
                }

                var response = await fetch(otpVerification, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                var responseJson = await response.json()
                if (responseJson.code == 200) {
                    navigation.navigate('ResetPasswordScreen', { number: number })
                }
                console.log(responseJson.code, "OTP TRY")
                setAnimating(false)
            } catch (error) { console.log(error) }
        }
    }

    const resentOtpFunction = async () => {
        try {
            var data = {
                phoneNumber: number
            }

            var response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            resetTimer()
            console.log(responseJson, "<<<<<<<")
        } catch (error) { console.log(error) }
    }
    return (
        <ImageBackground source={require('../../assets/bgImage.png')} style={{ flex: 1 }}>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', height: heightToDp('100%') }}>
                <Image
                    source={require('../../assets/blackTop.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('54%') }}
                />
                                <View style={{alignItems:'center'}}>
                    <View style={{height: heightToDp('11%'), width: widthToDp('80%'), justifyContent:'center', marginTop: heightToDp('10%'), borderRadius: 20 ,backgroundColor:'#4076E5'}}>
                        <Image source={require('../../assets/homepages.png')} style={{ height: heightToDp('10%'), width: widthToDp('80%')}} />
                    </View>
                </View>
                {/* <Image source={require('../../assets/logo_.png')} style={{ height: heightToDp('10%'), width: widthToDp('80%'), alignSelf: 'center', marginTop: heightToDp('10%'), borderRadius: 20 }} /> */}
                <Text style={{ color: '#201E6E', alignSelf: 'center', marginTop: heightToDp('10%') }}>ENTER OTP</Text>
                <OTPInputView
                    style={{ height: heightToDp('10%'), width: widthToDp('75%'), alignSelf: 'center' }}
                    pinCount={6}
                    codeInputFieldStyle={{ height: heightToDp('6%'), borderColor: 'black', borderRadius: 15, justifyContent: 'space-evenly', color: ' black',marginRight:widthToDp(1) }}
                    keyboardType={'number-pad'}
                    autoFocusOnLoad={false}
                    editable={true}
                    placeholderTextColor={'black'}
                    codeInputHighlightStyle={{ color: 'black' }}

                    onCodeChanged={(text) => setOtp(text)}
                />
                <Text style={{ color: '#201E6E', alignSelf: 'center', marginTop: heightToDp('3%') }}>Expires in {time}s</Text>
                {
                    resendVisible ?
                        <TouchableOpacity
                            onPress={() => resentOtpFunction()}
                        >

                            <Text style={{ color: '#201E6E', alignSelf: 'center', marginTop: heightToDp('3%') }}>Resend Otp</Text>

                        </TouchableOpacity>
                        : null
                }

                <LinearGradient
                    colors={['#4076E5', '#74AEF4']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('5%'), alignSelf: 'center', justifyContent: 'center' }}
                >
                    {
                        animating ? <ActivityIndicatorComponent size="small" color="#ffff" /> : <TouchableOpacity
                            onPress={() => getOtpApiFunction()}
                            style={{ height: heightToDp('5%'), width: widthToDp('80%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                        </TouchableOpacity>
                    }
                </LinearGradient>
                <Image
                    source={require('../../assets/blackBottom.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('60%'), bottom: 0, position: 'absolute', alignSelf: 'flex-end' }}
                />
                {/* <TouchableOpacity
                    onPress={() => navigation.navigate('TabNavigation')}
                    style={{ height: heightToDp('5%'), width: widthToDp('60%'), backgroundColor: 'rgba(116,174,244,0.9)', borderRadius: 20, marginTop: heightToDp('6%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                </TouchableOpacity> */}
            </View>
        </ImageBackground>
    )
}