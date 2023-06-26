import React, { useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import LeftIcon from 'react-native-vector-icons/AntDesign'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotIcon from 'react-native-vector-icons/Entypo'
import LocationIcon from 'react-native-vector-icons/Entypo'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import Header2 from '../components/Header2'


export default ExploreScreen = ({ navigation }) => {

    const [tab, setTab] = useState('user')
    return (
        <View style={{ flex: 1 }}>
            <Header2/>
            <View style={{ backgroundColor: 'white', height: heightToDp('8%'), width: widthToDp('100%'), justifyContent: 'center', elevation: 5 }}>
                <View style={{ flexDirection: 'row', width: widthToDp('50%'), justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => setTab('user')}
                        style={{ width: widthToDp('12%') }}>
                        <Text style={{ color: 'black', fontSize: heightToDp('2.5%') }}>USER</Text>
                        {
                            tab == 'user' ? <View style={{ backgroundColor: 'blue', width: widthToDp('12%'), height: heightToDp('0.2%') }}></View> : null
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setTab('business')}
                        style={{ marginLeft: widthToDp('6%'), width: widthToDp('25%') }}>
                        <Text style={{ color: 'black', fontSize: heightToDp('2.5%') }}>BUSINESS</Text>
                        {
                            tab == 'business' ?
                                <View style={{ backgroundColor: 'blue', width: widthToDp('22%'), height: heightToDp('0.2%') }}></View>
                                : null
                        }
                    </TouchableOpacity>
                </View>
            </View>

            {
                tab == 'user' ?
                    <View style={{ flexDirection: 'row', height: heightToDp('20%'), alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}
                            style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                        />

                        <View style={{ height: heightToDp('20%'), width: widthToDp('50%'), marginLeft: widthToDp('4%'), marginTop: heightToDp('6%') }}>
                            <Text style={{ color: 'black', fontSize: heightToDp('2.2%') }}>Mr. XYZ</Text>
                            <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                <LocationIcon
                                    name='location'
                                    size={12}
                                    color={'#707070'}
                                    style={{ marginTop: heightToDp('0.5%') }}
                                />
                                <Text style={{ marginLeft: widthToDp('1%'), color: 'black' }}>10.5 kms | Patia,Bhuwaneshwar</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: heightToDp('3%'), color: 'black' }}>12</Text>
                                <View style={{ marginLeft: widthToDp('1.5%') }}>
                                    <Text style={{ fontSize: heightToDp('1.5%'), color: 'black' }}>mutual</Text>
                                    <Text style={{ fontSize: heightToDp('1.5%'), marginTop: heightToDp('-0.5%'), color: 'black' }}>connections</Text>
                                </View>
                                <LinearGradient
                                    colors={['#4076E5', '#74AEF4']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ borderRadius: 200, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', marginLeft: widthToDp('2%') }}
                                >
                                    <TouchableOpacity
                                        style={{ height: heightToDp('4%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Connect</Text>
                                        <PencilIcon
                                            name='checkcircle'
                                            size={15}
                                            color={'white'}
                                            style={{ marginLeft: widthToDp('2%') }}
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                                <View style={{ backgroundColor: '#f0915d', width: widthToDp('10%'), height: heightToDp('4%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center', marginLeft: widthToDp('2%') }}>
                                    <MessageIcon
                                        name='message-text-outline'
                                        color={'white'}
                                        size={20}
                                        style={{ marginLeft: widthToDp('0%') }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View> : <View style={{ flexDirection: 'row', height: heightToDp('20%'), alignItems: 'center' }}>
                        <Image
                            source={require('../../assets/GD.png')}
                            style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 20, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                        />

                        <View style={{ height: heightToDp('20%'), width: widthToDp('50%'), marginLeft: widthToDp('4%'), marginTop: heightToDp('6%') }}>
                            <View style={{ borderWidth: 1, borderColor: '#a0b1e1', height: heightToDp('3%'), width: widthToDp('42%'), borderRadius: 300, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>ELECTRONICS RETAILER</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                <LocationIcon
                                    name='location'
                                    size={12}
                                    color={'#707070'}
                                    style={{ marginTop: heightToDp('0.5%') }}
                                />
                                <Text style={{ marginLeft: widthToDp('1%'), color: 'black' }}>10.5 kms | Patia,Bhuwaneshwar</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                <LocationIcon
                                    name='globe'
                                    size={12}
                                    color={'#707070'}
                                    style={{ marginTop: heightToDp('0.5%') }}
                                />
                                <Text style={{ marginLeft: widthToDp('1.5%'),color:'black' }}>www.website.com</Text>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: heightToDp('1%') }}>
                                <Text style={{ fontWeight: 'bold', fontSize: heightToDp('3%'), color: 'black' }}>12</Text>
                                <View style={{ marginLeft: widthToDp('1.5%') }}>
                                    <Text style={{ fontSize: heightToDp('1.5%'), color: 'black' }}>mutual</Text>
                                    <Text style={{ fontSize: heightToDp('1.5%'), marginTop: heightToDp('-0.5%'), color: 'black' }}>connections</Text>
                                </View>
                                <LinearGradient
                                    colors={['#4076E5', '#74AEF4']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ borderRadius: 200, width: widthToDp('25%'), height: heightToDp('4%'), flexDirection: 'row', marginLeft: widthToDp('2%') }}
                                >
                                    <TouchableOpacity
                                        style={{ height: heightToDp('4%'), width: widthToDp('25%'), borderRadius: 200, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                                        <Text style={{ fontSize: heightToDp('1.8%'), color: 'white' }}>Connect</Text>
                                        <PencilIcon
                                            name='checkcircle'
                                            size={15}
                                            color={'white'}
                                            style={{ marginLeft: widthToDp('2%') }}
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                                <View style={{ backgroundColor: '#f0915d', width: widthToDp('10%'), height: heightToDp('4%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center', marginLeft: widthToDp('2%') }}>
                                    <MessageIcon
                                        name='message-text-outline'
                                        color={'white'}
                                        size={20}
                                        style={{ marginLeft: widthToDp('0%') }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
            }
        </View>
    )
}