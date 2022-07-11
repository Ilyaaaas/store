import { Feather, AntDesign } from "@expo/vector-icons";
import {Container, Header, Left, Body, Title, Right, Button, Spinner, Content, CheckBox} from "native-base";
import React, { useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    AsyncStorage,
    Modal,
    TextInput,
    Dimensions,
    SafeAreaView,
    FlatList,
    ScrollView, Platform, Picker, Alert,
} from "react-native";
import { API, getToken } from "./constants";
import SwipeUpDownModal from "react-native-swipe-modal-up-down";
import { Dropdown } from "react-native-element-dropdown";
import RangeSlider, { Slider } from "react-native-range-slider-expo";

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            token: "",
            refreshing: false,
            listWithoutFilter: [],
            list: [],
            extraList: [],
            currentGood: [],
            currentGoodId: 0,
            currentGoodDescription: "",
            currentGoodDescriptionProvid: "",
            currentGoodBrands: [],
            currentGoodProperties: [],
            modal: false,
            modalFilter: false,
            listGrade: [],
            activeDoc: null,
            otziv: "",
            callPhone: "",
            ratingSet: 0,
            filterModal: false,
            created_at: "",
            company_name: "",
            currentPageLink: "0",
            topCategoryCheckedId: 1,
            userId: 0,
            exponentPushToken: "",
            date: new Date(Date.now()),
            selectedFilerStateId: 0,
            loading: false,
            offset: 1,
            isListEnd: false,
            pageNum: 1,
            searchText: "",
            fullGoodInfo: "",
            openDropdown: false,
            myProposeState: false,
            selectedVal: null,
            fromValue: 0,
            toValue: 5000,
            categ: "goods",
            selectedBrand: null,
            isOtpChecked: false,
        };
    }

    _getToken = async () => {
        await getToken().then(req => {
            this.setState({token: req});
        });
    };

    _getGoodsList = async () => {
        const pageNum = this.state.pageNum;
        const response = await fetch(
            `https://skstore.kz/api/goods?page=${pageNum}&count=12&price_from=0&price_to=8000000&tru=&kato=710000000&brand=&cat=&sort=created_at+desc&filter=&otp=0`,
            {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded",
                    Authorization: `Bearer ${this.state.token}`,
                },
            }
        );
        const responseJson = await response.json();
        console.log(responseJson, "responseJson222");
        if (this.state.list.length == 0) {
            this.setState({
                list: responseJson[0],
                pageNum: pageNum + 1,
            });
        } else {
            this.setState({
                list: [...this.state.list, ...responseJson[0]],
                pageNum: pageNum + 1,
            });
        }
    };

    changeCategory = async (categId) => {
        if (categId == 2)
        {
            this.setState({ refreshing: false, topCategoryCheckedId: 2 });
            this.setState({
                list: ""
            });
            const pageNum = this.state.pageNum;
            const response = await fetch(
                "https://skstore.kz/mobile/providergoods",
                {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer "+this.state.token,
                    },
                }
            );
            const responseJson = await response.json();
            console.log(responseJson, "responseJson");
            console.log(this.state.token, "this.state.token");
            this.setState({
                list: responseJson,
                topCategoryCheckedId: 2
            });
        }
        else if(categId == 1)
        {
            this.setState({ refreshing: false, topCategoryCheckedId: categId });
            this.setState({
                list: ""
            });
            this._refreshPage();
        }
    };

    like = async () => {
        alert("like");
    };

    _refreshPage = async () => {
        this.setState({ refreshing: true });
        // await this._getToken();
        await this._getGoodsList();
        this.setState({ refreshing: false, topCategoryCheckedId: 1 });
    };

    UNSAFE_componentWillMount() {
        this._refreshPage();
        this._getToken();
    }

    getSelectedItem = async (item: any) => {
        console.log(item, "currentGoodDescriptionProvidItem");
        this.setState({
            currentGood: item,
            modal: true,
        });
        this.getOneGood(item.id);
    };

    getOneGood = async (currentGoodId) => {
        console.log(`https://skstore.kz/api/good/${currentGoodId}`, "currentAPIiiiiiiii");
        console.log("Bearer "+this.state.token, "ещлут");
        if(this.state.topCategoryCheckedId != 2) {
            const response = await fetch(
                `https://skstore.kz/mobile/good/${currentGoodId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + this.state.token,
                    },
                }
            );
            const responseJson = await response.json();
            console.log(responseJson["prvgood"], "responseJson[1]");
            this.setState({
                currentGoodDescription: responseJson[2][0]["txt"],
                currentGoodProperties: responseJson[1],
            });
        }
        else
        {
            const response = await fetch(
                `https://skstore.kz/mobile/providergoods/${currentGoodId}`,
                {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded",
                        "Authorization": "Bearer " + this.state.token,
                    },
                }
            );
            const responseJson = await response.json();
            console.log(responseJson["prvgood"], "prvgood");
            this.setState({
                currentGoodDescriptionProvid: responseJson["prvgood"],
                currentGoodBrands: responseJson["brands"],
                currentGoodOtp: responseJson["otplist"],
            });
        }
    };

    ItemView = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => this.getSelectedItem(item)}
                style={{ width: "50%" }}
            >
                <View style={styles.card}>
                    <View style={{ alignItems: "flex-end" }}>
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <AntDesign
                                onPress={() => this.like()}
                                style={{
                                    shadowColor: "#c4c3c3",
                                    shadowOffset: {
                                        width: 2,
                                        height: 5,
                                    },
                                    shadowOpacity: 6,
                                    shadowRadius: 6,
                                }} name="heart" size={24} color="#fff" />
                        </View>
                    </View>

                    <View
                        style={{
                            height: 200,
                            alignItems: "center",
                        }}
                    >
                        {item.file_id !== null ?
                            <Image
                                source={{uri: "https://skstore.kz/api/getfile/" + item.file_id}}
                                style={{flex: 1, resizeMode: "contain", width: 100, height: 200}}
                            />
                            :
                            <Image
                                source={{uri: "https://skstore.kz/mobile/getfile/" + item.file_id}}
                                style={{flex: 1, resizeMode: "contain", width: 100, height: 200}}
                            />
                        }
                    </View>

                    <View style={{ height: 60 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 12, marginTop: 10 }}>{item.title}</Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 5,
                        }}
                    >
                        <Text style={{ fontSize: 19, fontWeight: "bold" }}>{item.price} ₸</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

      renderFooter = () => {
          if(this.state.topCategoryCheckedId == 1) {
              return (
                  <View>
                      <Spinner color="#1a192a" size={10}/>
                  </View>
              );
          }
          else
          {
              return (
                  <View></View>
              );
          }
      };

      ItemSeparatorView = () => {
          return <View />;
      };

      getMoreGoods = () => {
          if(this.state.topCategoryCheckedId == 1)
          {
              this._getGoodsList();
          }
      };

      addPropose = (text: { text: any }) => {
          this.setState({modal: false, currentGoodDescription: "", myProposeState: true });
          // alert("Ваше предложение отправлено");
      };

      render() {
          console.log("this.state.currentGoodProperties");
          console.log(this.state.currentGoodDescriptionProvid);
          return (
              <Container style={{ backgroundColor: "#f6f6f6" }}>
                  <Header style={styles.headerTop}>
                      <Left></Left>
                      <Body style={{ flex: 3 }}>
                          <Title style={{ color: "#1a192a" }}>Все товары</Title>
                      </Body>
                      <Right>
                          <AntDesign
                              name="filter"
                              size={24}
                              color="#1a192a"
                              style={{marginRight: 10}}
                              onPress={() => this.setState({modalFilter: true})}
                          />
                      </Right>
                  </Header>
                  <Header style={styles.headerTop}>
                      <View style={styles.topButtonView}>
                          {this.state.topCategoryCheckedId == 1 ? (
                              <Button style={styles.topButton} onPress={() => this.changeCategory(1)}>
                                  <Text style={{ textAlign: "center", color: "#535353" }}>Все</Text>
                              </Button>
                          ) : (
                              <Button style={styles.topButtonNonActive} onPress={() => this.changeCategory(1)}>
                                  <Text style={{ textAlign: "center", color: "#646464" }}>Все</Text>
                              </Button>
                          )}
                          {this.state.topCategoryCheckedId == 2 ? (
                              <Button style={styles.topButton} onPress={() => this.changeCategory(2)}>
                                  <Text style={{ textAlign: "center", color: "#535353" }}>Мои</Text>
                              </Button>
                          ) : (
                              <Button style={styles.topButtonNonActive} onPress={() => this.changeCategory(2)}>
                                  <Text style={{ textAlign: "center", color: "#646464" }}>Мои</Text>
                              </Button>
                          )}
                      </View>
                  </Header>
                  <SafeAreaView style={{ flex: 1 }}>
                      {/*<Text style={{backgroundColor: "red", alignContent: "center"}}>qq{this.state.topCategoryCheckedId}</Text>*/}
                      <FlatList
                          style={{ paddingLeft: 10, padding: 10 }}
                          numColumns={2}
                          data={this.state.list}
                          extraData={this.state.list}
                          keyExtractor={(item, index) => index.toString()}
                          ItemSeparatorComponent={this.ItemSeparatorView}
                          renderItem={this.ItemView}
                          ListFooterComponent={this.renderFooter}
                          onEndReachedThreshold={0}
                          onEndReached={() => this.getMoreGoods()}
                      />
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
                      modalVisible={this.state.modal}
                      onClose={() => this.setState({modal: false, currentGoodDescription: ""})}
                      ContentModal={
                          <ScrollView>
                              <View
                                  style={{
                                      flex: 1,
                                  }}
                              >
                                  {this.state.topCategoryCheckedId == 2 ?
                                      <View style={styles.container}>
                                          {this.state.currentGood.file_id != null ?
                                              <Image
                                                  source={{
                                                      uri: "https://skstore.kz/mobile/getfile/" + this.state.currentGood.file_id,
                                                  }}
                                                  style={{
                                                      resizeMode: "contain",
                                                      width: "100%",
                                                      height: 400,
                                                      marginTop: 70,
                                                  }}
                                              />
                                              :
                                              <Image
                                                  source={{
                                                      uri: "https://skstore.kz/mobile/getfile/null",
                                                  }}
                                                  style={{
                                                      resizeMode: "contain",
                                                      width: "100%",
                                                      height: 400,
                                                      marginTop: 70,
                                                  }}/>
                                          }
                                          <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20,}}>
                                              <Text style={{fontWeight: "bold", fontSize: 20, }}>{this.state.currentGood.title}</Text>
                                              <Text>Артикул</Text>
                                              <TextInput
                                                  keyboardType = 'numeric'
                                                  style={{backgroundColor: "#eeeeee", height: 40, borderRadius: 10, color: "#969595", padding: 10,}}>
                                                  {this.state.currentGood.CODE}
                                              </TextInput>
                                              {console.log(this.state.currentGoodBrands, "currentGoodBrands")}
                                              <View style={{height: 60, }}>
                                                  <Text>Бренд</Text>
                                                  <Dropdown
                                                      data={this.state.currentGoodBrands}
                                                      style={{flex:1, height: 50}}
                                                      search
                                                      maxHeight={300}
                                                      labelField="title"
                                                      valueField="id"
                                                      placeholder={"не выбрано"}
                                                      searchPlaceholder="поиск..."
                                                      onChange={item => {
                                                          console.log(item.value, item.label);
                                                      }}
                                                  />
                                              </View>
                                              <Text>Наименование товара</Text>
                                              <TextInput
                                                  keyboardType = 'numeric'
                                                  style={{backgroundColor: "#eeeeee", height: 40, borderRadius: 10, color: "#969595", padding: 10,}}>
                                                  {this.state.currentGood.title}
                                              </TextInput>
                                              <Text>Стоимость единицы (Без НДС)</Text>
                                              <TextInput
                                                  keyboardType = 'numeric'
                                                  style={{backgroundColor: "#eeeeee", height: 40, borderRadius: 10, color: "#969595", padding: 10,}}>
                                                  {this.state.currentGood.price}
                                              </TextInput>
                                              <Text>Вес (Брутто)</Text>
                                              <TextInput
                                                  keyboardType = 'numeric'
                                                  style={{backgroundColor: "#eeeeee", height: 40, borderRadius: 10, color: "#969595", padding: 10,}}>
                                                  {this.state.currentGood.brutto}
                                              </TextInput>
                                              <Text>Информация о гарантии</Text>
                                              <TextInput
                                                  keyboardType = 'numeric'
                                                  style={{backgroundColor: "#eeeeee", height: 40, borderRadius: 10, color: "#969595", padding: 10,}}>
                                                  {this.state.currentGood.price}
                                              </TextInput>
                                              <Text>Товар отечественного производства</Text>
                                              <CheckBox checked={this.state.isOtpChecked} onPress={() => this.setState({isOtpChecked: !this.state.isOtpChecked})}>
                                              </CheckBox>
                                              {this.state.isOtpChecked == true ?
                                                  <View>
                                                      <View style={{height: 60, }}>
                                                          <Text>Сертификат</Text>
                                                          {console.log(this.state.currentGoodOtp, "currentGoodOtp")}
                                                          <Dropdown
                                                              data={this.state.currentGoodOtp}
                                                              style={{flex:1, height: 50}}
                                                              search
                                                              maxHeight={300}
                                                              labelField="product_name"
                                                              valueField="id"
                                                              placeholder={"не выбрано"}
                                                              searchPlaceholder="поиск..."
                                                              onChange={item => {
                                                                  console.log(item.value, item.label);
                                                              }}
                                                          />
                                                      </View>
                                                      <View>
                                                          <Text>ДМС</Text>
                                                          <TextInput
                                                              keyboardType = 'numeric'
                                                              style={{backgroundColor: "#eeeeee", height: 40, borderRadius: 10, color: "#969595", padding: 10,}}>
                                                              {this.state.currentGood.dms}
                                                          </TextInput>
                                                      </View>
                                                  </View>
                                                  :
                                                  null
                                              }
                                              <Button onPress={() => {this.setState({modal: false}); alert("Ваши данные сохранены");}} style={{width: "100%", marginTop: 5, marginBottom: 5, justifyContent: "center", backgroundColor: "green"}}>
                                                  <Text style={{ textAlign: "center", color: "#fff"}}>
                                                      Сохранить
                                                  </Text>
                                              </Button>
                                          </View>
                                      </View>
                                      :
                                      <View style={styles.container}>
                                          <Image
                                              source={{
                                                  uri: "https://skstore.kz/api/getfile/" + this.state.currentGood.file_id,
                                              }}
                                              style={{resizeMode: "contain", width: "100%", height: 400,}}
                                          />
                                          <View style={{ addingLeft: 20, paddingRight: 20, paddingBottom: 20,}}>
                                              <Text style={styles.modalPrice}>{this.state.currentGood.price} тг</Text>
                                              <Text style={styles.modalItemDetail}>{this.state.currentGood.goodtitle}</Text>
                                              <Text style={styles.modalItemDetail}>{this.state.currentGood.brand}</Text>
                                              <Text style={styles.modalItemDetails}>{this.state.currentGood.cat}</Text>
                                              <Text style={styles.modalItemDetails}>{this.state.currentGood.trutitle}</Text>
                                              {this.state.currentGoodDescription === "" ? (
                                                  <View>
                                                      <Spinner color="#1a192a" size={10} />
                                                  </View>
                                              ) : (
                                                  <View>
                                                      <Text style={{fontWeight: "bold"}}>{this.state.currentGoodId}Коротко о товаре</Text>
                                                      <Text>{this.state.currentGoodDescription}</Text>
                                                      <Text style={{fontWeight: "bold"}}>Характеристики</Text>
                                                      {
                                                          this.state.currentGoodProperties.map((item, key) =>
                                                              <Text>{item.attr_title} - {item.title}</Text>
                                                          )
                                                      }
                                                      <Text style={{fontWeight: "bold"}}>Поставщики</Text>
                                                      <Text>нет</Text>
                                                  </View>
                                              )}
                                              <Button onPress={() => {this.addPropose();}} style={{width: "100%", marginTop: 5, marginBottom: 5, justifyContent: "center", backgroundColor: "green"}}>
                                                  {/*<Button onPress={() => this.setState({modal: false})} style={{width: "100%", marginTop: 5, marginBottom: 5, justifyContent: "center", backgroundColor: "green"}}>*/}
                                                  <Text style={{ textAlign: "center", color: "#fff"}}>Внести предложение</Text>
                                              </Button>
                                          </View>
                                      </View>
                                  }
                              </View>
                          </ScrollView>
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
                                  onPress={() => this.setState({myProposeState: false})}
                                  name="minus"
                                  size={44}
                                  color="black"
                              />
                          </View>
                      }
                      modalVisible={this.state.myProposeState}
                      onClose={() => this.setState({myProposeState: false, currentGoodDescription: ""})}
                      ContentModal={
                          <ScrollView>
                              <View
                                  style={{
                                      flex: 1,
                                  }}
                              >
                                  <View style={styles.container}>
                                      <View style={{ zIndex: -10, marginTop: 20 }}>
                                          <Text>Цена (тг)</Text>
                                          <TextInput
                                              placeholder="Цена"
                                              keyboardType = 'numeric'
                                              // onChangeText={set_address}
                                              // value={address}
                                              style={{ backgroundColor: "#F2F2F2", borderRadius: 10, padding: 10 }}
                                          />
                                      </View>
                                      <View style={{ zIndex: -10, marginTop: 20 }}>
                                          <Text>Вес (кг)</Text>
                                          <TextInput
                                              placeholder="Вес"
                                              keyboardType = 'numeric'
                                              // onChangeText={set_address}
                                              // value={address}
                                              style={{ backgroundColor: "#F2F2F2", borderRadius: 10, padding: 10 }}
                                          />
                                      </View>
                                      <View style={{paddingLeft: 20, paddingRight: 20, paddingBottom: 20, marginTop: 20, }}>
                                          <Button onPress={() => {this.setState({myProposeState: false}); alert("Ваше предложение отправлено");}} style={{width: "100%", marginTop: 5, marginBottom: 5, justifyContent: "center", backgroundColor: "green"}}>
                                              <Text style={{ textAlign: "center", color: "#fff"}}>Отправить</Text>
                                          </Button>
                                      </View>
                                  </View>
                              </View>
                          </ScrollView>
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
                      modalVisible={this.state.modalFilter}
                      onClose={() => this.setState({modalFilter: false})}
                      ContentModal={
                          <View
                              style={{
                                  flex: 1,
                              }}
                          >
                              <View style={styles.container}>
                                  <View style={{height: 60, }}>
                                      <Text>Показать</Text>
                                      <Dropdown
                                          data={[
                                              {label: "только товары ОТП", value: "1"},
                                              {label: "только без предложений", value: "2"},
                                              {label: "только запрещённые", value: "3"},
                                              {label: "все", value: "4"},
                                          ]}
                                          style={{flex:1, height: 50}}
                                          search
                                          maxHeight={300}
                                          labelField="label"
                                          valueField="value"
                                          placeholder={"не выбрано"}
                                          searchPlaceholder="поиск..."
                                          onChange={item => {
                                              console.log(item.value, item.label);
                                          }}
                                      />
                                  </View>
                                  <View style={{height: 60, }}>
                                      <Text>Фильтр по категориям</Text>
                                      <Dropdown
                                          data={[
                                              {label: "Бытовая техника", value: "1"},
                                              {label: "Инструменты", value: "2"},
                                              {label: "Канцелярские товары", value: "3"},
                                              {label: "Офисная техника", value: "4"},
                                              {label: "Строительные материалы", value: "5"},
                                              {label: "Хозяйственные товары", value: "6"},
                                              {label: "Электроинструменты", value: "7"},
                                          ]}
                                          style={{flex:1, height: 50}}
                                          search
                                          maxHeight={300}
                                          labelField="label"
                                          valueField="value"
                                          placeholder={"не выбрано"}
                                          searchPlaceholder="поиск..."
                                          onChange={item => {
                                              console.log(item.value, item.label);
                                          }}
                                      />
                                  </View>
                                  <View style={{marginBottom: 20,}}>
                                      <Text>Цена</Text>
                                      <View style={{height: 100,}}>
                                          <RangeSlider min={0} max={5000}
                                              fromValueOnChange={value => this.setState({fromValue: value})}
                                              toValueOnChange={value => this.setState({toValue: value})}
                                              initialFromValue={11}
                                              styleSize={"small"}
                                          />
                                      </View>
                                      <View style={{height: 40, marginTop: 20, flexDirection: "row"}}>
                                          <View style={{flexDirection: "row", width: "50%"}}>
                                              <Text>От:</Text>
                                              <TextInput style={{height: 30, width: 50, backgroundColor: "#C9C9C9FF"}} value={this.state.fromValue}>{this.state.fromValue}</TextInput>
                                          </View>
                                          <View style={{flexDirection: "row", width: "50%"}}>
                                              <Text>До: </Text>
                                              <TextInput style={{height: 30, width: 50, backgroundColor: "#c9c9c9"}} value={this.state.toValue}>{this.state.toValue}</TextInput>
                                          </View>
                                      </View>
                                  </View>
                                  <View style={{height: 60, }}>
                                      <Text>Фильтр по тру</Text>
                                      <Dropdown
                                          data={[
                                              {label: "Бытовая техника", value: "1"},
                                              {label: "Инструменты", value: "2"},
                                              {label: "Канцелярские товары", value: "3"},
                                              {label: "Офисная техника", value: "4"},
                                              {label: "Строительные материалы", value: "5"},
                                              {label: "Хозяйственные товары", value: "6"},
                                              {label: "Электроинструменты", value: "7"},
                                          ]}
                                          style={{flex:1, height: 50}}
                                          search
                                          maxHeight={300}
                                          labelField="label"
                                          valueField="value"
                                          placeholder={"не выбрано"}
                                          searchPlaceholder="поиск..."
                                          onChange={item => {
                                              console.log(item.value, item.label);
                                          }}
                                      />
                                  </View>
                                  <View style={{height: 60, }}>
                                      <Text>Фильтр по брендам</Text>
                                      <Dropdown
                                          data={[
                                              {label: "Бытовая техника", value: "1"},
                                              {label: "Инструменты", value: "2"},
                                              {label: "Канцелярские товары", value: "3"},
                                              {label: "Офисная техника", value: "4"},
                                              {label: "Строительные материалы", value: "5"},
                                              {label: "Хозяйственные товары", value: "6"},
                                              {label: "Электроинструменты", value: "7"},
                                          ]}
                                          style={{flex:1, height: 50}}
                                          search
                                          maxHeight={300}
                                          labelField="label"
                                          valueField="value"
                                          placeholder={"не выбрано"}
                                          searchPlaceholder="поиск..."
                                          onChange={item => {
                                              console.log(item.value, item.label);
                                          }}
                                      />
                                  </View>
                                  <View style={{marginTop: 20, }}>
                                      <Button style={{width: "100%", justifyContent: "center", backgroundColor: "#797979"}}>
                                          <Text onPress={() => alert("Сброс фильтров")} style={{ textAlign: "center", color: "#fff"}}>Сбросить фильтры</Text>
                                      </Button>
                                  </View>
                                  <View style={{marginTop: 20, }}>
                                      <Button style={{width: "100%", justifyContent: "center", backgroundColor: "green"}}>
                                          <Text onPress={() => alert("Применить")} style={{ textAlign: "center", color: "#fff"}}>Применить</Text>
                                      </Button>
                                  </View>
                              </View>
                          </View>
                      }/>
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
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.05)",
        borderColor: "white",
        borderWidth: 10,
        borderRadius: 30,
        overflow: "hidden",
        shadowColor: "#cdcdcd",
        shadowRadius: 2,
        shadowOpacity: 20,
        shadowOffset: { width: 0, height: 2 },
    },
    topButton: {
        backgroundColor: "#FCFCFC",
        margin: 10,
        height: 30,
        borderRadius: 15,
        width: 150,
        alignContent: "center",
        justifyContent: "center",
    },
    topButtonNonActive: {
        backgroundColor: "#F2F2F2",
        margin: 10,
        height: 30,
        borderRadius: 15,
        width: 150,
        alignContent: "center",
        justifyContent: "center",
        color: "#646464",
    },
    description: {
        fontSize: 15,
        color: "#646464",
    },
    eventTime: {
        fontSize: 18,
        color: "#151515",
    },
    userName: {
        fontSize: 16,
        color: "#151515",
    },
    mainContent: {
        marginRight: 60,
    },
    danger: {
        color: "#ff1016",
    },
    info: {
        color: "#445aff",
    },
    filterModal: {
        width: 10,
        height: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 40,
    },
    headerTop: {
        backgroundColor: "#fff",
        borderColor: "#898989",
    },
    textName: {
        fontSize: 14,
        color: "#5e6064",
        fontWeight: "700",
        paddingBottom: 5,
    },
    tabsContentLabel: {
        fontWeight: "600",
        color: "#434349",
        fontSize: 12,
    },
    tabsContentText: {
        fontWeight: "600",
        color: "#5e6064",
        fontSize: 12,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "justify",
    },
    textSmallTitle: {
        fontSize: 14,
        color: "#434349",
        fontWeight: "bold",
    },
    textSmallValue: {
        fontSize: 12,
        color: "#1a192a",
        fontWeight: "300",
    },
    starContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    ratingText: {
        color: "red",
        fontSize: 12,
        fontWeight: "300",
        marginLeft: 10,
    },
    buttonsContainer: {
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
        width: 120,
        justifyContent: "center",
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
        paddingHorizontal: 10,
    },
    textStyle: {
        paddingVertical: 5,
    },
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    modalView: {
        width: ScreenWidth,
        height: ScreenHeight,
        backgroundColor: "white",
        alignItems: "center",
        paddingTop: 100,
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },

    textAreaContainer: {
        width: ScreenWidth - 20,
        borderColor: "grey",
        borderWidth: 1,
        padding: 5,
        marginBottom: 20,
    },
    textArea: {
        height: 65,
        width: "100%",
        padding: 5,
        textAlignVertical: "top",
        justifyContent: "flex-start",
        borderRadius: 15,
        backgroundColor: "#F2F2F2",
        marginTop: 10,
    },
    textArea3: {
        padding: 10,
        height: 150,
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.05)",
        borderColor: "white",
        borderWidth: 10,
        borderRadius: 15,
        overflow: "hidden",
        shadowColor: "#cdcdcd",
        shadowRadius: 2,
        shadowOpacity: 20,
        shadowOffset: { width: 0, height: 2 },
    },
    textArea4: {
        padding: 10,
        height: 65,
        flexDirection: "row",
        justifyContent: "space-between",
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.05)",
        borderColor: "white",
        borderWidth: 10,
        borderRadius: 15,
        overflow: "hidden",
        shadowColor: "#cdcdcd",
        shadowRadius: 2,
        shadowOpacity: 20,
        shadowOffset: { width: 0, height: 2 },
    },
    textArea2: {
        height: 30,
        width: "100%",
        padding: 5,
        textAlignVertical: "top",
        justifyContent: "flex-start",
        borderRadius: 20,
        backgroundColor: "#F2F2F2",
        marginTop: 10,
    },
    contactInput: {
        borderWidth: 1,
        width: "100%",
        padding: 5,
    },
    contactContainer: {
        width: ScreenWidth - 20,
        borderColor: "grey",
        borderWidth: 1,
        padding: 5,
        marginBottom: 20,
    },
    textInput: {
        fontSize: 14,
        backgroundColor: "#fff",
        color: "#1a192a",
        padding: 5,
        height: 40,
        borderColor: "#898989",
        borderWidth: 0.5,
        textTransform: "uppercase",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
        backgroundColor: "#fff",
        shadowColor: "#1a192a",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
    },
    nameContainer: {
        flexDirection: "row",
        width: 270,
    },
    nameContainer2: {
        flexDirection: "row",
        width: 270,
        marginTop: 3,
        marginBottom: 3,
        alignItems: "center",
    },
    label: {
        fontWeight: "600",
        color: "#777",
        fontSize: 12,
    },
    nameTxt: {
        fontWeight: "600",
        color: "#222",
        fontSize: 14,
    },
    mblTxt: {
        fontWeight: "200",
        color: "#777",
        fontSize: 13,
    },
    end: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 5,
    },
    time: {
        fontWeight: "400",
        color: "#666",
        fontSize: 12,
        justifyContent: "center",
    },
    icon: {
        height: 28,
        width: 28,
    },
    filterModalInput: {
        backgroundColor: "#F2F2F2",
        zIndex: 100,
    },
    ava_img_small: {
        width: 200,
        height: 300,
        justifyContent: "center",
        textAlign: "justify",
        alignItems: "center",
        alignSelf: "center",
    },
    message_img: {
        width: 80,
        height: 80,
        borderRadius: 120,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    boxStyle: {
        height: 200,
        width: "48%",
        borderWidth: 1,
        margin: 5,
        backgroundColor: "red",
    },
    categoryContainer: {
        flexDirection: "row",
        marginTop: 30,
        marginBottom: 20,
        justifyContent: "space-between",
    },
    categoryText: { fontSize: 16, color: "grey", fontWeight: "bold" },
    categoryTextSelected: {
        color: "green",
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderColor: "green",
    },
    card: {
        height: 350,
        backgroundColor: "white",
        marginHorizontal: 2,
        borderRadius: 10,
        marginBottom: 20,
        padding: 15,
    },
});

export default HomeScreen;
