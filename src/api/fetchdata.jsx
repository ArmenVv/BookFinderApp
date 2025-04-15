import { API_URL } from "./constants";

export const FetchBooks = async (searchVal) => {
    try{
        const response = await fetch(`${API_URL}q=${encodeURIComponent(searchVal)}`)
        const data = await response.json();
        return data.docs;
    }
    catch(error){
        console.log('Error');
    }
}