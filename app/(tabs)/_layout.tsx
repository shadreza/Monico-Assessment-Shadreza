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
          title: 'Task Planner',
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
        name="maps1/index"
        options={{
          title: 'Map Director 01',
          tabBarIcon: ({ color }) => <TabBarIcon size={28} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="maps2/index"
        options={{
          title: 'Map Director 02',
          tabBarIcon: ({ color }) => <TabBarIcon size={28} name="map-signs" color={color} />,
        }}
      />
    </Tabs>
  );
}

export default TabLayout