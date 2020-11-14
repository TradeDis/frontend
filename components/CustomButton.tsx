import * as React from "react";
import { View, Button, StyleSheet } from 'react-native';

const CustomButton = (props: any) => {
    return (
        <View style={styles.buttonContainer}>
            <Button
                title={props.title}
                onPress={props.onPress}
                color="white"
            >
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        height: 40,
        width: '55%',
    },
});

export default CustomButton;