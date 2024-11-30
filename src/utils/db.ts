import SQLite from 'react-native-sqlite-storage';
import uuid from 'react-native-uuid';

const db = SQLite.openDatabase(
  {name: 'notes.db', location: 'default'},
  () => console.log('Database opened successfully'),
  error => console.error('Failed to open database:', error),
);

export const initDatabase = async () => {
  const dbInstance = await db;
  return new Promise<void>((resolve, reject) => {
    dbInstance.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS history (
          id TEXT PRIMARY KEY NOT NULL,
          location TEXT NOT NULL,
          date TEXT NOT NULL,
          notes TEXT NOT NULL
        );`,
        [],
        () => {
          console.log('Database initialized successfully');
          resolve();
        },
        (_, error) => {
          console.error('Error creating table:', error);
          reject(error);
        },
      );
    });
  });
};

// export const saveNoteToDb = async (
//   id: string,
//   location: string,
//   date: string,
//   notes: string,
// ) => {
//   console.log('Attempting to save:', {id, location, date, notes});

//   await initDatabase();

//   return new Promise<void>((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'INSERT INTO history (id, location, date, notes) VALUES (?, ?, ?, ?)',
//         [id, location, date, notes],
//         () => {
//           console.log('Data inserted successfully');
//           resolve();
//         },
//         (_, error) => {
//           console.error('SQL Execution Error:', error);
//           reject(error);
//         },
//       );
//     });
//   });
// };

export const saveNoteToDb = async (
  id: string,
  location: string,
  date: string,
  notes: string,
) => {
  console.log('Attempting to save or update:', {id, location, date, notes});

  await initDatabase();

  return new Promise<void>((resolve, reject) => {
    db.transaction(tx => {
      // First, check if the record already exists
      tx.executeSql(
        'SELECT * FROM history WHERE id = ?',
        [id],
        (_, results) => {
          if (results.rows.length > 0) {
            // If record exists, update it
            tx.executeSql(
              'UPDATE history SET location = ?, date = ?, notes = ? WHERE id = ?',
              [location, date, notes, id],
              () => {
                console.log('Data updated successfully');
                resolve();
              },
              (_, error) => {
                console.error('SQL Execution Error during update:', error);
                reject(error);
              },
            );
          } else {
            // If record does not exist, insert a new one
            tx.executeSql(
              'INSERT INTO history (id, location, date, notes) VALUES (?, ?, ?, ?)',
              [id, location, date, notes],
              () => {
                console.log('Data inserted successfully');
                resolve();
              },
              (_, error) => {
                console.error('SQL Execution Error during insert:', error);
                reject(error);
              },
            );
          }
        },
        (_, error) => {
          console.error('SQL Execution Error during SELECT:', error);
          reject(error);
        },
      );
    });
  });
};
export const fetchHistoryFromDb = async () => {
  return new Promise<any[]>(async (resolve, reject) => {
    const dbInstance = await db;
    dbInstance.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM history',
        [],
        (_, results) => {
          const rows = results.rows;
          const data: any[] = [];
          for (let i = 0; i < rows.length; i++) {
            data.push(rows.item(i));
          }
          resolve(data);
        },
        (_, error) => reject(error),
      );
    });
  });
};

export const deleteHistoryItemFromDb = (id: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM history WHERE id = ?',
        [id],
        () => resolve(),
        error => reject(error),
      );
    });
  });
};
