import { db } from "./firebase";
import { 
    collection, 
    query, 
    getDocs,
    orderBy,
    limit
} from "firebase/firestore";

export async function getLastCat(){
    const q = query(
        collection(db, "cats"), 
        orderBy("date", "desc"), 
        limit(1)
    )
    const querySnapshot = await getDocs(q)
    return querySnapshot
}