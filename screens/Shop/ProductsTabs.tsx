import {AntDesign, Ionicons, MaterialIcons, FontAwesome, Entypo} from '@expo/vector-icons';
import {
    Container,
    Content,
    Header,
    Body,
    View,
    Text,
    Title,
    Button,
    Root,
    Left, Right,
} from 'native-base';
import React from 'react';
import { StyleSheet, Image, Modal, TouchableOpacity, } from 'react-native';
import { API, getToken } from '../screens/constants';
import RNPickerSelect from 'react-native-picker-select';

class HomeScreen extends React.Component {
    state = {
        loading: true,
        loadingList: true,
        token: '',
        user: {},
        list: [],
        showProduct: false,
        selectedTeam: '',
        selectedTeams: '',
    };

    _getToken = async () => {
        try {
            getToken().then(itoken => {
                this.setState({ token: itoken });
                this._getRecommendations();
            });
        } catch (error) {
            console.log('error' + error);
        }
    };

    render() {
        return (
            <Container>
                <Header style={styles.headerTop}>
                    <Body style={{ flex: 3 }}>
                        <Title style={{ color: '#1a192a' }}>Сервисы</Title>
                    </Body>
                </Header>

                <Content>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        backgroundColor: '#f4f4f4',
                    }}>
                        <TouchableOpacity
                            style={{
                                width: '47%',
                                padding: 10,
                                margin: 5,
                                backgroundColor: '#fff',
                            }}
                            onPress={() => {
                                this.setState({showProduct: true})
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                height: 25,
                            }}>
                                <Left></Left>
                                <Body/>
                                <Right>
                                    <AntDesign name="hearto" size={24} color="black" />
                                </Right>
                            </View>
                            <View>
                                <Image
                                    resizeMode={'contain'}
                                    style={{ width: '100%', height: 200 }}
                                    source={{
                                        uri: 'https://shoessale.com.ua/public/360/5/4/7/54726/54726_0.jpg',
                                    }}
                                />
                            </View>
                            <View style={{alignItems: 'center', }}>
                                <Text>Кроссовки Nike</Text>
                                <Text style={{fontSize: 20, }}>200 ₸</Text>
                            </View>
                            <View style={{padding: 5, }}>
                                <Button onPress={() => console.log("hello world")} style={{
                                    borderWidth: 1,
                                    borderColor: '#1a192a',
                                    backgroundColor : "#fff",
                                    width: '100%',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{color: '#1a192a', }}>В корзину</Text>
                                </Button>
                            </View>
                            <View style={{paddingRight: 5, paddingLeft: 5, flexDirection: 'row', justifyContent: 'space-between', }}>
                                <Button onPress={() => console.log("hello world")} style={{
                                    borderWidth: 1,
                                    borderColor: '#1a192a',
                                    backgroundColor : "#fff",
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{color: '#1a192a', }}>-</Text>
                                </Button>
                                <Text>1</Text>
                                <Button onPress={() => console.log("hello world")} style={{
                                    borderWidth: 1,
                                    borderColor: '#1a192a',
                                    backgroundColor : "#fff",
                                    width: 40,
                                    height: 40,
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{color: '#1a192a', }}>+</Text>
                                </Button>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Content>
                <Modal
                    animationType={"slide"}
                    visible={this.state.showProduct}
                    transparent={true}
                >
                    <Root>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 20,
                            marginTop: 200,
                            backgroundColor: '#fff',
                        }}>
                            <Image
                                resizeMode={'contain'}
                                style={{ width: '100%', height: 200 }}
                                source={{
                                    uri: 'https://shoessale.com.ua/public/360/5/4/7/54726/54726_0.jpg',
                                }}
                            />
                            <Text>Product</Text>
                            <View style={{padding: 5, flexDirection: 'row', justifyContent: 'space-between',}}>
                                <Button
                                    onPress={() => {
                                        this.setState({showProduct: false})
                                    }}
                                    style={{
                                        borderWidth: 1,
                                        borderColor: '#1a192a',
                                        backgroundColor : "#fff",
                                        width: '48%',
                                        justifyContent: 'center',
                                    }}>
                                    <Text style={{color: '#1a192a', }}>Продолжить покупки</Text>
                                </Button>
                                <Button onPress={() => console.log("hello world")} style={{
                                    borderWidth: 1,
                                    borderColor: '#1a192a',
                                    backgroundColor : "#fff",
                                    width: '48%',
                                    justifyContent: 'center',
                                }}>
                                    <Text style={{color: '#1a192a', }}>В корзину</Text>
                                </Button>
                            </View>
                        </View>
                    </Root>
                </Modal>
            </Container>
        );
    }

    componentDidMount() {
        this._getToken();
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTop: {
        backgroundColor: '#fff',
        borderBottomColor: '#898989',
    },
    rowBottom: {
        zIndex: 1,
        marginTop: -40,
    },
});

