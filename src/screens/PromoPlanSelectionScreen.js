import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking , ToastAndroid } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import LocationIcon from 'react-native-vector-icons/Entypo'
import { useIsFocused } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsersApiCall } from '../store/getAllUsers-slice'
import PencilIcon from 'react-native-vector-icons/AntDesign'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { followApiCall } from '../store/follow-slice'
import { unfollowApiCall } from '../store/unFollow-slice'
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent'
import DistanceCalculationComponent from '../components/DistanceCalculationComponent'
import { getPromoPlansUrl } from '../api/apiConstant'
import Header2 from '../components/Header2'
import { Picker } from '@react-native-picker/picker';
import PlusIcon from 'react-native-vector-icons/AntDesign'
import { stateList } from '../components/StateList'


export default PromoPlanSelectionScreen = ({ navigation }) => {

    const [plans, setPlans] = useState([])
    const [state, setStateInput] = useState('')


    useEffect(() => {
        getPlansFunction()
    }, [])

    const getPlansFunction = async () => {
        try {
            var response = await fetch(getPromoPlansUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            var responseJson = await response.json()
            setPlans(responseJson.data)
            console.log(responseJson.data, "<...............")
        } catch (err) {
            console.log(err, "<====== ")
        }
    }

    const goToSummaryPageFunction = (value) => {
        navigation.navigate('PromoPaymentSummaryScreen', { plan: value, state: state })
    }
    return (
        <View style={{ flex: 1 }}>
            <Header2 />
            <FlatList
                data={plans}
                contentContainerStyle={{ paddingBottom: heightToDp('3%') }}
                renderItem={({ item, key }) => {
                    return (
                        <>
                            {
                                item.range == 'State' ?
                                    <View style={{ height: heightToDp('55%'), width: widthToDp('85%'), backgroundColor: 'white', marginTop: heightToDp('2%'), alignSelf: 'center', borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 10 }}>
                                        <View style={{ flexDirection: 'row', height: heightToDp('5%'), width: widthToDp('85%'), backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                            <Text style={{ color: "#2f3334", fontSize: heightToDp('3%'), fontWeight: 'bold' }}>{item.range}</Text>
                                            <Picker
                                                style={{ height: heightToDp('6%'), width: widthToDp('50%'), color: 'black' }}
                                                selectedValue={state}
                                                onValueChange={(itemValue, itemIndex) =>
                                                    setStateInput(itemValue)
                                                }
                                            >
                                                {stateList.map(i => {
                                                    return (
                                                        <Picker.Item label={i.name} value={i.name} />
                                                    )
                                                })}
                                            </Picker>
                                            <PlusIcon
                                                name='caretdown'
                                                color={"#201E6E"}
                                                style={{ marginLeft: widthToDp('-10%') }}
                                            />
                                        </View>
                                        <View style={{ height: heightToDp('40%'), width: widthToDp('75%'), backgroundColor: '#2f3334', marginTop: heightToDp('5%'), borderRadius: 20 }}>
                                            <View style={{ backgroundColor: '#08abee', height: heightToDp('10%'), width: widthToDp('20%'), borderRadius: 200, alignSelf: 'center', top: -40, position: 'absolute', borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                                <Text style={{ color: "#fff", fontSize: heightToDp('2.5%'), fontWeight: 'bold' }}>{item.price}</Text>
                                            </View>
                                            <View style={{ height: heightToDp('30%'), width: widthToDp('65%'), alignSelf: 'center', justifyContent: 'space-evenly', marginTop: heightToDp('5%') }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#fff', height: heightToDp('2%'), width: widthToDp('4%'), borderRadius: 200 }}></View>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), marginLeft: widthToDp('3%') }}>Visible in Home Screen : </Text>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), fontWeight: 'bold' }}>{item.homeScreen} </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#fff', height: heightToDp('2%'), width: widthToDp('4%'), borderRadius: 200 }}></View>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), marginLeft: widthToDp('3%') }}>Visible in Promo Screen : </Text>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), fontWeight: 'bold' }}>{item.promoteScreen} </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#fff', height: heightToDp('2%'), width: widthToDp('4%'), borderRadius: 200 }}></View>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), marginLeft: widthToDp('3%') }}>Visible in Stat Screen : </Text>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), fontWeight: 'bold' }}>{item.statsScreen} </Text>
                                                </View>
                                                {
                                                    state == '' ? <TouchableOpacity 
                                                    onPress={() => {ToastAndroid.show('Please Select A State To Proceed!',ToastAndroid.LONG)}}
                                                    style={{ borderRadius: 200, width: widthToDp('60%'), height: heightToDp('5%'), marginTop: heightToDp('2%'), alignSelf: 'center', justifyContent: 'center', backgroundColor: '#cccccc', alignItems: 'center' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>PURCHASE</Text>
                                                    </TouchableOpacity> : <LinearGradient
                                                        colors={['#4076E5', '#74AEF4']}
                                                        start={{ x: 0, y: 1 }}
                                                        end={{ x: 1, y: 1 }}
                                                        style={{ borderRadius: 20, width: widthToDp('60%'), height: heightToDp('5%'), marginTop: heightToDp('0%'), alignSelf: 'center', justifyContent: 'center' }}
                                                    >
                                                        <TouchableOpacity
                                                            onPress={() => goToSummaryPageFunction(item)}
                                                            style={{ height: heightToDp('5%'), width: widthToDp('60%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                                            <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>PURCHASE</Text>
                                                        </TouchableOpacity>
                                                    </LinearGradient>
                                                }
                                            </View>
                                        </View>
                                    </View> : <View style={{ height: heightToDp('55%'), width: widthToDp('85%'), backgroundColor: 'white', marginTop: heightToDp('2%'), alignSelf: 'center', borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 10 }}>
                                        <Text style={{ color: "#2f3334", fontSize: heightToDp('3%'), fontWeight: 'bold' }}>{item.range}</Text>
                                        <View style={{ height: heightToDp('40%'), width: widthToDp('75%'), backgroundColor: '#2f3334', marginTop: heightToDp('5%'), borderRadius: 20 }}>
                                            <View style={{ backgroundColor: '#08abee', height: heightToDp('10%'), width: widthToDp('20%'), borderRadius: 200, alignSelf: 'center', top: -40, position: 'absolute', borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                                                <Text style={{ color: "#fff", fontSize: heightToDp('2.5%'), fontWeight: 'bold' }}>{item.price}</Text>
                                            </View>
                                            <View style={{ height: heightToDp('30%'), width: widthToDp('65%'), alignSelf: 'center', justifyContent: 'space-evenly', marginTop: heightToDp('5%') }}>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#fff', height: heightToDp('2%'), width: widthToDp('4%'), borderRadius: 200 }}></View>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), marginLeft: widthToDp('3%') }}>Visible in Home Screen : </Text>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), fontWeight: 'bold' }}>{item.homeScreen} </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#fff', height: heightToDp('2%'), width: widthToDp('4%'), borderRadius: 200 }}></View>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), marginLeft: widthToDp('3%') }}>Visible in Promo Screen : </Text>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), fontWeight: 'bold' }}>{item.promoteScreen} </Text>
                                                </View>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ backgroundColor: '#fff', height: heightToDp('2%'), width: widthToDp('4%'), borderRadius: 200 }}></View>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), marginLeft: widthToDp('3%') }}>Visible in Stat Screen : </Text>
                                                    <Text style={{ color: "#fff", fontSize: heightToDp('2%'), fontWeight: 'bold' }}>{item.statsScreen} </Text>
                                                </View>
                                                <LinearGradient
                                                    colors={['#4076E5', '#74AEF4']}
                                                    start={{ x: 0, y: 1 }}
                                                    end={{ x: 1, y: 1 }}
                                                    style={{ borderRadius: 20, width: widthToDp('60%'), height: heightToDp('5%'), marginTop: heightToDp('0%'), alignSelf: 'center', justifyContent: 'center' }}
                                                >
                                                    <TouchableOpacity
                                                        onPress={() => goToSummaryPageFunction(item)}
                                                        style={{ height: heightToDp('5%'), width: widthToDp('60%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                                        <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>{item.price == 'FREE' ? 'POST NOW' : 'PURCHASE'}</Text>
                                                    </TouchableOpacity>
                                                </LinearGradient>
                                            </View>
                                        </View>
                                    </View>
                            }
                        </>
                    )
                }}
            />

        </View>
    )
}