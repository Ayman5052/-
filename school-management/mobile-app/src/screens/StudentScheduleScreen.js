import { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { api, withToken } from '../services/api';

export default function StudentScheduleScreen({ route }) {
  const { token } = route.params;
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    api.get('/student/schedule', withToken(token)).then((res) => setSchedule(res.data));
  }, [token]);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 12 }}>جدول الطالب</Text>
      <FlatList
        data={schedule}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 12, borderWidth: 1, marginBottom: 8 }}>
            <Text>{item.day_of_week} - الحصة {item.period}</Text>
            <Text>{item.subject} | {item.teacher}</Text>
            <Text>القاعة: {item.room || '-'}</Text>
          </View>
        )}
      />
    </View>
  );
}
