import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, PermissionsAndroid, Linking, ToastAndroid } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { loginMobileNumberOtpApiCall } from '../store/loginMobileOtp-slice'


export default SignUpScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [animating, setAnimating] = React.useState(false);
    const postList = useSelector((state) => state.loginMobileNumberOtp.otpData)
    // defining dispatch from redux
    const dispatch = useDispatch()

    useEffect(() => {
        requestLocationPermissionFunction()
    }, [])

    const requestLocationPermissionFunction = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Etaiiler location Permission",
                    message:
                        "Etaiiler needs access to your location ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the location");
            } else {
                console.log("location permission denied");
            }
        } catch (error) {
            console.log(error)
        }
    }
    //generate otp api call
    const getOtpApiFunction = async () => {
        if (phoneNumber == '') {
            ToastAndroid.show("Please Enter your phone number",ToastAndroid.LONG)
        } else {
            setAnimating(true)
            dispatch(loginMobileNumberOtpApiCall(phoneNumber))
            const interval = setInterval(() => {
                setAnimating(false)
            }, 2000)

            setTimeout(function () {
                clearInterval(interval);
            }, 2500)
        }
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
                <Text style={{ color: '#201E6E', alignSelf: 'center', marginTop: heightToDp('8%') }}>ENTER YOUR MOBILE NUMBER</Text>
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

                <View style={{ height: heightToDp('10%'), width: widthToDp('60%'), position: 'absolute', bottom: 50, alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    <Text>
                        <View>
                            <Text style={{ color: 'gray' }}>By continuing, you agree to our </Text>
                        </View>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('TermsAndConditionScreen')}
                            onPress={() => Linking.openURL(`https://haastag.com/terms`)}
                        >
                            <Text style={{ textDecorationLine: 'underline', color: 'gray' }}>Terms of Service </Text>
                        </TouchableOpacity>
                        <View>
                            <Text style={{ color: 'gray' }}> </Text>
                        </View>
                        <TouchableOpacity
                            // onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                            onPress={() => Linking.openURL(`https://haastag.com/privacy`)}
                        >
                            <Text style={{ textDecorationLine: 'underline', color: 'gray' }}>Privacy Policy </Text>
                        </TouchableOpacity>
                    </Text>
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