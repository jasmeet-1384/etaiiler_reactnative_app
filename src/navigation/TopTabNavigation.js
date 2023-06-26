import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ExploreBusinessScreen from '../screens/ExploreBusinessScreen';
import ExploreUserScreen from '../screens/ExploreUserScreen';
import ExploreTrendingScreen from '../screens/ExploreTrendingScreen';
import Header2 from '../components/Header2';


const Tab = createMaterialTopTabNavigator();

function TopTabNavigation() {
  return (
    <>
      <Header2 />
      <Tab.Navigator>
        <Tab.Screen name="Trending" component={ExploreTrendingScreen} />
        <Tab.Screen name="User" component={ExploreUserScreen} />
        <Tab.Screen name="Business" component={ExploreBusinessScreen} />
      </Tab.Navigator>
    </>
  );
}

export default TopTabNavigation