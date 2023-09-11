import * as SQLite from "expo-sqlite";

// const globalForDb = global as unknown as { db: SQLite.SQLiteDatabase };

// const database = SQLite.openDatabase("db.db");

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
}

class DB {
  private db: SQLite.SQLiteDatabase;

  constructor() {
    this.db = SQLite.openDatabase("db.db");
    this.init();
  }

  public async init() {
    const result = await this.executeQueryAsync<User>(
      `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, password TEXT NOT NULL);`
    );
  }

  public async clearDb() {
    const result = await this.executeQueryAsync<User>(
      `DROP TABLE IF EXISTS users;`
    );
  }

  public async insertUser(name: string, email: string, password: string) {
    const result = await this.executeQueryAsync<User>(
      `INSERT INTO users (name, email, password) VALUES (?, ?, ?);`,
      [name, email, password]
    );
    console.log("result", result);
    return result;
  }

  public async getUser(email: string) {
    const result = await this.executeQueryAsync<User>(
      `SELECT * FROM users WHERE email = ?;`,
      [email]
    );
    console.log("result", result);

    return result;
  }

  public async updateUser(id: number, name: string, email: string) {
    const result = await this.executeQueryAsync<User>(
      `UPDATE users SET name = ?, email = ? WHERE id = ?;`,
      [name, email, id]
    );
    return result;
  }

  public async deleteUser(id: number) {
    const result = await this.executeQueryAsync<User>(
      `DELETE FROM users WHERE id = ?;`,
      [id]
    );
    return result;
  }

  public async getAllUsers() {
    const result = await this.executeQueryAsync<User>(`SELECT * FROM users;`);
    return result;
  }

  private async executeQueryAsync<TableType>(
    query: string,
    params: any[] = []
  ): Promise<SQLite.SQLResultSet & { data: TableType[] }> {
    try {
      return await this.executeQuery<TableType>(query, params);
    } catch (e) {
      console.log(e);
      throw new Error("SQL query failed");
    }
  }

  private executeQuery<TableType>(
    query: string,
    params: any[] = []
  ): Promise<SQLite.SQLResultSet & { data: TableType[] }> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          query,
          params,
          (_, obj) => {
            const data = obj.rows._array;

            resolve({ ...obj, data });
          },
          (_, error) => {
            reject(error);
            return true;
          }
        );
      });
    });
  }
}

const globalForDb = global as unknown as { db: DB };

if (!globalForDb.db) {
  console.log("initializing global db");
  globalForDb.db = new DB();
}

export default globalForDb.db;

if (process.env.NODE_ENV !== "production") globalForDb.db = new DB();
