import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  BackHandler,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../assets/redux/user/userSlice";

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

const Login: React.FC = () => {
  const [phonenumber, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isRememberMe, setIsRememberMe] = useState(false);
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false); // Loading state
  const [error, setError] = useState<string>("");

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const dispatch = useDispatch();

  const toggleCheckbox = () => setIsRememberMe(!isRememberMe);

  const validateForm = () => {
    if (!phonenumber.match(/^\d{10}$/)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true); // Start loading
    try {
      dispatch(signInStart());
      const response = await axios.post(
        "https://bairaha-app-api.vercel.app/api/auth/signin",
        { phonenumber, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch(signInSuccess(response.data));
        navigation.navigate("MaintenanceCriteria");
      } else {
        throw new Error(response.data.message || "Invalid credentials.");
      }
    } catch (error: any) {
      const errMessage = error.response?.data?.message || "Login failed.";
      dispatch(signInFailure(errMessage));
      Alert.alert("Login Failed", errMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-6">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1 justify-center"
      >
        <View className="mb-6">
          <Text className="text-3xl font-extrabold text-black">Log In</Text>
          {/* <TouchableOpacity
            onPress={() => navigation.navigate("ResetPassword")}
          >
            <Text className="text-sm text-gray-500 underline mt-2">
              Forgot password?
            </Text>
          </TouchableOpacity> */}
        </View>

        {error ? (
          <Text className="text-red-500 text-sm mb-4">{error}</Text>
        ) : null}

        <View>
          <Text className="text-lg text-black mb-2">Phone Number</Text>
          <TextInput
            className="w-full px-4 py-2 mb-4 border border-[#0d6000] rounded"
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phonenumber}
            onChangeText={setPhone}
          />

          <Text className="text-lg text-black mb-2">Password</Text>
          <View className="relative">
            <TextInput
              className="w-full px-4 py-2 border border-[#0d6000] rounded pr-12"
              placeholder="Enter password"
              secureTextEntry={hidePassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              className="absolute right-4 top-3"
              onPress={() => setHidePassword(!hidePassword)}
            >
              <Text className="text-gray-500">
                {hidePassword ? "Show" : "Hide"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex-row items-center mt-4">
          <TouchableOpacity
            onPress={toggleCheckbox}
            className={`h-6 w-6 rounded border ${
              isRememberMe ? "bg-[#0d6000] border-[#0d6000]" : "border-gray-300"
            } flex items-center justify-center`}
          >
            {isRememberMe && <FontAwesomeIcon icon={faCheck} size={16} color="#fff" />}
          </TouchableOpacity>
          <Text className="ml-2 text-gray-700">Remember me</Text>
        </View>

        <TouchableOpacity
          className={`py-3 rounded-full mt-8 ${
            loading ? "bg-gray-400" : "bg-[#bf111a]"
          }`}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-lg font-bold text-center text-white">
              Log In
            </Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;
