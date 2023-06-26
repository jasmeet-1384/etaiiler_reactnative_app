import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { heightToDp, widthToDp } from './Responsive'
import LeftIcon from 'react-native-vector-icons/AntDesign'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotIcon from 'react-native-vector-icons/Entypo'
import { Menu } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LocationIcon from 'react-native-vector-icons/Ionicons'
import DownIcon from 'react-native-vector-icons/AntDesign'
import CurrentLocationIcon from 'react-native-vector-icons/MaterialIcons'
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from 'react-redux'
import { Checkbox } from 'react-native-paper'
import { getUserAddressesUrl, profileUrl, profileUrlBusiness } from '../api/apiConstant';
import AddressListComponent from './AddressListComponent';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import ActivityIndicatorComponent from './ActivityIndicatorComponent';

export default PromoHeader = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const addressAray = useSelector((state) => state.setAddress.address)

    const [visible, setVisible] = React.useState(false);
    const [animating, setAnimating] = React.useState(true);

    const [role, setRole] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [addressList, setAddressList] = React.useState([]);
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    useEffect(() => {
        if (isFocused) {
            getUserAdressesFunction()
            getAddressListFunction()
        }
    }, [isFocused])

    useEffect(() => {
        getUserAdressesFunction()
    }, [modalVisible])

    const getUserAdressesFunction = async () => {
        // try {
        //     let userId = await AsyncStorage.getItem('_id')
        //     let role = await AsyncStorage.getItem('role')
        //     if (role == 'business') {
        //         var response = await fetch(profileUrlBusiness, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 _id: userId
        //             })
        //         })
        //         const res = await response.json()
        //         setLocation(res.data.addressLine2)
        //         setCity(res.data.city)
        //         setAnimating(false)
        //         console.log("Profile res => ", res.data)
        //     } else {
        //         var response = await fetch(profileUrl, {
        //             method: 'POST',
        //             headers: {
        //                 'Content-Type': 'application/json'
        //             },
        //             body: JSON.stringify({
        //                 _id: userId
        //             })
        //         })
        //         const res = await response.json()
        //         setLocation(res.data.state)
        //         setCity(res.data.city)
        //         setAnimating(false)
        //         console.log("Profile res => ", res.data)
        //     }
        // } catch (error) { console.log(error) }
        let latitude = await AsyncStorage.getItem('latitude')
        let longitude = await AsyncStorage.getItem('longitude')
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + "AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU")
            .then((response) => response.json())
            .then((data) => {
                let str = JSON.stringify(data?.results[0]?.formatted_address)
                setLocation(str?.split(',')[1])
                setCity(str?.split(',')[2])
                // setLocation(JSON.stringify(data.results[0].address_components[3].long_name))
                console.log("Geocode is => ", JSON.stringify(data?.results[0]?.address_components[3]?.long_name))

            })
        setAnimating(false)
    }

    const getAddressListFunction = async () => {
        try {
            let userId = await AsyncStorage.getItem('_id')

            var data = {
                user_id: userId
            }

            var response = await fetch(getUserAddressesUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setAddressList(responseJson.data)
            console.log(responseJson.data, "<...............AAAAAAAAAAAAAAAAAAAAA SCREEN ")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }

    const navigateToSupportScreen = () => {
        setVisible(false)
        navigation.navigate('SupportScreen')
    }
    const logOutFunction = async () => {
        await AsyncStorage.removeItem('_id')
        await AsyncStorage.removeItem('role')
        setVisible(false)
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpScreen' }]
        })
    }
    useEffect(() => {
        console.log(addressAray, "ADDRESS ARRAY <==============")
    }, [addressAray])
    return (
        <View

            style={{ backgroundColor: '#131127', width: widthToDp('100%'), height: heightToDp('8%'), justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >
                    {/* <Image
                        source={require('../../assets/logo_.png')} style={{ height: heightToDp('6%'), width: widthToDp('25%'), marginLeft: widthToDp('5%') }}
                    /> */}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{ flexDirection: 'row' }}>
                    <LocationIcon
                        name='location-outline'
                        size={25}
                        color={'white'}
                        style={{ marginLeft: widthToDp('3%'), marginRight: widthToDp('1.5%') }}
                    />
                    {
                        animating ? <View style={{ width: widthToDp('63%'), flexDirection: 'row', alignItems: 'center' }}>
                            <ActivityIndicatorComponent size="small" color="#ffff" />
                        </View> : <View style={{ width: widthToDp('63%'), flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: widthToDp('40%') }}>
                                <Text style={{ textTransform: 'uppercase',color:'#fff' }}>{location}</Text>
                                <Text style={{ textTransform: 'uppercase',color:'#fff'  }}>{city}</Text>
                            </View>
                            <DownIcon
                                name='down'
                                size={15}
                                color={'white'}

                            />
                        </View>
                    }
                </TouchableOpacity>

                <LeftIcon
                    name='search1'
                    color={'white'}
                    size={25}
                    style={{ marginLeft: widthToDp('0%') }}
                    onPress={() => navigation.navigate('SearchScreen')}
                />
                <MessageIcon
                    name='message-text-outline'
                    color={'white'}
                    size={25}
                    style={{ marginLeft: widthToDp('4%') }}
                    onPress={() => navigation.navigate('InboxScreen')}
                />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<DotIcon
                        name='dots-three-vertical'
                        color={'white'}
                        size={20}
                        style={{ marginLeft: widthToDp('3%') }}
                        onPress={() => openMenu()}
                    />}
                >

                    <Menu.Item onPress={() => logOutFunction()} title="LogOut" />
                    <Menu.Item onPress={() => navigateToSupportScreen()} title="Support" />
                </Menu>
            </View>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)' }}>
                    <TouchableWithoutFeedback >
                        <View style={{ backgroundColor: 'white', height: heightToDp('50%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <Text style={{ color: 'black', marginTop: heightToDp('1%'), marginLeft: heightToDp('1.5%'), fontWeight: '600' }}>Select a location</Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MapScreen', { from: 'header' })}
                                style={{ height: heightToDp('7%'), width: widthToDp('90%'), alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
                                <CurrentLocationIcon
                                    name='my-location'
                                    size={25}
                                    color={'black'}
                                />
                                <View style={{ marginLeft: widthToDp('3%'), width: widthToDp('80%') }}>
                                    <Text style={{ color: 'black', fontWeight: '600' }}>Change Location</Text>
                                </View>
                                <DownIcon
                                    name='right'
                                    color={'black'}
                                    size={20}
                                />
                            </TouchableOpacity>
                            <View style={{ height: heightToDp('35%'), width: widthToDp('90%'), justifyContent: 'center', alignSelf: 'center' }}>
                                <Text style={{ color: 'black', fontWeight: '600' }}>Saved Address</Text>
                                {/* <Checkbox
                                    status={checked ? 'checked' : 'unchecked'}
                                    onPress={() => {
                                        setChecked(!checked);
                                    }}
                                    color={"red"}
                                    uncheckedColor={"yellow"}
                                /> */}
                                <FlatList
                                    data={addressList}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <>
                                                <AddressListComponent item={item} />
                                            </>
                                        )
                                    }}
                                />
                            </View>
                        </View>

                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}