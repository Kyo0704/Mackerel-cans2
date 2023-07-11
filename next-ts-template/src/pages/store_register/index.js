import { useState, useEffect } from "react"
import { query } from "../../../db/query"

export default function index({ liff, liffError, token, store_data, registered_data, err }) {
  const [storeData, setStoreData] = useState("")
  const [selectData, setSelectData] = useState("")
  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [isSelected, setIsSelected] = useState(false)
  const [insertError, setInsertError] = useState(false)

  let optionId
  let selectedOption

  useEffect(() => {
    const getRegistered = async () => {
      const liff = (await import("@line/liff")).default;
    }
    getRegistered()
  }, []);

  const insertData = async () => {
    try {
      const data = { sid: optionId, token: token }
      const response = await fetch('/api/insert_storeRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const result = await response.json();
      } else {
        setInsertError(true)
        console.error('データの挿入中にエラーが発生しました。');
      }
    } catch (error) {
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
    insertData();
  }

  function buttonClick_back() {
    setIsSelected(false)
  }

  const Display_select = () => {
    if (!isSelected) {
      if (store_data.length == 0) {
        return (
          <div>店舗情報がありません。</div>
        )
      } else {
        return (
          <div>
            <Select name="store_register" id="store_register">
              {store_data.map((store) => (
                <option key={store.sid} id={store.sid} value={store.sname}>{store.sname}</option>
              ))}
            </Select>
            <button variant="contained" id='checkButton' onClick={buttonClick}>登録</button>
          </div>
        )
      }
    } else if (insertError == false) {
      return (
        <div>
          {selectData}を登録しました。
        </div>
      )
    } else if (insertError == true) {
      return (
        <div>データベースに登録できませんでした。</div>
      )
    }
  }

  const Display_BackButton = () => {
    if (isSelected == true) {
      return (
        <button id='checkButton' onClick={buttonClick_back}>戻る</button>
      )
    }
  }

  if (liff && token) {
    if (!err) {
      return (
        <div>
          <Display_select />
          <Display_BackButton />
        </div>
      )
    } else {
      return (
        <div>
          商品情報を取得することができませんでした。
        </div>
      )
    }
  } else if (!liff) {
    return (
      <div>
        <p>エラーが発生しました。</p>
        <p>{liffError}</p>
      </div>
    )
  } else if (!token) {
    return (
      <div>
        ユーザー情報を取得できませんでした。
      </div>
    )
  }
}

export async function getStaticProps() {
  try {
    /**
     * sql文を作成
     * store表　sname sid
     */
    const sql_store = "select sname,sid from Store";

    // idを使って必要なデータを取得するなどの処理を行う
    const result_store = await query(sql_store)
    return {
      props: {
        store_data: result_store,
        err: false
      }
    };
  } catch (error) {
    return {
      props: {
        store_data: null,
        err: true
      }
    };
  }
}