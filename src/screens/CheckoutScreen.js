import React, { useEffect, useState } from 'react'
import { View, Button, Text, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { heightToDp, widthToDp } from '../components/Responsive'
import CheckIcon from 'react-native-vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default CheckoutScreen = ({ route, navigation }) => {
    // const { grandTotal, adFee, discountAmount } = route.params
    // const gst = useSelector((state) => state.payment.gst)
    // const grandTotal = useSelector((state) => state.payment.grandTotal)
    // const time = useSelector((state) => state.payment.time)
    // const amount = useSelector((state) => state.payment.amount)
    // const disAmount = useSelector((state) => state.payment.disAmt)

    const [gst,setGst] = useState('')
    const [grandTotal,setGrandTotal] = useState('')
    const [time,setTime] = useState('')
    const [amount,setAmount] = useState('')
    const [disAmount,setDisAmount] = useState('')

    useEffect(() => {
        setAmountsFunction()
    },[])

    const setAmountsFunction = async() =>{
        let gst = await AsyncStorage.getItem('gst')
        let total = await AsyncStorage.getItem('total')
        let addTime = await AsyncStorage.getItem('addTime')
        let addAmount = await AsyncStorage.getItem('addAmount')
        let discountAmount = await AsyncStorage.getItem('discountAmount')

        setGrandTotal(total)
        setGst(gst)
        setTime(addTime)
        setAmount(addAmount)
        setDisAmount(discountAmount)
    }

    return (
        <View>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Header2 />
                <View style={{ height: heightToDp('80%'), width: widthToDp('100%'), backgroundColor: 'white', justifyContent: 'center' }}>
                    <Text style={{ color: "#2f3334", fontSize: heightToDp('3%'), fontWeight: '500', alignSelf: 'center' }}>YOUR PAYMENT SUMMARY</Text>
                    <View style={{ backgroundColor: '#d7d7d7', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('3%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>Description</Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>Time(Hrs)</Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>Amount(₹)</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>Advertising Fees</Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>{time} hrs</Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>₹ {(amount)}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>IGST(18%)</Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}></Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>₹ {gst}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#fff', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {/* <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('18%') }}>IGST(18%)</Text>
                        <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('18%') }}></Text>
                        <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('18%') }}>Rs 500</Text> */}
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontWeight: '700' }}>Discount</Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}></Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>₹ {disAmount}</Text>
                        </View>
                    </View>
                    <View style={{ backgroundColor: '#d7d7d7', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('3%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                        {/* <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('25%'), fontWeight: '700' }}>GRAND TOTAL:</Text>
                        <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('18%') }}></Text>
                        <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('18%') }}>Rs {grandTotal}</Text> */}
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black', fontWeight: '700' }}>GRAND TOTAL:</Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}></Text>
                        </View>
                        <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'black' }}>₹ {grandTotal}</Text>
                        </View>
                    </View>

                    <LinearGradient
                        colors={['#4076E5', '#74AEF4']}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}
                        style={{ borderRadius: 20, width: widthToDp('60%'), height: heightToDp('5%'), marginTop: heightToDp('6%'), alignSelf: 'center', justifyContent: 'center' }}
                    >
                        <TouchableOpacity
                            onPress={() => navigation.reset({
                                index: 0,
                                routes: [{ name: 'TabNavigation' }]
                            })}
                            style={{ width: widthToDp('60%'), height: heightToDp('5%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Text style={{ color: 'white', fontSize: widthToDp('4%'), fontWeight: 'bold' }}>Payment Success</Text>
                            <CheckIcon
                                name='checkcircleo'
                                size={25}
                                color={'white'}
                            />
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
        </View>
    )
}