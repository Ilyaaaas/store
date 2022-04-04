import { AsyncStorage } from "react-native";
import moment from "moment";

export const API = "https://skstore.kz/mobile/";

export const DOCTOR = "type:doctor";
export const SPEC_TYPE = "type:spec-type";
export const DATE_T = "type:date-type";
export const TIME_T = "type:time-type";
export const TIMES_T = "type:times-type";
export const SHED_ID_T = "type:shed-id-type";

export const setLoginPage = () => {
    AsyncStorage.removeItem("token");
};

export const timeInterval = 10;
export const timer = {
    timeStart: moment(),
    timeEnd: moment().add(timeInterval, "minutes"),
};

export async function provToken() {
    if (moment() >= timer.timeEnd) {
        setLoginPage();
    }
    try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) return true;
        return false;
    } catch (e) {
        return false;
    }
}

export const getToken = async () => {
    return await AsyncStorage.getItem("accessToken");
};

