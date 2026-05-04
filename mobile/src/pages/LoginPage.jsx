import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { login } from '../services/api.js';

export default function LoginPage({ onLogin }) {
  const history = useHistory();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    try {
      const session = await login(loginId, password);
      onLogin(session);

      history.replace(session.user.role === 'rescuer' ? '/rescuer' : '/household');
    } catch {
      setError('Invalid user ID or temporary password.');
    }
  }

  return (
    <IonPage>
      <IonContent fullscreen className="login-screen">
        <form className="login-panel" onSubmit={handleSubmit}>
          <h1>ResQperation</h1>
          <IonItem>
            <IonLabel position="stacked">User ID</IonLabel>
            <IonInput value={loginId} onIonInput={(event) => setLoginId(event.detail.value || '')} autocomplete="username" />
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Temporary password</IonLabel>
            <IonInput value={password} onIonInput={(event) => setPassword(event.detail.value || '')} type="password" autocomplete="current-password" />
          </IonItem>
          {error && <IonText color="danger"><p>{error}</p></IonText>}
          <IonButton expand="block" type="submit">Log in</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}
