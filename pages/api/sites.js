import { getUserSites, getAllSites } from "@/lib/db-admin";
import { auth } from "@/lib/firebase-admin";

export default async (req, res) => {
  try {
    const { token } = req.headers;
    const { uid } = await auth.verifyIdToken(token);
    // const { sites } = await getUserSites(uid); // temporary commented for all sites
    const { sites } = await getAllSites();

    res.status(200).json({ sites });
  } catch (error) {
    res.status(200).json({ error });
  }
}
