import moment from "moment";
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    AsyncStorage,
    Modal,
} from "react-native";
import "moment/locale/ru";
import { AntDesign, Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Text,
    Left,
    Right,
    Body,
    Footer,
    Spinner,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NCALayerClient } from "ncalayer-js-client";

const BottomTab = createBottomTabNavigator();

export default function OfferScreen({ navigation }) {
    const [datesWhitelist, setDatesWhitelist] = useState([
        {
            start: moment(),
            end: moment().add(20, "days"),
        },
    ]);

    const [sendFileState, setSendFileState] = useState(false);
    const [spinnerState, setSpinnerState] = useState(false);
    const [file, setFile] = useState();
    const [token, setToken] = useState("");
    const form = useSelector((state) => state.form);

    useEffect(() => {
        console.log("start");
        _getToken();
    }, []);

    async function _getToken() {
        await AsyncStorage.getItem("accessToken")
            .then((req) => JSON.parse(req))
            .then((json) => {})
            .catch((error) => console.log(error));
    }

    async function sign() {
        connectAndSign();
    }

    async function connectAndSign() {
        const ncalayerClient = new NCALayerClient();

        try {
            await ncalayerClient.connect();
        } catch (error) {
            alert(`Не удалось подключиться к NCALayer: ${error.toString()}`);
            return;
        }

        let activeTokens;
        try {
            activeTokens = await ncalayerClient.getActiveTokens();
        } catch (error) {
            alert(error.toString());
            return;
        }

        // getActiveTokens может вернуть несколько типов хранилищ, для простоты проверим первый.
        // Иначе нужно просить пользователя выбрать тип носителя.
        const storageType = activeTokens[0] || NCALayerClient.fileStorageType;

        let base64EncodedSignature;
        try {
            base64EncodedSignature = await ncalayerClient.createCAdESFromBase64(storageType, "MTEK");
        } catch (error) {
            alert(error.toString());
            return;
        }

        return base64EncodedSignature;
    }

    useEffect(() => {
        if (sendFileState == true) {
            if (file != undefined) {
                console.log("sendFile все условия сработали");
                // sendFileByAxios(file)
                // sendFile(file)
                setSendFileState(false);
            }
        }
    });

    async function sendFile(fileArg) {
        console.log("sendFile");
        const name = fileArg["_parts"][0][1].name;
        const size = fileArg["_parts"][0][1].size;
        const uri = fileArg["_parts"][0][1].uri;
        const body = new FormData();
        body.append("file", { uri: uri, name: name, size: size, type: "JPG" });
        console.log("body " + uri + " " + name + " " + size);
        fetch("http://api.smart24.kz/storage/v1/file/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "*/*",
                "x-api-key": token,
            },
            body,
        })
            .then((response) => {
                console.log("fetch");
                return response.json();
            })
            .then((responseJson) => {
                console.log("responseJson2");
                console.log(responseJson);
            })
            .catch((error) => console.error(error));
        console.log("finish");
    }

    return (
        <Container>
            <Header style={styles.headerTop}>
                <Left style={{ flex: 1 }}>
                    <Ionicons
                        name="md-arrow-back"
                        style={{ color: "#1a192a", marginLeft: 10 }}
                        onPress={() => navigation.goBack()}
                        size={24}
                    />
                </Left>
                <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#1a192a", fontSize: 20 }}>Заказы</Title>
                </Body>
                <Right />
            </Header>
            <Content style={{ paddingHorizontal: 20, backgroundColor: "#fff" }}>
                <View style={{ paddingHorizontal: 20, backgroundColor: "#fff", marginTop: 20 }}>
                    <Button
                        block
                        style={{
                            marginVertical: 10,
                            zIndex: -10,
                            borderRadius: 10,
                        }}
                        onPress={() => navigation.navigate("TradesListScreen", {"ActivityLabel": "Открытые торги", "arrayLevel": 0})}
                    >
                        <Text style={{ color: "#fff" }}>Открытые торги</Text>
                    </Button>
                    {/*<Button*/}
                    {/*    block*/}
                    {/*    style={{*/}
                    {/*        marginVertical: 10,*/}
                    {/*        zIndex: -10,*/}
                    {/*        borderRadius: 10,*/}
                    {/*    }}*/}
                    {/*    onPress={() => sign()}*/}
                    {/*>*/}
                    {/*    <Text style={{ color: "#fff" }}>Sign</Text>*/}
                    {/*</Button>*/}
                    <Button
                        block
                        style={{
                            marginVertical: 10,
                            zIndex: -10,
                            borderRadius: 10,
                        }}
                        onPress={() => navigation.navigate("TradesListScreen", {"ActivityLabel": "Открытые торги по корзинам", "arrayLevel": 1})}
                    >
                        <Text style={{ color: "#fff" }}>Открытые торги по корзинам</Text>
                    </Button>
                    <Button
                        block
                        style={{
                            marginVertical: 10,
                            zIndex: -10,
                            borderRadius: 10,
                        }}
                        onPress={() => navigation.navigate("TradesListScreen", {"ActivityLabel": "Мои открытые предложения", "arrayLevel": 2})}
                    >
                        <Text style={{ color: "#fff" }}>Мои открытые предложения</Text>
                    </Button>
                    <Button
                        block
                        style={{
                            marginVertical: 10,
                            zIndex: -10,
                            borderRadius: 10,
                        }}
                        onPress={() => navigation.navigate("TradesListScreen", {"ActivityLabel": "Мои завершенные торги", "arrayLevel": 3})}
                    >
                        <Text style={{ color:"#fff" }}>Мои завершенные торги</Text>
                    </Button>
                </View>
            </Content>
            <Footer style={{ backgroundColor: "#1a192a", height: 30 }}>
                {/*<FooterTab style={{ backgroundColor: '#1a192a' }}></FooterTab>*/}
            </Footer>
            <Modal
                style={{ backgroundColor: "#fff" }}
                animationType={"fade"}
                transparent={true}
                visible={spinnerState}
                contentContainerStyle={styles.filterModal}
            >
                <View
                    style={{
                        backgroundColor: "rgba(245,245,245,0.8)",
                        flex: 1,
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Spinner color="#1a192a" />
                    <Text>Загрузка...</Text>
                </View>
            </Modal>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTop: {
        backgroundColor: "#fff",
    },
    filterModal: {
        width: 10,
        height: 10,
        marginTop: 20,
        marginBottom: 20,
    },
});

