import { useState, useEffect } from "react"
const useAppWrite = (fn) => {
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)

  const fetchData = async () => {
    try{
     setLoading(true)
     const posts = await fn();
     console.log("all videos", posts)
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