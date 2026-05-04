import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default function RescuerHomePage({ user }) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Rescuer Console</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{user.name}</h2>
        <p>Dispatch, assignments, field reports, and household rescue details belong here.</p>
      </IonContent>
    </IonPage>
  );
}
