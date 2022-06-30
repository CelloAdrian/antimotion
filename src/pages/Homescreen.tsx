import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import * as Keychain from "react-native-keychain";
import { Accelerometer } from "expo-sensors";
import { Audio } from "expo-av";
import PincodeInput from "../components/PincodeInput";

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

  useEffect(() => {
    async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log(
            "Credentials successfully loaded for device: " +
              credentials.username
          );
        } else {
          console.log("No credentials stored.");
        }
      } catch (err) {
        console.log("Keychain couldn't be accessed.");
      }
    };
  }, []);

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
      <Modal visible={true} animationType="slide">
        <View
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <PincodeInput />
        </View>
      </Modal>
    </View>
  );
};

export default Homescreen;
