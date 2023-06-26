import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import LeftIcon from 'react-native-vector-icons/AntDesign'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotIcon from 'react-native-vector-icons/Entypo'
import LocationIcon from 'react-native-vector-icons/Entypo'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import LinearGradient from 'react-native-linear-gradient'
import { searchProfileUrl } from '../api/apiConstant'
import DistanceCalculationComponent from '../components/DistanceCalculationComponent'
import FollowUnfollow from '../components/FollowUnfollow'
import AsyncStorage from '@react-native-async-storage/async-storage'


export default SecurityScreen = ({ navigation }) => {
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
                <Text style={{ color: 'black', fontSize: widthToDp('10%') }}>Account Settings</Text>
            </View>
            <View style={{ width: widthToDp('95%'), borderColor: 'gray', borderWidth: 1, alignSelf: 'center' }}></View>
            <TouchableOpacity 
            onPress={() => navigation.navigate('EditProfileScreen')}
            style={{ marginTop: heightToDp('3%'), height: heightToDp('8%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('5%') }}>Edit Profile</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), borderColor: 'gray', borderWidth: 1, alignSelf: 'center' }}></View>
            <TouchableOpacity 
            onPress={() => navigation.navigate('DeleteAccountScreen')}
            style={{ marginTop: heightToDp('3%'), height: heightToDp('8%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('5%') }}>Delete Account</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), borderColor: 'gray', borderWidth: 1, alignSelf: 'center' }}></View>
        </View>
    )
}