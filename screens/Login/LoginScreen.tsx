import { useNavigation, StackActions } from '@react-navigation/native';
import {Button, Form, Input, Item, Toast} from 'native-base';
import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, AsyncStorage, FlatList, Platform, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, } from 'react-native';

import { AuthScreenWrapper } from '../../components/AuthScreenWrapper';
import { IdInput } from '../../components/IdInput';
import { authService } from '../../services/auth.service';
import { inputStyle } from '../../styles/input.style';
import { Entypo } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";
import {useRef} from "react";
import Constants from "expo-constants";
import * as Google from 'expo-google-app-auth';
import * as Facebook from 'expo-facebook';

const styles = StyleSheet.create({
  secondaryButton: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#a2a3b7',
  },
  btnSubmit: {
    backgroundColor: '#ffae45',
    marginTop: 2,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 3
  }
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const LoginScreen = ({route}) => {
  const navigation = useNavigation();
  const [passView, setpassView] = useState(true);
  const [showIINS, setShowIINS] = useState(false);
  const [listLogins, setListLogins] = useState([]);
  const [login, setLogin] = useState<string>('');
  const [fromScreenName, setFromScreenName] = useState<string>('MainITSMScreen');
  const [password, setPassword] = useState<string>('');
  const [passwordRecoveryIsVisible, setPasswordRecoveryIsVisible] = useState<boolean>(false);

  const [expoPushToken, setExpoPushToken] = useState('');
  const [signedIn, setSignedIn] = useState('');
  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    setFromScreenName(route)
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
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
        appId: '619196829232714',
      });
      const {
        type,
        token,
        expirationDate,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        console.log(await response.json());
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  async function signInWithGoogleAsync() {
    try {
      const result = await Google.logInAsync({
        androidClientId: `527529150331-u2j3cghso61rggtia3ms38mhb3o971ut.apps.googleusercontent.com`,
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        // alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token)
      console.log('token');
      console.log(token);
    } else {
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    return token;
  }

  const handleSubmit = async (onSaveLogin = false) => {
    let data = {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      body: JSON.stringify({
        // email: login,
        // password: password,
        email: 'admin@mail.ru',
        password: '12345678',
      }),
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json',
      }
    }
    let lst = {
      'iin': login,
      'pass': password,
      'activ': 1
    }
    let loginList = JSON.stringify(lst);
    AsyncStorage.clear();
    AsyncStorage.setItem('login_save', loginList);

    fetch('http://bezrieltora.kz/api/users/login', data)
        .then(response => response.json())
        // .then(json => {console.log(json.result)})
        .then(json => {
              if(json.result.token === undefined)
              {
                // alert('Введен неправильный пароль или логин');
                Toast.show({
                  text: 'Ошибка: Неправильный логин или пароль',
                  buttonText: 'Ok',
                  type: 'danger',
                  duration: 3000,
                });
              }
              else
              {
                console.log('fromScreenName');
                console.log(fromScreenName.params.fromScreen);
                setAccessTokenFunc('@accessToken', json.result.token, json.result.user.id, json.result.user.name, expoPushToken);
                navigation.dispatch(StackActions.replace(fromScreenName.params.fromScreen));
              }
            }
        )
  };

  const setAccessTokenFunc = async (key, value, userId, expoPushToken) => {
    // AsyncStorage.clear();

    try {
      // await AsyncStorage.setItem(key, value);
      const items = [{"accessToken": value}, {"userId": userId}, {"exponentPushToken": expoPushToken}];
      await AsyncStorage.setItem("accessToken", JSON.stringify(items));
    } catch(e) {
      console.log('error');
    }
    // console.log('Done')
  }

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
            style: "cancel"
          },
          { text: "Да", onPress: () => {
              handleSubmit(true);
            }
          }
        ],
        { cancelable: false }
    );
  }

  const AlertSaveLogin = async () => {
    if(login.trim() == ''){
      Toast.show({
        text: 'Поле логин не может быть пустым!',
        type: 'danger',
      });
      return false;
    }

    if(password.trim() == ''){
      Toast.show({
        text: 'Поле Пароль не может быть пустым!',
        type: 'danger',
      });
      return false;
    }

    // let getLogin = await AsyncStorage.getItem('login_save');
    let getLogin = null;
    let b = true;

    if(getLogin !== null) {
      let lst = JSON.parse(getLogin);
      if (lst.length > 0) {
        lst.map((e) => {
          if (e.iin == login && e.pass == password) {
            b = false;
          }
        });
      }

      if(b){
        AlertShow();
      }else{
        handleSubmit(true);
      }
    }else{
      AlertShow();
    }
  }

  const ShowHidePass = () => {
    setpassView(!passView);
  }

  const getUserLogin = async () => {
    const getLogin = await AsyncStorage.getItem('login_save');
    let logineds = JSON.parse(getLogin);

    if(getLogin !== null) {
      setLogin(logineds.iin);
      setPassword(logineds.pass);
      setListLogins(logineds);
    }
  }

  useEffect(() => {
    getUserLogin();
  }, []);

  return (
      <AuthScreenWrapper>
        <Form style={{ zIndex: 2001, marginTop: 200}}>
          <Item regular style={inputStyle.inputItem}>
            {/*<IdInput onChangeText={(text) => setLogin(text)} value={login} />*/}
            <Input
                placeholder="Логин"
                onChangeText={(text) => setLogin(text)}
                value={login}
                style={{color: '#595758'}}
            />
          </Item>

          <Item regular style={inputStyle.inputItem}>
            <Input
                placeholder="Пароль"
                onChangeText={setPassword}
                value={password}
                secureTextEntry={passView}
                style={{color: '#595758'}}
            />
            <TouchableOpacity style={{ marginRight: 10}} onPress={ShowHidePass}>
              {
                passView ? (
                    <Entypo name="eye-with-line" size={24} color="black" />
                ) : (
                    <Entypo name="eye" size={24} color="black" />
                )
              }
            </TouchableOpacity>
          </Item>
        </Form>
        <View style={{marginTop: 10, }}></View>
        {/*<Button*/}
        {/*    transparent*/}
        {/*    block*/}
        {/*    onPress={() => navigation.navigate('RestorePassword')}>*/}
        {/*  <Text style={styles.secondaryButton}>Восстановить пароль</Text>*/}
        {/*</Button>*/}
        {/*{passwordRecoveryIsVisible && (*/}
        {/*)}*/}
        <TouchableOpacity
            style={[!passwordRecoveryIsVisible && { marginTop: 1, zIndex: 100 }] && styles.btnSubmit}
            onPress={AlertSaveLogin}
        >
          <Text style={{ color: '#fff', textAlign: "center" }}>ВОЙТИ</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[!passwordRecoveryIsVisible && { marginTop: 1, zIndex: 100 }] && styles.btnSubmit}
            onPress={signInWithGoogleAsync}
        >
          <Text style={{ color: '#fff', textAlign: "center" }}>ВОЙТИ с помощью гугл</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={[!passwordRecoveryIsVisible && { marginTop: 1, zIndex: 100 }] && styles.btnSubmit}
            onPress={signInWithFB}
        >
          <Text style={{ color: '#fff', textAlign: "center" }}>ВОЙТИ с помощью facebook</Text>
        </TouchableOpacity>
        {/*<Button*/}
        {/*  transparent*/}
        {/*  block*/}
        {/*  onPress={() => navigation.navigate('Registration')}>*/}
        {/*  <Text style={styles.secondaryButton}>Регистрация</Text>*/}
        {/*</Button>*/}
      </AuthScreenWrapper>
  );
};
