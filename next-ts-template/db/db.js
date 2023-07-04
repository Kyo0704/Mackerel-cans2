import mysql from 'mysql2';

// MySQL接続の設定
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'NatsukiHijiri2434',
  database: 'prisma_db'
});

export default connection;