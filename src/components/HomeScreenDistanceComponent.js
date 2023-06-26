import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { getGpsAddressDetailsUrl } from '../api/apiConstant'
import DistanceCalculationComponent from './DistanceCalculationComponent'
import LocationIcon from 'react-native-vector-icons/Entypo'
import { heightToDp, widthToDp } from './Responsive'


const HomeScreenDistanceComponent = ({ role, phoneNumber, item }) => {
    // console.log("dknflvdfvfd ---------------->>>>>>",item)
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [mylatitude, setmyLatitude] = useState('')
    const [mylongitude, setmyLongitude] = useState('')
    const [distance, setDistance] = useState(0)


    const getGpsAddressDetailsFunction = async () => {
        try {
            let lat1 = await AsyncStorage.getItem('latitude')
            let lon1 = await AsyncStorage.getItem('longitude')
            setmyLatitude(lat1)
            setmyLongitude(lon1)
            var data = {
                role: role,
                phoneNumber: phoneNumber
            }
            var response = await fetch(getGpsAddressDetailsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setLatitude(responseJson.data.gpsAddress.latitude)
            setLongitude(responseJson.data.gpsAddress.longitude)
            // console.log(responseJson.data, "<...............GPS")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }

    useEffect(() => {
        async function calculate() {
            await getGpsAddressDetailsFunction()
        }
        calculate()
    }, [distance])
    return (
        <>

            {
                role === 'user' ? <>
                <View
                    
                    style={{ flexDirection: 'row' }}>
                    <LocationIcon
                        name='location'
                        size={12}
                        color={'#707070'}
                        style={{ marginTop: heightToDp('0.5%') }}
                    />
                    <Text style={{ marginLeft: widthToDp('1%'), color: 'gray' }}>{item?.user_id[0]?.state},{item?.user_id[0]?.city}</Text>
                </View>

            </> : <>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(
                            `https://www.google.com/maps/dir/?api=1&origin=` +
                            mylatitude +
                            `,` +
                            mylongitude +
                            `&destination=` +
                            latitude +
                            `,` +
                            longitude +
                            `&travelmode=driving`
                        )}
                        style={{ flexDirection: 'row' }}>
                        <LocationIcon
                            name='location'
                            size={12}
                            color={'#707070'}
                            style={{ marginTop: heightToDp('0.5%') }}
                        />
                        <DistanceCalculationComponent lat2={latitude} lon2={longitude} />
                        <Text style={{ marginLeft: widthToDp('1%'), color: 'gray' }}>{item?.user_id[0]?.state},{item?.user_id[0]?.city}</Text>
                    </TouchableOpacity>

                </>
            }


        </>
    )
}

export default HomeScreenDistanceComponent