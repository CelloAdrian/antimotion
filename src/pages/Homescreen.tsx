import React, { useState, useEffect, useRef } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Audio } from "expo-av";

const Homescreen = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });

  const THRESHOLD = 0.1;

  useEffect(() => {
    if (!isActive) {
      Accelerometer.setUpdateInterval(100);
      Accelerometer.addListener((accelerometerData) => {
        setAccel(accelerometerData);
      });
      console.log(accel.x, " - ", accel.z);

      if (
        accel.x > THRESHOLD ||
        accel.x < -THRESHOLD ||
        accel.z > THRESHOLD ||
        accel.z < -THRESHOLD
      ) {
        console.log("Threshold passed!");
        playSound();
        Accelerometer.removeAllListeners();
        setModalVisible(true);
      }
    } else {
      Accelerometer.removeAllListeners();
    }
  });

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/tone.mp3")
    );
    await sound.playAsync();
  }

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Pressable
        onLongPress={() => {
          console.log("Clicked, isActive : " + isActive);
          setIsActive(!isActive);
        }}
      >
        <Text>{isActive ? "Inactive" : "Active"}</Text>
      </Pressable>
      <Modal visible={modalVisible} animationType="slide">
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            backgroundColor: "red",
          }}
        >
          <Text>Modal View</Text>
        </View>
      </Modal>
    </View>
  );
};

export default Homescreen;
