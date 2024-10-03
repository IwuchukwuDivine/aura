import { useState, useEffect } from "react"
import { Alert } from "react-native"
const useAppWrite = (fn, query) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  const fetchData = async () => {
    try{
     setLoading(true)
     let posts;
     if(query){
      posts = await fn(query);
     }else{
      posts = await fn();
     }
     setData(posts);
    }catch(error){
     Alert.alert('Error', error.message)
    }finally{
     setLoading(false)
    }
 }
 
  useEffect(() => {
  fetchData()
  }, []);

  const refetch = () => {
    fetchData()
  }

  return {data, refetch, isLoading}
}

export default useAppWrite