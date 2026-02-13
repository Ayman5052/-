import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { api } from '../services/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('student@school.com');
  const [password, setPassword] = useState('123456');

  const login = async () => {
    const { data } = await api.post('/auth/login', { email, password });
    if (data.user.role === 'student') navigation.replace('StudentSchedule', { token: data.token });
    if (data.user.role === 'teacher') navigation.replace('TeacherUpload', { token: data.token });
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 24 }}>تسجيل الدخول</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" style={{ borderWidth: 1, padding: 10 }} />
      <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" style={{ borderWidth: 1, padding: 10 }} />
      <Button title="دخول" onPress={login} />
    </View>
  );
}
