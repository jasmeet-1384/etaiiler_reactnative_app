import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import CloseIcon from 'react-native-vector-icons/AntDesign'
import ThreeDotsIcon from 'react-native-vector-icons/Entypo'
import WhatsappIcon from 'react-native-vector-icons/FontAwesome'
import { getPromoPostsUrl } from '../api/apiConstant'
import HomeScreenDistanceComponent from '../components/HomeScreenDistanceComponent'
import FloatingButton from '../components/FloatingButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import LocationIcon from 'react-native-vector-icons/Entypo'
import Header2 from '../components/Header2'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import moment from 'moment';
import PromoHeader from '../components/PromoHeader'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import PromoCardsComponent from '../components/PromoCardsComponent'

export default PromoScreen = () => {
    const isFocused = useIsFocused();

    const [promoPost, setPromoPost] = useState([])
    const [role, setRole] = useState('')
    const [country, setCountry] = useState('')
    const logindetails = useSelector((state) => state.passwordLogin.loginDetails)

    useEffect(() => {
        if (isFocused) {
            getPromoPostFunction()
        }
    }, [isFocused])

    useEffect(() => {
        if(logindetails.data != undefined){
            setCountry(logindetails.data.country)
        }
    },[logindetails])

    const getPromoPostFunction = async () => {
        try {
            let latitude = await AsyncStorage.getItem('latitude')
            let longitude = await AsyncStorage.getItem('longitude')
            let state = await AsyncStorage.getItem('state')

            var data = {
                latitude: latitude,
                longitude: longitude,
                state: state,
                country : country
            }
            var role = await AsyncStorage.getItem('role')
            setRole(role)
            var response = await fetch(getPromoPostsUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setPromoPost(responseJson.data)
            console.log(responseJson.data, "<...............PROMO SCREEN ")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }
    const renderEmpltyComponent = () => {
        return (
            <View style={{ height: heightToDp('90%'), justifyContent: 'center', alignItems: 'center' }}>
                {/* <ActivityIndicatorComponent size="large" color="blue" /> */}
                <Text style={{color:'gray'}}>No promotions available</Text>
            </View>
        )
    }

    const checkDate = (value) => {
        let currentDate = moment(new Date())
        let c = moment(value)
        console.log(currentDate.isBefore(c))

    }

    // const BodyView = ({ item }) => {
    //     const currentDate = moment(new Date())
    //     const fromDate = moment(item.promoFromDate)
    //     const toDate = moment(item.promoToDate)
    //     console.log(currentDate.isSame(fromDate))
    //     return (

    //     )
    // }
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <PromoHeader />
            <FlatList
                data={promoPost}
                ListEmptyComponent={renderEmpltyComponent}
                contentContainerStyle={{ paddingBottom: heightToDp('5%') }}
                renderItem={({ item }) => {
                    return (
                        <PromoCardsComponent item={item}/>
                    )
                }}
            />
            <FloatingButton userRole={role} />

        </View>
    )
}