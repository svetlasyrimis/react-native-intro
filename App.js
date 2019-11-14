import React, { useState } from 'react';
import axios from 'axios';
//importing useState
import { StyleSheet, Text, View } from 'react-native';
import RoundedButton from './RoundedButton';


export default function App() {
  const [color, setColor] = useState('#161616');
  const [prompt, setPrompt] = useState(' ');
  const randomPrompt = async () => {
    try {
      const response = await axios.get('https://prompts-express-api.herokuapp.com/random');
      const prompt = response.data;
      setPrompt(prompt.title);
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    //style container - array, could add customized styles using the Hook
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text>{prompt}</Text>
      <RoundedButton
        text="Next"
        textColor="#161616"
        backgroundColor="#d3d3d3"
        onPress={() => {
          randomPrompt();
          setColor(randomRgb())
        }}
      />
    </View>
  );
}


const randomRgb = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    justifyContent: 'center',
  },
});