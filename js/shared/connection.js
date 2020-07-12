import NetInfo from "@react-native-community/netinfo";

export function connectivityAvailable() {
    return NetInfo.fetch();
}