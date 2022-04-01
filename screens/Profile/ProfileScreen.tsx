import React from "react";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import {
    Container,
    Content,
    Header,
    Left,
    Body,
    Title,
    Right,
    ListItem,
    Accordion,
    Input,
    Button,
} from "native-base";
import {
    Switch,
    StyleSheet,
    Text,
    AsyncStorage,
    RefreshControl,
    View,
    Image,
    Platform,
    Alert,
} from "react-native";

class ProfileScreen extends React.Component {
  state = {
      trueCheckBoxIsOn: true,
      falseCheckBoxIsOn: false,
  };

  constructor(props) {
      super(props);

      this.state = {
          token: "",
          refreshing: false,
          user: {},
          list: [],
          modal: false,
          pushNotif: true,
          smshNotif: true,
          emailNotif: true,
      };
  }

  _getToken = async () => {
      await AsyncStorage.getItem("accessToken").then((req) =>
          this.setState({
              token: req.slice(1, -1),
          })
      );
  };

  _getList = async () => {
      const API_URL = "https://skstore.kz/mobile/userdata";
      try {
          const response = await fetch(API_URL, {
              method: "GET",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/x-www-form-urlencoded",
                  Authorization: `Bearer ${this.state.token}`,
              },
          });

          const responseJson = await response.json();

          if (responseJson[0][0] !== null) {
              this.setState({ list: responseJson[0][0] });
          }
      } catch (error) {
          console.log("Error when call API: " + error.message);
      }
  };

  _refreshPage = async () => {
      this.setState({ refreshing: true });
      await this._getToken();
      this._getList();
      this.setState({ refreshing: false });
  };

  UNSAFE_componentWillMount() {
      this._refreshPage();
  }

  UNSAFE_componentWillReceiveProps() {
      this._refreshPage();
  }

  saveProfileInfo = () => {
      Alert.alert(
          "Предупреждение!",
          "На данный момент функция редактирования профиля дорабатывается. В следующем обновлении мы включим данную функцию."
      );
  };

  _renderContent = (item) => {
      return (
          <View key={item.id} style={styles.content}>
              {item.id == "1" ? (
                  <View>
                      <View style={styles.tabContent}>
                          <Text style={styles.radioTitle}>Получать PUSH уведомления</Text>
                          <Switch
                              trackColor={{ false: "#767577", true: "#81b0ff" }}
                              thumbColor={"#f4f3f4"}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={() => this.setState({ pushNotif: !this.state.pushNotif })}
                              value={this.state.pushNotif}
                              style={{ marginRight: 10 }}
                          />
                      </View>
                      <View style={styles.settingListItem}>
                          <Text style={styles.radioTitle}>Получать SMS уведомления</Text>
                          <Switch
                              trackColor={{ false: "#767577", true: "#81b0ff" }}
                              thumbColor={"#f4f3f4"}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={() => this.setState({ smsNotif: !this.state.smsNotif })}
                              value={this.state.smsNotif}
                              style={{ marginRight: 10 }}
                          />
                      </View>
                      <View style={styles.settingListItem}>
                          <Text style={styles.radioTitle}>Получать уведомления по почте</Text>
                          <Switch
                              trackColor={{ false: "#767577", true: "#81b0ff" }}
                              thumbColor={"#f4f3f4"}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={() => this.setState({ emailNotif: !this.state.emailNotif })}
                              value={this.state.emailNotif}
                              style={{ marginRight: 10 }}
                          />
                      </View>
                  </View>
              ) : item.id == "2" ? (
                  <View style={styles.settingListItem}>
                      <Text style={styles.radioTitle}>Требуется развозка</Text>
                      <Switch
                          trackColor={{ false: "#767577", true: "#81b0ff" }}
                          thumbColor={"#f4f3f4"}
                          ios_backgroundColor="#3e3e3e"
                          onValueChange={() => this.setState({ shuttle: !this.state.shuttle })}
                          value={this.state.shuttle}
                          style={{ marginRight: 10 }}
                      />
                  </View>
              ) : (
                  <View>
                      <View style={styles.settingListItem}>
                          <Text style={styles.radioTitleFixedWidth}>Почта</Text>
                          <Input style={styles.input} placeholder={"Почта"} value={this.state.list.email} />
                      </View>
                      <View style={styles.settingListItem}>
                          <Text style={styles.radioTitleFixedWidth}>Рабочий телефон</Text>
                          <Input
                              style={styles.input}
                              placeholder={"Рабочий телефон"}
                              value={this.state.list.phone}
                          />
                      </View>
                      <View style={styles.settingListItem}>
                          <Text style={styles.radioTitleFixedWidth}>Мобильный телефон</Text>
                          <Input style={styles.input} placeholder={"Мобильный телефон"} />
                      </View>
                      <View style={styles.settingListItem}>
                          <Text style={styles.radioTitleFixedWidth}>Адрес</Text>
                          <Input style={styles.input} placeholder={"Адрес"} value={this.state.list.address} />
                      </View>
                      <View>
                          <Button style={styles.saveButton} onPress={() => this.saveProfileInfo()}>
                              <Text style={styles.btnText}>Сохранить</Text>
                          </Button>
                      </View>
                  </View>
              )}
          </View>
      );
  };

  _renderHeaderIOS = (item) => {
      return (
          <View key={item.id} style={styles.header}>
              <View style={{ width: 60 }}>
                  {item.id == "0" ? (
                      <MaterialIcons name="contacts" size={18} style={styles.materilaIcon} />
                  ) : item.id == "1" ? (
                      <Ionicons name="ios-settings" size={18} style={styles.materilaIcon} />
                  ) : (
                      <MaterialIcons name="airport-shuttle" size={18} style={styles.materilaIcon} />
                  )}
              </View>
              <Body style={styles.mainBody}>
                  <Text style={styles.accordionText}>{item.title}</Text>
              </Body>
              <Right>
                  <AntDesign name="down" size={12} color="#898989" style={{ marginRight: 10 }} />
              </Right>
          </View>
      );
  };

  _renderHeaderAndroid = (item) => {
      return (
          <View key={item.id} style={styles.header}>
              <View style={{ width: 60 }}>
                  {item.id == "0" ? (
                      <MaterialIcons name="contacts" size={18} style={styles.materialIcon} />
                  ) : item.id == "1" ? (
                      <Ionicons name="ios-settings" size={18} style={styles.accordionIcon} />
                  ) : (
                      <MaterialIcons name="airport-shuttle" size={18} style={styles.accordionIcon} />
                  )}
              </View>
              <Text style={styles.accordionText}>{item.title}</Text>
              <AntDesign name="down" size={12} color="#898989" style={styles.accordionIconDown} />
          </View>
      );
  };

  logout = () => {
      this.props.navigation.navigate("Login");
  };

  render() {
      const dataArray = [
          { id: 0, title: "Контакты", content: "username" },
          { id: 1, title: "Настройки", content: "Нет доступных настроек" },
      ];
      return (
          <Container>
              <Header style={styles.headerTop}>
                  <Left></Left>
                  <Body style={{ flex: 3 }}>
                      <Title style={{ color: "#1a192a" }}>Профиль</Title>
                  </Body>
                  <Right>
                      <MaterialIcons
                          name="exit-to-app"
                          size={24}
                          color="#1a192a"
                          style={styles.topIcon}
                          onPress={() => {
                              this.logout();
                          }}
                      />
                  </Right>
              </Header>
              <Content
                  style={{ alignContent: "center" }}
                  refreshControl={
                      <RefreshControl refreshing={this.state.refreshing} onRefresh={this._refreshPage} />
                  }
              >
                  <ListItem style={{ alignSelf: "center" }}>
                      <View>
                          {this.state.list.avaFile == null ? (
                              <Image
                                  style={styles.message_img}
                                  source={{ uri: "https://smart24.kz/img/default/ava_businessman_400.jpg" }}
                              ></Image>
                          ) : (
                              <Image
                                  style={styles.message_img}
                                  source={{ uri: "https://smart24.kz/" + this.state.list.avaFile }}
                              ></Image>
                          )}
                          <View>
                              <Text style={styles.profileTitleBig}>{this.state.list.username}</Text>
                              <Text style={styles.profileTitleSmall}>{this.state.list.title}</Text>
                          </View>
                      </View>
                  </ListItem>
                  <Content padder>
                      {Platform.OS === "ios" ? (
                          <Accordion
                              expanded={[4]}
                              style={styles.accordionItem}
                              dataArray={dataArray}
                              renderContent={this._renderContent}
                              renderHeader={this._renderHeaderIOS}
                          />
                      ) : (
                          <Accordion
                              expanded={[4]}
                              style={styles.accordionItem}
                              dataArray={dataArray}
                              renderContent={this._renderContent}
                              renderHeader={this._renderHeaderAndroid}
                          />
                      )}
                  </Content>
              </Content>
          </Container>
      );
  }
}

