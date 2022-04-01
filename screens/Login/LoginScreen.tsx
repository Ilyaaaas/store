import { useNavigation, StackActions } from "@react-navigation/native";
import { Button, Form, Input, Item, Toast } from "native-base";
import * as React from "react";
import { useEffect, useState } from "react";
import {
    Alert,
    AsyncStorage,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { AuthScreenWrapper } from "../../components/AuthScreenWrapper";
import { inputStyle } from "../../styles/input.style";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as Notifications from "expo-notifications";
import { useRef } from "react";
import Constants from "expo-constants";
//авторизация через соцсети
import * as Google from "expo-google-app-auth";
import * as Facebook from "expo-facebook";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export const LoginScreen = ({ route }) => {
    const navigation = useNavigation();
    const [passView, setpassView] = useState(true);
    const [showIINS, setShowIINS] = useState(false);
    const [listLogins, setListLogins] = useState([]);
    const [login, setLogin] = useState<string>("");
    const [fromScreenName, setFromScreenName] = useState<string>("MainITSMScreen");
    const [password, setPassword] = useState<string>("");
    const [passwordRecoveryIsVisible, setPasswordRecoveryIsVisible] = useState<boolean>(false);

    const [expoPushToken, setExpoPushToken] = useState("");
    const [signedIn, setSignedIn] = useState("");
    const [name, setName] = useState("");
    const [photoUrl, setPhotoUrl] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        setFromScreenName(route);
        registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
            setNotification(notification);
        });

        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    async function signInWithFB() {
        try {
            await Facebook.initializeAsync({
                appId: "619196829232714",
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile"],
            });
            if (type === "success") {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                console.log(await response.json());
                handleSubmitByFB("645783406608230", "Ilyas Akhmetov");
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    const handleSubmitByFB = async (id, name) => {
        const data = {
            method: "POST",
            body: {
                social_name: "facebook",
                params: {
                    id: id,
                    name: name,
                },
            },
        };
        AsyncStorage.clear();
    };

    async function signInWithGoogleAsync() {
        try {
            const result = await Google.logInAsync({
                iosClientId: "<YOUR_IOS_CLIENT_ID_FOR_EXPO>",
                androidClientId: "527529150331-u2j3cghso61rggtia3ms38mhb3o971ut.apps.googleusercontent.com",
                scopes: ["profile", "email"],
            });

            if (result.type === "success") {
                return result.accessToken;
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            return { error: true };
        }
        navigation.dispatch(StackActions.replace(fromScreenName.params.fromScreen));
    }

    async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            setExpoPushToken(token);
            console.log("token");
            console.log(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        return token;
    }

    const handleSubmit = async (onSaveLogin = false) => {
        const response = await fetch("https://skstore.kz/mobile/login", {
            body: "{\"username\": \"d.myrzabekWAFTEST\", \"password\": \"RootPass123@\", \"device_id\": 12345}",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            method: "POST",
        });
        const responseJson = await response.json();

        if (responseJson.access_token === undefined) {
            alert("Введен неправильный пароль или логин");
        } else {
            console.log(responseJson.access_token.slice(1, -1));
            console.log(responseJson.access_token);
            // setAccessTokenFunc('@accessToken', responseJson.access_token, responseJson.id);
            AsyncStorage.clear();
            AsyncStorage.setItem("accessToken", JSON.stringify(responseJson.access_token));
            navigation.dispatch(StackActions.replace("MainITSMScreen"));
        }
    };

    const AlertShow = async () => {
        Alert.alert(
            "Сохранение данных",
            "Желаете ли Вы сохранить введенные данные на текущем устройстве?",
            [
                {
                    text: "Нет",
                    onPress: () => {
                        handleSubmit(false);
                    },
                    style: "cancel",
                },
                {
                    text: "Да",
                    onPress: () => {
                        handleSubmit(true);
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const AlertSaveLogin = async () => {
        if (login.trim() == "") {
            Toast.show({
                text: "Поле логин не может быть пустым!",
                type: "danger",
            });
            return false;
        }

        if (password.trim() == "") {
            Toast.show({
                text: "Поле Пароль не может быть пустым!",
                type: "danger",
            });
            return false;
        }

        // let getLogin = await AsyncStorage.getItem('login_save');
        const getLogin = null;
        let b = true;

        if (getLogin !== null) {
            const lst = JSON.parse(getLogin);
            if (lst.length > 0) {
                lst.map((e) => {
                    if (e.iin == login && e.pass == password) {
                        b = false;
                    }
                });
            }

            if (b) {
                AlertShow();
            } else {
                handleSubmit(true);
            }
        } else {
            AlertShow();
        }
    };

    const ShowHidePass = () => {
        setpassView(!passView);
    };

    const getUserLogin = async () => {
        const getLogin = await AsyncStorage.getItem("login_save");
        const logineds = JSON.parse(getLogin);

        if (getLogin !== null) {
            setLogin(logineds.iin);
            setPassword(logineds.pass);
            setListLogins(logineds);
        }
    };

    useEffect(() => {
        getUserLogin();
    }, []);

    return (
        <AuthScreenWrapper>
            <Form style={{ zIndex: 2001, marginTop: 200 }}>
                <Item regular style={inputStyle.inputItem}>
                    {/*<IdInput onChangeText={(text) => setLogin(text)} value={login} />*/}
                    <Input
                        placeholder="Логин"
                        onChangeText={(text) => setLogin(text)}
                        value={login}
                        style={{ color: "#595758" }}
                    />
                </Item>
                <Item regular style={inputStyle.inputItem}>
                    <Input
                        placeholder="Пароль"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={passView}
                        style={{ color: "#595758" }}
                    />
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={ShowHidePass}>
                        {passView ? (
                            <Entypo name="eye-with-line" size={24} color="black" />
                        ) : (
                            <Entypo name="eye" size={24} color="black" />
                        )}
                    </TouchableOpacity>
                </Item>
            </Form>
            <View style={{ marginTop: 10 }}>
                <TouchableOpacity
                    style={[!passwordRecoveryIsVisible && { marginTop: 1, zIndex: 100 }] && styles.btnSubmit}
                    onPress={AlertSaveLogin}
                >
                    <Text style={{ color: "#fff", textAlign: "center" }}>ВОЙТИ</Text>
                </TouchableOpacity>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 10,
                    }}
                >
                    <AntDesign
                        name="facebook-square"
                        size={34}
                        color="#a2a3b7"
                        onPress={signInWithFB}
                        style={{ marginLeft: 5, marginRight: 5 }}
                    />
                    <AntDesign
                        name="google"
                        size={34}
                        color="#a2a3b7"
                        onPress={signInWithGoogleAsync}
                        style={{ marginLeft: 5, marginRight: 5 }}
                    />
                </View>
                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <Button transparent>
                        <Text
                            style={styles.secondaryButton}
                            onPress={() => navigation.navigate("RestorePassword")}
                        >
              Восстановить пароль
                        </Text>
                    </Button>
                    <Button transparent style={{ width: 100 }}>
                        <Text
                            onPress={() => navigation.navigate("Registration")}
                            style={styles.secondaryButton}
                        >
              Регистрация
                        </Text>
                    </Button>
                </View>
            </View>
        </AuthScreenWrapper>
    );
};

const styles = StyleSheet.create({
    secondaryButton: {
        textDecorationLine: "underline",
        fontWeight: "bold",
        color: "#a2a3b7",
        marginRight: 5,
        marginLeft: 5,
    },
    btnSubmit: {
        backgroundColor: "#ffae45",
        marginTop: 2,
        paddingTop: 15,
        paddingBottom: 15,
        borderRadius: 3,
    },
});
