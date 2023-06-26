import React from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { heightToDp, widthToDp } from './Responsive'
import LeftIcon from 'react-native-vector-icons/AntDesign'
import MessageIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import DotIcon from 'react-native-vector-icons/Entypo'
import { Menu } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient'

export default Header = (props) => {
    const navigation = useNavigation();
    const [visible, setVisible] = React.useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    const navigateToSupportScreen = () => {
        setVisible(false)
        navigation.navigate('SupportScreen')
    }
    const logOutFunction = async () => {
        await AsyncStorage.removeItem('_id')
        await AsyncStorage.removeItem('role')
        setVisible(false)
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignUpScreen' }]
        })
    }
    return (
        <View
            
            style={{ backgroundColor: props.color, width: widthToDp('100%'), height: heightToDp('8%'), justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row' }}>
                <LeftIcon
                    name='left'
                    color={'white'}
                    size={25}
                    style={{ marginLeft: widthToDp('5%') }}
                    onPress={() => navigation.goBack()}
                />
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: heightToDp('2%'), marginLeft: widthToDp('4%'), width: widthToDp('40%') }}>{props.title}</Text>
                <MessageIcon
                    name='message-text-outline'
                    color={'white'}
                    size={20}
                    style={{ marginLeft: widthToDp('27%') }}
                    onPress={() => navigation.navigate('InboxScreen')}
                />
                {/* <DotIcon
                name='dots-three-vertical'
                color={'white'}
                size={20}
                style={{marginLeft:widthToDp('3%')}}
                onPress={() => navigation.navigate(props.screen)}
                /> */}
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<DotIcon
                        name='dots-three-vertical'
                        color={'white'}
                        size={20}
                        style={{ marginLeft: widthToDp('3%') }}
                        onPress={() => openMenu()}
                    />}
                >

                    <Menu.Item onPress={() => logOutFunction()} title="LOGOUT" />
                    <Menu.Item onPress={() => navigateToSupportScreen()} title="Support" />
                </Menu>
            </View>
        </View>
    )
}