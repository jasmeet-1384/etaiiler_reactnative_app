import React, { useEffect } from 'react'
import { View, Text, ImageBackground, Image, FlatList, TouchableOpacity, TextInput } from 'react-native'
import { heightToDp, widthToDp } from '../components/Responsive'
import Header from '../components/Header'
import PencilIcon from 'react-native-vector-icons/Octicons'
import PlusIcon from 'react-native-vector-icons/AntDesign'


export default MyProfileScreen = ({ navigation }) => {

    const Data = [{ image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lmdHxlbnwwfHwwfHw%3D&w=1000&q=80', key: 0 },
    { image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lmdHxlbnwwfHwwfHw%3D&w=1000&q=80', key: 1 },
    { image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lmdHxlbnwwfHwwfHw%3D&w=1000&q=80', key: 2 }]

    

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header title="MY PROFILE" />
            <View style={{ flexDirection: 'row' }}>
                <View>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXJzfGVufDB8fDB8fA%3D%3D&w=1000&q=80' }}
                        style={{ height: heightToDp('15%'), width: widthToDp('30%'), borderRadius: 300, marginTop: heightToDp('3%'), marginLeft: widthToDp('3%') }}
                    />
                    <TouchableOpacity style={{ backgroundColor: '#4076E5', height: heightToDp('5%'), width: widthToDp('10%'), borderRadius: 300, marginTop: heightToDp('-5%'), marginLeft: widthToDp('25%'), justifyContent: 'center', alignItems: 'center' }}>
                        <PencilIcon
                            name='pencil'
                            size={20}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('UploadPhotoScreen')}
                    style={{ backgroundColor: '#9A9C9F', height: heightToDp('2.5%'), width: widthToDp('25%'), justifyContent: 'center', alignItems: 'center', borderRadius: 20, marginTop: heightToDp('2%'), marginLeft: widthToDp('35%') }}>
                        <Text style={{ color: 'black' }}>EDIT PROFILE</Text>
                    </TouchableOpacity>

                    <View style={{ marginLeft: widthToDp('8%'), marginTop: heightToDp('1.5%') }}>
                        <Text style={{ color: 'black', fontSize: heightToDp('4%') }}>Mr. XYZ</Text>
                        <Text style={{ color: '#8E99AF' }}>Bhuwaneshwar, Odisha</Text>
                        <Text style={{ color: '#8E99AF' }}>Bio Line 1</Text>
                        <Text style={{ color: '#8E99AF' }}>Bio Line 2</Text>
                    </View>
                </View>
            </View>

            <View style={{ backgroundColor: 'white', width: widthToDp('90%'), height: heightToDp('10%'), alignSelf: 'center', marginTop: heightToDp('3%'), borderRadius: 20, elevation: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                <View style={{ width: widthToDp('13%') }}>
                    <Text style={{ color: 'black', fontSize: heightToDp('3%') }}>582</Text>
                    <Text style={{ color: '#8E99AF' }}>Images</Text>
                </View>

                <View style={{ width: widthToDp('15%') }}>
                    <Text style={{ color: 'black', fontSize: heightToDp('3%') }}>74.2k</Text>
                    <Text style={{ color: '#8E99AF', alignSelf: 'center' }}>Likes</Text>
                </View>

                <View style={{ width: widthToDp('15%') }}>
                    <Text style={{ color: 'black', fontSize: heightToDp('3%'), alignSelf: 'center' }}>982</Text>
                    <Text style={{ color: '#8E99AF' }}>Followers</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginTop: heightToDp('3%'), justifyContent: 'space-between' }}>
                <Text style={{ color: '#8E99AF', marginLeft: widthToDp('6%') }}>Latest Offers</Text>
                <Text style={{ color: '#8E99AF', marginRight: widthToDp('6%') }}>See all{`>>`}</Text>
            </View>
            <FlatList
                data={Data}
                renderItem={({ item, key }) => {
                    return (
                        <View style={{ marginTop: heightToDp('2%'), marginLeft: widthToDp('5%') }}>
                            <Image
                                source={{ uri: item.image }}
                                style={{ height: heightToDp('12%'), width: widthToDp('50%'), borderRadius: 20 }}
                            />
                        </View>
                    )
                }}
                horizontal
            />
            <View style={{ backgroundColor: 'white', height: heightToDp('39%') }}>
                <Text style={{ color: '#8E99AF', marginLeft: widthToDp('6%') }}>Suggested Connections</Text>
                <FlatList
                    data={Data}
                    renderItem={({ item, key }) => {
                        return (
                            <View style={{ marginTop: heightToDp('2%'), marginLeft: widthToDp('5%') }}>
                                <View style={{ backgroundColor: 'red', height: heightToDp('15%'), width: widthToDp('35%'), borderRadius: 20 }}>

                                </View>
                                <View style={{ backgroundColor: '#74AEF4', height: heightToDp('4%'), width: widthToDp('20%'), borderRadius: 15, marginTop: heightToDp('-2%'), alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text>Connect</Text>
                                </View>
                            </View>
                        )
                    }}
                    horizontal
                />
                <View style={{ backgroundColor: 'white', width: widthToDp('100%'), height: heightToDp('17%'), justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('UserProfileScreen')}
                    style={{ backgroundColor: '#FFA12D', height: heightToDp('10%'), width: widthToDp('20%'), borderRadius: 300,justifyContent:'center',alignItems:'center' }}>
                        <PlusIcon
                            name='plus'
                            size={20}
                            color={'white'}
                        />
                    </TouchableOpacity>
                    <Text style={{color:'black'}}>Create Post</Text>
                </View>
            </View>

        </View>
    )
}