import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'



export default DistanceCalculationComponent = (props) => {
    const [distance, setDistance] = useState(0)
    const getDistanceFromLatLonInKm = async () => {
        const lat2 = props.lat2
        const lon2 = props.lon2
        let lat1 = await AsyncStorage.getItem('latitude')
        let lon1 = await AsyncStorage.getItem('longitude')
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2 - lat1);  // deg2rad below
        var dLon = deg2rad(lon2 - lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        // console.log(d, ";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;")
        setDistance(Math.round(d * 100)/100)
    }

    useEffect(() => {
        async function calculate() {
            await getDistanceFromLatLonInKm()
        }
        calculate()
    }, [props])



    const deg2rad = (deg) => {
        return deg * (Math.PI / 180)
    }
    return (
        <Text style={{ color: 'black' }}>{distance}km</Text>
    )
}