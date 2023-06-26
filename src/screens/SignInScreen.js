import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { passwordLoginApiCall } from '../store/passwordLogin-slice'
import Feather from 'react-native-vector-icons/Feather'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'

export default SignInScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [animating, setanimating] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [passwordToggle, setPasswordToggle] = useState('eye')
    const loginDetails = useSelector((state) => state.passwordLogin.loginDetails)
    // defining dispatch from redux
    const dispatch = useDispatch()
    //generate otp api call
    const getPasswordLoginApiFunction = async () => {
        setanimating(true)
        setDisabled(true)
        dispatch(passwordLoginApiCall(phoneNumber, password))
        setTimeout(() => {
            setanimating(false)
            setDisabled(false)
        }, 2000)
    }
    const phoneNumberChangeFunction = (value) => {
        setanimating(false)
        setDisabled(false)
        setPhoneNumber(value)
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
                <Text style={{ color: '#201E6E', alignSelf: 'center', marginTop: heightToDp('5%'), fontWeight: 'bold', fontSize: heightToDp('2.2%') }}>SIGN IN</Text>
                <TextInput
                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                    placeholder="Mobile Number"
                    placeholderTextColor={'#201E6E'}
                    textAlign={'center'}
                    keyboardType='number-pad'
                    onChangeText={(text) => phoneNumberChangeFunction(text)}
                />
                {/* <TextInput
                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                    placeholder="password"
                    placeholderTextColor={'#201E6E'}
                    textAlign={'center'}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                /> */}
                <View
                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', flexDirection: 'row',justifyContent:'center' }}
                >
                    <TextInput
                        style={{ color: 'black',marginLeft:widthToDp('0%') }}
                        placeholder="password"
                        placeholderTextColor={'#201E6E'}
                        textAlign={'center'}
                        secureTextEntry={passwordToggle == 'eye' ? true : false}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Feather
                        name={passwordToggle}
                        color={'black'}
                        size={25}
                        style={{position:'absolute',right:30}}
                        onPress={() => passwordToggle == 'eye' ? setPasswordToggle('eye-off') : setPasswordToggle('eye')}
                    />
                </View>
                <View style={{ height: heightToDp('8%'), width: widthToDp('80%'), justifyContent: 'flex-end', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPasswordMobileScreen')}
                    >
                        <Text style={{ color: '#201E6E', fontWeight: 'bold' }}>Forgot/Reset Password</Text>
                    </TouchableOpacity>

                </View>
                <LinearGradient
                    colors={['#4076E5', '#74AEF4']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('0.5%'), alignSelf: 'center', justifyContent: 'center' }}
                >
                    {
                        animating === true ? <ActivityIndicatorComponent size="small" color="#ffff" /> :
                            <TouchableOpacity
                                disabled={disabled}
                                onPress={() => getPasswordLoginApiFunction()}
                                style={{ height: heightToDp('5%'), width: widthToDp('80%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>NEXT</Text>
                            </TouchableOpacity>
                    }
                </LinearGradient>
                <Image
                    source={require('../../assets/blackBottom.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('60%'), bottom: 0, position: 'absolute', alignSelf: 'flex-end' }}
                />
            </View>
        </ImageBackground>
    )
}