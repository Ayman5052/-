import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import StudentScheduleScreen from './src/screens/StudentScheduleScreen';
import TeacherUploadScreen from './src/screens/TeacherUploadScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'School App Login' }} />
        <Stack.Screen name="StudentSchedule" component={StudentScheduleScreen} options={{ title: 'Student Schedule' }} />
        <Stack.Screen name="TeacherUpload" component={TeacherUploadScreen} options={{ title: 'Teacher Upload Assignment' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
