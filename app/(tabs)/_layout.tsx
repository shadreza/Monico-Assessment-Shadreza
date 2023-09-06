import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import Colors from '../../constants/Colors';
import TabBarIcon from '../../functionalities/Icon/TabBarIcon';

const TabLayout = () => {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}>
      <Tabs.Screen
        name="todo/index"
        options={{
          title: 'Todo',
          tabBarIcon: ({ color }) => <TabBarIcon size={28} name="list" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="maps/index"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color }) => <TabBarIcon size={28} name="map" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default TabLayout