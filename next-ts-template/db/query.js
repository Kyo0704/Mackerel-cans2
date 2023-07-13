import db_setting from './db';
import mysql from 'mysql2'

export function query(sql, values) {
  return new Promise(async (resolve, reject) => {
    const connection = mysql.createConnection(db_setting);
    connection.query(sql, values, (error, results) => {
      if (error) {
        console.log(error)
        reject(error);
      } else {
        resolve(results);
      }
    });
    connection.end()
  });
}