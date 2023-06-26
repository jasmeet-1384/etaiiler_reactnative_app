import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import { updateTokenApiCall } from '../store/updateToken-slice'
import NetInfo from "@react-native-community/netinfo";

export default SplashScreen = ({ navigation }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const interval = setInterval(() => {
            // checkUser()
            checkInternet()
        }, 4000)

        setTimeout(function () {
            clearInterval(interval);
        }, 4500)
    })

    const checkInternet = () => {
        // const unsubscribe = NetInfo.addEventListener(state => {
        //     console.log("Connection type", state.type);
        //     console.log("Is connected?", state.isConnected);
        //     if(state.isConnected){
        //         checkUser()
        //     }
        // });

        // unsubscribe();
        NetInfo.addEventListener(state => {
            if (state.isConnected) {
                checkUser()
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'NoInternetScreen' }]
                })
            }
        })
    }
    // check if user has already logged in
    const checkUser = async () => {
        let value = await AsyncStorage.getItem("_id")
        let token = await AsyncStorage.getItem("@fcmToken")
        let os = await AsyncStorage.getItem("@os")
        let role = await AsyncStorage.getItem("role")
        if (value) {
            dispatch(updateTokenApiCall(value, token, os, role))
            navigation.reset({
                index: 0,
                routes: [{ name: 'TabNavigation' }]
            })
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignUpScreen' }]
            })
        }
    }
    return (
        <ImageBackground source={require('../../assets/splashScreen.jpg')} style={{ flex: 1 }}>

            {/* <View style={{ backgroundColor: 'rgba(255,255,255,0.8)', height: heightToDp('100%') }}>
                <Image
                    source={require('../../assets/blackTop.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('54%') }}
                />
                <View style={{ height: heightToDp('60%'), width: widthToDp('100%'), justifyContent: 'center', alignSelf: 'center' }}>
                    <Image source={require('../../assets/logo_.png')} style={{ height: heightToDp('10%'), width: widthToDp('80%'), alignSelf: 'center', marginTop: heightToDp('10%') }} />

                </View>
                <Image
                    source={require('../../assets/blackBottom.png')}
                    style={{ height: heightToDp('13%'), width: widthToDp('60%'), bottom: 0, position: 'absolute', alignSelf: 'flex-end' }}
                />
            </View> */}
        </ImageBackground>
    )
}