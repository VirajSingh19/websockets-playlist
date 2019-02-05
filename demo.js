
const sqlite3 = require('sqlite3');

  const db = new sqlite3.Database('./db.sqlite', (err) => {
      if (err) {
        console.log('Could not connect to database', err)
      } else {
        console.log('Connected to database')
      }
    })

    let s = 'Mayank';
    let r = 'Rishabh';

    db.all(`select * from message where sender = ? and receiver = ? or sender = ? and receiver = ? order by mid asc`,[s,r,r,s] ,(err, result) => {  
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      });