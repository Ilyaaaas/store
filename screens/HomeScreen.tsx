import {SimpleLineIcons, Feather, AntDesign, Ionicons, MaterialIcons, FontAwesome, Entypo} from '@expo/vector-icons';
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Title,
    Right,
    Icon,
    FooterTab,
    Footer,
    List,
    ListItem,
    ActionSheet,
    Toast, Root, Button, Tab, TabHeading, Tabs, Spinner,
} from 'native-base';
import ImageCarousel from 'react-native-image-carousel';
import React, {useEffect} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Linking,
    RefreshControl,
    Modal,
    ScrollView,
    TextInput,
    Dimensions,
    AppState,
    Platform,
    SafeAreaView,
    FlatList,
} from 'react-native';
import {API, getToken} from './constants';
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from 'react-native-datepicker';

import Carousel, { Pagination } from 'react-native-x2-carousel';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const logo = {
    uri: 'https://reactnative.dev/img/tiny_logo.png',
    width: 64,
    height: 64,
};

class HomeScreen extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            refreshing: false,
            listWithoutFilter: [],
            list: [],
            extraList: [],
            isReview: null,
            docInfo: null,
            isDocReviewSelected: null,
            isDocInfoSelected: null,
            modal: false,
            listGrade: [],
            activeDoc: null,
            otziv: '',
            callPhone: '',
            ratingSet: 0,
            filterModal: false,
            dataDocStatusId: 0,
            dataDocId: 0,
            author_name: '',
            avaUrl: '',
            created_at: '',
            company_name: '',
            user: {
                fname: '',
                sname: '',
                section_txt: '',
            },
            currentPage: 0,
            prevPage: 0,
            firstPage: 0,
            lastPage: 0,
            totalPageCount: 0,
            totalReqCount: 0,
            reqCountInOnePage: 0,
            currentPageLink: '0',
            authorName: [],
            topCategoryCheckedId: 1,
            userId: 0,
            exponentPushToken: '',
            date: new Date(Date.now()),
            selectedFilerStateId: 0,
            loading: false,
            offset: 1,
            isListEnd: false,
            pageNum: 1,
        }
    }

    _getUrl = async (url) => {
        const API_URL = API+url;
        // console.log('API_URL');
        // console.log(API_URL);

        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': this.state.token,
                },
            });

            const responseJson = await response.json();
            // console.log('responseJson');
            // console.log(responseJson);
            return responseJson.result;
            // if (responseJson !== null) {
            //   if(responseJson.success == false){
            //     Toast.show({
            //       text: responseJson.message,
            //       type: 'danger',
            //       duration: 3000
            //     });
            //     return null;
            //   }
            //   return responseJson.result;
            // }
        } catch (error) {
            //console.log('Error when call API: ' + error.message);
        }
        return null;
    }

    changeSelectedFilterState = (selectedFilerStateId) =>
    {
        this.setState({selectedFilerStateId: selectedFilerStateId});
    }

    _getGoodsList = async () => {
        const pageNum = this.state.pageNum;
        const response = await fetch(`https://skstore.kz/api/goods?search=&page=${pageNum}&count=12&price_from=0&price_to=8000000&tru=&kato=710000000&brand=&cat=&sort=created_at+desc&filter=&otp=0`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'token': this.state.token,
            },
        });
        const responseJson = await response.json();
        console.log('responseJson')
        console.log(responseJson[0])
        if(this.state.list.length == 0)
        {
            this.setState({
                list: responseJson[0],
                pageNum: pageNum+1,
            })
        }
            else
        {
            this.setState({
                list: [...this.state.list, ...responseJson[0]],
                pageNum: pageNum+1,
            })
        }
        console.log('this.state.list')
        console.log(this.state.list)
        console.log('this.state.list')
    }

    _getToken = async () => {
        await AsyncStorage.getItem('accessToken').then(req => JSON.parse(req))
            .then(
                json => this.setState({
                    token: json[0].accessToken,
                    userId: json[1].userId,
                    // exponentPushToken: json[2].exponentPushToken.substring(18, json[2].exponentPushToken.length - 1)
                })
            )
            // .then(json => {
            //   console.log(json)
            // })
            .catch(error => console.log(error))
    }

    _refreshPage = async () => {
        this.setState({refreshing: true});
        // await this._getToken();
        await this._getGoodsList();
        this.setState({refreshing: false, topCategoryCheckedId: 1});
    }

    UNSAFE_componentWillMount() {
        this._refreshPage();
    }

    onInfoButtonClicked = async (docid) => {
        await this._getUrl(docid)
            .then(value => {
                this.setState({
                    listGrade: value,
                    activeDoc: docid,
                    modal: true,
                });
            })
    }

    renderStatus = () => {
        <Text style={{backgroundColor: 'red'}}>test</Text>
    }

    goToCreateReq = () => {
        this.props.navigation.navigate('OfferScreen');
    }

    filterCategoryArchive = (categoryId) =>
    {
        let data = this.state.listWithoutFilter;

        data = data.filter(
            (item) => item.statusId == 5 || item.statusId == 9 || item.statusId == 12 || item.statusId == 8 || item.statusId == 1
        ).map(item => item);
        this.setState({ list: data});
    }

    like = () => {
        alert('like')
    }

    renderItem = (data) => (
        <View key={data.id} style={{height:400}}>
            <Image
                style={{height: 400, width: 400, marginTop: 0,}}
                source={{
                    uri: 'https://bezrieltora.kz/' + data.pic,
                    height: 100,
                }}
            />
        </View>
    );

    getItem = (item) => {
        // Function for click on an item
        alert('Id : ' + item.id + ' Title : ' + item.title);
    };

    ItemView = ({item}) => {
        return (
            // Flat List Item
            <View style={{width: '100%', borderWidth: 1,}}>
                <TouchableOpacity
                    onPress={() => alert('test')}
                >
                    <View>
                        <View>
                            <AntDesign name="hearto" size={24} color="black" />
                        </View>
                        <View style={{height: 100}}>
                            <Text>{item.title}</Text>
                        </View>
                        <View>
                            <Image style={styles.ava_img_small} source={{uri: 'https://skstore.kz/api/getfile/'+item.id}}></Image>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    renderFooter = () => {
        return (
            <View>
                <Spinner color="#1a192a" size={10}/>
            </View>
        );
    };

    ItemSeparatorView = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: 'blue',
                }}
            />
        );
    };

    getMoreGoods = () => {
        console.log('getMoreGoods')
        this._getGoodsList()
    }

    render() {
        return (
            <SafeAreaView style={{flex: 1}}>
                <FlatList
                    data={this.state.list}
                    extraData={this.state.list}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.ItemSeparatorView}
                    renderItem={this.ItemView}
                    ListFooterComponent={this.renderFooter}
                    // onScroll={(e) => { console.log('test') }}
                    onEndReachedThreshold={0.9}
                    onEndReached = {() =>
                    {
                        this.getMoreGoods();
                    }
                    }
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    topButtonView:
        {
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
            backgroundColor: 'rgba(52, 52, 52, 0.05)',
            borderColor: 'white',
            borderWidth: 10,
            borderRadius: 30,
            overflow: 'hidden',
            shadowColor: '#cdcdcd',
            shadowRadius: 2,
            shadowOpacity: 20,
            shadowOffset: { width: 0, height: 2 },
        },
    topButton:
        {
            backgroundColor: '#FCFCFC',
            margin: 10,
            height: 30,
            borderRadius: 15,
            width: 100,
            alignContent: 'center',
            justifyContent: 'center',
        },
    topButtonNonActive:
        {
            backgroundColor: "#F2F2F2",
            margin: 10,
            height: 30,
            borderRadius: 15,
            width: 100,
            alignContent: 'center',
            justifyContent: 'center',
            color: "#646464",
        },
    description:{
        fontSize:15,
        color: "#646464",
    },
    eventTime:{
        fontSize:18,
        color:"#151515",
    },
    userName:{
        fontSize:16,
        color:"#151515",
    },
    mainContent: {
        marginRight: 60
    },
    danger: {
        color: '#ff1016'
    },
    info: {
        color: '#445aff'
    },
    filterModal: {
        width: 10,
        height: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTop: {
        backgroundColor: '#fff',
        borderColor: '#898989',
    },
    textName: {
        fontSize: 14,
        color: '#5e6064',
        fontWeight: '700',
        paddingBottom: 5,
    },
    tabsContentLabel: {
        fontWeight: '600',
        color: '#434349',
        fontSize: 12,
    },
    tabsContentText: {
        fontWeight: '600',
        color: '#5e6064',
        fontSize: 12,
        justifyContent: 'center',
        alignItems: "center",
        textAlign: 'justify',
    },
    textSmallTitle: {
        fontSize: 14,
        color: '#434349',
        fontWeight: "bold",
    },
    textSmallValue: {
        fontSize: 12,
        color: '#1a192a',
        fontWeight: '300',
    },
    starContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ratingText: {
        color: 'red',
        fontSize: 12,
        fontWeight: '300',
        marginLeft: 10
    },
    buttonsContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        width: 120,
        justifyContent: 'center',
    },
    button: {
        borderRadius: 10,
        margin: 3,
        // borderColor: '#1a192a',
        alignItems: "center",
    },
    btn: {
        // backgroundColor: '#1a192a',
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    textStyle: {
        paddingVertical: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: "center",
    },
    modalView: {
        width: ScreenWidth,
        height: ScreenHeight,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 100
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    textAreaContainer: {
        width: ScreenWidth - 20,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        marginBottom: 20
    },
    textArea: {
        height: 65,
        width: '100%',
        padding: 5,
        textAlignVertical: "top",
        justifyContent: "flex-start",
        borderRadius: 15,
        backgroundColor: '#F2F2F2',
        marginTop: 10,
    },
    textArea3:{
        padding: 10,
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.05)',
        borderColor: 'white',
        borderWidth: 10,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#cdcdcd',
        shadowRadius: 2,
        shadowOpacity: 20,
        shadowOffset: { width: 0, height: 2 },
    },
    textArea4:{
        padding: 10,
        height: 65,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        backgroundColor: 'rgba(52, 52, 52, 0.05)',
        borderColor: 'white',
        borderWidth: 10,
        borderRadius: 15,
        overflow: 'hidden',
        shadowColor: '#cdcdcd',
        shadowRadius: 2,
        shadowOpacity: 20,
        shadowOffset: { width: 0, height: 2 },
    },
    textArea2: {
        height: 30,
        width: '100%',
        padding: 5,
        textAlignVertical: "top",
        justifyContent: "flex-start",
        borderRadius: 20,
        backgroundColor: '#F2F2F2',
        marginTop: 10,
    },
    contactInput: {
        borderWidth: 1,
        width: '100%',
        padding: 5,
    },

    contactContainer: {
        width: ScreenWidth - 20,
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        marginBottom: 20
    },
    textInput:
        {
            fontSize: 14,
            backgroundColor: '#fff',
            color: '#1a192a',
            padding: 5,
            height: 40,
            borderColor: '#898989',
            borderWidth: 0.5,
            textTransform: 'uppercase',
        },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        backgroundColor: '#fff',
        shadowColor: '#1a192a',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    nameContainer: {
        flexDirection: 'row',
        width: 270,
    },
    nameContainer2: {
        flexDirection: 'row',
        width: 270,
        marginTop: 3,
        marginBottom: 3,
        alignItems: 'center',
    },
    label: {
        fontWeight: '600',
        color: '#777',
        fontSize: 12,
    },
    nameTxt: {
        fontWeight: '600',
        color: '#222',
        fontSize: 14,
    },
    mblTxt: {
        fontWeight: '200',
        color: '#777',
        fontSize: 13,
    },
    end: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
    },
    time: {
        fontWeight: '400',
        color: '#666',
        fontSize: 12,
        justifyContent: 'center',
    },
    icon:{
        height: 28,
        width: 28,
    },
    filterModalInput:
        {
            backgroundColor: '#F2F2F2',
            zIndex: 100,
        },
    ava_img_small:
        {
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
    message_img:
        {
            width: 80,
            height: 80,
            borderRadius: 120,
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
        },
    modalPrice:
        {
            fontSize: 20,
        },
    modalItemDetail:
        {
            fontSize: 12,
        },
    modalItemDetailTitle:
        {
            fontSize: 16,
        },
    modalItemDetails:
        {
            fontSize: 12,
        },
    boxStyle: {
        height: 200,
        width: '48%',
        borderWidth: 1,
        margin: 5,
        backgroundColor: 'red',
    },
})

export default HomeScreen;


