import { doc, getDoc } from "firebase/firestore"
import { toast } from "react-toastify";
import { db } from "../firebase"

export const verifyAndEmail = async (serverID) => {
  if (!serverID) {
    toast.error("Server ID failed to be provided")
    return false;
  }
  // if serverID is not created yet
  const serverSnap = await getDoc(doc(db, "servers", serverID));
  if (!serverSnap.exists()) {
    toast.error(`The server ${serverID} does not exist`);
    return false;
  }
  // if the server is already created
  if (serverSnap.data().available === false) {
    toast.error("The server is used by someone else.")
    return false;
  }
  //generate the otp
  // phone number is
  return serverSnap.data().email;
}