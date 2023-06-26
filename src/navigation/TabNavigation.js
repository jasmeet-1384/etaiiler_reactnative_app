import React, { useEffect, useState } from 'react'
import { View, Text, SegmentedControlIOSBase } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import ExploreScreen from '../screens/ExploreScreen'
import NotificationScreen from '../screens/NotificationScreen'
import UserProfileScreen from '../screens/UserProfileScreen';
import BusinessScreen from '../screens/BusinessScreen';
import PromoScreen from '../screens/PromoScreen'
import TopTabNavigation from './TopTabNavigation';
import AddButton from '../components/AddButton';
import HomeIcon from 'react-native-vector-icons/Feather'
import ExploreIcon from 'react-native-vector-icons/AntDesign'
import NotificationIcon from 'react-native-vector-icons/Ionicons'
import PlusIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { heightToDp } from '../components/Responsive';

import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const AddScreenComponent = () => {
    return null
}

function TabNavigation() {

    const [role, setRole] = useState('')

    useEffect(() => {
        async function getUserRole() {
            const a = await AsyncStorage.getItem('role')
            setRole(a)
        }

        getUserRole()
    }, [])
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: 'white', height: heightToDp('6%') }
            }}

        >
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <HomeIcon name='home' color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Explore" component={TopTabNavigation} options={{
                tabBarIcon: ({ color, size }) => (
                    <ExploreIcon name='adduser' color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Promo" component={PromoScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <PlusIcon name='brightness-percent' color={color} size={size} />
                ),
                tabBarLabel: '',
                // tabBarLabelStyle : {fontSize:heightToDp('2%'),top:26,position:'absolute'}
            }} />
            <Tab.Screen name="Notification" component={NotificationScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <NotificationIcon name='notifications-outline' color={color} size={size} />
                )
            }} />
            <Tab.Screen name="Profile" component={role === "user" ? UserProfileScreen : BusinessScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <ExploreIcon name='user' color={color} size={size} />
                )
            }} />
        </Tab.Navigator>
    )
}

export default TabNavigation