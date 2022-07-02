import React, { useState, useEffect } from "react";
import { View, Text, Modal, Pressable } from "react-native";
import { Accelerometer } from "expo-sensors";
import { Audio } from "expo-av";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";
import PincodeInput from "../components/PincodeInput";
import { Sound } from "expo-av/build/Audio";

const Homescreen = () => {
  const [isActive, setIsActive] = useState<boolean>(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [accel, setAccel] = useState({ x: 0, y: 0, z: 0 });
  const [pin, setPin] = useState<Array<number>>([]);

  const THRESHOLD = 0.1;

  useEffect(() => {
    if (!isActive) {
      Accelerometer.setUpdateInterval(500);
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

        const getCredentials = async () => {
          try {
            if (Device.modelName !== null) {
              let res = await SecureStore.getItemAsync(
                Device.modelName.replace(/\s/g, "")
              );
              if (res) {
                if (pin.length === 4 && pin.join("") === res) {
                  console.log("Pin is correct!");
                  // we reset stuff here
                  setAccel({ x: 0, y: 0, z: 0 });
                  setPin([]);
                  setModalVisible(false);
                  setIsActive(true);
                  stopSound();
                } else {
                  console.log("Pin is wrong!");
                }
              } else {
                console.log("No values stored under that key");
              }
            }
          } catch (err) {
            throw err;
          }
        };

        getCredentials();
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

  async function stopSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/tone.mp3")
    );
    await sound.stopAsync();
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
          }}
        >
          <PincodeInput
            pinLength={pin?.length}
            keypadOnPress={(i: number) => setPin((pin) => [...(pin || []), i])}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Homescreen;
