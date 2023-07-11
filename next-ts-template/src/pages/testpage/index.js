import { useEffect, useState } from "react"

export default function Home({ liff, liffError, token }) {
  const [userData, setUserData] = useState()
  let result

  useEffect(() => {
    getUserData()
  }, [])

  // ユーザーデータの取得
  const getUserData = async () => {
    const data = { token: token }
    const response = await fetch('/api/getUserData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
    result = await response.json()
    setUserData(result)
  }

  const DisplayUser = () => {
    if (userData) {
      return (
        <div>userData : {userData.message}</div>
        // <div>userData : {userData.userId}</div>
      )
    } else {
      return (
        <div>userDataを取得ができませんでした。</div>
      )
    }
  }

  const DisplayLiff = () => {
    if (liff) {
      return (
        <div>
          LIFFがあります。
        </div>
      )
    }else{
      return(
        <div>
          LIFFがありません。
        </div>
      )
    }
  }

  return (
    <div>
      <div><DisplayLiff /></div>
      <div>liffError : {liffError}</div>
      <div>accessToken : {token}</div>
      <div><DisplayUser /></div>
    </div>
  )
}