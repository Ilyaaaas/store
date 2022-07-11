import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "./Profile/ProfileScreen";
import HomeScreen from "./HomeScreen";
import Favorites from "./Favorites/Favorites";
import Notifications from "./Notifications";
import OfferScreen from "../screens/Offer/OfferScreen";
import { Root } from "native-base";
import { Ionicons, AntDesign, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

class MainITSMScreen extends React.Component {
    render() {
        return (
            <Root>
                <BottomTab.Navigator
                    tabBarOptions={{
                        activeTintColor: "#313B73",
                        inactiveTintColor: "#898989",
                    }}
                >
                    <BottomTab.Screen
                        name="Главная"
                        component={HomeScreen}
                        options={{
                            tabBarIcon: ({ color }) => <MaterialIcons name="home" size={30} color={color} />,
                        }}
                    />
                    <BottomTab.Screen
                        name="Уведомления"
                        component={Notifications}
                        options={{
                            tabBarIcon: ({ color }) => <MaterialIcons size={30} name="email" color={color} />,
                        }}
                    />
                    {/*<BottomTab.Screen*/}
                    {/*    name=" "*/}
                    {/*    component={OfferScreen}*/}
                    {/*    options={{*/}
                    {/*        tabBarIcon: ({ color }) => (*/}
                    {/*            <MaterialCommunityIcons*/}
                    {/*                name="plus-box"*/}
                    {/*                size={30}*/}
                    {/*                color="#1a192a"*/}
                    {/*                onPress={() => this.props.navigation.navigate("OfferScreen")}*/}
                    {/*            />*/}
                    {/*        ),*/}
                    {/*    }}*/}
                    {/*/>*/}
                    <BottomTab.Screen
                        name="Заказы"
                        component={Favorites}
                        options={{
                            tabBarIcon: ({ color }) => <MaterialIcons name="star" size={30} color={color} />,
                        }}
                    />
                    <BottomTab.Screen
                        name="Кабинет"
                        component={ProfileScreen}
                        options={{
                            tabBarIcon: ({ color }) => <MaterialIcons size={30} name="person" color={color} />,
                        }}
                    />
                </BottomTab.Navigator>
            </Root>
        );
    }
}

function TabBarIcon(props: { name: string; color: string }) {
    // @ts-ignore
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default MainITSMScreen;
