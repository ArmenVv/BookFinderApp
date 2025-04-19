import { API_URL } from "./constants";

export const FetchBooks = async (searchVal,start=0) => {
    try{
        const response = await fetch(`${API_URL}q=${encodeURIComponent(searchVal)}&limit=20&offset=${start}`)
        const data = await response.json();
        return {
            numFound: data.numFound,
            docs: data.docs,
            start: data.start
        };
    }
    catch(error){
        console.log('Error');
    }
}