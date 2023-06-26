import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch, useSelector } from 'react-redux'
import { passwordLoginApiCall } from '../store/passwordLogin-slice'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import { resetPasswordUrl } from '../api/apiConstant'

export default ResetPasswordScreen = ({ route, navigation }) => {
    const { number } = route.params
    const [confirmPassword, setConfirmPassword] = useState('')
    const [password, setPassword] = useState('')
    const [animating, setanimating] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const checkConfirmPassword = (text) => {
        setConfirmPassword(text)
        if (password != text) {
            setDisabled(true)
        } else {
            setDisabled(false)
        }
    }

    const resetPasswordFunction = async () => {
        try {
            var data = {
                phoneNumber: JSON.parse(number),
                password: confirmPassword
            }

            var response = await fetch(resetPasswordUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            if (responseJson.code == 201) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'SignUpScreen' }]
                })
            }
            console.log(responseJson, "hbjk")
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
                {/* <Image source={require('../../assets/logo_.png')} style={{ height: heightToDp('10%'), width: widthToDp('80%'), alignSelf: 'center', marginTop: heightToDp('10%'),borderRadius:20 }} /> */}
                <Text style={{ color: '#201E6E', alignSelf: 'center', marginTop: heightToDp('5%'), fontWeight: 'bold', fontSize: heightToDp('2.2%') }}>RESET PASSWORD</Text>
                <TextInput
                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                    placeholder="Password"
                    placeholderTextColor={'#201E6E'}
                    textAlign={'center'}
                    secureTextEntry
                    // onChangeText={(text) => phoneNumberChangeFunction(text)}
                    onChangeText={(text) => setPassword(text)}
                />
                <TextInput
                    style={{ height: heightToDp('6%'), width: widthToDp('80%'), borderWidth: 1, borderColor: '#201E6E', borderRadius: 20, alignSelf: 'center', marginTop: heightToDp('3%'), alignItems: 'center', color: 'black' }}
                    placeholder="Confirm Password"
                    placeholderTextColor={'#201E6E'}
                    textAlign={'center'}
                    secureTextEntry
                    onChangeText={(text) => checkConfirmPassword(text)}
                />
                {
                    disabled ? <Text style={{ color: 'red', marginLeft: widthToDp('15%'), marginTop: heightToDp('3%') }}>Passwords do not match</Text> : null
                }

                <LinearGradient
                    colors={['#4076E5', '#74AEF4']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('4%'), alignSelf: 'center', justifyContent: 'center' }}
                >
                    {
                        animating === true ? <ActivityIndicatorComponent size="small" color="#ffff" /> :
                            <TouchableOpacity
                                disabled={disabled}
                                onPress={() => resetPasswordFunction()}
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