import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

import ProfileScreen from "../screens/Profile/ProfileScreen";

const Stack = createStackNavigator();

export const ProfileStack = () => {
    return (
        <Stack.Navigator initialRouteName="ProfileScreen" headerMode="none">
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
    );
};
