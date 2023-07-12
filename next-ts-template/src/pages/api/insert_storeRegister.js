import connection from '../../../db/db';

export default async function handler(req, res) {
  try {
    // POSTリクエストのボディからデータを取得
    const { data } = req.body;
    console.log({ data });

    // データを挿入するためのクエリを作成
    const query = `INSERT INTO Registered_stores VALUES ('${data.userId}','${data.sid}')`;

    // データベースにデータを挿入
    connection.query(query, async (error, results, fields) => {
      if (error) {
        console.error(error);
        await res.status(500).json({ error: 'データの挿入中にエラーが発生しました。' });
        connection.end();
      } else {
        res.status(200).json({ data: results });
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'データの挿入中にエラーが発生しました。' });
  }
}
