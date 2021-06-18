import { db } from './firebase-admin';

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db
      .collection('feedback')
      .where('siteId', "==", siteId)
      .orderBy('createdAt', 'desc') //There`s bug with Firebase SDK, index was created for these two queries in order to work properly
      .get()

    const feedback = [];

    snapshot.forEach(doc => {
      feedback.push({ id: doc.id, ...doc.data() });
    });
    return { feedback };
  } catch (error) {
    return { error }
  }
}

export async function getAllSites() {
  const snapshot = await db.collection('sites').get();
  const sites = [];

  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getUserSites(uid) {
  const snapshot = await db
    .collection('sites')
    .where('authorId', '==', uid)
    .orderBy('createdAt', 'desc')
    .get();

  const sites = [];

  snapshot.forEach(doc => {
    sites.push({ id: doc.id, ...doc.data() });
  });

  return { sites };
}

export async function getSite(siteId) {
  const doc = await db.collection('sites').doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };

  return { site };
}

export async function getAllFeedbackForSites(uid) {
  const { sites } = await getUserSites(uid);

  if (!sites.length) {
    return { feedback: [] };
  }

  const siteIds = sites.map(site => site.id);
  const snapshot = await db
    .collection('feedback')
    .where('siteId', 'in', siteIds)
    .get();

  const feedback = [];

  snapshot.forEach(doc => {
    feedback.push({ id: doc.id, ...doc.data() });
  });

  return { feedback };
}
