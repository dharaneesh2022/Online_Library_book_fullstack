import { db } from '../config/db';

export const createUser = (name: string) => {
  return new Promise((resolve, reject) => {
    db.query('INSERT INTO users (name) VALUES (?)', [name], (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

export const getUsers = () => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM users', (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};
