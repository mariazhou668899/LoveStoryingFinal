// This page loads previously created stories
import { View, Text, TextInput, Button, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from "./CommonStyleSheet"


//export default function ViewStory({ navigation, route }) {
export default function ViewStory({ navigation, route }) {
    const [storyData, setStoryData] = useState(null);
    const [storyTitle, setTitle] = useState("");
    const { item } = route.params;

    ////////////////////////////////////////////////////////////////////

    // This will only rerender on the initial page load
    useEffect(() => {

        load();
    }, []);

    // Loaf function
    const load = async () => {
        try {

            const desiredDateName = item;
            //const desiredDateName = JSON.stringify(item);   
            const desiredItem = await getItemByDateName(desiredDateName);

            if (desiredItem !== null) {
                console.log(desiredItem.storyData);
                let titleString = JSON.parse(desiredItem.title);
                setTitle(titleString);
                let data = desiredItem.storyData;
                setStoryData(data);
                //console.log(loadedStory.storyData[0]);
            }
            else {
                console.log('No story found with the given title:', title);
            }

        } catch (err) {
            alert(err);
        }
    }

    const getItemByDateName = async (dateName) => {
        try {
            // Get all items with the key "story"
            const allStories = await AsyncStorage.getItem("storyTitles");
            if (allStories !== null) {
                // Parse the JSON string to an array of objects
                const allStoriesArray = JSON.parse(allStories);
                // Find the item with the matching dateName
                const desiredItem = allStoriesArray.find(item => item.dateName === dateName);
                return desiredItem;
            } else {
                console.log("No stories found in AsyncStorage");
                return null;
            }
        } catch (error) {
            console.error("Error retrieving story from AsyncStorage:", error);
            return null;
        }
    };

    /////////////////////////////////////////////////////////////////////

    return (

        <ScrollView contentContainerStyle={styles.content}>

            <Text style={styles.title}>{storyTitle}</Text>
            {storyData ? (
                storyData.map((item, index) => (
                    <View key={index} style={styles.storyContainer}>
                        <Text style={styles.content}>{item.paragraph}</Text>
                        <Image source={ item.imageURL } style={styles.image} />
                        {/*<Image source={ item.imageURL } style={styles.image} />*/}
                        {/*Image source={{ uri: item.imageURL }} style={styles.image}/>*/}
                    </View>
                ))
            ) : (
                <Text> Sorry, no story data available</Text>
            )}
        </ScrollView>

    );
}




