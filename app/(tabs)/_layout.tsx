import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
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
        name="maps/index"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color }) => <TabBarIcon size={28} name="map" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'About',
          tabBarIcon: ({ color }) => <TabBarIcon size={28} name="code" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  );
}

export default TabLayout