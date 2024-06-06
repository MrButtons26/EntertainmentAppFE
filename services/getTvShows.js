import axios from "axios"
export default  async function getAllTv(pageNum){
  
    try{
const response = await  axios.get(
        `http://localhost:3000/tvshows/toprated/${pageNum.pageParam}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDM0OGU0YTI1NTBmYTJkZmI2YzhlZTBkMzIxYTJjNSIsInN1YiI6IjY2NGYzMDAyYjk0ZDRhY2RjZDRmODA5NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2wCu4dTWX02meDPToYUxmESipbJ0luEbo_BZwFBiD6I",
          },
        }
      );
     return response.data;
    }
    catch(e){
        console.log(e)
    }
 }