import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';
//import Axios from 'axios';

import Splash from './Screens/splash';
import Signin from './Screens/signin';
import Signup from './Screens/signup';
import KaKaoLogin from './Screens/kakaoLogin';
//import Home from './Screens/home';

import Screen1 from './Screens/Screen1';
import Screen2 from './Screens/Screen2';
import Calendar from './Screens/Calendar';
import Screen4 from './Screens/Screen4';
import Screen5 from './Screens/Screen5';
import Screen6 from './Screens/Screen6';
import Screen7 from './Screens/Screen7';
import Settingscreen from './Screens/Settingscreen';
import Infoscreen from './Screens/Infoscreen';

const Stack = createStackNavigator();

function StackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}} />
      <Stack.Screen name="Signin" component={Signin} options={{headerShown: false}} />
      <Stack.Screen name="KaKaoLogin" component={KaKaoLogin} options={{headerShown: false}} />
      <Stack.Screen name="Signup" component={Signup} options={{headerShown: false}} />
      <Stack.Screen name="Home" component={BottomStack} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

function SettingScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Screen4"
    >
      <Stack.Screen name="Screen4" component={Screen4} options={{headerShown: false}} />
      <Stack.Screen name="Screen5" component={Screen5} options={{headerShown: false}} />
      <Stack.Screen name="Screen6" component={Screen6} options={{headerShown: false}} />
      <Stack.Screen name="Settingscreen" component={Settingscreen} options={{headerShown: false}} />
      <Stack.Screen name="Infoscreen" component={Infoscreen} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

/*
const addTodo = (todo: TodoModel) => {
  Axios.post('http://172.20.14.35:19000/create', todo)
    .then(res => {
      console.log(res.data);
      getTodos()
    })
    .catch(error => console.log(error));
};

const getTodos = () => {
  Axios.get('http://로컬아이피주소:포트번호/todos')
    .then(res => {
      setTodos(res.data);
    })
    .catch(error => console.log(error));
};

const editTodo = (todo: TodoModel) => {
  Axios.put('http://로컬아이피주소:포트번호/todos', todo)
    .then(res => {
      console.log(res.data);
    })
    .catch(error => console.log(error));
};

const deleteTodo = (id: number) => {
  Axios.delete(`http://로컬아이피주소:포트번호/todos/${id}`)
    .then(res => {
      console.log(res.data);
      getTodos();
    })
    .catch(error => console.log(error));
};

*/

const BottomTab = createBottomTabNavigator();

function BottomStack() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown : false,
        tabBarLabelStyle: { display: 'none' }, // 이름 숨기기
        tabBarStyle: { backgroundColor : '#A9C3D0', height : 70 }
      }}
    >
      <BottomTab.Screen
        name="Video"
        component={Screen7}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('./assets/3.png')}
              style={{ width: 75, height: 80 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="List"
        component={Screen2}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('./assets/4.png')}
              style={{ width: 65, height: 65 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Home"
        component={Screen1}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('./assets/icon4.png')}
              style={{ width: 65, height: 65 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Calendar"
        component={Calendar}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('./assets/2.png')}
              style={{ width: 65, height: 65 }}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="User"
        component={SettingScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('./assets/1.png')}
              style={{ width: 65, height: 65 }}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <StackScreen>
        <BottomStack />
      </StackScreen>
    </NavigationContainer>
  );
}

export default Navigation;