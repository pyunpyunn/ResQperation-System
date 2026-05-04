import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

export default function HouseholdHomePage({ user }) {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Household Resident</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>{user.name}</h2>
        <p>Household status, evacuation notices, QR details, and help requests belong here.</p>
      </IonContent>
    </IonPage>
  );
}
