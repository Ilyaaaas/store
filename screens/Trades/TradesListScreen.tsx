import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import * as React from "react";
import {useEffect, useState} from "react";
import {Text, View, StyleSheet, FlatList, SafeAreaView, Picker, TouchableOpacity, TextInput} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { API, getToken } from "../constants";

import {Container, Left, Right, Title, Header, Body, Button} from "native-base";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import { DataTable } from "react-native-paper";

export default function TradesListScreen({ route, navigation }) {
    const [listData, setListData] = useState([]);
    const [token, setToken] = useState();
    const [modalFilter, setModalFilter] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalKato, setKato] = useState("");
    const [notifModal, setNotifModal] = useState(false);
    const row: Array<any> = [];
    let prevOpenedRow;

    useEffect(() => {
        _getToken();
        console.log("qwdqwdq");
        _getGoodsList();
    });

    /**
     *
     */
    const renderItem = ({ item, index }, onClick) => {
        const closeRow = (index) => {
            console.log("closerow");
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
            setModalTitle(item.title);
            setKato(item.kato);
            setNotifModal(true);
        };

        return (
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, onClick)
                }
                onSwipeableOpen={() => closeRow(index)}
                ref={(ref) => (row[index] = ref)}
                rightOpenValue={-100}>
                {route.params.arrayLevel != 0 ?
                    <TouchableOpacity onPress={() => showNotif(item)}>
                        <View
                            style={{
                                margin: 4,
                                padding: 9,
                                backgroundColor: "#f8f8f8",
                                borderRadius: 10,
                            }}>
                            {
                                item.carts.map((data) =>
                                {
                                    return <Text>{data.title}</Text>;
                                }
                                )
                            }
                            <View style={{alignSelf: "flex-end",}}>
                                <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                    {item?.status}
                                </Text>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={{fontSize: 13, color: "#6e6e6e"}}>
                                    {item?.title}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => showNotif(item)}>
                        <View
                            style={{
                                margin: 4,
                                padding: 9,
                                backgroundColor: "#f8f8f8",
                                borderRadius: 10,
                            }}>
                            <View style={{alignSelf: "flex-end",}}>
                                <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                                    {item?.id}
                                </Text>
                            </View>
                            <View style={{marginTop: 10}}>
                                <Text style={{fontSize: 13, color: "#6e6e6e"}}>
                                    {item?.title}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                }
            </Swipeable>
        );
    };

    const _getToken = async () => {
        await getToken().then(req => {
            setToken(req);
        });
    };

    const _getGoodsList = async () => {
        console.log(token, "qwdqwdq");
        const response = await fetch("https://skstore.kz/mobile/barglist", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`,
            },
        });

        console.log(response, "asdas");
        const responseJson = await response.json();
        console.log(response);
        console.log(responseJson, "responseJsonresponseJson");
        if (listData.length == 0) {
            setListData(responseJson[route.params.arrayLevel]);
        }
    };

    const deleteItem = ({ item, index }) => {
        console.log("item, index");
        console.log(item, index);
        const a = listData;
        a.splice(index, 1);
        console.log("a");
        console.log(a);
        setListData([...a]);
        alert("Уведомление удалено");
    };

    console.log(listData, "listData");
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
                                console.log("Pressed", v);
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
                        <View style={styles.container}>
                            <View style={{height: 60, marginTop: 10, marginBottom: 20, }}>
                                <Text>{modalKato}</Text>
                                <View style={{paddingBottom: 20, paddingTop: 20, }}>
                                    <View style={{marginBottom: 20,}}>
                                        <View style={{height: 40, marginTop: 20, flexDirection: "row"}}>
                                            <View style={{flexDirection: "column"}}>
                                                <View style={{flexDirection: "row"}}>
                                                    <Text style={{fontWeight: "bold"}}>{modalTitle}</Text>
                                                </View>
                                                <View style={{flexDirection: "row"}}>
                                                    <DataTable style={{padding: 15, }}>
                                                        <DataTable.Header style={{backgroundColor: "#DCDCDC",}}>
                                                            <DataTable.Title>Name</DataTable.Title>
                                                            <DataTable.Title>Favourite Food</DataTable.Title>
                                                            <DataTable.Title>Age</DataTable.Title>
                                                        </DataTable.Header>
                                                        <DataTable.Row>
                                                            <DataTable.Cell>Radhika</DataTable.Cell>
                                                            <DataTable.Cell>Dosa</DataTable.Cell>
                                                            <DataTable.Cell>23</DataTable.Cell>
                                                        </DataTable.Row>
                                                        <DataTable.Row>
                                                            <DataTable.Cell>Krishna</DataTable.Cell>
                                                            <DataTable.Cell>Uttapam</DataTable.Cell>
                                                            <DataTable.Cell>26</DataTable.Cell>
                                                        </DataTable.Row>
                                                        <DataTable.Row>
                                                            <DataTable.Cell>Vanshika</DataTable.Cell>
                                                            <DataTable.Cell>Brownie</DataTable.Cell>
                                                            <DataTable.Cell>20</DataTable.Cell>
                                                        </DataTable.Row>
                                                        <DataTable.Row>
                                                            <DataTable.Cell>Teena</DataTable.Cell>
                                                            <DataTable.Cell>Pizza</DataTable.Cell>
                                                            <DataTable.Cell>24</DataTable.Cell>
                                                        </DataTable.Row>
                                                    </DataTable>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
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
