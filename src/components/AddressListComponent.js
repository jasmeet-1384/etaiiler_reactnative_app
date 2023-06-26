import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import DownIcon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default AddressListComponent = ({ item }) => {

    const [location, setLocation] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [active, setActive] = useState({});
    const [checked, setChecked] = React.useState(false);


    useEffect(() => {
        getAddress()
    }, [])

    const getAddress = () => {
        // console.log("https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.state.region.latitude+","+this.state.region.longitude+"&key="+"AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU")
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + item.latitude + "," + item.longitude + "&key=" + "AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU")
            .then((response) => response.json())
            .then((data) => {
                let str = JSON.stringify(data.results[0].formatted_address)
                setLocation(str.split(',')[1])
                setCity(str.split(',')[2])
                setState(JSON.stringify(data.results[0].address_components[3].long_name))
                console.log("Geocode is => ", JSON.stringify(data.results[0].address_components[3].long_name))

            })
    }

    const addressClickedFunction = async () => {
        await AsyncStorage.setItem('latitude', item.latitude)
        await AsyncStorage.setItem('longitude', item.longitude)
        await AsyncStorage.setItem('state', state)
        setChecked(!checked)
    }
    return (
        <View style={{ height: heightToDp('6%'), width: widthToDp('90%'), justifyContent: 'center' }}>
            <TouchableOpacity
                onPress={() => addressClickedFunction()}
            >
                <View style={{ height: heightToDp('6%'), width: widthToDp('90%'), alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ color: 'gray', fontWeight: '600' }}>{location}</Text>
                        <Text style={{ color: 'gray' }}>{city}</Text>
                    </View>
                    {
                        checked ? <DownIcon
                            name='checkcircleo'
                            size={25}
                            color={'black'}
                        /> : null
                    }
                </View>
            </TouchableOpacity>
        </View>
    )
}