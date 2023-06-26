import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import { heightToDp, widthToDp } from '../components/Responsive'
import Geolocation from "react-native-geolocation-service";
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient'
import { useSelector, useDispatch } from 'react-redux'
import { setLocationFromMap } from '../store/setLocation-slice'
import { setAddressFromMap } from '../store/setAddress-slice'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNewAddressUrl } from '../api/apiConstant';

export default MapScreen = ({ route, navigation }) => {
    const { from } = route.params
    const count = useSelector((state) => state.setLocation.location)
    const dispatch = useDispatch()
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
    const [padding, setPadding] = useState(0)
    const [address, setAddress] = useState('')
    const [region, setRegion] = useState({
        latitude: 23.52493661187678,
        longitude: 87.25461375195775,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
    })
    const [addressArray, setAddressArray] = useState([])
    const mapView = useRef(null);
    useEffect(() => {
        getCurrentPositionFunction()
    }, [])
    useEffect(() => {
        mapView.current.animateToRegion(region, 1500);
        console.log("use effect 2")
        getAddressFunction()
    }, [region])
    const getCurrentPositionFunction = () => {
        Geolocation.getCurrentPosition((position) => {
            console.log(position, "<<<IAM HERE")
            let currentLongitude = JSON.stringify(position.coords.longitude);
            //getting the Latitude from the location json
            let currentLatitude = JSON.stringify(position.coords.latitude);

            let coordinateData = {
                latitude: currentLatitude,
                longitude: currentLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005
            }
            setRegion({
                ["latitude"]: parseFloat(currentLatitude),
                ["longitude"]: parseFloat(currentLongitude),
                ["latitudeDelta"]: 0.005,
                ["longitudeDelta"]: 0.005
            })
        },
            error => { console.log(error) },
            { enableHighAccuracy: true, timeout: 30000, maximumAge: 10000 }
        )
    }

    const getAddressFunction = () => {

        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + region.latitude + "," + region.longitude + "&key=" + "AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU")
            .then((response) => response.json())
            .then((data) => {
                // console.log("Geocode is => ", JSON.stringify(data))
                // this.setState({
                //     address: data.results[0].formatted_address
                // })
                //setAddress(data.results[0].formatted_address)
                // setAddressArray({
                //     ["addressLine1"]: data.results[0].address_components[0].long_name,
                //     ["addressLine2"]: data.results[0].address_components[1].long_name,
                //     ["city"]: data.results[0].address_components[2].long_name,
                //     ["state"]: data.results[0].address_components[4].long_name,
                //     ["pincode"]: parseFloat(data.results[0].address_components[6].long_name),

                // })
                setAddressArray(data.results[0].address_components)
                console.log(JSON.stringify(data.results[0].address_components), "<<<")
            })
    }

    const onRegionChange = (region) => {
        setRegion(region)
        getAddressFunction()
    }

    const setLongitudeLatitudeFunction = () => {
        if (from == 'business') {
            dispatch(setLocationFromMap(region))
            dispatch(setAddressFromMap(addressArray))
            navigation.navigate('BusinessFormScreen')
        } else if (from == 'user') {
            dispatch(setLocationFromMap(region))
            dispatch(setAddressFromMap(addressArray))
            navigation.navigate('UserFormScreen')
        } else if (from == 'userEdit') {
            dispatch(setLocationFromMap(region))
            dispatch(setAddressFromMap(addressArray))
            navigation.navigate('EditProfileScreen')
        } else if (from == 'businessEdit') {
            dispatch(setLocationFromMap(region))
            dispatch(setAddressFromMap(addressArray))
            navigation.navigate('EditBusinessScreen')
        } else if (from == 'header') {
            dispatch(setLocationFromMap(region))
            dispatch(setAddressFromMap(addressArray))
            navigation.navigate('TabNavigation')
        }
    }

    const addNewAddress = async () => {
        try {
            let user_id = await AsyncStorage.getItem('_id')
            let role = await AsyncStorage.getItem('role')
            var data = {
                user_id: user_id,
                role: role,
                latitude: region.latitude,
                longitude: region.longitude,

            }
            var response = await fetch(addNewAddressUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            console.log(responseJson,"SAVED")
            navigation.navigate('TabNavigation')

        } catch (error) { console.log(error) }
    }
    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapView}
                provider={PROVIDER_GOOGLE}
                initialRegion={region}
                showsUserLocation={true}
                loadingEnabled={true}
                showsCompass={false}
                style={{ flex: 1 }}
                onRegionChangeComplete={(region) => onRegionChange(region)}
            >
            </MapView>

            <View pointerEvents="none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 35, height: 35, marginTop: -35 }}>
                    <Icon pointerEvents="none" name={"location-sharp"} size={35} color='black' />
                </View>
            </View>
            {
                from == 'header' ? <View style={{ height: '15%', width: '100%', backgroundColor: '#fff', position: 'absolute', bottom: 0, justifyContent: 'center' }}>
                    <LinearGradient
                        colors={['#4076E5', '#74AEF4']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('0%'), alignSelf: 'center', justifyContent: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={() => addNewAddress()}
                            style={{ height: heightToDp('5%'), width: widthToDp('50%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>ADD NEW LOCATION</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View> : <View style={{ height: '15%', width: '100%', backgroundColor: '#fff', position: 'absolute', bottom: 0, justifyContent: 'center' }}>
                    <LinearGradient
                        colors={['#4076E5', '#74AEF4']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 20, width: widthToDp('80%'), height: heightToDp('5%'), marginTop: heightToDp('0%'), alignSelf: 'center', justifyContent: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={() => setLongitudeLatitudeFunction()}
                            style={{ height: heightToDp('5%'), width: widthToDp('50%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>CONFIRM LOCATION</Text>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            }
        </View>
    )
}