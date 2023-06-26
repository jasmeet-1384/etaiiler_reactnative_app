import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking, Modal, TouchableWithoutFeedback } from 'react-native'
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
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import { RadioButton } from 'react-native-paper'
import ReportIcon from 'react-native-vector-icons/Octicons'
import AntDesign from 'react-native-vector-icons/AntDesign'

export default PromoCardsComponent = ({ item }) => {
    console.log("Testing Sponsor ---------------->>>>>>>>>>>>>>>>",item)
    const navigation = useNavigation();
    const [userId , setUserId] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [ showReport, setShowReport ] = useState(false)
    const [ cartVisible, setCartVisible ] = useState(false)
    const [ checked, setChecked ] = useState(false)

    useEffect(() => {
        setUserIdFunction()
    },[])
    const setUserIdFunction = async() => {
        const userId = await AsyncStorage.getItem("_id")
        setUserId(userId)
    }
    const compareTime = (item) => {
        var date1 = new Date('May 26 2022 01:59')
        var date2 = new Date(`${item.promoFromDate} ${item.promoFromhrs}`)
        console.log(new Date().getTime() >= date1.getTime())
    }

    const accountList = [
        {
            key:'1',
            name: 'Spam and scams'
        },
        {
            key:'2',
            name: 'Sexually inappropriate'
        },
        {
            key:'3',
            name: 'Offensive'
        },
        {
            key:'4',
            name: 'Violence'
        },
        {
            key:'5',
            name: 'Prohibited content'
        },
        {
            key:'6',
            name: 'Fake news'
        },
        {
            key:'7',
            name: 'Abusive or hateful'
        },
        {
            key:'8',
            name: 'Political candidate or issue'
        },
        {
            key:'9',
            name: 'Something else'
        },
    ]

    const account = () => {
        return accountList.map((item) => {
            return(
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Octicons name='arrow-right' size={widthToDp(4.7)} color={'grey'}/>
                        <Text style={{color:'#292929',fontSize:widthToDp(4),paddingLeft:widthToDp(2)}}>{item.name}</Text>
                    </View>
                    <RadioButton 
                        value= "checked"
                        status={ checked == item.key ? 'checked' : 'unchecked' }
                        onPress={() => setChecked(item.key)}
                        uncheckedColor="black"
                        color="#240471"
                    />
                </View>
            )
        })
    }

    return (
        <>
            {/* {
                moment(item.promoFromDate).isSame(moment(new Date())) ?
                    <View style={{ height: heightToDp('55%'), width: widthToDp('100%'), marginTop: heightToDp('3%'), backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', height: heightToDp('8%'), width: widthToDp('90%'), alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={{ uri: item.user_id.image }}
                                        style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('0%') }}
                                    />
                                    <Text style={{ color: 'black', fontSize: heightToDp('3%'), marginLeft: widthToDp('4%') }}>{item.user_id.name}</Text>

                                </View>
                                <HomeScreenDistanceComponent phoneNumber={item.user_id.phoneNumber} role={item.user_id.role} item={item} />
                            </View>
                            <ThreeDotsIcon
                                name='dots-three-vertical'
                                size={20}
                                color='black'
                            />
                        </View>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', height: heightToDp('45%'), width: widthToDp('95%'), alignSelf: 'center', borderRadius: 20 }}>

                            <ImageBackground
                                source={{ uri: item.image }}
                                style={{ height: heightToDp('35%'), width: widthToDp('95%') }}
                                imageStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
                            >
                                <View style={{ height: heightToDp('4%'), width: widthToDp('10%'), marginTop: heightToDp('1%') }}>

                                    <View
                                        style={{ height: heightToDp('4%'), width: widthToDp('24%'), alignSelf: 'flex-end', left: 1, position: 'absolute', borderTopRightRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderTopLeftRadius: 7, backgroundColor: 'rgba(0,0,0,0.2)' }}
                                    >
                                        <Text style={{ color: 'rgba(225,225,225,0.9)' }}>Sponsored </Text>

                                    </View>
                                </View>
                                <CloseIcon
                                    name='close'
                                    size={30}
                                    color='white'
                                    style={{ right: 15, position: 'absolute', marginTop: heightToDp('2%') }}
                                />
                                <LinearGradient
                                    colors={['#4076E5', '#74AEF4']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ height: heightToDp('4%'), width: widthToDp('30%'), alignSelf: 'flex-end', bottom: 20, position: 'absolute', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                >
                                    <LocationIcon
                                        name='globe'
                                        size={12}
                                        color={'#fff'}
                                        style={{ marginRight: widthToDp('1%') }}
                                    />
                                    <TouchableOpacity
                                        // onPress={() => Linking.openURL(`https://${item.promoLink}`)}
                                        onPress={() => compareTime(item)}

                                    >
                                        <Text style={{ color: 'white' }}>Explore Now</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                            </ImageBackground>
                            <View style={{ flexDirection: 'row', height: heightToDp('10%'), width: widthToDp('80%'), alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', fontSize: heightToDp('3%') }}>{item.promoOfferDetails}</Text>
                                <LinearGradient
                                    colors={['#67C401', '#7BFE6E']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ borderRadius: 200, width: widthToDp('8%'), height: heightToDp('4%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: widthToDp('3%'), marginTop: heightToDp('0.5%') }}
                                >
                                    <TouchableOpacity style={{ width: widthToDp('8%'), height: heightToDp('4%'), justifyContent: 'center', alignItems: 'center' }} onPress={() => Linking.openURL(`https://wa.me/+91${item.user_id.phoneNumber}`)}>
                                        <WhatsappIcon
                                            name='whatsapp'
                                            size={15}
                                            color={'white'}
                                            style={{ marginLeft: widthToDp('0%') }}
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </View> :
                    moment(item.promoToDate).isAfter(moment(new Date)) ? <View style={{ height: heightToDp('55%'), width: widthToDp('100%'), marginTop: heightToDp('3%'), backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', height: heightToDp('8%'), width: widthToDp('90%'), alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        source={{ uri: item.user_id.image }}
                                        style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('0%') }}
                                    />
                                    <Text style={{ color: 'black', fontSize: heightToDp('3%'), marginLeft: widthToDp('4%') }}>{item.user_id.name}</Text>

                                </View>
                                <HomeScreenDistanceComponent phoneNumber={item.user_id.phoneNumber} role={item.user_id.role} item={item} />
                            </View>
                            <ThreeDotsIcon
                                name='dots-three-vertical'
                                size={20}
                                color='black'
                            />
                        </View>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', height: heightToDp('45%'), width: widthToDp('95%'), alignSelf: 'center', borderRadius: 20 }}>

                            <ImageBackground
                                source={{ uri: item.image }}
                                style={{ height: heightToDp('35%'), width: widthToDp('95%') }}
                                imageStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
                            >
                                <View style={{ height: heightToDp('4%'), width: widthToDp('10%'), marginTop: heightToDp('1%') }}>

                                    <View
                                        style={{ height: heightToDp('4%'), width: widthToDp('24%'), alignSelf: 'flex-end', left: 1, position: 'absolute', borderTopRightRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderTopLeftRadius: 7, backgroundColor: 'rgba(0,0,0,0.2)' }}
                                    >
                                        <Text style={{ color: 'rgba(225,225,225,0.9)' }}>Sponsored </Text>

                                    </View>
                                </View>
                                <CloseIcon
                                    name='close'
                                    size={30}
                                    color='white'
                                    style={{ right: 15, position: 'absolute', marginTop: heightToDp('2%') }}
                                />
                                <LinearGradient
                                    colors={['#4076E5', '#74AEF4']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ height: heightToDp('4%'), width: widthToDp('30%'), alignSelf: 'flex-end', bottom: 20, position: 'absolute', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                >
                                    <LocationIcon
                                        name='globe'
                                        size={12}
                                        color={'#fff'}
                                        style={{ marginRight: widthToDp('1%') }}
                                    />
                                    <TouchableOpacity
                                        //onPress={() => Linking.openURL(`https://${item.promoLink}`)}
                                        onPress={() => compareTime(item)}
                                    >
                                        <Text style={{ color: 'white' }}>Explore Now</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                            </ImageBackground>
                            <View style={{ flexDirection: 'row', height: heightToDp('10%'), width: widthToDp('80%'), alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', fontSize: heightToDp('3%') }}>{item.promoOfferDetails}</Text>
                                <LinearGradient
                                    colors={['#67C401', '#7BFE6E']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ borderRadius: 200, width: widthToDp('8%'), height: heightToDp('4%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: widthToDp('3%'), marginTop: heightToDp('0.5%') }}
                                >
                                    <TouchableOpacity style={{ width: widthToDp('8%'), height: heightToDp('4%'), justifyContent: 'center', alignItems: 'center' }} onPress={() => Linking.openURL(`https://wa.me/+91${item.user_id.phoneNumber}`)}>
                                        <WhatsappIcon
                                            name='whatsapp'
                                            size={15}
                                            color={'white'}
                                            style={{ marginLeft: widthToDp('0%') }}
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </View> : null
            } */}

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
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', height: heightToDp('15%'), width: widthToDp('100%'), bottom: 0, position: 'absolute', borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
                            <View style={{ width: widthToDp('85%'), alignSelf: 'center', marginTop: heightToDp('2.5%') }}>
                                <TouchableOpacity onPress={() => {setShowReport(true) ; setModalVisible(false)}} style={{flexDirection:'row',alignItems:'center'}}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('4%'), width: widthToDp('8.5%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <ReportIcon
                                            name='report'
                                            size={15}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{color:'black',fontSize:widthToDp(4.5),paddingLeft:widthToDp(2)}}>Report this Post</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{flexDirection:'row',alignItems:'center',marginTop:heightToDp('1.5%')}}>
                                    <View style={{ backgroundColor: 'gray', height: heightToDp('4%'), width: widthToDp('8.5%'), borderRadius: 200, justifyContent: 'center', alignItems: 'center' }}>
                                        <AntDesign
                                            name='link'
                                            size={15}
                                            color={'black'}
                                        />
                                    </View>
                                    <Text style={{color:'black',fontSize:widthToDp(4.5),paddingLeft:widthToDp(2)}}>Share Link</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            <Modal
                animationType='fade'
                transparent={true}
                visible={showReport}
                onRequestClose={() => {
                    setShowReport(!showReport);
                }}
            >
                <TouchableOpacity
                    onPress={() => setShowReport(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', width: widthToDp('90%'), borderRadius: 20,padding: widthToDp(4)}}>
                        
                            <Text style={{color:'#292929',fontSize:widthToDp(5)}}>Please Specify the reason for reporting posts:</Text>

                            {account()}
                            
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'flex-end',marginTop:heightToDp(2)}}>
                                <TouchableOpacity onPress={() => {setCartVisible(true) ; setShowReport(false)}} style={{width:widthToDp(20),height:heightToDp(5),backgroundColor:'#240471',alignItems:'center',justifyContent:'center',borderRadius: widthToDp(4)}}>
                                    <Text style={{color:'#fff'}}>Submit</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>
            
            <Modal
                animationType='fade'
                transparent={true}
                visible={cartVisible}
                onRequestClose={() => {
                    setCartVisible(!cartVisible);
                }}
            >
                <TouchableOpacity
                    onPress={() => setCartVisible(false)}
                    style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableWithoutFeedback>
                        <View style={{ backgroundColor: 'white', width: widthToDp('85%'), borderRadius: 20, alignItems:'center',padding:widthToDp(4)}}>
                            <Text style={{color:'#292929',fontSize:widthToDp(4.5),textAlign:'center'}}>Thank you for submitting report and will notify you of our action after reviewing your report</Text>
                            {/* <TouchableOpacity onPress={() => setCartVisible(false)} style={{width:widthToDp(15),height:heightToDp(5),backgroundColor:'#240471',borderRadius:widthToDp(2),alignItems:'center',justifyContent:'center'}}>
                                <Text style={{color:'#fff',fontSize:widthToDp(4.5)}}>Ok</Text>
                            </TouchableOpacity> */}
                        </View>
                    </TouchableWithoutFeedback>
                </TouchableOpacity>
            </Modal>

            {
                new Date().getTime() >= new Date(`${item.promoFromDate} ${item.promoFromhrs}`).getTime() && new Date().getTime() <= new Date(`${item.promoToDate} ${item.promoTohrs}`).getTime() ?
                    <View style={{ height: heightToDp('65%'), width: widthToDp('100%'), marginTop: heightToDp('2%'), backgroundColor: 'white' }}>
                        <View style={{ flexDirection: 'row', width: widthToDp('90%'), alignSelf: 'center', justifyContent: 'space-between', alignItems: 'center',margin:heightToDp(1) }}>
                            <View>
                                <TouchableOpacity
                                onPress={() => item.user_id._id === userId ? navigation.navigate('Profile') : navigation.navigate('ExploreDetailsScreen', { profileData: item.user_id })}
                                // onPress={() => console.log(userId)}
                                >
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image
                                            source={{ uri: item.user_id.image }}
                                            style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginLeft: widthToDp('0%') }}
                                        />
                                        <Text style={{ color: 'black', fontSize: heightToDp('3%'), marginLeft: widthToDp('4%') }}>{item.user_id.name}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Linking.openURL(
                                    `https://www.google.com/maps/dir/?api=1&origin=` +
                                    mylatitude +
                                    `,` +
                                    mylongitude +
                                    `&destination=` +
                                    item.gpsAddress.latitude +
                                    `,` +
                                    item.gpsAddress.longitude +
                                    `&travelmode=driving`
                                )}
                                >
                                    <HomeScreenDistanceComponent phoneNumber={item?.user_id[0]?.phoneNumber} role={item?.user_id[0]?.role} item={item} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <ThreeDotsIcon
                                    name='dots-three-vertical'
                                    size={20}
                                    color='black'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ backgroundColor: 'rgba(0,0,0,0.6)', height: heightToDp('55%'), width: widthToDp('95%'), alignSelf: 'center', borderRadius: 20 }}>

                            <ImageBackground
                                source={{ uri: item.image }}
                                style={{ height: heightToDp('45%'), width: widthToDp('95%') }}
                                imageStyle={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
                            >
                                <View style={{ height: heightToDp('4%'), width: widthToDp('10%'), marginTop: heightToDp('1%') }}>

                                    <View
                                        style={{ height: heightToDp('4%'), width: widthToDp('24%'), alignSelf: 'flex-end', left: 1, position: 'absolute', borderTopRightRadius: 20, borderBottomRightRadius: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderTopLeftRadius: 7, backgroundColor: 'rgba(0,0,0,0.2)' }}
                                    >
                                        <Text style={{ color: 'rgba(225,225,225,0.9)' }}>Sponsored </Text>

                                    </View>
                                </View>
                                {/* <TouchableOpacity> */}
                                    <CloseIcon
                                        name='close'
                                        size={30}
                                        color='white'
                                        style={{ right: 15, position: 'absolute',marginTop:heightToDp('2%') }}
                                    />
                                {/* </TouchableOpacity> */}
                                <LinearGradient
                                    colors={['#4076E5', '#74AEF4']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ height: heightToDp('4%'), width: widthToDp('30%'), alignSelf: 'flex-end', bottom: 20, position: 'absolute', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
                                >
                                    <LocationIcon
                                        name='globe'
                                        size={12}
                                        color={'#fff'}
                                        style={{ marginRight: widthToDp('1%') }}
                                    />
                                    <TouchableOpacity
                                        // onPress={() => Linking.openURL(`https://${item.promoLink}`)}
                                        onPress={() => compareTime(item)}

                                    >
                                        <Text style={{ color: 'white' }}>Explore Now</Text>
                                    </TouchableOpacity>
                                </LinearGradient>

                            </ImageBackground>
                            <View style={{ flexDirection: 'row', height: heightToDp('10%'), width: widthToDp('80%'), alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={{ color: 'white', fontSize: heightToDp('3%') }}>{item.promoOfferDetails}</Text>
                                <LinearGradient
                                    colors={['#67C401', '#7BFE6E']}
                                    start={{ x: 0, y: 1 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{ borderRadius: 200, width: widthToDp('8%'), height: heightToDp('4%'), flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: widthToDp('3%'), marginTop: heightToDp('0.5%') }}
                                >
                                    <TouchableOpacity style={{ width: widthToDp('8%'), height: heightToDp('4%'), justifyContent: 'center', alignItems: 'center' }} onPress={() => Linking.openURL(`https://wa.me/+91${item.user_id.phoneNumber}`)}>
                                        <WhatsappIcon
                                            name='whatsapp'
                                            size={15}
                                            color={'white'}
                                            style={{ marginLeft: widthToDp('0%') }}
                                        />
                                    </TouchableOpacity>
                                </LinearGradient>
                            </View>
                        </View>
                    </View> : null
            }
        </>
    )
}