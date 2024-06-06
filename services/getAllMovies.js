import axios from "axios"
export default  async function getAllMovies(pageNum){
  
    try{
const response = await  axios.get(
        `http://localhost:3000/movies/toprated/${pageNum.pageParam}`,
      );
     return response.data;
    }
    catch(e){
        console.log(e)
    }
 }