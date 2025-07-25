import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      
      tabBarActiveTintColor: '#2cbd5d' ,
      tabBarStyle: {
      backgroundColor: '#cfe1d5', 
      height: 90, 
    },
      }}>
      <Tabs.Screen
      
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="rute"
        options={{
          title: 'Rute',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="trash-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
