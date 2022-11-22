import { addDoc, collection } from "firebase/firestore"
import { toast } from "react-toastify";
import { db } from "../firebase"

export const buyServerApi = async (name, email, phone, address) => {
    const newServerRef = await addDoc(collection(db, "servers"), {
        available: true,
        location: address,
        email: email,
        owner: name,
        phone: phone,
        ipadd: '0.0.0.0/0'
    });
    
    toast.success("Successfully added server to your orders.");
    return newServerRef.id;
}