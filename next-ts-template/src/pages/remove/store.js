import { useEffect, useState } from "react"
import styles from "../../../styles/removeStore.module.scss"

export default function Home() {
  const [liffObject, setLiffObject] = useState("");
  const [liffError, setLiffError] = useState("");
  const [liffToken, setLiffToken] = useState("");
  const [userData, setUserData] = useState("");
  const [storeData, setStoreData] = useState("");
  const [selectData, setSelectData] = useState("");
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [isSelected, setIsSelected] = useState(false);
  const [removeError, setRemoveError] = useState(false)

  let result
  let token
  let storeResult
  let optionId
  let selectedOption

  useEffect(() => {
    /************************************************************** */
    // テスト用に仮データを挿入　本番はすべてコードを消す
    // setLiffObject("kamikami");
    // token = "fake token";
    // result = {
    //   "userId": "U0085669a8271dedff6046bcc45bfe915",
    //   "displayName": "リョウマ",
    //   "pictureUrl": "https://profile.line-scdn.net/abcdefghijklmn",
    //   "statusMessage": "Hello, LINE!"
    // };
    // setUserData(result);
    /************************************************************** */

    (async () => {
      const liff = (await import("@line/liff")).default;
      liff
        .init({ liffId: "2000107333-BamRaAmA" })
        .then(async () => {
          token = liff.getAccessToken();
          console.log("LIFF init succeeded.");
          setLiffToken(token)
          setLiffObject(liff);
          await getUserData()
          await getStoreData()
        })
        .catch((error) => {
          console.log("LIFF init failed.");
          setLiffError(error.toString());
        });
    })()
  }, []);


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

  const getStoreData = async () => {
    const data = { userId: result.userId }
    const response = await fetch('/api/getStoreData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data }),
    });
    storeResult = await response.json()
    setStoreData(storeResult)
  }

  const removeData = async () => {
    try {
      const data = { sid: optionId, userId: userData.userId }
      const response = await fetch('/api/removeStore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const result = await response.json();
      } else {
        setRemoveError(true)
        console.error('データの挿入中にエラーが発生しました。');
      }
    } catch (error) {
      setRemoveError(true)
      console.error(error);
    }
  }

  function buttonClick() {
    const selectElement = document.getElementById("store_register");
    selectedOption = selectElement.options[selectElement.selectedIndex];
    optionId = selectedOption.id;
    setIsSelected(true);

    setSelectData(selectedOption.value);
    setSelectedOptionId(optionId);
    removeData();
  }

  function buttonClick_back() {
    setIsSelected(false)
  }

  const Display_select = () => {
    if (!isSelected) {
      if (storeData.length == 0) {
        return (
          <div className={styles.title}>店舗情報がありません。</div>
        )
      } else {
        return (
          <div className={styles.title}>
            <div>
              登録解除する店舗を選択してください。
            </div>
            <select className={styles.select} name="store_register" id="store_register">
              {storeData.data.map((store) => (
                <option key={store.sid} id={store.sid} value={store.sname}>{store.sname}</option>
              ))}
            </select>
            <div>
              <button className={styles.button} variant="contained" id='checkButton' onClick={buttonClick}>登録解除</button>
            </div>
          </div>
        )
      }
    } else if (removeError == false) {
      return (
        <div className={styles.title}>
          {selectData}を登録解除しました。
        </div>
      )
    } else if (removeError == true) {
      return (
        <div className={styles.title}>データベースに登録できませんでした。</div>
      )
    }
  }

  const Display_BackButton = () => {
    if (isSelected == true) {
      return (
        <div className={styles.title}>
          <button className={styles.button} id='checkButton' onClick={buttonClick_back}>戻る</button>
        </div>
      )
    }
  }

  const Display = () => {
    if (liffObject && liffToken) {
      if (storeData) {
        return (
          <div className={styles.title}>
            <Display_select />
            <Display_BackButton />
          </div>
        )
      } else {
        return (
          <div className={styles.title}>
            店舗情報を取得することができませんでした。
          </div>
        )
      }
    } else if (!liffObject) {
      return (
        <div className={styles.title}>
          <p>エラーが発生しました。</p>
          <p>{liffError}</p>
        </div>
      )
    } else if (!liffToken) {
      return (
        <div className={styles.title}>
          ユーザー情報を取得できませんでした。
        </div>
      )
    }
  }

  return (
    <div className={styles.title}>
      <Display />
      <a href="https://liff.line.me/2000040298-43n1RAkK">
        <button className={styles.button}>店舗登録ページへ</button>
      </a>
    </div>
  )

}