import { db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Create group
export const createGroupApi = async (email, gname, serverID) => {
  //verify if server exists
  const serverSnap = await getDoc(doc(db, "servers", serverID));  
  if (serverSnap.exists()){
    console.log(serverSnap.data().available===true)
    if (serverSnap.data().available === true){
      //create a new group
      await setDoc(doc(collection(db, "groups")), {
        name: gname,
        admin: email,
        freeze: 'false',
        status: 'false',
        members: [email],
        history: [],
        server: serverID,
      });
      await setDoc(doc(db, "servers", serverID), {available: false}, {merge: true});
      toast.success("Group has been created");
      window.location.href = `/groups/${serverID}`
    }else{
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