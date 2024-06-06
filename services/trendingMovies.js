import axios from "axios"
export default  async function getTrendingMovies(){
    try{
const response = await  axios.get(
        " http://localhost:3000/movies/trending",
     
      );
  
     return response.data;
    }
    catch(e){
        console.log(e)
    }
 }