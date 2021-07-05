import firebase from './firebase';
import getStripe from './stripe';

const firestore = firebase.firestore();
const app = firebase.app();

export function createUser(uid, data) {
  return firestore
    .collection('users')
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  const site = firestore.collection('sites').doc();
  site.set(data);

  return site;
}

export async function deleteSite(id) {
  firestore.collection('sites').doc(id).delete();
  // get all feedback for specific site ID
  const snapshot = await firestore
    .collection('feedback')
    .where('siteId', '==', id)
    .get();
  // creating batch transaction
  const batch = firestore.batch();

  // deleting each feedback for selected site
  snapshot.forEach(doc => {
    batch.delete(doc.ref);
  });

  return batch.commit();
}

export async function updateSite(id, newValues) {
  return firestore.collection('sites').doc(id).update(newValues);
}

export function createFeedback(data) {
  return firestore.collection('feedback').add(data);
}

export function deleteFeedback(id) {
  return firestore.collection('feedback').doc(id).delete();
}

export function updateFeedback(id, newValues) {
  return firestore.collection('feedback').doc(id).update(newValues);
}

/*===========================
    Stripe Integration 
===========================*/

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
      success_url: window.location.origin,
      cancel_url: window.location.origin
    });
  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async snap => {
    const { error, sessionId } = snap.data();
    if (error) {
      alert(`An error occured: ${error.message}`);
    }
    if (sessionId) {
      const stripe = await getStripe();
      stripe.redirectToCheckout({ sessionId });
    }
  });
}

export async function goToBillingPortal() {
  const functionRef = app
    .functions('europe-west3')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink');
  const { data } = await functionRef({ returnUrl: `${window.location.origin}/account` });
  window.location.assign(data.url);
}
