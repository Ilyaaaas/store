import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View, StyleSheet, FlatList, SafeAreaView, Picker, TouchableOpacity, TextInput} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { API, getToken } from "../constants";

import {Container, Left, Right, Title, Header, Body, Button, Input} from "native-base";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import { DataTable } from "react-native-paper";
import { ScrollView } from "react-native";

export default function TradesListScreen({ route, navigation }) {
    const [listData, setListData] = useState([]);
    const [token, setToken] = useState();
    const [modalFilter, setModalFilter] = useState(false);
    const [notifModal, setNotifModal] = useState(false);
    const [modalPurpose, setModalPurpose] = useState(false);
    const [acceptedBargs, setAcceptedBargs] = useState([]);
    const [activeBargs, setActiveBargs] = useState([]);
    const [otherBargsLocal, setOtherBargsLocal] = useState([]);
    const [modalTitle, setModalTitle] = useState("");
    const [priceWithNDS, setPriceWithNDS] = useState("");
    const [priceWithoutNDS, setPriceWithoutNDS] = useState("");
    const [tradeId, setTradeId] = useState("");
    const [id, setId] = useState("");
    const [modalKato, setKato] = useState("");
    const [modalUpdatedDate, setModalUpdatedDate] = useState([]);
    const [modalScheduleTxt, setModalSchedule_txt] = useState([]);
    const [modalMkei, setModalMkei] = useState([]);
    const [modalSumma, setModalSumma] = useState([]);
    const [modalSupply_address, setModalSupply_address] = useState([]);
    const [modalPrice, setModalPrice] = useState([]);
    const [modalSummaWnds, setModalSummaWnds] = useState([]);
    const [modalBargDetail, setBargDetail] = useState([]);
    const [isDownloaded, setIsDownloaded] = useState(false);
    const row: Array<any> = [];
    let prevOpenedRow;

    useEffect(() => {
        _getToken();
        console.log(isDownloaded, "isDownloadedisDownloaded");
        if(isDownloaded === false)
        {
            _getGoodsList();
        }
    });

    /**
     *
     */
    const renderItem = ({ item, index }, onClick) => {
        const closeRow = (index) => {
            if (prevOpenedRow && prevOpenedRow !== row[index]) {
                prevOpenedRow.close();
            }
            prevOpenedRow = row[index];
        };

        const renderRightActions = (progress, dragX, onClick) => {
            return (
                <View
                    style={{
                        margin: 0,
                        alignContent: "center",
                        justifyContent: "center",
                        width: 70,
                        backgroundColor: "#e64622",
                    }}>
                    <FontAwesome onPress={onClick} style={{alignSelf: "center"}} name="trash" size={24} color="#fff" />
                </View>
            );
        };

        const showNotif = async (item) => {
            setTradeId(item.bargid);
            setId(item.id);
            setModalTitle(item.title);
            setModalUpdatedDate(item.updated_at);
            setModalSchedule_txt(item.schedule_txt);
            setKato(item.kato);
            setModalMkei(item.mkei);
            setModalSumma(item.summa);
            setModalSupply_address(item.supply_address);
            setModalPrice(item.price);
            setModalSummaWnds(item.summa_wnds);
            setNotifModal(true);
            getDetailsFromApi(item.bargid);
        };

        const getDetailsFromApi = async (id) => {
            const response = await fetch("https://skstore.kz/mobile/bargdetails-"+id, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${token}`,
                },
            });

            const responseJson = await response.json();
            setBargDetail(responseJson);
        };

        return (
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, onClick)
                }
                onSwipeableOpen={() => closeRow(index)}
                ref={(ref) => (row[index] = ref)}
                rightOpenValue={-100}>
                {route.params.arrayLevel == 1 ?
                    <TouchableOpacity onPress={() => showNotif(item)}>
                        <View
                            style={{
                                margin: 4,
                                padding: 9,
                                backgroundColor: "#f8f8f8",
                                borderRadius: 10,
                            }}>
                            <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                    Закуп №{item?.bargid}
                                </Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                    Корзина №{item?.cartgroup}
                                </Text>
                                <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                    Статус {item?.status}
                                </Text>
                            </View>
                            {item.carts.length == 0 ?
                                null
                                :
                                item?.carts.map((data) => {
                                    return <View style={{marginBottom: 10}}>
                                        <Text>Товар: {data?.title}</Text>
                                        <Text>Като: {data?.kato}</Text>
                                    </View>;
                                }
                                )
                            }
                        </View>
                    </TouchableOpacity>
                    : route.params.arrayLevel == 0 ?
                        <TouchableOpacity onPress={() => showNotif(item)}>
                            <View
                                style={{
                                    margin: 4,
                                    padding: 9,
                                    backgroundColor: "#f8f8f8",
                                    borderRadius: 10,
                                }}>
                                <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                    <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                        Закуп №{item?.bargid}
                                    </Text>
                                    <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                        ПП №{item?.id}
                                    </Text>
                                    <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                        Статус {item?.status}
                                    </Text>
                                </View>
                                <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                    <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                        Товар {item?.title}
                                    </Text>
                                </View>
                                <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                    <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                        Като {item?.kato}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        : route.params.arrayLevel == 2 ?
                            <TouchableOpacity onPress={() => showNotif(item)}>
                                <View
                                    style={{
                                        margin: 4,
                                        padding: 9,
                                        backgroundColor: "#f8f8f8",
                                        borderRadius: 10,
                                    }}>
                                    <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                        <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                            Закуп №{item?.id}
                                        </Text>
                                        <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                            Корзина №{item?.id}
                                        </Text>
                                        <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                            Статус {item?.status}
                                        </Text>
                                    </View>
                                    <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                        <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                            Товар {item?.id}
                                        </Text>
                                    </View>
                                    <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                        <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                            Като {item?.kato}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            : route.params.arrayLevel == 3 ?
                                <TouchableOpacity onPress={() => showNotif(item)}>
                                    <View
                                        style={{
                                            margin: 4,
                                            padding: 9,
                                            backgroundColor: "#f8f8f8",
                                            borderRadius: 10,
                                        }}>
                                        <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                            <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                                Закуп №{item?.id}
                                            </Text>
                                            <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                                Корзина №{item?.id}
                                            </Text>
                                            <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                                Статус {item?.status}
                                            </Text>
                                        </View>
                                        <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                            <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                                Товар {item?.id}
                                            </Text>
                                        </View>
                                        <View style={{alignSelf: "flex-start", justifyContent: "space-between", flexDirection: "row"}}>
                                            <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                                Като {item?.kato}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                :
                                null
                }
            </Swipeable>
        );
    };

    const _getToken = async () => {
        await getToken().then(req => {
            console.log(req, "reqreqtkn");
            setToken(req);
        });
    };

    const sendPropose = async () => {
        console.log(`Bearer ${token}`, "tradeId");
        setModalPurpose(false);
        if(route.params.arrayLevel == 0)
        {
            console.log("https://skstore.kz/mobile/bargdetails-26/addprice");
            fetch("https://skstore.kz/mobile/bargdetails-26/addprice", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: "{\"price\":1, \"price_wnds\":1, \"delivery\":1, \"summa\":1, \"summa_wnds\":1}",
            }).then((response) => {
                console.log("fetch");
                return response.json();
            })
                .then((responseJson) => {
                    console.log("responseJson2");
                    console.log(responseJson);
                })
                .catch((error) => console.error(error));
        }
        else if(route.params.arrayLevel == 1)
        {
            console.log("https://skstore.kz/mobile/bargdetails-26/addprice");
            fetch("https://skstore.kz/mobile/bargdetails-26/addprice", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: "{\"price\":1, \"price_wnds\":1, \"delivery\":1, \"summa\":1, \"summa_wnds\":1}",
            }).then((response) => {
                console.log("fetch");
                return response.json();
            })
                .then((responseJson) => {
                    console.log("responseJson2");
                    console.log(responseJson);
                })
                .catch((error) => console.error(error));
        }
        alert("Ваше предложение отправлено");
    };

    const _getGoodsList = async () => {
        let tkn = "";
        setIsDownloaded(true);
        console.log("_getGoodsList");
        await getToken().then(req => {
            tkn = req;
            setToken(req);
        });
        const response = await fetch("https://skstore.kz/mobile/barglist", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${tkn}`,
            },
        });

        const responseJson = await response.json();
        const acceptedBargsLocal = [];
        const activeBargsLocal = [];
        const otherBargsLocal = [];
        console.log(responseJson[0][0], "responseJson");
        console.log(tkn, "token");
        // if (responseJson[0][0].length == 0) {
        if(route.params.arrayLevel == 0 || route.params.arrayLevel == 1)
        {
            setListData(responseJson[route.params.arrayLevel]);
        }
        else if (listData.length == 1)
        {
            setListData(acceptedBargsLocal);
        }
        else
        {
            responseJson[0].map((el) =>
            {
                console.log(el, "cicle");
                if(el.status === "Активен" && el.has_made === 1){
                    console.log("push === Активен");
                    acceptedBargsLocal.push(el);
                }
                if(el.status != "Активен" && el.has_made === 1){
                    console.log("push != Активен");
                    otherBargsLocal.push(el);
                }
            }
            );
            console.log(otherBargsLocal, "otherBargsLocal");
            setListData(acceptedBargsLocal);
            setListData(otherBargsLocal);
        }
        // }
    };

    const deleteItem = ({ item, index }) => {
        const a = listData;
        a.splice(index, 1);
        setListData([...a]);
        alert("Уведомление удалено");
    };

    const addPurpose = async () => {
        setNotifModal(false);
        setModalPurpose(true);
    };

    const acceptPurpose = async () => {
        alert("Подтверждено");
        setNotifModal(false);
    };

    return (
        <Container style={{ backgroundColor: "#f6f6f6" }}>
            <Header style={styles.headerTop}>
                <Left style={{ flex: 1 }}>
                    <Ionicons
                        name="md-arrow-back"
                        style={{ color: "#1a192a", marginLeft: 10 }}
                        onPress={() => navigation.goBack(null)}
                        size={24}
                    />
                </Left>
                <Body style={{ flex: 3 }}>
                    <Title style={{ color: "#1a192a" }}>{route.params.ActivityLabel}</Title>
                </Body>
                <Right>
                </Right>
            </Header>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <FlatList
                        data={listData}
                        renderItem={(v) =>
                            renderItem(v, () => {
                                deleteItem(v);
                            })
                        }
                        keyExtractor={(item) => item.id}>
                    </FlatList>
                </View>
            </SafeAreaView>
            <SwipeUpDownModal
                PressToanimate={false}
                HeaderStyle={{paddingBottom: 20,}}
                ContentModalStyle={styles.Modal}
                HeaderContent={
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            backgroundColor: "#f6f6f6",
                        }}
                    >
                        <AntDesign
                            onPress={() => this.setState({modal: false})}
                            name="minus"
                            size={44}
                            color="black"
                        />
                    </View>
                }
                modalVisible={notifModal}
                onClose={() => setNotifModal(false)}
                ContentModal={
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        {route.params.arrayLevel == 0 || route.params.arrayLevel == 1 ?
                            <View style={styles.container}>
                                <ScrollView style={{padding: 10, marginTop: 20}}>
                                    <Text>{modalKato}</Text>
                                    <View style={{flexDirection: "column"}}>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Информация о закупке</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Дата начала: </Text>
                                            <Text>{modalUpdatedDate}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Время выделенное на закупку: </Text>
                                            <Text>{modalScheduleTxt}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Като</Text>
                                            <Text>{modalKato}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>МКЕИ</Text>
                                            <Text>{modalMkei}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Запланированная стоимость единицы</Text>
                                            <Text>{modalSumma}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Срок на поставку</Text>
                                            <Text>{modalScheduleTxt}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Адрес поставки</Text>
                                            <Text>{modalSupply_address}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Товар</Text>
                                            <Text>{modalTitle}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Дополнительная информация</Text>
                                            <Text>{modalTitle}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Цена за единицу без НДС/с НДС</Text>
                                            <Text>{modalPrice}</Text>
                                        </View>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <Text style={{fontWeight: "bold"}}>Сумма без НДС/с НДС</Text>
                                            <Text>{modalSummaWnds}</Text>
                                        </View>
                                        <Button
                                            style={{width: "100%", justifyContent: "center"}}
                                            onPress={() => addPurpose()}
                                        >
                                            <Text style={{color: "#fff"}}>Добавить предложение</Text>
                                        </Button>
                                        <View style={{flexDirection: "row", width: "100%"}}>
                                            <DataTable style={{padding: 15,}}>
                                                <DataTable.Header style={{backgroundColor: "#DCDCDC",}}>
                                                    <DataTable.Title>Поставщик</DataTable.Title>
                                                    <DataTable.Title>Цена</DataTable.Title>
                                                    <DataTable.Title>Сумма</DataTable.Title>
                                                    <DataTable.Title>Действия</DataTable.Title>
                                                </DataTable.Header>
                                                {modalBargDetail.map((data) => {
                                                    return <DataTable.Row>
                                                        <DataTable.Cell>{data[0]?.title}</DataTable.Cell>
                                                        <DataTable.Cell>{data[0]?.price}</DataTable.Cell>
                                                        <DataTable.Cell>{data[0]?.summa}</DataTable.Cell>
                                                        <DataTable.Cell><Button onPress={() => alert("удалить")}><Text
                                                            style={{padding: 5,}}>Удалить</Text></Button></DataTable.Cell>
                                                    </DataTable.Row>;
                                                })
                                                }
                                            </DataTable>
                                        </View>
                                    </View>
                                </ScrollView>
                            </View> :
                            <View style={styles.container}>
                                <ScrollView style={{padding: 10, marginTop: 20}}>
                                    <Text>{modalKato}</Text>
                                    <Text>{modalScheduleTxt}</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <Button
                                            style={{width: "50%", justifyContent: "center", backgroundColor: "#7a7a7a"}}
                                            onPress={() => setNotifModal(false)}
                                        >
                                            <Text style={{color: "#fff"}}>Отменить</Text>
                                        </Button>
                                        <Button
                                            style={{width: "50%", justifyContent: "center", backgroundColor: "#185002"}}
                                            onPress={() => acceptPurpose()}
                                        >
                                            <Text style={{color: "#fff"}}>Подтвердить</Text>
                                        </Button>
                                    </View>
                                </ScrollView>
                            </View>
                        }
                    </View>
                }/>
            <SwipeUpDownModal
                PressToanimate={false}
                HeaderStyle={{paddingBottom: 20,}}
                ContentModalStyle={styles.Modal}
                HeaderContent={
                    <View
                        style={{
                            width: "100%",
                            alignItems: "center",
                            backgroundColor: "#f6f6f6",
                        }}
                    >
                        <AntDesign
                            onPress={() => this.setState({modal: false})}
                            name="minus"
                            size={44}
                            color="black"
                        />
                    </View>
                }
                modalVisible={modalPurpose}
                onClose={() => setModalPurpose(false)}
                ContentModal={
                    <View
                        style={{
                            flex: 1,
                        }}
                    >
                        <View style={styles.container}>
                            <ScrollView style={{padding: 10, marginTop: 20}}>
                                <View style={{flexDirection: "column"}}>
                                    <View style={{flexDirection: "column", width: "100%"}}>
                                        <Text>Введите цену за единицу без НДС</Text>
                                        <Text>{tradeId}</Text>
                                        <TextInput style={{height: 30, width: "100%", backgroundColor: "#c9c9c9"}} onChangeText={(val) => setPriceWithNDS(val)}>{priceWithNDS}</TextInput>
                                    </View>
                                    <View style={{flexDirection: "column", width: "100%"}}>
                                        <Text>Общая стоимость доставки</Text>
                                        <TextInput style={{height: 30, width: "100%", backgroundColor: "#c9c9c9"}} onChangeText={(val) => setPriceWithoutNDS(val)}>{priceWithoutNDS}</TextInput>
                                    </View>
                                    <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
                                        <Button onPress={() => setModalPurpose(false)} style={{width: "50%"}}><Text>Отмена</Text></Button>
                                        <Button onPress={() => sendPropose()} style={{width: "50%"}}><Text>Да</Text></Button>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                }/>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
        padding: 8,
        flexDirection: "column"
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});
