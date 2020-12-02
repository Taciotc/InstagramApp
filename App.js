import React from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
/* import Feed from "./src/pages/Feed"; */
import { Feed, Login, CreateAcounnt, Comments } from "./src/pages";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

/* const Stack = createStackNavigator(); */

const Auth = createStackNavigator();
const Route = createStackNavigator();

const AuthRoutes = () => (
  <NavigationContainer>
    <Route.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "#312e38" },
      }}
    >
      <Route.Screen name="SignIn" component={Login} />
      <Route.Screen name="SignUp" component={CreateAcounnt} />
      {/* <Auth.Screen name="SignUp" component={SignUp} /> */}
    </Route.Navigator>
  </NavigationContainer>
);

const AppRoutes = () => (
  <NavigationContainer>
    <Auth.Navigator
      screenOptions={{
        headerShown: true,
        cardStyle: { backgroundColor: "#fff" },
      }}
    >
      <Auth.Screen name="Feed do Instagram" component={Feed} />
      <Auth.Screen name="Comentários do Instagram" component={Comments} />
    </Auth.Navigator>
  </NavigationContainer>
);

export default Routes = () => {
  React.useEffect(() => {
    async function getUpdate() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          alert("Você tem uma nova atualização");
          await Updates.fetchUpdateAsync();
          // ... notify user of update ...
          await Updates.reloadAsync();
        }
      } catch (e) {
        alert("Não foi possivel atualizar seu aplicativo");
      }
    }

    getUpdate();
  }, []);

  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(true);

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={300} color="#999" />
      </View>
    );

  return user ? <AppRoutes /> : <AuthRoutes />;
};
