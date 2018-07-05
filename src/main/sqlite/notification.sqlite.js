import { SQLite } from 'expo';

const FIRST_INDEX = 0;

const database = SQLite.openDatabase('habit');

export const createNotificationTable = () => {
  database.transaction(tx => {
    tx.executeSql(
      'create table if not exists notification (id int primary key not null, habitId text, time text)'
      // 'drop table notification'
    );
  });
};

export const addNotification = (id, habitId, time) => {
  database.transaction(tx => {
    tx.executeSql(
      'insert into notification (id, habitId, time) values (?, ?, ?)',
      [id, habitId, time]
    );
  });
};

export const getNotificationId = (habitId, time, callback = () => {}) => {
  database.transaction(tx => {
    tx.executeSql(
      'select id from notification where habitId = ? and time = ?',
      [habitId, time],
      (_, { rows: { _array } }) => {
        if (_array.length) {
          return callback(_array[FIRST_INDEX].id);
        }
        callback(null);
      }
    );
  });
};

export const getNotification = (id, callback = () => {}) => {
  database.transaction(tx => {
    tx.executeSql(
      // 'select * from notification',
      'select * from notification where id = ?',
      // [],
      [id],
      (_, { rows: { _array } }) => {
        if (_array.length) {
          return callback(_array[FIRST_INDEX]);
        }
        callback(null);
      }
    );
  });
};

export const logAllNotification = () => {
  database.transaction(tx => {
    tx.executeSql(
      'select * from notification',
      [],
      (_, { rows: { _array } }) => {
        console.log(_array);
      }
    );
  });
};

export const deleteNotificationById = id => {
  database.transaction(tx => {
    tx.executeSql(
      'delete from notification where id = ?',
      [id]
    );
  });
};

export const deleteNotificationByHabitId = habitId => {
  database.transaction(tx => {
    tx.executeSql(
      'delete from notification where habitId = ?',
      [habitId]
    );
  });
};

export const deleteNotificationByHabitIdAndTime = (habitId, time) => {
  database.transaction(tx => {
    tx.executeSql(
      'delete from notification where habitId = ? and time = ?',
      [habitId, time]
    );
  });
};
