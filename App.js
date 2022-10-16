import {StatusBar} from 'expo-status-bar';
import React, {useEffect, useState} from 'react'
import {StyleSheet, Text, View, RefreshControl, ScrollView,} from 'react-native';
import * as Locatiion from 'expo-location';
import WeatherInfo from './components/WeatherInfo';
import Units from './components/Units';
import {apiKey} from '@env';
import Searchbar from './components/Searchbar';
import {SafeAreaView} from 'react-native-safe-area-context';

const baseUrl = 'https://api.openweathermap.org/data/2.5/'

export default function App() {
    const [errorMessage, setErrorMessage] = useState(null)
    const [currentWeather, setCurrentWeather] = useState(null)
    const [unitsSystem, setUnitsSystem] = useState("metric")
    const [refresh, setRefresh] = useState(false)

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefresh(true);
        load()
        wait(2000).then(() => setRefresh(false));
    }, [])

    useEffect(() => {
        load()
    }, [unitsSystem])

    async function load() {
        try {
            let {status} = await Locatiion.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                setErrorMessage('Access to loaction is required')
                return
            }
            const location = await Locatiion.getCurrentPositionAsync()
            const {latitude, longitude} = location.coords
            const weatherUrl = `${baseUrl}weather?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${apiKey}`
            const forecastUrl = `${baseUrl}forecast?lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${apiKey}`

            response = await fetch(weatherUrl)
            const weather = await response.json()

            if (response.ok) {
                setCurrentWeather(weather)
            } else {
                setErrorMessage(weather.message)
            }

            response = await fetch(forecastUrl)
            const forecast = await response.json()

            if (response.ok) {
                console.log(forecast.message)
            } else {
                setErrorMessage(forecast.message)
            }

        } catch (error) {
            setErrorMessage(error.message)
        }
    }

    if (currentWeather) {
        const {main: {temp}} = currentWeather

        return (
            <SafeAreaView style={styles.container}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <StatusBar style="auto"/>
                    <View style={styles.main}>
                        <Searchbar/>
                        <WeatherInfo currentWeather={currentWeather}/>
                    </View>
                </ScrollView>
                <View style={styles.main}>
                    <Units unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem}/>
                </View>
            </SafeAreaView>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>{errorMessage}</Text>
                <StatusBar style="auto"/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    main: {
        justifyContent: 'center',
        flex: 1,
    }
});
