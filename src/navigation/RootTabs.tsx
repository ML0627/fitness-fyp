import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/DashboardScreen';
import NutritionScreen from '../screens/NutritionScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';

export type RootTabParamList = {
  Dashboard: undefined;
  Workouts: undefined;
  Nutrition: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const tabIcons: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Dashboard: 'home-outline',
  Workouts: 'barbell-outline',
  Nutrition: 'nutrition-outline',
  Profile: 'person-outline',
};

export default function RootTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitleAlign: 'center',
        tabBarActiveTintColor: '#0a7ea4',
        tabBarInactiveTintColor: '#687076',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={tabIcons[route.name]} size={size} color={color} />
        ),
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Workouts" component={WorkoutsScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
