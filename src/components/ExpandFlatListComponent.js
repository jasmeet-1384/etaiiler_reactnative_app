import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput, Linking } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import LinearGradient from 'react-native-linear-gradient'
import DownIcon from 'react-native-vector-icons/AntDesign'

export default ExpandFlatListComponent = ({ item }) => {
    const [expanded, setExpanded] = useState(false)
    return (
        <View style={{ height: expanded ? heightToDp('55%') : heightToDp('33%'), width: widthToDp('85%'), backgroundColor: 'white', marginTop: heightToDp('2%'), alignSelf: 'center', borderRadius: 20, alignItems: 'center', justifyContent: 'center', elevation: 10 }}>
            <Text style={{ color: "#2f3334", fontSize: heightToDp('3%'), fontWeight: 'bold' }}>RANGE</Text>
            <Text style={{ color: "#2f3334", fontSize: heightToDp('2.5%'), fontWeight: '500' }}>{item.range}</Text>
            <View style={{ height: expanded ? heightToDp('28%') : heightToDp('5%'), width: widthToDp('75%'), backgroundColor: expanded ? '#2f3334' : 'white', marginTop: heightToDp('5%'), borderRadius: 20 }}>
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    style={{ backgroundColor: '#08abee', height: heightToDp('12%'), width: widthToDp('24%'), borderRadius: 200, alignSelf: 'center', top: -40, position: 'absolute', borderWidth: 2, borderColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 2 }}>
                    <Text style={{ color: "#fff", fontSize: heightToDp('2.2%'), fontWeight: 'bold' }}>{item.price}</Text>
                    <DownIcon
                        name='caretdown'
                        size={20}
                        color={'white'}
                    />
                </TouchableOpacity>
                {
                    expanded ? <>
                        <View style={{ height: heightToDp('20%'), width: widthToDp('65%'), alignSelf: 'center', justifyContent: 'space-evenly', marginTop: heightToDp('5%') }}>
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
                                <Text style={{ color: "#fff", fontSize: heightToDp('2%'), marginLeft: widthToDp('3%') }}>Visible in Statistics : </Text>
                                <Text style={{ color: "#fff", fontSize: heightToDp('2%'), fontWeight: 'bold' }}>{item.statsScreen} </Text>
                            </View>

                        </View>
                    </> : null
                }

            </View>
            <LinearGradient
                colors={['#4076E5', '#74AEF4']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{ borderRadius: 20, width: widthToDp('60%'), height: heightToDp('5%'), marginTop: heightToDp('3%'), alignSelf: 'center', justifyContent: 'center' }}
            >
                <TouchableOpacity
                    onPress={() => goToSummaryPageFunction(item)}
                    style={{ height: heightToDp('5%'), width: widthToDp('60%'), borderRadius: 20, marginBottom: heightToDp('0%'), alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                    <Text style={{ fontWeight: 'bold', fontSize: heightToDp('2%'), color: 'white' }}>PURCHASE</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    )
}