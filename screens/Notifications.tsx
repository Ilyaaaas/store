import { Feather, AntDesign } from '@expo/vector-icons';
import { Container, Header, Left, Body, Title, Right, Spinner } from 'native-base';
import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Modal,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { API, getToken } from './constants';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;

class Notifications extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      refreshing: false,
      listWithoutFilter: [],
      list: [],
      extraList: [],
      currentGood: [],
      modal: false,
      listGrade: [],
      activeDoc: null,
      filterModal: false,
      created_at: '',
      company_name: '',
      currentPageLink: '0',
      topCategoryCheckedId: 1,
      userId: 0,
      exponentPushToken: '',
      date: new Date(Date.now()),
      selectedFilerStateId: 0,
      loading: false,
      offset: 1,
      pageNum: 1,
      searchText: '',
    };
  }

  _getUrl = async (url) => {
    const API_URL = API + url;

    try {
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${this.state.token}`,
        },
      });

      const responseJson = await response.json();
      return responseJson.result;
    } catch (error) {
      //console.log('Error when call API: ' + error.message);
    }
    return null;
  };

  _getGoodsList = async () => {
    const response = await fetch(`https://skstore.kz/mobile/favorites`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${this.state.token}`,
      },
    });

    const responseJson = await response.json();
    if (this.state.list.length == 0) {
      this.setState({
        list: responseJson,
      });
    } else {
      this.setState({
        list: [...this.state.list, ...responseJson[0]],
      });
    }
  };

  _getToken = async () => {
    await AsyncStorage.getItem('accessToken').then((req) =>
      // console.log('test'+req.slice(1, -1))
      this.setState({
        token: req.slice(1, -1),
      })
    );
  };

  _refreshPage = async () => {
    this.setState({ refreshing: true });
    await this._getToken();
    await this._getGoodsList();
    this.setState({ refreshing: false, topCategoryCheckedId: 1 });
  };

  UNSAFE_componentWillMount() {
    this._getToken();
    this._refreshPage();
  }

  getSelectedItem = async (item: any) => {
    this.setState({
      currentGood: item,
      modal: true,
    });
  };

  ItemView = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.getSelectedItem(item)}
        style={{ width: '100%' }}
      >
        <View style={styles.card}>
          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.2) ',
              }}
            >
              <AntDesign name="hearto" size={24} color="black" />
            </View>
          </View>

          <View
            style={{
              height: 200,
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: 'https://skstore.kz/api/getfile/' + item.file_id }}
              style={{ flex: 1, resizeMode: 'contain', width: 100, height: 200 }}
            />
          </View>

          <View style={{ height: 60 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 12, marginTop: 10 }}>{item.title}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 19, fontWeight: 'bold' }}>{item.price}</Text>
            <View
              style={{
                height: 25,
                width: 25,
                backgroundColor: 'green',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>+</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return (
      <View>
        {this.state.list.length > 0 ? <View></View> : <Spinner color="#1a192a" size={10} />}
      </View>
    );
  };

  ItemSeparatorView = () => {
    return <View />;
  };

  getMoreGoods = () => {
    console.log('getMoreGoods');
    this._getGoodsList();
  };

  searchRequest = (text: { text: any }) => {
    console.log('text');
    console.log(text.text);
    this.setState({
      searchText: text.text,
      list: [],
      pageNum: 1,
    });
    console.log('searchRequest');

    this._refreshPage();
  };

  render() {
    return (
      <Container style={{ backgroundColor: '#f6f6f6' }}>
        <Header style={styles.headerTop}>
          <Left></Left>
          <Body style={{ flex: 3 }}>
            <Title style={{ color: '#1a192a' }}>Избранное</Title>
          </Body>
          <Right></Right>
        </Header>
        <SafeAreaView style={{ flex: 1 }}>
          <FlatList
            style={{ paddingLeft: 10, padding: 10 }}
            numColumns={1}
            data={this.state.list}
            extraData={this.state.list}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={this.ItemSeparatorView}
            renderItem={this.ItemView}
            ListFooterComponent={this.renderFooter}
          />
        </SafeAreaView>
        <Modal animationType={'slide'} visible={this.state.modal} transparent={true}>
          <View
            style={{
              backgroundColor: 'rgba(30, 30, 45, 0.8)',
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flex: 1,
                marginTop: 90,
              }}
            >
              <View style={styles.container}>
                <View
                  style={{
                    height: 30,
                    width: '100%',
                    alignItems: 'center',
                    backgroundColor: '#dfdfdf',
                  }}
                >
                  <Feather
                    onPress={() => this.setState({ modal: false })}
                    name="chevrons-down"
                    size={24}
                    color="black"
                  />
                </View>

                <View>
                  <Image
                    source={{
                      uri: 'https://skstore.kz/api/getfile/' + this.state.currentGood.file_id,
                    }}
                    style={{ resizeMode: 'contain', width: 400, height: 400 }}
                  />
                  <View style={{ paddingLeft: 20, paddingRight: 20 }}>
                    <Text style={styles.modalPrice}>{this.state.currentGood.price} тг</Text>
                    <Text style={styles.modalItemDetail}>{this.state.currentGood.goodtitle}</Text>
                    <Text style={styles.modalItemDetail}>{this.state.currentGood.brand}</Text>
                    <Text style={styles.modalItemDetailTitle}>
                      {this.state.currentGood.Postavshik}
                    </Text>
                    <Text style={styles.modalItemDetails}>{this.state.currentGood.cat}</Text>
                    <Text style={styles.modalItemDetails}>{this.state.currentGood.trutitle}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  modalPrice: {
    fontSize: 20,
  },
  modalItemDetail: {
    fontSize: 12,
  },
  modalItemDetailTitle: {
    fontSize: 16,
  },
  modalItemDetails: {
    fontSize: 12,
  },
  topButtonView: {
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
  topButton: {
    backgroundColor: '#FCFCFC',
    margin: 10,
    height: 30,
    borderRadius: 15,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
  topButtonNonActive: {
    backgroundColor: '#F2F2F2',
    margin: 10,
    height: 30,
    borderRadius: 15,
    width: 100,
    alignContent: 'center',
    justifyContent: 'center',
    color: '#646464',
  },
  description: {
    fontSize: 15,
    color: '#646464',
  },
  eventTime: {
    fontSize: 18,
    color: '#151515',
  },
  userName: {
    fontSize: 16,
    color: '#151515',
  },
  mainContent: {
    marginRight: 60,
  },
  danger: {
    color: '#ff1016',
  },
  info: {
    color: '#445aff',
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
    margin: 20,
    padding: 20,
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
    alignItems: 'center',
    textAlign: 'justify',
  },
  textSmallTitle: {
    fontSize: 14,
    color: '#434349',
    fontWeight: 'bold',
  },
  textSmallValue: {
    fontSize: 12,
    color: '#1a192a',
    fontWeight: '300',
  },
  starContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'red',
    fontSize: 12,
    fontWeight: '300',
    marginLeft: 10,
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
    alignItems: 'center',
  },
  btn: {
    // backgroundColor: '#1a192a',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textStyle: {
    paddingVertical: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalView: {
    width: ScreenWidth,
    height: ScreenHeight,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 100,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

  textAreaContainer: {
    width: ScreenWidth - 20,
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    marginBottom: 20,
  },
  textArea: {
    height: 65,
    width: '100%',
    padding: 5,
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
    borderRadius: 15,
    backgroundColor: '#F2F2F2',
    marginTop: 10,
  },
  textArea3: {
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
  textArea4: {
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
    textAlignVertical: 'top',
    justifyContent: 'flex-start',
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
    marginBottom: 20,
  },
  textInput: {
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
    shadowOpacity: 0.4,
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
  icon: {
    height: 28,
    width: 28,
  },
  filterModalInput: {
    backgroundColor: '#F2F2F2',
    zIndex: 100,
  },
  ava_img_small: {
    width: 200,
    height: 300,
    justifyContent: 'center',
    textAlign: 'justify',
    alignItems: 'center',
    alignSelf: 'center',
  },
  message_img: {
    width: 80,
    height: 80,
    borderRadius: 120,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  boxStyle: {
    height: 200,
    width: '48%',
    borderWidth: 1,
    margin: 5,
    backgroundColor: 'red',
  },
  categoryContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  categoryText: { fontSize: 16, color: 'grey', fontWeight: 'bold' },
  categoryTextSelected: {
    color: 'green',
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: 'green',
  },
  card: {
    height: 350,
    backgroundColor: 'white',
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
});

export default Notifications;
