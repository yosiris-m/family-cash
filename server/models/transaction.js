const { client } = require("../db");

exports.create = ({ amount, date, categoryId }) => {
  const text =
    "INSERT INTO transactions(amount, date, fk_category_id) VALUES($1, $2, $3) RETURNING *";
  const values = [amount, date, categoryId];

  console.log("Creating a new transaction...");

  return client.query(text, values).then((res) => {
    console.log("Transaction created correctly");
    const createdTransaction = res.rows[0];
    return createdTransaction;
  });
};

exports.find = ({ from, to }) => {
  const text = `
SELECT tran.id, date, amount, cat.label AS category
FROM transactions AS tran
INNER JOIN categories AS cat ON tran.fk_category_id = cat.id
WHERE date BETWEEN $1 AND $2
ORDER BY tran.date DESC
`;
  const values = [from, to];
  console.log("Finding transactions...");
  console.log("values", values);

  return client.query(text, values).then((res) => {
    return res.rows;
  });
};