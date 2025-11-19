import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/Auth/LoginScreen";
import { HomeScreen } from "../screens/Home/HomeScreen";
import { AddTaskScreen } from "../screens/Task/AddTaskScreen";
import { FocusScreen } from "../screens/Focus/FocusScreen";
import { ReportScreen } from "../screens/Report/ReportScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  AddTask: undefined;
  Focus: undefined;
  Report: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

interface AppNavigatorProps {
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({
  isLoggedIn,
  onLoginSuccess,
}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!isLoggedIn ? (
          <Stack.Screen name="Login">
            {(props) => (
              <LoginScreen {...props} onLoginSuccess={onLoginSuccess} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
              name="AddTask"
              component={AddTaskScreen}
              options={{
                headerShown: true,
                headerTitle: "",
                headerBackTitle: "Voltar",
              }}
            />
            <Stack.Screen
              name="Focus"
              component={FocusScreen}
              options={{
                headerShown: true,
                headerTitle: "",
                headerBackTitle: "Voltar",
              }}
            />
            <Stack.Screen
              name="Report"
              component={ReportScreen}
              options={{
                headerShown: true,
                headerTitle: "",
                headerBackTitle: "Voltar",
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
