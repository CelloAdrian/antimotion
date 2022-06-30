import React, { useState, useEffect } from "react";
import * as Keychain from "react-native-keychain";
import * as Device from "expo-device";
import PincodeInput from "../components/PincodeInput";

const Setup = ({ navigation }: any) => {
  const [pin, setPin] = useState<Array<number>>([]);

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
    <PincodeInput
      pinLength={pin?.length}
      keypadOnPress={(i: number) => setPin((pin) => [...(pin || []), i])}
    />
  );
};

export default Setup;
