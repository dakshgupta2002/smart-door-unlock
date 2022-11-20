import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

// Create group
export const createGroupApi = async (email, gname, serverID) => {
  //verify if server exists
  const docSnap = await getDoc(doc(db, "servers", serverID));  
  if (docSnap.exists()){
   
    // await setDoc(doc(db, 'groups', gname), {
    //   admin: email,
    //   freeze: 'false',
    //   status: 'false',

    // })
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