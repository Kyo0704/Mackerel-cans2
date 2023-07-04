import mysql from 'mysql2';

// MySQL接続の設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'line_db'
});

export default connection;