const styles = StyleSheet.create({
    profileTitleBig: {
        fontSize: 14,
        color: "#1a192a",
        textAlign: "center",
    },
    profileTitleSmall: {
        fontSize: 8,
        color: "#1a192a",
        textAlign: "center",
    },
    accordionItem: {
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    headerTop: {
        backgroundColor: "#fff",
        borderBottomColor: "#898989",
    },
    message_img: {
        width: 120,
        height: 120,
        borderRadius: 120,
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    input: {
        borderRadius: 5,
        width: 20,
        marginRight: 10,
        marginLeft: 10,
        height: 30,
        backgroundColor: "white",
    },
    header: {
        borderWidth: 0.2,
        borderColor: "#898989",
        borderRadius: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        alignItems: "center",
        shadowColor: "#898989",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 2,
        shadowOpacity: 0.5,
        marginBottom: 10,
        backgroundColor: "white",
    },
    tabContent: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        alignItems: "center",
    },
    content: {
        backgroundColor: "#E0E0E0",
        borderRadius: 5,
        marginBottom: 10,
    },
    radioTitle: {
        textAlign: "left",
        marginLeft: 10,
        color: "#898989",
    },
    radioTitleFixedWidth: {
        textAlign: "left",
        marginLeft: 10,
        width: 80,
        color: "#898989",
    },
    materilaIcon: {
        color: "#898989",
        paddingLeft: 20,
    },
    mainBody: {
        paddingLeft: -40,
        width: 400,
        justifyContent: "flex-start",
    },
    saveButton: {
        backgroundColor: "#0abb87",
        borderRadius: 15,
        shadowColor: "#989898",
        height: 60,
        padding: 20,
        borderWidth: 10,
        borderColor: "#E0E0E0",
        width: "100%",
    },
    settingListItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        height: 50,
        alignItems: "center",
    },
    btnText: {
        width: "100%",
        textAlign: "center",
        color: "#fff",
        fontSize: 16,
    },
    topIcon: {
        marginRight: 10,
    },
    accordionIcon: {
        color: "#898989",
        paddingLeft: 20,
    },
    accordionText: {
        color: "#898989",
        textAlign: "left",
        fontSize: 14,
        justifyContent: "flex-start",
        alignContent: "flex-start",
    },
    accordionIconDown: {
        marginRight: 10,
    },
});

export default ProfileScreen;
