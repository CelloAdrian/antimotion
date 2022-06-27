import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import * as Keychain from "react-native-keychain";
import * as Device from "expo-device";

const Setup = ({ navigation }: any) => {
  const [pin, setPin] = useState<Array<number>>([]);

  const saveCredentials = async () => {
    if (Device.modelName !== null) {
      const devicename = Device.modelName;
      const password = "1234";

      await Keychain.setGenericPassword(devicename, password);

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
      await Keychain.resetGenericPassword();
    }
  };

  useEffect(() => {
    console.log("Current pin : ", pin);

    if (pin?.length === 4) {
      async () => {
        if (Device.modelName !== null) {
          const devicename = Device.modelName;
          const password = pin.join("");
          await Keychain.setGenericPassword(devicename, password);
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
        }
      };
      console.log("pin length is 4");
      navigation.navigate("Homescreen");
    }
  });

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          width: "50%",
          paddingBottom: 25,
        }}
      >
        {[0, 1, 2, 3].map((i) => {
          return (
            <View
              style={pin?.length > i ? styles.pinFilled : styles.pinEmpty}
              key={`${i}${pin.length > i}`}
            />
          );
        })}
      </View>
      {/* keypad */}
      <View style={styles.keypad}>
        <View style={styles.rowContainer}>
          {[1, 2, 3].map((i) => {
            return (
              <Pressable
                style={styles.button}
                key={`${i}${pin.length > i}`}
                onPress={() => {
                  setPin((pin) => [...(pin || []), i]);
                }}
              >
                <Text style={styles.buttonText}>{i}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.rowContainer}>
          {[4, 5, 6].map((i) => {
            return (
              <Pressable
                style={styles.button}
                key={`${i}${pin.length > i}`}
                onPress={() => {
                  setPin((pin) => [...(pin || []), i]);
                }}
              >
                <Text style={styles.buttonText}>{i}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.rowContainer}>
          {[7, 8, 9].map((i) => {
            return (
              <Pressable
                style={styles.button}
                key={`${i}${pin.length > i}`}
                onPress={() => {
                  setPin((pin) => [...(pin || []), i]);
                }}
              >
                <Text style={styles.buttonText}>{i}</Text>
              </Pressable>
            );
          })}
        </View>
        <View style={styles.rowContainer}>
          {[0].map((i) => {
            return (
              <Pressable
                style={styles.button}
                key={`${i}${pin.length > i}`}
                onPress={() => {
                  setPin((pin) => [...(pin || []), i]);
                }}
              >
                <Text style={styles.buttonText}>{i}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Setup;

const styles = StyleSheet.create({
  pinEmpty: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  pinFilled: {
    width: 20,
    height: 20,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "black",
  },
  keypad: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "90%",
    height: "70%",
  },
  rowContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
  },
  button: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 36,
  }
});
