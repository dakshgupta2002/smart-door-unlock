import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

// Create group
export const createGroupApi = async (email, gname, serverID) => {
  //verify if server exists
  if (!serverID) {
    toast.error("Server ID failed to be provided")
    return;
  }
  const serverSnap = await getDoc(doc(db, "servers", serverID));
  if (serverSnap.exists()) {
    if (serverSnap.data().available === true) {
      // this server cannot create a new group
      await setDoc(doc(db, "servers", serverID), { available: false }, { merge: true });
      //generate the secret key for the group
      const key = uuidv4();
      //create a new group using this server
      await setDoc(doc(db, "groups", key), {
        name: gname,
        admin: email,
        freeze: 'false',
        status: 'false',
        history: [],
        server: serverID,
      })
      // add the grp id to user doc 
      const userRef = await getDoc(doc(db, "users", email));
      const updatedGroups = userRef.data().groups;
      updatedGroups.push(key);
      await setDoc(doc(db, "users", email), {groups: updatedGroups}, {merge: true});
      // display the changes to the user
      toast.success("Group has been created");
      window.location.href = `/groups/${serverID}`
    } else {
      toast.error("The server is used by someone else.")
    }
  }
  else {
    toast.error("Server id is invalid")
  }
}
// Join group
export const joinGroupApi = () => {

}

// My Groups
export const fetchMyGroupsApi = async () => {

}