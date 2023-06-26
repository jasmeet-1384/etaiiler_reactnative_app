import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, Modal, TouchableWithoutFeedback, FlatList, Linking } from 'react-native'
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
import { getUserAddressesUrl } from '../api/apiConstant';
import AddressListComponent from './AddressListComponent';
import { useIsFocused } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'

export default Header2 = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const addressAray = useSelector((state) => state.setAddress.address)

    const [visible, setVisible] = React.useState(false);

    const [role, setRole] = React.useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [checked, setChecked] = React.useState(false);
    const [addressList, setAddressList] = React.useState([]);
    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    useEffect(() => {
        if (isFocused) {
            getUserAdressesFunction()
        }
    }, [isFocused])

    const getUserAdressesFunction = async () => {
        try {
            let user_id = await AsyncStorage.getItem('_id')
            var data = {
                user_id: user_id
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
            // console.log(responseJson, "<...............ARESSS LIST")
        } catch (error) { console.log(error) }
    }

    // useEffect(() => {
    //     getRoleFunction()
    // }, [])

    // useEffect(() => {
    //     Geolocation.getCurrentPosition((position) => {
    //         getAddress(position.coords.latitude, position.coords.longitude)
    //     })
    // }, [])

    // const getRoleFunction = async () => {
    //     const role = await AsyncStorage.getItem('role')
    //     setRole(role)
    // }

    // const getAddress = (latitude, longitude) => {
    //     // console.log("https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.state.region.latitude+","+this.state.region.longitude+"&key="+"AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU")
    //     fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + "AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU")
    //         .then((response) => response.json())
    //         .then((data) => {
    //             // console.log("Geocode is => ", JSON.stringify(data))
    //             let str = data.results[0].formatted_address.split(',')
    //             setLocation(str[1])
    //             setCity(str[2])
    //             console.log(str.split(',')[1], "<<<<<<<<<<<<'''dfndsonfsnfisnigndsfngijfngidfnigndfignidfng")
    //         })
    // }

    const navigateToSupportScreen = () => {
        setVisible(false)
        navigation.navigate('SupportScreen')
    }
    const navigateToSecurityScreen = () => {
        setVisible(false)
        navigation.navigate('SecurityScreen')
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
            
            style={{ backgroundColor: '#240471', width: widthToDp('100%'), height: heightToDp('8%'), justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                >
                    <Image
                        source={require('../../assets/homepages.png')} style={{ height: heightToDp('100%'), width: widthToDp('30%'), marginLeft: widthToDp('1%') }}
                    resizeMode='contain'
                    />
                </TouchableOpacity>
                {/* <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{ flexDirection: 'row' }}>
                    <LocationIcon
                        name='location-outline'
                        size={25}
                        color={'white'}
                        style={{ marginLeft: widthToDp('3%'), marginRight: widthToDp('1.5%') }}
                    />
                    <View style={{ width: widthToDp('63%'), flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: widthToDp('30%') }}>
                            <Text>{location}</Text>
                            <Text>{city}</Text>
                        </View>
                        <DownIcon
                            name='down'
                            size={15}
                            color={'white'}

                        />
                    </View>
                </TouchableOpacity> */}

                <LeftIcon
                    name='search1'
                    color={'white'}
                    size={25}
                    style={{ marginLeft: widthToDp('40%') }}
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

                    <Menu.Item onPress={() => logOutFunction()} title="LOGOUT" />
                    <Menu.Item onPress={() => navigateToSupportScreen()} title="Support" />
                    <Menu.Item onPress={() => Linking.openURL(`https://haastag.com/terms`)} title="Terms & Conditions" />
                    <Menu.Item onPress={() => Linking.openURL(`https://haastag.com/privacy`)} title="Privacy Policy" />
                    <Menu.Item onPress={() => navigateToSecurityScreen()} title="Security" />
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