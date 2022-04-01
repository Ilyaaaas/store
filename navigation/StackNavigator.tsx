import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import { LoginScreen } from "../screens/Login/LoginScreen";
import { DrawerNavigator } from "./DrawerNavigator";
import { ProfileStack } from "./ProfileStack";
import { OfferStack } from "./OfferStack";
import OfferScreen from "../screens/Offer/OfferScreen";
import MainITSMScreen from "../screens/MainITSMScreen";
import ContactsScreen from "../screens/ContactsScreen";

const Stack = createStackNavigator();
export const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" headerMode="none">
                <Stack.Screen name="MainITSMScreen" component={MainITSMScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Home" component={DrawerNavigator} />
                <Stack.Screen name="ProfileyStack" component={ProfileStack} />
                <Stack.Screen name="OfferStack" component={OfferStack} />
                <Stack.Screen name="OfferScreen" component={OfferScreen} />
                <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
