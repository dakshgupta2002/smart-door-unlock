import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

export const createGroupApi = async (email, gname, serverID) => { //otp verification
  if (!serverID) {
    toast.error("Server ID failed to be provided")
    return;
  }
  const serverSnap = await getDoc(doc(db, "servers", serverID));
  if (serverSnap.exists()) { //verify if this server exists
    if (serverSnap.data().available === true) {
      // this server will not create a new group
      await setDoc(doc(db, "servers", serverID), { available: false }, { merge: true });
      const key = uuidv4(); //generate the secret key for the group

      await setDoc(doc(db, "groups", serverID), { //create a new group using this server
        name: gname,
        admin: email,
        freeze: 'false',
        status: 'false',
        history: [],
        key: key
      })
      // add the grp id to the user doc 
      const userRef = await getDoc(doc(db, "users", email));
      const updatedGroups = userRef.data().groups;
      updatedGroups.push(serverID);
      await setDoc(doc(db, "users", email), { groups: updatedGroups }, { merge: true });
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
export const joinGroupApi = async (email, serverID, key) => {
  const userRef = await getDoc(doc(db, "users", email));
  if (userRef.data().groups.includes(serverID)) {
    toast.info("You are already in this group")
    window.location.href = `/groups/${serverID}`
    return;
  }
  // check if the key exists
  if (!key || !serverID) {
    toast.error("Key failed to be provided")
    return;
  }
  const groupSnap = await getDoc(doc(db, "groups", serverID));
  if (groupSnap.exists()) { //verify if they server id matches
    if (groupSnap.data().key === key) {
      //join the group, add the user to the group
      const updatedGroups = userRef.data().groups;
      updatedGroups.push(serverID);
      await setDoc(doc(db, "users", email), { groups: updatedGroups }, { merge: true });
      // display the changes to the user
      toast.success("You are a member of the group");
      window.location.href = `/groups/${serverID}`

    } else {
      toast.error("The key is invalid")
    }
  } else toast.error("The credentials provided are wrong")
}

const getGroupIds = async (email) => {
  const userRef = await getDoc(doc(db, "users", email));
  let groups = userRef.data().groups; // these contains the ID of the groups
  return groups;
}
const getGroupsRef = async (email) => {
  const groups = await getGroupIds(email);  
  const res = await groups.map((groupID) => getDoc(doc(db, "groups", groupID))); //fetch the groups ref
  return Promise.all(res); // return the promise of refs
}
// My Groups
export const fetchMyGroupsApi = async (email) => {
  let ids = await getGroupIds(email);
  let refs = await getGroupsRef(email); //wait for the refs to be fetched

  for (let i = 0; i < refs.length; i++){
    let data = refs[i].data();
    data.id = ids[i];
    refs[i] = data; //populate the refs array
  }
  return refs;
}