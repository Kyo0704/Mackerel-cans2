import { query } from '@/../db/query';
import styles from '/styles/leaflet_index.module.scss'

function Post({ liff , liffError, data, err }) {

  const table_title = {
    p_name: "商品名",
    p_id: "ID",
    p_price: "値段",
    p_disprice: "値引き後",
    ex_date: "賞味期限",
    status: "状態"
  }

  const Display_table = () => {
    if (data.length == 0) {
      return (
        <div>商品情報がありません。</div>
      )
    } else {
      return (
        <table className={styles.leaflet_table} border={1}>
          <tbody>
            <tr>
              <th>{table_title.p_name}</th>
              <th>{table_title.p_id}</th>
              <th>{table_title.p_price}</th>
              <th>{table_title.p_disprice}</th>
              <th>{table_title.ex_date}</th>
              <th>{table_title.status}</th>
            </tr>
            {data.map((product: any) => (
              <tr key={product.pid}>
                <td>{product.pname}</td>
                <td>{product.pid}</td>
                <td>{product.price}</td>
                <td>{product.dprice}</td>
                <td>{product.expiry_date}</td>
                <td>{product.stname}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )
    }
  }

  if (liff) {
    if (!err) {
      return (
        <div>
          <Display_table />
        </div>
      )
    } else {
      return (
        <div>
          商品情報が取得できませんでした。
        </div>
      )
    }
  } else {
    <div>
      <p>エラーが発生しました。</p>
      <p>{liffError}</p>
    </div>
  }
}

export async function getStaticPaths() {
  const results = await query('SELECT sid FROM store');

  const paths = results.map((e: { sid: { toString: () => any; }; }) => ({
    params: { id: e.sid.toString() }
  }));

  return {
    paths: paths,
    fallback: false
  };
}

export async function getStaticProps(context: { params: any; }) {
  try {
    const { params } = context;
    const { id } = params;
    /**
     * sql文を作成
     * product表、pid pname expiry_date price
     * discount表 dprice 
     * state表 stname
     */
    const sql = `SELECT p.pid, p.pname, p.expiry_date, p.price, d.dprice, s.stname FROM product p JOIN discount d ON p.pid = d.pid JOIN state s ON d.stid = s.stid where d.sid = ${id};`;
    // idを使って必要なデータを取得するなどの処理を行う
    const result = await query(sql)
    return {
      props: {
        data: result,
        err: false
      }
    };
  } catch (error) {
    return {
      props: {
        data: null,
        err: true
      }
    };
  }

}

export default Post;