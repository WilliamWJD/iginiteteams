import { StyleSheet, Text, View } from "react-native";

export function Groups() {
    return (
        <View style={styles.container}>
            <Text >Hello React Native</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})