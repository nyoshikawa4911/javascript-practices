import sqlite3 from "sqlite3";

const createUsersTable =
  "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL);";
const insertUser = "INSERT INTO users (name, email) VALUES (?, ?);";
const selectUser = "SELECT * FROM users WHERE id = ?;";
const dropUsersTable = "DROP TABLE users;";

const runAsync = (db, sql, params = []) =>
  new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this);
      }
    });
  });

const getAsync = (db, sql, params = []) =>
  new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });

const database = new sqlite3.Database(":memory:");

const main = async () => {
  try {
    await runAsync(database, createUsersTable);
    const result = await runAsync(database, insertUser, ["Alice", "alice@example.com"]);
    const row = await getAsync(database, selectUser, result.lastID);
    console.log(row);
    await runAsync(database, dropUsersTable);
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(String(err));
    }
  } finally {
    database.close((err) => {
      if (err) {
        console.error("DBクローズ時にエラー", err);
      }
    });
  }
};

main();
