import sqlite3 from "sqlite3";

const createUsersTable =
  "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL);";
const insertUser = "INSERT INTO users (name, email) VALUES (?, ?);";
const selectUser = "SELECT * FROM users WHERE id = ?;";
const dropUsersTable = "DROP TABLE users;";

const database = new sqlite3.Database(":memory:");

new Promise((resolve, reject) => {
  database.run(createUsersTable, (err) => {
    if (err) {
      console.error("テーブル作成時にエラー");
      reject(err);
    } else {
      resolve();
    }
  });
})
  .then(() => {
    return new Promise((resolve, reject) => {
      database.run(insertUser, ["Alice", "alice@example.com"], function (err) {
        if (err) {
          console.error("データ挿入時にエラー");
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  })
  .then((id) => {
    return new Promise((resolve, reject) => {
      database.get(selectUser, id, (err, row) => {
        if (err) {
          console.error("データ取得時にエラー");
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  })
  .then((row) => {
    console.log(row);
    return new Promise((resolve, reject) => {
      database.run(dropUsersTable, (err) => {
        if (err) {
          console.error("テーブル削除時にエラー");
          reject(err);
        } else {
          resolve();
        }
      });
    });
  })
  .catch((err) => {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(String(err));
    }
  })
  .finally(() => {
    database.close((err) => {
      if (err) {
        console.error("DBクローズ時にエラー", err);
      }
    });
  });
