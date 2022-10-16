import { View, Text, StyleSheet, Image, Dimensions } from 'react-native'
import React from 'react'
import { colors } from '../utils/index'

const { primaryColour, secondaryColour } = colors
const { height } = Dimensions.get('window');

change = true

export default function WeatherInfo({ currentWeather }) {
    const {
        main: { temp },
        weather: [details],
        name
    } = currentWeather

    const { icon, main, description } = details
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`

    const refresh = (props) => {
        const y = useRef()
        function onRefresh() {
            chnage = !change
        }
    }

    return (
        <View style={styles.weatherInfo}>
            <Text>{name}</Text>
            <View style={styles.row}>
                <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
                <Text style={styles.textPrimary}>{Math.round(temp)}°</Text>
            </View>
            <Text style={styles.weatherDescription}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherInfo: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: height * 0.1
    },
    weatherDescription: {
        textTransform: 'capitalize',
        fontSize: 20,
        fontWeight: '500',
        marginTop: -10,
    },
    weatherIcon: {
        width: 125,
        height: 125,
    },
    textPrimary: {
        fontSize: 75,
        color: primaryColour
    },
    textSecondary: {
        fontSize: 20,
        fontWeight: '500',
        marginTop: 10
    },
    row: {
        alignItems: 'center',
        flexDirection: 'row',
    }
})