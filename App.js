import React from 'react';
import Navigation from './Navigation';

export default function App() {
  return (
    <Navigation />
  );
}


/*
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import * as KakaoLogins from 'expo-kakao-login';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      Alert.alert('로그인 성공!');
      // 로그인 성공 시 다음 단계로 이동하는 코드를 작성하세요.
    } else {
      Alert.alert('로그인 실패', '유효하지 않은 사용자명 또는 비밀번호입니다.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
});

const App = () => {
  React.useEffect(() => {
    KakaoLogins.initialize('38fa6abfc857b83e24d1a61b63e6e54f');
  }, []);

  const loginWithKakao = async () => {
    try {
      const result = await KakaoLogins.loginAsync();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Kakao Login" onPress={loginWithKakao} />
    </View>
  );
}

export default LoginScreen; App;


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/