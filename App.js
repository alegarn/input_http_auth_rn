import { StatusBar } from 'expo-status-bar';
import { GlobalStyle } from './constants/theme';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './UI/IconButton';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllExpenses from './screens/AllExpenses';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import ExpensesContextProvider from './store/expenses-context';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();


function ExpensesOverview() {
  return(
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyle.primaryColor100 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyle.primaryColor100 },
          tabBarActiveTintColor: GlobalStyle.secondaryColor,
          headerRight: ({tintColor}) => (<IconButton icon="add" color={tintColor} size={24} onPress={() => { navigation.navigate('ManageExpense' ) }} />)
          })}>
        <BottomTabs.Screen
          name="RecentExpenses"
          component={RecentExpenses}
          options={{
              title: "Recent Expenses",
              tabBarLabel: "Recent",
              tabBarIcon: ({ color, size }) => (<Ionicons name="hourglass" size={size} color={color} />)
            }}/>
        <BottomTabs.Screen
          name="AllExpenses"
          component={AllExpenses}
          options={{
            title: "All Expenses",
            tabBarLabel: "All Expenses",
            tabBarIcon: ({ color, size }) => (<Ionicons name="calendar" size={size} color={color} />)
          }}/>
      </BottomTabs.Navigator>
  )
};

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: GlobalStyle.primaryColor100 },
                headerTintColor: "white",
              }}>
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{headerShown: false}}/>
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              title="Manage Expense"
              options={{
                presentation: "modal",
              }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>

    </>
  );
}
