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


export default DeleteAccountScreen = ({ navigation }) => {
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
                <Text style={{ color: 'red', fontSize: widthToDp('10%') }}>Delete Account</Text>
            </View>
            <View style={{paddingLeft:20,paddingBottom : 20}}>
                <Text style={{ color: 'gray', fontSize: widthToDp('5%') }}>Why would you like to delete your account?</Text>
            </View>

            <TouchableOpacity 
            onPress={() => navigation.navigate('DeleteConfirmationScreen')}
            style={{ marginTop: heightToDp('2%'),marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('5%') }}>I don't want to use Hastag anymore</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), backgroundColor: "gray", alignSelf: 'center', height: heightToDp('0.2%') }}></View>

            <TouchableOpacity 
            onPress={() => navigation.navigate('DeleteConfirmationScreen')}
            style={{ marginTop: heightToDp('2%'),marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('4.5%') }}>I'm using a different account</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), backgroundColor: "gray", alignSelf: 'center', height: heightToDp('0.2%') }}></View>

            <TouchableOpacity 
            onPress={() => navigation.navigate('DeleteConfirmationScreen')}
            style={{ marginTop: heightToDp('2%'),marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('4.5%') }}>I'm worried about my privacy</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), backgroundColor: "gray", alignSelf: 'center', height: heightToDp('0.2%') }}></View>

            <TouchableOpacity 
            onPress={() => navigation.navigate('DeleteConfirmationScreen')}
            style={{ marginTop: heightToDp('2%'),marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('4.5%') }}>You're sending me too many emails/notifications</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), backgroundColor: "gray", alignSelf: 'center', height: heightToDp('0.2%') }}></View>

            <TouchableOpacity
            onPress={() => navigation.navigate('DeleteConfirmationScreen')}
            style={{ marginTop: heightToDp('2%'),marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('4.5%') }}>I don't want to use Hastag anymore</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), backgroundColor: "gray", alignSelf: 'center', height: heightToDp('0.2%') }}></View>

            <TouchableOpacity 
            onPress={() => navigation.navigate('DeleteConfirmationScreen')}
            style={{ marginTop: heightToDp('2%'),marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('4.5%') }}>The app is not working properly</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), backgroundColor: "gray", alignSelf: 'center', height: heightToDp('0.2%') }}></View>

            <TouchableOpacity 
            onPress={() => navigation.navigate('DeleteConfirmationScreen')}
            style={{ marginTop: heightToDp('2%'),marginBottom: heightToDp('2%'), height: heightToDp('5%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Text style={{ color: 'black', fontSize: widthToDp('4.5%') }}>Other</Text>
                <LeftIcon
                    name='right'
                    size={25}
                    color={'gray'}
                />
            </TouchableOpacity>
            <View style={{ width: widthToDp('95%'), backgroundColor: "gray", alignSelf: 'center', height: heightToDp('0.2%') }}></View>
        </View>
    )
}