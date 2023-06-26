import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import LeftIcon from 'react-native-vector-icons/AntDesign'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotIcon from 'react-native-vector-icons/Entypo'
import LocationIcon from 'react-native-vector-icons/Entypo'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { deleteProfile, searchProfileUrl } from '../api/apiConstant'
import DistanceCalculationComponent from '../components/DistanceCalculationComponent'
import FollowUnfollow from '../components/FollowUnfollow'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'


export default DeleteConfirmationScreen = ({ navigation }) => {
    const [animating, setAnimating] = React.useState(false);

    const deleteAccountFunction = async () => {
        setAnimating(true)
        let user_id = await AsyncStorage.getItem('_id')
        var data = {
            user_id: user_id,
        }
        var response = await fetch(deleteProfile, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        var responseJson = await response.json()

        if (responseJson.code == 201) {

            setAnimating(false)
            await AsyncStorage.removeItem('_id')
            await AsyncStorage.removeItem('role')
            ToastAndroid.show("Profile deleted successfully.", ToastAndroid.LONG)
            navigation.reset({
                index: 0,
                routes: [{ name: 'SignUpScreen' }]
            })
        }

    }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ backgroundColor: '#ffff', width: widthToDp('100%'), height: heightToDp('8%'), justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', width: widthToDp('100%') }}>
                    <LeftIcon
                        name='arrowleft'
                        size={30}
                        color={'gray'}
                        style={{ marginLeft: widthToDp('5%'), marginTop: heightToDp('0.5%') }}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            </View>
            <View style={{ padding: 20 }}>
                <Text style={{ color: 'red', fontSize: widthToDp('8%') }}>You're about to delete your</Text>
                <Text style={{ color: 'red', fontSize: widthToDp('8%') }}>account</Text>
            </View>
            <View style={{ paddingLeft: 20, paddingBottom: 20 }}>
                <Text style={{ color: 'gray', fontSize: widthToDp('4%') }}>All the data associated with it (including your profile,</Text>
                <Text style={{ color: 'gray', fontSize: widthToDp('4%') }}>photos, reviews and subscriptions) will be</Text>
                <Text style={{ color: 'gray', fontSize: widthToDp('4%') }}>permanantly deleted in 30 days. This information can't</Text>
                <Text style={{ color: 'gray', fontSize: widthToDp('4%') }}>be recovered once the account is deleted.</Text>
            </View>

            <TouchableOpacity
                onPress={() => deleteAccountFunction()}
                style={{ marginTop: heightToDp('2%'), marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: "#ed174f", alignItems: 'center', borderRadius: 10 }}>
                {
                    animating ? <ActivityIndicatorComponent size="small" color="#ffff" /> :
                        <Text style={{ color: 'white', fontSize: widthToDp('5%') }}>Delete my account now</Text>
                }
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginTop: heightToDp('2%'), marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center', alignItems: 'center', borderRadius: 10 }}>
                <Text style={{ color: '#ed174f', fontSize: widthToDp('5%') }}>Back to Settings</Text>
            </TouchableOpacity>
        </View>
    )
}