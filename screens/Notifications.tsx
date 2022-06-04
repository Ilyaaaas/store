import {Feather, AntDesign, FontAwesome} from "@expo/vector-icons";
import * as React from "react";
import {useEffect, useState} from "react";
import { Text, View, StyleSheet, FlatList, Button } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { API, getToken } from "./constants";

import Constants from "expo-constants";

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "First Item",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "Second Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Third Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d71",
        title: "Fourth Item",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d70",
        title: "Fifth Item",
    },
];

export default function Notifications() {
    const [listData, setListData] = useState([]);
    const [list, setList] = useState([]);
    const [token, setToken] = useState();
    const [refreshState, setRefreshState] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);
    const row: Array<any> = [];
    let prevOpenedRow;

    useEffect(() => {
        _getToken();
        _getGoodsList();
    });

    /**
     *
     */
    const renderItem = ({ item, index }, onClick) => {
        console.log("item");
        console.log(item.id);
        console.log("index");
        console.log(index);
        //
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

        return (
            <Swipeable
                renderRightActions={(progress, dragX) =>
                    renderRightActions(progress, dragX, onClick)
                }
                onSwipeableOpen={() => closeRow(index)}
                ref={(ref) => (row[index] = ref)}
                rightOpenValue={-100}>
                <View
                    style={{
                        margin: 4,
                        padding: 9,
                        backgroundColor: "#f8f8f8",
                        borderRadius: 10,
                    }}>
                    <View style={{alignSelf: "flex-end", }}>
                        <Text style={{fontSize: 12, fontWeight: "bold", color: "#6e6e6e"}}>
                            {item.created_at}
                        </Text>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{fontSize: 13, color: "#6e6e6e"}}>
                            {item.text}
                        </Text>
                    </View>
                </View>
            </Swipeable>
        );
    };

    const _getToken = async () => {
        await getToken().then(req => {
            setToken(req);
        });
    };

    const _getGoodsList = async () => {
        const response = await fetch("https://skstore.kz/mobile/getnotif", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Bearer ${token}`,
            },
        });

        const responseJson = await response.json();
        // console.log("responseJson22");
        // console.log(responseJson);
        // console.log("responseJson22");
        if (listData.length == 0) {
            setListData(responseJson);
        }
        // else {
        //     setListData([...listData, ...responseJson]);
        // }
    };

    const deleteItem = ({ item, index }) => {
        console.log("item, index");
        console.log(item, index);
        const a = listData;
        a.splice(index, 1);
        console.log("a");
        console.log(a);
        setListData([...a]);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={listData}
                renderItem={(v) =>
                    renderItem(v, () => {
                        console.log("Pressed", v);
                        deleteItem(v);
                    })
                }
                keyExtractor={(item) => item.id}></FlatList>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#ecf0f1",
        padding: 8,
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
});
