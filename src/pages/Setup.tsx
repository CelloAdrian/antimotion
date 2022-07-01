import React, { useState, useEffect } from "react";
import * as Device from "expo-device";
import * as SecureStore from "expo-secure-store";
import PincodeInput from "../components/PincodeInput";

const Setup = ({ navigation }: any) => {
  const [pin, setPin] = useState<Array<number>>([]);

  useEffect(() => {
    console.log("Current pin : ", pin);

    if (pin?.length === 4) {
      const saveCredentials = async () => {
        try {
          if (Device.modelName !== null) {
            await SecureStore.setItemAsync(
              Device.modelName.replace(/\s/g, ""),
              pin.join("")
            );
          }
        } catch (err) {
          throw err;
        }
      };

      saveCredentials();
      navigation.navigate("Homescreen");
    }
  });

  return (
    <PincodeInput
      pinLength={pin?.length}
      keypadOnPress={(i: number) => setPin((pin) => [...(pin || []), i])}
    />
  );
};

export default Setup;
