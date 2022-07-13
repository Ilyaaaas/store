import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import HomeScreen from "../screens/HomeScreen";
import MainITSMScreen from "../screens/MainITSMScreen";
import Favorites from "../screens/Favorites/Favorites";

const Stack = createStackNavigator();

export const FavoritesStack = () => {
    return (
        <Stack.Navigator initialRouteName="Favorites" headerMode="none">
            <Stack.Screen name="MainITSMScreen" component={MainITSMScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="DiaryScreenView" component={ProfileScreen} />
            <Stack.Screen name="Favorites" component={Favorites} />
        </Stack.Navigator>
    );
};
