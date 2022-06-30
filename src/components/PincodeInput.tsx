import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const PincodeInput = ({ pinLength, keypadOnPress }: any) => {
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
              style={pinLength > i ? styles.pinFilled : styles.pinEmpty}
              key={`${i}${pinLength > i}`}
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
                key={`${i}${pinLength > i}`}
                onPress={() => {
                  keypadOnPress(i);
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
                key={`${i}${pinLength > i}`}
                onPress={() => {
                  keypadOnPress(i);
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
                key={`${i}${pinLength > i}`}
                onPress={() => {
                  keypadOnPress(i);
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
                key={`${i}${pinLength > i}`}
                onPress={() => {
                  keypadOnPress(i);
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

export default PincodeInput;

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
  },
});
