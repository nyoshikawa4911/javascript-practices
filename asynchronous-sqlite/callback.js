import sqlite3 from "sqlite3";

const createUsersTable =
  "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL);";
const insertUser = "INSERT INTO users (name, email) VALUES (?, ?);";
const selectUser = "SELECT * FROM users WHERE id = ?;";
const dropUsersTable = "DROP TABLE users;";

const database = new sqlite3.Database(":memory:");

database.run(createUsersTable, (err) => {
  if (err) {
    handleError("テーブル作成時にエラー", err);
    return;
  }

  database.run(insertUser, ["Alice", "alice@example.com"], function (err) {
    if (err) {
      handleError("データ挿入時にエラー", err);
      return;
    }

    database.get(selectUser, this.lastID, (err, row) => {
      if (err) {
        handleError("データ取得時にエラー", err);
        return;
      }

      console.log(row);
      database.run(dropUsersTable, (err) => {
        if (err) {
          handleError("テーブル削除時にエラー", err);
          return;
        }

        database.close((err) => {
          if (err) {
            console.error("DBクローズ時にエラー", err);
            console.error("プロセスを終了させます");
            process.exit(1);
          }
          console.log("正常終了");
        });
      });
    });
  });
});

const handleError = (message, err) => {
  if (err instanceof Error) {
    console.error(message, err.message);
  } else {
    console.error(message, String(err));
  }

  database.close((err) => {
    if (err) {
      console.error("DBクローズ時にエラー", err);
    }
    console.error("プロセスを終了させます");
    process.exit(1);
  });
};
