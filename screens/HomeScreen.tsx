import {Feather, AntDesign, Ionicons, MaterialIcons, FontAwesome, Entypo} from '@expo/vector-icons';
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
    Toast, Root, Button, Tab, TabHeading, Tabs,
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
} from 'react-native';
import {API, getToken} from './constants';
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from 'react-native-datepicker';

import Carousel, { Pagination } from 'react-native-x2-carousel';

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

const numberOfItemsPerPageList = [2, 3, 4];

function PagesPagin()
{
    return
}

const DATA = [
    { text: '#1' },
    { text: '#2' },
    { text: '#3' },
];

class HomeScreen extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            refreshing: false,
            listWithoutFilter: [],
            list: [],
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
        }
    }

    _getUrl = async (url) => {
        const API_URL = API+url;
        console.log('API_URL');
        console.log(API_URL);

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
            console.log('responseJson');
            console.log(responseJson);
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

    _getUrlWithFullURL = async (url) => {
        const API_URL = url;
        //console.log('_getUrlWithFullURL '+API_URL);

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
            return responseJson;
        } catch (error) {
            //console.log('Error when call API: ' + error.message);
        }
        return null;
    }

    changeSelectedFilterState = (selectedFilerStateId) =>
    {
        this.setState({selectedFilerStateId: selectedFilerStateId});
    }

    pagePagin = (currentPageNum) => {
        let content = [];
        var z = currentPageNum;
        var x = currentPageNum+4;
        var backColor = '';
        var textColor = '';
        if(this.state.totalPageCount == 0)
        {
            return <Text>Загрузка...</Text>
        }
        else if(this.state.totalPageCount == 1)
        {
            return <TouchableOpacity key={1} onPress={() => this.changePage(API+'service-requests/v1/request?access-token='+this.state.token+'&_format=json&expand=app,solution,currentPerformerUser,clientUser,status,product,type&sort=-id&page='+1)}
                                     style={{
                                         backgroundColor: `${backColor}`,
                                         padding: 6,
                                         margin: 10,
                                         justifyContent: 'center',
                                         alignContent: 'center',
                                         alignItems: 'center',
                                         width: 2,
                                         flex: 1,
                                         borderColor: 'white',
                                         borderWidth: 3,
                                         borderRadius: 30,
                                         overflow: 'hidden',
                                         shadowColor: '#cdcdcd',
                                         shadowRadius: 2,
                                         shadowOpacity: 20,
                                         shadowOffset: { width: 0, height: 2 },
                                     }}>
                <Text style={{color: `${textColor}`}}>{1}</Text>
            </TouchableOpacity>
        }

        if(currentPageNum > 1)
        {
            z--;
        }
        if(x > this.state.totalPageCount)
        {
            x = this.state.totalPageCount;
        }
        for (let i = z; i < x; i++) {
            backColor = 'rgba(52, 52, 52, 0.05)';
            textColor = '#5e6064';
            if(i == currentPageNum)
            {
                backColor = 'rgba(125, 125, 125, 0.6)';
                textColor = '#ffff';
            }
            content.push(
                <TouchableOpacity key={i} onPress={() => this.changePage(API+'service-requests/v1/request?access-token='+this.state.token+'&_format=json&expand=app,solution,currentPerformerUser,clientUser,status,product,type&sort=-id&page='+i)}
                                  style={{
                                      backgroundColor: `${backColor}`,
                                      // borderRadius: 20,
                                      padding: 6,
                                      margin: 10,
                                      justifyContent: 'center',
                                      alignContent: 'center',
                                      alignItems: 'center',
                                      // borderColor: 'black',
                                      // margin: 5,
                                      width: 2,
                                      flex: 1,
                                      // backgroundColor: 'rgba(52, 52, 52, 0.05)',
                                      borderColor: 'white',
                                      borderWidth: 3,
                                      borderRadius: 30,
                                      overflow: 'hidden',
                                      shadowColor: '#cdcdcd',
                                      shadowRadius: 2,
                                      shadowOpacity: 20,
                                      shadowOffset: { width: 0, height: 2 },
                                  }}>
                    <Text style={{color: `${textColor}`}}>{i}</Text>
                </TouchableOpacity>
            );
        }
        return content;
    }

    _getDoctorList = async () => {
        var url = API;
        if(this.state.currentPageLink != '0')
        {
            url = this.state.currentPageLink;
        }
        await this._getUrlWithFullURL(url)
            .then(value => {
                    if(value !== null){
                        console.log('value.items');
                        console.log(value.result.list.data);
                        console.log('value.items.length')
                            this.setState({
                                list: value.result.list.data,
                                // listWithoutFilter: value.items,
                                // currentPageLink: value._links.self.href,
                                // firstPage: value._links.first.href,
                                // lastPage: value._links.last.href,
                                // currentPage: value._meta.currentPage,
                                // totalPageCount: value._meta.pageCount,
                                // totalReqCount: value._meta.totalCount,
                                // reqCountInOnePage: value.items.length,
                            });
                    }
                }
            )
    }

    _alert = async (msgToast, onSuccess = false) => {
        let tType = "success";
        if(onSuccess == false){
            tType = "danger";
        }
        Toast.show({
            text: msgToast,
            type: tType,
            duration: 3000
        });
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

    _getAuthor = async (authorId) => {
        // console.log('_getAuthor');
        // console.log(authorId);
        // console.log('_getAuthor');
        console.log(API+'portal/v1/person/'+authorId+'?access-token='+this.state.token+'&_format=json');
        await this._getUrl('portal/v1/person/'+authorId+'?access-token='+this.state.token+'&_format=json')
            .then(value => {
                // console.log(value);
                // this.setState({
                //   authorName: value,
                // });
            })
    }

    _getJournal = async (requestId) => {
        //console.log('_getJournal');
        //console.log(requestId);
        //console.log('_getJournal');
        await this._getUrl('service-requests/v1/journal?access-token='+this.state.token).then(value => {
            this.setState({
                journalList: value,
            });
        })
    }

    _refreshPage = async () => {
        this.setState({refreshing: true});
        await this._getToken();
        await this._getDoctorList();
        this.setState({refreshing: false, topCategoryCheckedId: 1});
    }

    UNSAFE_componentWillMount() {
        this._refreshPage();
    }

    _onReviewButtonClicked = async (index) => {
        if (this.state.isDocReviewSelected === index) {
            this.setState({isDocReviewSelected: null});
        } else {
            this.setState({isDocReviewSelected: index});
        }
    }

    searchRequest = async (searchText) =>
    {
        let data = this.state.filteredList;
        data = data.filter(function(item){
            return item.fio.includes(searchText.text.toUpperCase());
        }).map(function({avg_grade, category_name, doc_id, fio, fname, lname, rnum, science_degree, sname, spr_value}){
            return {avg_grade, category_name, doc_id, fio, fname, lname, rnum, science_degree, sname, spr_value};
        });
        this.setState({ list: data});
    }

    _setRetview = async () => {
        let API_URL = `${API}backend/set_grade`
        let showToast = false;
        let msgToast = '';
        /*
        if(this.state.otziv == ''){
            showToast = true;
            msgToast = 'Пустой текст сообщения';
        }
        if(this.state.callPhone == ''){
            showToast = true;
            msgToast = 'Пустой текст обратной связи';
        }
         */
        if(this.state.ratingSet == 0){
            showToast = true;
            msgToast = 'Поставьте пожалуйста оценку';
        }

        if(showToast)
        {
            this._alert(msgToast, false);
            return;
        }
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'token': this.state.token,
                },
                body: `id_doctor=${this.state.activeDoc}&grade=${this.state.ratingSet}&note=${this.state.otziv}&feedback=${this.state.callPhone}`,
            });

            const responseJson = await response.json();
            if (responseJson !== null) {
                let itype = 'success';

                if(responseJson.success == false){
                    itype = 'danger';
                }
                this.setState({activeDoc: null, modal: false, otziv: '', callPhone: '', ratingSet: 0 });
                this._getDoctorList();
                this._alert(responseJson.message, responseJson.success);
            }
        } catch (error) {
            this._alert("Ошибка отправки данных. Повторите еще раз");
        }
    }

    onInfoButtonClicked = async (docid) => {
        await this._getUrl(docid)
            .then(value => {
                this.setState({
                    listGrade: value,
                    activeDoc: docid,
                    modal: true,
                });
                console.log('value.createdBy');
                console.log(value);
                // this._getAuthor(value.createdBy);
            })
    }

    renderStatus = () => {
        <Text style={{backgroundColor: 'red'}}>test</Text>
    }

    goToCreateReq = () => {
        this.props.navigation.navigate('OfferScreen');
    }

    changePage = async (url) => {
        //console.log('link ');
        //console.log(url);
        await this.setState({
            currentPageLink: url,
        });
        this._refreshPage();
    }

    showFilter = () => {
        this.setState({ filterModal: true});
    }

    changeCategory = (topCategoryId) => {
        this.setState({topCategoryCheckedId: topCategoryId});
        if (topCategoryId == 3) {
            this.filterCategoryArchive()
        } else if (topCategoryId == 2) {
            this.filterCategoryMine()
        } else {
            this.setState({list: this.state.listWithoutFilter});
        }
    }

    filterCategoryArchive = (categoryId) =>
    {
        let data = this.state.listWithoutFilter;

        data = data.filter(
            (item) => item.statusId == 5 || item.statusId == 9 || item.statusId == 12 || item.statusId == 8 || item.statusId == 1
        ).map(item => item);
        this.setState({ list: data});
    }

    filterCategoryMine = () =>
    {
        let data = this.state.listWithoutFilter;

        data = data.filter((item) => item.createdBy == this.state.userId).map(item => item);
        this.setState({ list: data});
    }

    completeFilter = () => {
        // console.log(this.state.selectedFilerStateId);
        // console.log(this.state.selectedFilerStateId);
        // this.changePage(API+'service-requests/v1/request?access-token='+this.state.token+'&_format=json&expand=app,solution,currentPerformerUser,clientUser,status,product,type&sort=-id')
        this.setState({ filterModal: false});
        Toast.show({
            text: 'На данный момент функция фильтра дорабатывается. В следующем обновлении мы включим данную функцию.',
            type: 'warning',
            duration: 3000
        });
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

    render() {
        // {console.log('this.state.list')}
        // {console.log(this.state.list)}
        var color = '#0abb87';

        return (
            <Container>
                <Root>
                    <Header style={styles.headerTop}>
                        <Left>
                        </Left>
                        <Body style={{ flex: 3 }}>
                            <Title style={{ color: '#1a192a' }}>Квартиры</Title>
                        </Body>
                        <Right>
                            <AntDesign
                                name="pluscircleo"
                                size={24}
                                color="#1a192a"
                                style={{marginRight: 10}}
                                onPress={() => this.goToCreateReq()}
                            />
                            <AntDesign
                                name="filter"
                                size={24}
                                color="#1a192a"
                                style={{marginRight: 10}}
                                onPress={() => this.showFilter()}
                            />
                        </Right>
                    </Header>
                    <Header style={styles.headerTop}>
                        <View style={styles.topButtonView}>
                            { this.state.topCategoryCheckedId == 1 ?
                                <Button style={styles.topButton} onPress={() => this.changeCategory(1)}>
                                    <Text style={{textAlign: 'center', color: "#535353",}}>
                                        Все
                                    </Text>
                                </Button>
                                :
                                <Button style={styles.topButtonNonActive} onPress={() => this.changeCategory(1)}>
                                    <Text style={{textAlign: 'center', color: "#646464",}}>
                                        Все
                                    </Text>
                                </Button>
                            }
                            { this.state.topCategoryCheckedId == 2 ?
                                <Button style={styles.topButton} onPress={() => this.changeCategory(2)}>
                                    <Text style={{textAlign: 'center', color: "#535353",}}>
                                        Продажа
                                    </Text>
                                </Button>
                                :
                                <Button style={styles.topButtonNonActive} onPress={() => this.changeCategory(2)}>
                                    <Text style={{textAlign: 'center', color: "#646464",}}>
                                        Продажа
                                    </Text>
                                </Button>
                            }
                            { this.state.topCategoryCheckedId == 3 ?
                                <Button style={styles.topButton} onPress={() => this.changeCategory(3)}>
                                    <Text style={{textAlign: 'center', color: "#535353",}}>
                                        Аренда
                                    </Text>
                                </Button>
                                :
                                <Button style={styles.topButtonNonActive} onPress={() => this.changeCategory(3)}>
                                    <Text style={{textAlign: 'center', color: "#646464",}}>
                                        Аренда
                                    </Text>
                                </Button>
                            }
                        </View>
                    </Header>
                    <Content
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._refreshPage}
                            />
                        }
                    >
                        {this.state.refreshing ? (
                            <Text style={{ textAlign: "center", fontSize: 14, flex: 1, marginTop: 20, width: '100%' }}>Подождите идет загрузка данных</Text>
                        ) : (
                            <List>
                                {this.state.list.map((doc, i) => (
                                    <ListItem key={i} style={{
                                        paddingBottom: 0,
                                        paddingTop: 0,
                                        marginLeft: 0,
                                        marginRight: -16,
                                    }}>
                                        <Body>
                                            <TouchableOpacity
                                                activeOpacity={0.7}
                                                onPress={() => this.onInfoButtonClicked(doc.id)}
                                            >
                                                <View style={styles.row}>
                                                    <View style={{width: 280,}}>
                                                        <View style={styles.nameContainer2}>
                                                            <Image style={styles.ava_img_small} source={{uri: 'https://bezrieltora.kz/'+doc.home_pics[0].pic}}></Image>
                                                            {doc.dic_city.name != null ?
                                                                <View style={{paddingLeft: 5}}>
                                                                    <Text style={styles.label}>{doc.dic_type_home.name} </Text>
                                                                    <Text style={styles.nameTxt}>{doc.dic_type_home.name}</Text>
                                                                    <Text style={styles.nameTxt}>{doc.dic_city.name}</Text>
                                                                </View>
                                                                : null }
                                                        </View>
                                                    </View>
                                                    <View style={{
                                                        flexDirection: 'column',
                                                        alignContent: 'center',
                                                        alignItems: 'center',
                                                        width: 80,
                                                        justifyContent: 'center',
                                                    }}>
                                                        <FontAwesome onPress={() => this.like()} name="star-o" size={24} color="black" />
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        </Body>
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Content>
                    <View style={{alignItems: 'center', flexDirection: 'column', backgroundColor: '#1a192a'}}>
                        <Text style={{color: 'white'}}>Показано {this.state.reqCountInOnePage} из {this.state.totalReqCount} заявок</Text>
                    </View>
                    <Footer style={{
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            width: 70,
                            justifyContent: 'space-between',
                            paddingLeft: 10,
                        }}>
                            <AntDesign onPress={() => this.changePage(this.state.firstPage)} name="verticleright" size={20} color='#5e6064' />
                            <AntDesign onPress={() => this.changePage(this.state.prevPage)} name="left" size={24} color='#5e6064'/>
                        </View>
                        <Body style={{justifyContent: 'center', alignItems: 'center', marginLeft: 5, marginRight: 5, width: 200}}>
                            {this.pagePagin(this.state.currentPage)}
                        </Body>
                        <View style={{
                            width: 70,
                            backgroundColor: 'white',
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingRight: 10,
                        }}>
                            <AntDesign onPress={() => this.changePage(this.state.nextPage)} name="right" size={24} color='#5e6064' />
                            <AntDesign onPress={() => this.changePage(this.state.lastPage)} name="verticleleft" size={20} color='#5e6064' />
                        </View>
                    </Footer>
                </Root>
                <Modal
                    animationType={"slide"}
                    visible={this.state.modal}
                    transparent={true}
                >
                    <View style={{
                        backgroundColor: 'rgba(30, 30, 45, 0.8)',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            flex: 1,
                            marginTop: 90,
                        }}>
                            <View style={styles.container}>
                                <View style={{height: 30, width: '100%', alignItems: 'center', backgroundColor: '#dfdfdf'}}>
                                    <Feather onPress={()=>this.setState({ modal: false})} name="chevrons-down" size={24} color="black" />
                                </View>
                                <View style={styles.container}>
                                    {this.state.listGrade.images != undefined ?
                                        <Carousel
                                            pagination={Pagination}
                                            renderItem={this.renderItem}
                                            data={this.state.listGrade.images}
                                        /> :
                                        null
                                    }
                                </View>
                                {console.log(this.state.listGrade)}

                                <View>
                                    <Text style={styles.modalPrice}>{this.state.listGrade.price} тг</Text>
                                    <Text style={styles.modalItemDetail}>{this.state.listGrade.type_home_name} площадью {this.state.listGrade.total_area} м2</Text>
                                    <Text style={styles.modalItemDetailTitle}>{this.state.listGrade.address}</Text>
                                    <Text style={styles.modalItemDetails}>{this.state.listGrade.city_name}</Text>
                                    <Text style={styles.modalItemDetails}>Год постройки: {this.state.listGrade.year_construction}</Text>
                                    <Text style={styles.modalItemDetails}>Общая площадь:{this.state.listGrade.total_area}</Text>
                                    <Text style={styles.modalItemDetails}>Состояние:{this.state.listGrade.condit_name}</Text>
                                    <Text style={styles.modalItemDetails}>________________________</Text>
                                    <Text style={styles.modalItemDetails}>Дата публикации:{this.state.listGrade.date_set}</Text>
                                    {/*<Text style={styles.modalItemDetails}>Просмотров:{this.state.listGrade.condit_name}</Text>*/}
                                </View>
                            </View>
                            <List style={{
                                marginBottom: 0,
                                backgroundColor: '#fff',
                            }}>
                                <ListItem>
                                    <Left>
                                        <Button
                                            success={true}
                                            style={{
                                                width: '90%',
                                                borderRadius: 10,
                                                backgroundColor: '#5cb85c',}}
                                        >
                                            <Text style={{ width: '100%', textAlign: "center", color: 'white'}}>Написать</Text>
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Button
                                            style={{
                                                borderRadius: 10,
                                                backgroundColor: '#007aff',}}
                                        >
                                            <Text style={{ width: '100%', textAlign: "center", color: 'white'}}>Позвонить</Text>
                                        </Button>
                                    </Body>
                                </ListItem>
                            </List>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType={"fade"}
                    style={{backgroundColor: 'black'}}
                    transparent={true}
                    visible={this.state.filterModal}
                    contentContainerStyle={styles.filterModal}
                    onRequestClose={()=>this.setState({ filterModal: false})}>
                    <View style={{
                        backgroundColor: 'rgba(30, 30, 45, 0.8)',
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'}}>
                        <View style={{
                            backgroundColor: 'white',
                            width: 350,
                            height: 600,
                            borderRadius: 10,
                        }}>
                            <Text
                                onPress={()=>this.setState({ filterModal: false})}
                                style={{alignSelf:'flex-end', fontSize: 20, padding: 4, margin: 4}}>
                                <MaterialIcons
                                    name="close"
                                    size={28}
                                    color="#1a192a"
                                />
                            </Text>
                            <View style={{padding: 20, }}>
                                <Text style={{paddingTop: 10, paddingBottom: 5}}>По статусам</Text>
                                <DropDownPicker
                                    items={[
                                        {label: 'Согласование', value: 0},
                                        {label: 'Новая', value: 1},
                                        {label: 'Назначена', value: 2},
                                        {label: 'Ждет ответа', value: 3},
                                        {label: 'На исполнении', value: 4},
                                        {label: 'Исполнена', value: 5},
                                        {label: 'Закрыта', value: 6},
                                        {label: 'Не согласована', value: 7},
                                        {label: 'Отклонена', value: 8},
                                    ]}
                                    placeholder={'Не выбрано'}
                                    containerStyle={{height: 40}}
                                    onChangeItem={item => this.changeSelectedFilterState(item.value)}
                                    style={styles.filterModalInput}
                                    dropDownStyle=
                                        {{
                                            backgroundColor: '#F2F2F2',
                                        }}
                                />
                            </View>
                            <Text style={{paddingRight: 20, paddingLeft: 20, paddingTop: 10, paddingBottom: 5, zIndex: -10,}}>
                                По датам
                            </Text>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                flex: 1,
                                paddingLeft: 20,
                                paddingRight: 20,
                                zIndex: -10,
                            }}>
                                <DatePicker
                                    style={{width: '50%', height: 50}}
                                    date={this.state.dateFilterFrom}
                                    mode="date"
                                    placeholder="От"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0,
                                            zIndex: -10,
                                        },
                                        dateInput: {
                                            marginLeft: 36,
                                            zIndex: -10,
                                        }
                                    }}
                                    onDateChange={(dateFilterFrom) => {this.setState({dateFilterFrom: dateFilterFrom})}}
                                />
                                <DatePicker
                                    style={{width: '50%', height: 50}}
                                    date={this.state.dateFilterTo}
                                    mode="date"
                                    placeholder="До"
                                    format="YYYY-MM-DD"
                                    minDate="2016-05-01"
                                    maxDate="2016-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            position: 'absolute',
                                            left: 0,
                                            top: 4,
                                            marginLeft: 0
                                        },
                                        dateInput: {
                                            marginLeft: 36
                                        }
                                    }}
                                    onDateChange={(dateFilterTo) => {this.setState({dateFilterTo: dateFilterTo})}}
                                />
                            </View>
                            <Button
                                success={true}
                                style={{
                                    backgroundColor: '#0abb87',
                                    borderRadius: 15,
                                    shadowColor: '#989898',
                                    width: '100%',
                                    height: 60,
                                    padding: 20,
                                    borderWidth: 10,
                                    borderColor: '#fff',
                                }}
                                onPress={() => this.completeFilter()}
                            >
                                <Text style={{ width: '100%', textAlign: "center", color: '#fff', fontSize: 16}}>Применить</Text>
                            </Button>
                            {/*<TextInput style={{borderWidth: 1, padding: 10}} value={this.state.exponentPushToken}></TextInput>*/}
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={[styles.button, styles.btn]}
                            >
                                <Text style={{ width: '100%', textAlign: "center", color: 'white'}}>Применить</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </Container>
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
            width: 150,
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
})

export default HomeScreen;


