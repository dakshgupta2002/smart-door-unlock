import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

//create the group
export const createGroupApi = async (email, gname, serverID) => {
  try {
    await setDoc(doc(db, "servers", serverID), { available: false }, { merge: true });
    const key = uuidv4(); //generate the secret key for the group

    await setDoc(doc(db, "groups", serverID), { //create a new group using this server
      name: gname,
      admin: email,
      freeze: false,
      status: false,
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
  } catch (err) {
    toast.error("Error creating group. Try again later");
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
// My Groups IDS
const getGroupIds = async (email) => {
  const userRef = await getDoc(doc(db, "users", email));
  let groups = userRef.data().groups; // these contains the ID of the groups
  return groups;
}
// My group Ref promises
const getGroupsRef = async (email) => {
  const groups = await getGroupIds(email);
  const res = await groups.map((groupID) => getDoc(doc(db, "groups", groupID))); //fetch the groups ref
  return Promise.all(res); // return the promise of refs
}
// My Groups
export const fetchMyGroupsApi = async (email) => {
  let ids = await getGroupIds(email);
  let refs = await getGroupsRef(email); //wait for the refs to be fetched

  for (let i = 0; i < refs.length; i++) {
    let data = refs[i].data();
    data.id = ids[i];
    refs[i] = data; //populate the refs array
  }
  return refs;
}
// Group Details
export const fetchGroupApi = async (email, groupId) => {
  //check if he is authorized
  const userRef = await getDoc(doc(db, "users", email));
  if (!userRef.data().groups.includes(groupId)) {
    toast.error("You are not a part of this group")
    window.location.href = `/groups`
    return;
  }
  // check if the group exists
  const groupRef = await getDoc(doc(db, "groups", groupId));
  if (!groupRef.exists()) {
    toast.error("This group does not exist");
    window.location.href = `/groups`
    return;
  }
  return groupRef.data();
}