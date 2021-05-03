import { auth } from '@/lib/firebase-admin';
import { getAllFeedbackForUserSites } from '@/lib/db-admin'

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { feedback } = await getAllFeedbackForUserSites(uid);

    res.status(200).json({ feedback });
  } catch (error) {
    res.status(500).json({ error });
  }
}
