import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export function UseStaticApiCall(url) {
  const token = useSelector(state=>state.token)
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  async function callApi() {
    let resp = await fetch(url,{
      headers:{
        'Authorization': "Bearer " + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      }
    });
    console.log(resp);
    if (resp.status === 200) {
      let json = await resp.text();
      console.log('json is', json);
      setApiResponse(json);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    callApi();
  }, [url]);

  if (isLoading) {
    return null; // или другое значение загрузки, если требуется
  }

  console.log('resp is ', apiResponse);
  return apiResponse;
}
