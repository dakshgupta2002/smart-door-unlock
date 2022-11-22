import { getDoc, doc } from "firebase/firestore"
import { db } from "../firebase"

// View the history
const fetchHistoryRefs = async (historyIds) => {
  const res = await historyIds.map( (historyId) => getDoc(doc(db, "history", historyId)));
  return Promise.all(res);
}
export const fetchGroupHistory = async (groupIds) => {
  const historyRefs = await fetchHistoryRefs(groupIds);
  
}

