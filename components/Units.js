import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native'
import React, { useState } from 'react'
import { IconButton } from 'react-native-paper';

const { height } = Dimensions.get('window');

export default function Units({ unitsSystem, setUnitsSystem }) {
    const [icon, setIcon] = useState("temperature-fahrenheit")
    return (
        <View style={styles.units}>
            <IconButton mode="contained" color="#535666" icon={icon} onPress={
                () => {
                    if (unitsSystem == "metric") {
                        setUnitsSystem("imperial")
                        setIcon("temperature-celsius")
                    } else {
                        setUnitsSystem("metric")
                        setIcon("temperature-fahrenheit")
                    }
                }} />
        </View>
    )
}

const styles = StyleSheet.create({
    units: {
        //alignItems: "center",
        justifyContent: "center",
        position: "absolute", //Here is the trick
        bottom: height * 0.01,
        right: height * 0.01,
        //alignSelf: "flex-end",
        //elevation: 0,
        color: "#be91f2",
        display: "flex"
    },
    fab: {
        borderRadius: 30,
        color: "#be91f2",
        justifyContent: "center",
    }
})