import moment from "moment";
import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    AsyncStorage,
    Platform,
    TextInput,
    TouchableOpacity,
    Modal,
} from "react-native";
import "moment/locale/ru";
import CalendarStrip from "react-native-calendar-strip";
import { AntDesign, Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../HomeScreen";
import axios from "axios";
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
    Icon,
    Toast,
    Spinner,
} from "native-base";
import { useSelector, useDispatch } from "react-redux";
import DropDownPicker from "react-native-dropdown-picker";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as DocumentPicker from "expo-document-picker";
import { StackActions } from "@react-navigation/native";

const BottomTab = createBottomTabNavigator();

export default function OfferScreen({ navigation }) {
    const [datesWhitelist, setDatesWhitelist] = useState([
        {
            start: moment(),
            end: moment().add(20, "days"),
        },
    ]);

    const [customDatesStyles, setDatesStyles] = useState([]);
    const [sendedFileId, setSendedFileId] = useState(0);
    const [sendedFileName, setSendedFileName] = useState("");
    const [reqId, setReqId] = useState([]);
    const [sendFileState, setSendFileState] = useState(false);
    const [spinnerState, setSpinnerState] = useState(false);
    const [offerDescr, setOfferDescr] = useState("");
    const [file, setFile] = useState();
    const [token, setToken] = useState("");
    const [userId, setUserId] = useState(0);
    const [personId, setPersonId] = useState(0);
    const form = useSelector((state) => state.form);
    const { date = [], time = "", times = [], shedId = "" } = form;
    const dispatch = useDispatch();
    const [catalogs, setCatalogs] = useState([
        { id: 1, name: "Doe" },
        { id: 2, name: "ddd2" },
    ]);
    const [selectedCatalog, setSelectedCatalog] = useState();
    const [id_type_sale, set_id_type_sale] = useState(0);
    const [id_type_home, set_id_type_home] = useState(0);
    const [id_city, set_id_city] = useState(0);
    const [address, set_address] = useState(0);
    const [cnt_rooms, set_cnt_rooms] = useState(0);
    const [cnt_loggia, set_cnt_loggia] = useState(0);
    const [cnt_balkony, set_cnt_balkony] = useState(0);
    const [cnt_toilet, set_cnt_toilet] = useState(0);
    const [toilet_from_bathroom, set_toilet_from_bathroom] = useState(0);
    const [total_area, set_total_area] = useState(0);
    const [living_area, set_living_area] = useState(0);
    const [kitchen_area, set_kitchen_area] = useState(0);
    const [year_construction, set_year_construction] = useState(0);
    const [floor, set_floor] = useState(0);
    const [floor_all, set_floor_all] = useState(0);
    const [id_condit, set_id_condit] = useState(0);
    const [id_rc, set_id_rc] = useState(0);
    const [other_comment, set_other_comment] = useState(0);
    const [phone, set_phone] = useState(0);
    const [phone2, set_phone2] = useState(0);
    const [phone3, set_phone3] = useState(0);
    const [price, set_price] = useState(0);
    const [images, set_images] = useState(0);

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

    const createOffer = async () => {
        fetch("https://bezrieltora.kz/api/home", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmYwMGRkODc2MTcyNTVlNzIzM2UzNzA4MmRjMGRjZTEzMTkyYWNjMDNlYWJkYWU2ZTg4ZTU0YTYxMDM0ZjFjMWRmYjhlYWRjNjU0NDdhYzAiLCJpYXQiOjE2MzQwMTM5NzQuODg4NzQ0MSwibmJmIjoxNjM0MDEzOTc0Ljg4ODc1NTEsImV4cCI6MTY2NTU0OTk3NC44NzEzODAxLCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.K3qsylWcRj14zH0hsyeEl6-qm_ao4h8atR3w6Xv3iN632J8kZ3_nELbPIenqIU-xO7fWAyKRnthRWZIWmGPimDkek2muCqdT4SPb0hEjLiTzGfdfEsX3XisKWVKF4ODLwE9kX1FsseKxKC8gHjHyvlR6cK9r4hpkg7CZej4epIUajBl6NwWhflA_DAY84FaGH7VuI28IkMDjkeJb8TYy2C49F7Kx4i8V-0FO8diCN1xKKM-o5xKwhR8IorCL1obCxP4EHiByG0YlWuPIKCIJq0itjQGYBKSqTxsfCpFa4mcVF6H8Ho1KFx9prRtn9nV5UGLyM1inn6PnpH9XizbAlzPWN96Luh0CKTKj93jWltXo4IKmPzs5TkbM-Jtd3dS50ogxYGR8at3aNGMq2tch4WnPEojfVQkESFujfOBgFuixBwe4f7Sgoyb9AYlY0Sop3yT8p0x1nQqAq5aE0KaFwv7Bd09ImVKlWhSZSD4Jc2cYgMnjxsXpbmde4zBapDraqt5_Uzks3d_Gox54J0fPOFnToPRteXVBqt8XyTI-Jkmlc6fLSnu1LKX5QYWkd_ZIpc8eqRyAqmKgbC7k5asnl26_iTs-pWv1h4QpzWz_nBd_kbg6yQDIsOyoOIAmuO1VURyJkIWD9QMcLBTj86UE80KNH686atdDlHUPgmh0c00",
            },
            body: JSON.stringify({
                id_type_sale: 1,
                id_type_home: 1,
                id_city: 1,
                address: "ул. Туркестана 77 кв 5",
                cnt_rooms: 1,
                cnt_loggia: 0,
                cnt_balkony: 1,
                cnt_toilet: 0,
                toilet_from_bathroom: false,
                total_area: 25,
                living_area: 20,
                kitchen_area: 5,
                year_construction: 1980,
                floor: 1,
                floor_all: 5,
                id_condit: 4,
                id_rc: 1,
                other_comment: "",
                phone: "+77013214589",
                phone2: "",
                phone3: "",
                price: 10000,
                images: [],
            }),
        });
    };

    async function chooseFiles() {
        const result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
        });
        const body2 = new FormData();
        body2.append("image", result);
        var name = body2["_parts"][0][1].name;

        const formData = new FormData();
        formData.append("image", result);

        const Mydata = new FormData();
        Mydata.append("file", result);
        console.log("tststs");
        // setFile(Mydata);
        // setSendFileState(true)
        var name = Mydata["_parts"][0][1].name;
        const size = Mydata["_parts"][0][1].size;
        const uri = Mydata["_parts"][0][1].uri;
        console.log(Mydata);
        formData.append("image", {
            uri: uri,
            type: "image/jpg",
            name: name,
        });

        fetch("https://bezrieltora.kz/api/home/upload_image", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: formData,
        }).then((response) => {
            console.log(response.text());
        });
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
                setSendedFileId(responseJson.id);
                setSendedFileName(responseJson.name);
                console.log("responseJson2");
                console.log(responseJson);
            })
            .catch((error) => console.error(error));
        console.log("finish");
    }

    const index = 0;
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
                    <Title style={{ color: "#1a192a", fontSize: 20 }}>Новая заявка</Title>
                </Body>
                <Right />
            </Header>
            <Content style={{ paddingHorizontal: 20, backgroundColor: "#fff" }}>
                <View style={{ paddingHorizontal: 20, backgroundColor: "#fff", marginTop: 20 }}>
                    <View style={{ marginVertical: 10 }}>
                        <View style={{ zIndex: -10, marginTop: 20 }}>
                            <Text>Поле 1</Text>
                            <TextInput
                                placeholder="Поле 1"
                                onChangeText={set_address}
                                value={address}
                                style={{ backgroundColor: "#F2F2F2", borderRadius: 10, padding: 10 }}
                            />
                        </View>
                        <View style={{ zIndex: -10, marginTop: 20 }}>
                            <Text>Поле 2</Text>
                            <TextInput
                                placeholder="Поле 2"
                                onChangeText={set_phone}
                                value={phone}
                                style={{ backgroundColor: "#F2F2F2", borderRadius: 10, padding: 10 }}
                            />
                        </View>
                        <View style={{ zIndex: -10, marginTop: 20 }}>
                            <TextInput
                                placeholder="Поле 3"
                                multiline={true}
                                numberOfLines={4}
                                onChangeText={setOfferDescr}
                                value={offerDescr}
                                style={{ height: 100, backgroundColor: "#F2F2F2", borderRadius: 10, padding: 10 }}
                            />
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text>{sendedFileName || "Файл не выбран"}</Text>
                            <Button
                                full
                                primary
                                onPress={() => chooseFiles()}
                                style={{
                                    backgroundColor: "#F2F2F2",
                                    justifyContent: "space-between",
                                    borderRadius: 10,
                                }}
                            >
                                <Text style={{ color: "#616161" }}>Вложение</Text>
                                <Icon style={{ color: "#616161" }} name="paper" />
                            </Button>
                        </View>
                    </View>
                    <Button
                        block
                        style={{
                            marginVertical: 10,
                            backgroundColor: !shedId ? "#313B73" : "#222e73",
                            zIndex: -10,
                            borderRadius: 10,
                        }}
                        onPress={() => createOffer()}
                    >
                        <Text style={{ color: !shedId ? "#fff" : "#fff" }}>Создать заявку</Text>
                        <FontAwesome style={{ color: "#fff" }} name="send-o" size={24} color="black" />
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
