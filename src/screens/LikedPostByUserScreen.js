import React, { useEffect, useState } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'

export default LikedPostByUserScreen = ({ route, navigation }) => {
    const { data } = route.params
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header color="#131128" title="Posts liked by you" />
            <FlatList
                data={data}
                renderItem={({ item, key }) => {
                    return (
                        // <>
                        //     <TouchableOpacity
                        //         onPress={() => navigation.navigate('ExploreDetailsScreen', { profileData: item.postId.user_id._id })}
                        //         style={{ flexDirection: 'row', height: heightToDp('7%'), width: widthToDp('100%'), alignItems: 'center' }}>
                        //         <Image
                        //             source={{ uri: `${item.postId.user_id.image}` }}
                        //             style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                        //         />
                        //         <View style={{ marginLeft: widthToDp('4%'), width: widthToDp('20%') }}>
                        //             <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.postId.user_id.name}</Text>
                        //             <Text style={{ color: 'gray' }}>{item.role} profile</Text>
                        //         </View>
                        //         <Image
                        //             source={{ uri: item.postId.image }}
                        //             style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                        //         />
                        //     </TouchableOpacity>
                        // </>
                        <View style={{ width: widthToDp('95%'), alignSelf: 'center', height: heightToDp('6%'), alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Image
                                source={{ uri: `${item.postId.user_id.image}` }}
                                style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('0%'), marginLeft: widthToDp('3%') }}
                            />
                            <Text>
                                <Text style={{ color: 'black' }}>You liked a post from </Text>
                                <Text style={{ color: 'black', fontWeight: 'bold' }}>{item.postId.user_id.name}</Text>
                            </Text>
                            <Image
                                source={{ uri: item.postId.image }}
                                style={{ height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 5, alignSelf: 'center' }}
                            />
                        </View>
                    )
                }}
            />
        </View>
    )
}