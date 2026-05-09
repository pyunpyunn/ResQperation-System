import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import LoginPage from './pages/auth/LoginPage.jsx';
import RescuerHomePage from './pages/rescuer/RescuerHomePage.jsx';
import HouseholdHomePage from './pages/household/HouseholdHomePage.jsx';
import { getApiBaseUrl } from './services/api.js';
import colors from './theme/colors.js';

const ROUTES_BY_ROLE = {
  rescuer: 'rescuer',
  household_resident: 'household',
};

export default function App() {
  const [session, setSession] = useState(null);
  const [screen, setScreen] = useState('login');

  function handleLogin(nextSession) {
    const nextScreen = ROUTES_BY_ROLE[nextSession.user.role];

    if (!nextScreen) {
      throw new Error('This mobile app is only for rescuer and household resident accounts.');
    }

    setSession(nextSession);
    setScreen(nextScreen);
  }

  function handleLogout() {
    setSession(null);
    setScreen('login');
  }

  let content = <LoginPage apiBaseUrl={getApiBaseUrl()} onLogin={handleLogin} />;

  if (screen === 'rescuer' && session?.user?.role === 'rescuer') {
    content = <RescuerHomePage user={session.user} onLogout={handleLogout} />;
  }

  if (screen === 'household' && session?.user?.role === 'household_resident') {
    content = <HouseholdHomePage user={session.user} onLogout={handleLogout} />;
  }

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
