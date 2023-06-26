import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking, ToastAndroid, ScrollView } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import Header2 from '../components/Header2'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getDiscountPlansUrl, getPaymentOrderIdUrl, getPaymentUrl, getRazorpayDetailsUrl, profileUrlBusiness, uploadImageToDBUrl } from '../api/apiConstant'
import CheckIcon from 'react-native-vector-icons/AntDesign'
import DiscountComponent from '../components/DiscountComponent'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import moment from 'moment';
import RazorpayCheckout from 'react-native-razorpay';
import {
    CFCallback,
    CFErrorResponse,
    CFPaymentGatewayService,
} from 'react-native-cashfree-pg-sdk';
import {
    CFDropCheckoutPayment,
    CFEnvironment,
    CFSession,
    CFThemeBuilder,
    CFPaymentComponentBuilder,
    CFPaymentModes
} from 'cashfree-pg-api-contract';
import { addAmount, addDisAmt, addGrandTotal, addGst, addTime } from '../store/storePaymentDetails-slice'

export default PromoPaymentSummaryScreen = ({ route, navigation }) => {
    const { plan, state } = route.params
    const [animating, setanimating] = useState(false)
    const [available, setavailable] = useState(false)
    const [coupon, setCoupon] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [discountAmount, setDiscountAmount] = useState(0)
    const [gst, setGst] = useState(0)
    const [grandTotal, setGrandTotal] = useState(0)
    const [adFee, setAdFee] = useState({})
    const [discountPlans, setDiscountPlans] = useState([])
    const dispatch = useDispatch()
    const postDetail = useSelector((state) => state.promoPostDetails.postDetails)

    useEffect(() => {
        getDiscountPlansFunction()
        checkTimeDifferenceFunction()
        getProfileData()
    }, [])

    useEffect(() => {
        calculationFunction()
    }, [adFee])

    useEffect(() => {
        setGrandTotal(grandTotal)
        dispatch(addGrandTotal(grandTotal))
        dispatch(addTime((Math.round(adFee.hours * 100) / 100).toFixed(2)))
        dispatch(addAmount((Math.round(adFee.price * 100) / 100).toFixed(2)))
        dispatch(addGst(gst))
        dispatch(addDisAmt(discountAmount))
    }, [grandTotal])

    useEffect(() => {
        CFPaymentGatewayService.setCallback({
            onVerify(orderID) {
                console.log('orderId is :' + orderID);
                setanimating(true)
                verifyPaymentFunction(orderID)
            },
            onError(error, orderID) {
                console.log(
                    'exception is : ' + JSON.stringify(error) + '\norderId is :' + orderID
                );
                ToastAndroid.show(error.message, ToastAndroid.LONG)
            }
        })
    }, [])

    const verifyPaymentFunction = async (value) => {
        try {
            var response = await fetch(`https://api.cashfree.com/pg/orders/${value}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'x-client-id': '2441746bae1d0b7cbe40fb92cb471442',
                    'x-client-secret': '12622bce637a372a118a3b34a2ddd7eeeb32c118',
                    'x-api-version': '2022-01-01'
                }
            })
            var responseJson = await response.json()
            // savePaymentDetailsInDBFunction(responseJson)
            buyPlanAndPublish()
            console.log(responseJson, "<<<<<")
        } catch (error) { console.log(error) }
    }

    const getDiscountPlansFunction = async () => {
        try {


            var response = await fetch(getDiscountPlansUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            var responseJson = await response.json()
            setDiscountPlans(responseJson.data)
            console.log(responseJson.data, ">>>>>>>>>>>>????????????????????DISCOUNT")
        } catch (err) {
            console.log(err, "<====== upload picture")
        }
    }

    const buyPlanAndPublish = async () => {
        console.log(plan, "POST")
        try {
            setanimating(true)
            const user_id = await AsyncStorage.getItem('_id')
            const role = await AsyncStorage.getItem('role')
            let home = plan.homeScreen == 'Yes' ? true : false
            let range = plan.range
            var data = {
                user_id: user_id,
                image: postDetail.image,
                role: role,
                postType: postDetail.postType,
                promoFromhrs: postDetail.promoFromhrs,
                promoTohrs: postDetail.promoToHrs,
                promoFromDate: postDetail.promoFromDate,
                promoToDate: postDetail.promoToDate,
                promoOfferDetails: postDetail.promoOfferDetails,
                promoLink: postDetail.promoLink,
                promoTotalPayable: postDetail.promoTotalPayable,
                homeScreen: home,
                range: plan.range,
                promoPlanState: state
            }

            var response = await fetch(uploadImageToDBUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            navigation.reset({
                index: 0,
                routes: [{ name: 'CheckoutScreen' }]
            })
            setanimating(false)
            console.log(responseJson.data, ">>>>>>>>>>>>????????????????????")
        } catch (err) {
            console.log(err, "<====== upload picture")
        }
    }

    const checkAvailableCoupon = () => {
        for (let i = 0; i < discountPlans.length; i++) {
            if (discountPlans[i].discountName == coupon) {
                setavailable(true)
                if (discountPlans[i].discountName == 'DIS30') {
                    let disAmt = (adFee.price / 100) * 30
                    setDiscountAmount(disAmt)
                    setGrandTotal(Math.round(grandTotal - disAmt))
                } else {
                    let disAmt = (adFee.price / 100) * 50
                    setDiscountAmount(disAmt)
                    setGrandTotal(Math.round(grandTotal - disAmt))
                }
            } else {
                ToastAndroid.show("No coupon availble by such name!", ToastAndroid.LONG)
            }
        }
    }

    const checkTimeDifferenceFunction = async () => {
        // const startTime = new Date(`${postDetail.promoFromDate} ${postDetail.promoFromhrs}`).getTime()
        // const endTime = new Date(`${postDetail.promoToDate} ${postDetail.promoToHrs}`).getTime()
        // const difference = endTime - startTime
        // console.log((difference/60000)/60)
        // console.log(plan)
        try {

            var data = {
                promoFromDate: postDetail.promoFromDate,
                promoFromhrs: postDetail.promoFromhrs,
                promoToDate: postDetail.promoToDate,
                promoToHrs: postDetail.promoToHrs,
                range: plan.range
            }

            var response = await fetch(getPaymentUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            var responseJson = await response.json()
            setAdFee(responseJson.data)
            calculationFunction()
            console.log(responseJson, "TAKA TAKA TAKA")
        } catch (err) {
            console.log(err, "<====== upload picture")
        }
    }
    const calculationFunction = () => {
        // setGrandTotal(adFee.price + 500)
        var total = adFee.price - discountAmount
        var gstCal = (total * 18) / 100
        var grandTotal = Math.round(total + gstCal)
        setGst(gstCal)
        setGrandTotal(grandTotal)
    }

    const getProfileData = async () => {
        let userId = await AsyncStorage.getItem('_id')
        var response = await fetch(profileUrlBusiness, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: userId
            })
        })
        const res = await response.json()
        console.log("Profile res => ", res.data.phoneNumber)
        setName(res.data.name)
        setPhoneNumber(res.data.phoneNumber)
    }

    const generateOrderIdFunction = async () => {
        let user_id = await AsyncStorage.getItem('_id')
        let phoneNumber = await AsyncStorage.getItem('phoneNumber')
        // dispatch(addGrandTotal(grandTotal))
        // dispatch(addTime((Math.round(adFee.hours * 100) / 100).toFixed(2)))
        // dispatch(addAmount((Math.round(adFee.price * 100) / 100).toFixed(2)))
        // dispatch(addGst(gst))
        // dispatch(addDisAmt(discountAmount))
        await AsyncStorage.setItem('total',(grandTotal).toString())
        await AsyncStorage.setItem('addTime',((Math.round(adFee.hours * 100) / 100).toFixed(2)).toString())
        await AsyncStorage.setItem('addAmount',((Math.round(adFee.price * 100) / 100).toFixed(2)).toString())
        await AsyncStorage.setItem('gst',(gst).toString())
        await AsyncStorage.setItem('discountAmount',(discountAmount).toString())
        if (plan.price == 'FREE') {
            buyPlanAndPublish()
        } else {
            try {
                var data = {
                    amount: grandTotal,
                    userId: user_id,
                    phoneNumber: phoneNumber
                }
                var response = await fetch(getPaymentOrderIdUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                var responseJson = await response.json()
                // checkoutFunction(responseJson.data.id, grandTotal * 100)
                checkoutFunction(responseJson.data.order_token, responseJson.data.order_id)
                console.log(responseJson, "<...............ORDERID")
            } catch (err) {
                console.log(err, "<====== ")
            }
        }

    }

    const checkoutFunction = async (order_token, order_id) => {
        // var options = {

        //     currency: '₹',
        //     key: 'rzp_test_Fxjkta891p06jg',
        //     amount: total,
        //     name: name,
        //     order_id: orderId,//Replace this with an order_id created using Orders API.
        //     prefill: {
        //         contact: phoneNumber,
        //         name: name
        //     },
        //     theme: { color: '#4076E5' }
        // }
        // RazorpayCheckout.open(options).then((data) => {
        //     console.log(`Success: ${data.razorpay_signature}`)
        //     savePaymentDetailsInDBFunction(data)
        // }).catch((error) => {
        //     console.log(`Error: ${error.code} | ${error.description}`)
        // })
        try {
            const session = new CFSession(
                order_token,
                order_id,
                CFEnvironment.PRODUCTION
            );
            const paymentModes = new CFPaymentComponentBuilder()
                .add(CFPaymentModes.CARD)
                .add(CFPaymentModes.UPI)
                .add(CFPaymentModes.NB)
                .add(CFPaymentModes.WALLET)
                .add(CFPaymentModes.PAY_LATER)
                .build();
            const theme = new CFThemeBuilder()
                .setNavigationBarBackgroundColor('#E64A19')
                .setNavigationBarTextColor('#FFFFFF')
                .setButtonBackgroundColor('#FFC107')
                .setButtonTextColor('#FFFFFF')
                .setPrimaryTextColor('#212121')
                .setSecondaryTextColor('#757575')
                .build();
            const dropPayment = new CFDropCheckoutPayment(session, paymentModes, theme);
            CFPaymentGatewayService.doPayment(dropPayment);

        } catch (error) { console.log(error) }
    }

    const savePaymentDetailsInDBFunction = async (data) => {
        try {
            // const user_id = await AsyncStorage.getItem('_id')
            // const role = await AsyncStorage.getItem('role')
            // let home = plan.homeScreen == 'Yes' ? true : false
            // var data = {
            //     razorpay_order_id: data.order_id,
            //     razorpay_payment_id: data.cf_order_id,
            //     razorpay_signature: data.order_status,
            //     amount: grandTotal,
            //     user_id: user_id,
            //     image: postDetail.image,
            //     role: role,
            //     postType: postDetail.postType,
            //     promoFromhrs: postDetail.promoFromhrs,
            //     promoTohrs: postDetail.promoToHrs,
            //     promoFromDate: postDetail.promoFromDate,
            //     promoToDate: postDetail.promoToDate,
            //     promoOfferDetails: postDetail.promoOfferDetails,
            //     promoLink: postDetail.promoLink,
            //     promoTotalPayable: postDetail.promoTotalPayable,
            //     homeScreen: home,
            //     range: plan.range,
            //     promoPlanState: state
            // }
            // var response = await fetch(getRazorpayDetailsUrl, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify(data)
            // })

            // var responseJson = await response.json()
            // console.log(responseJson.data, "<...............ORDERID")
            // setanimating(false)
            navigation.reset({
                index: 0,
                routes: [{ name: 'CheckoutScreen' }]
            })

            // navigation.navigate('CheckoutScreen')
        } catch (err) {
            console.log(err, "<====== ")
        }
        // console.log(data,"AFTER PAYENTJSSSSSSSA")
    }

    const resetDiscountAmountFunction = (value) => {
        var total = adFee.price + discountAmount + gst
        setCoupon(value)
        setavailable(false)
        setGrandTotal(Math.round(total))
    }
    return (
        <KeyboardAwareScrollView extraHeight={100} style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <Header2 />
                    <View style={{ height: heightToDp('90%'), width: widthToDp('100%'), backgroundColor: 'white', justifyContent: 'center' }}>
                        <Text style={{ color: "#2f3334", fontSize: heightToDp('3%'), fontWeight: '500', alignSelf: 'center' }}>YOUR PAYMENT SUMMARY</Text>
                        <View style={{ backgroundColor: '#d7d7d7', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('3%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                            <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('45%') }}>From :- {postDetail.promoFromhrs} hrs / {postDetail.promoFromDate}</Text>
                            <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('45%') }}>To :- {postDetail.promoToHrs} hrs /{postDetail.promoToDate}</Text>
                            {/* <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('18%') }}>Time(Hrs)</Text>
                        <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('18%') }}>Amount(INR)</Text> */}
                        </View>
                        <View style={{ backgroundColor: '#d7d7d7', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('3%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 20 }}>
                            {/* <Text style={{ color: 'black', height: heightToDp('3%'), width: widthToDp('25%') }}>Description</Text>
                            <Text style={{ color: 'black', height: heightToDp('3%'), width: widthToDp('25%') }}>Time(Hrs)</Text>
                            <Text style={{ color: 'black', height: heightToDp('3%'), width: widthToDp('25%') }}>Amount(₹)</Text> */}
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
                        <View style={{ backgroundColor: '#fff', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 20 }}>
                            {/* <Text style={{ color: 'black', height: heightToDp('6%'), width: widthToDp('20%'), marginLeft: widthToDp('5%'), marginRight: widthToDp('10%'), padding: 10 }}>Advertising Fees</Text>
                            <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('30%') }}>{(Math.round(adFee.hours * 100) / 100).toFixed(2)} hrs</Text>
                            <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('30%') }}>₹ {(Math.round(adFee.price * 100) / 100).toFixed(2)}</Text> */}
                            <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black' }}>Advertising Fees</Text>
                            </View>
                            <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black' }}>{(Math.round(adFee.hours * 100) / 100).toFixed(2)} hrs</Text>
                            </View>
                            <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black' }}>₹ {(Math.round(adFee.price * 100) / 100).toFixed(2)}</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#fff', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            {/* <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('18%') }}>IGST(18%)</Text>
                            <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('18%') }}></Text>
                            <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('18%') }}>₹ {gst}</Text> */}
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
                        {/* <View style={{ backgroundColor: '#fff', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('2%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            <Text style={{ color: 'black', height: heightToDp('6%'), width: widthToDp('18%') }}>Rounded off to</Text>
                            <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('18%') }}></Text>
                            <Text style={{ color: 'black', height: heightToDp('4%'), width: widthToDp('18%') }}>₹ {grandTotal}</Text>
                        </View> */}
                        <View style={{ backgroundColor: '#d7d7d7', height: heightToDp('7%'), width: widthToDp('100%'), marginTop: heightToDp('3%'), flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                            {/* <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('50%'), fontWeight: '700' }}>GRAND TOTAL:</Text>
                            <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('18%') }}></Text>
                            <Text style={{ color: 'black', height: heightToDp('2%'), width: widthToDp('18%') }}>₹ {plan.price == 'FREE' ? 0 : grandTotal}</Text> */}
                            <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black', fontWeight: '700' }}>GRAND TOTAL:</Text>
                            </View>
                            <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black' }}></Text>
                            </View>
                            <View style={{ height: heightToDp('7%'), width: widthToDp('33.33%'), justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: 'black' }}>₹ {plan.price == 'FREE' ? 0 : grandTotal}</Text>
                            </View>
                        </View>
                        {
                            plan.range == '0-10 kms' ? null : <View style={{ height: heightToDp('10%'), width: widthToDp('100%'), justifyContent: 'center', alignItems: 'center' }}>
                                <View style={{ height: heightToDp('6%'), width: widthToDp('85%'), borderWidth: 1, borderRadius: 200, alignItems: 'center', flexDirection: 'row' }}>
                                    <TextInput
                                        placeholder='Apply Coupons'
                                        placeholderTextColor={"grey"}
                                        style={{ color: 'black', height: heightToDp('6%'), width: widthToDp('60%') }}
                                        onChangeText={(text) => resetDiscountAmountFunction(text)}
                                    />
                                    <TouchableOpacity
                                        onPress={() => checkAvailableCoupon()}
                                        style={{ height: heightToDp('6%'), width: widthToDp('25%'), justifyContent: 'center', alignItems: 'center' }}>
                                        {
                                            available ? <CheckIcon
                                                name='check'
                                                size={25}
                                                color={'black'}
                                            /> : <Text style={{ color: 'blue' }}>Apply</Text>
                                        }
                                    </TouchableOpacity>
                                </View>

                            </View>
                        }

                        <Text style={{ color: 'red', alignSelf: 'center', marginTop: heightToDp('2%') }}>*Orders once placed cannot be cancelled and are non-refundable</Text>
                        <View style={{ flexDirection: 'row', width: widthToDp('45%'), alignSelf: 'center', justifyContent: 'space-between', marginTop: heightToDp('1.5%') }}>
                            <TouchableOpacity
                                // onPress={() => navigation.navigate('TermsAndConditionScreen')}
                                onPress={() => Linking.openURL(`https://haastag.com/terms`)}
                            >
                                <Text style={{ textDecorationLine: 'underline', color: 'gray' }}>Terms of Service </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                // onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                                onPress={() => Linking.openURL(`https://haastag.com/privacy`)}
                            >
                                <Text style={{ textDecorationLine: 'underline', color: 'gray' }}>Privacy Policy </Text>
                            </TouchableOpacity>
                        </View>

                        <LinearGradient
                            colors={['#4076E5', '#74AEF4']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{ borderRadius: 20, width: widthToDp('60%'), height: heightToDp('5%'), marginTop: heightToDp('6%'), alignSelf: 'center', justifyContent: 'center' }}
                        >
                            {
                                animating ? <ActivityIndicatorComponent size="small" color="#ffff" /> : <TouchableOpacity
                                    // onPress={() => buyPlanAndPublish()}
                                    onPress={() => generateOrderIdFunction()}
                                    // onPress={() => savePaymentDetailsInDBFunction()}
                                    // onPress={() => calculationFunction()}
                                    style={{ height: heightToDp('5%'), width: widthToDp('60%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>{plan.price == 'FREE' ? 'POST NOW' : 'PAY NOW'}</Text>
                                </TouchableOpacity>
                            }
                        </LinearGradient>
                    </View>
                    <View style={{ height: 100 }}></View>
                </View>
            </ScrollView>
        </KeyboardAwareScrollView>
    )
}