import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import { useState } from 'react';
import LoginPage from '../pages/LoginPage.jsx';
import RescuerHomePage from '../pages/RescuerHomePage.jsx';
import HouseholdHomePage from '../pages/HouseholdHomePage.jsx';

export default function App() {
  const [session, setSession] = useState(null);
  const role = session?.user?.role;

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login">
            <LoginPage onLogin={setSession} />
          </Route>
          <Route exact path="/rescuer">
            {role === 'rescuer' ? <RescuerHomePage user={session.user} /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/household">
            {role === 'household_resident' ? <HouseholdHomePage user={session.user} /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/">
            {role === 'rescuer' && <Redirect to="/rescuer" />}
            {role === 'household_resident' && <Redirect to="/household" />}
            {!role && <Redirect to="/login" />}
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}
