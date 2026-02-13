import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { api, withToken } from '../services/api';

export default function TeacherUploadScreen({ route }) {
  const { token } = route.params;
  const [title, setTitle] = useState('واجب الرياضيات');
  const [classId, setClassId] = useState('1');
  const [fileUrl, setFileUrl] = useState('https://example.com/homework.pdf');

  const uploadAssignment = async () => {
    await api.post('/teacher/assignments', {
      title,
      classId: Number(classId),
      fileUrl,
      dueDate: '2026-12-31'
    }, withToken(token));
    Alert.alert('تم', 'تم رفع الواجب بنجاح');
  };

  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 22 }}>رفع واجب من المعلم</Text>
      <TextInput value={title} onChangeText={setTitle} placeholder="عنوان الواجب" style={{ borderWidth: 1, padding: 10 }} />
      <TextInput value={classId} onChangeText={setClassId} placeholder="رقم الفصل" style={{ borderWidth: 1, padding: 10 }} />
      <TextInput value={fileUrl} onChangeText={setFileUrl} placeholder="رابط الملف" style={{ borderWidth: 1, padding: 10 }} />
      <Button title="رفع" onPress={uploadAssignment} />
    </View>
  );
}
