import axios from "axios";


const URL = "https://e261-103-182-81-19.ngrok-free.app/api/v1/";

/* const URL = "https://127.0.0.1:3000/api/v1/";
 */
const HEADERS = {
  // Overwrite Axios's automatically set Content-Type
  "Content-Type": 'application/json',
  Accept: 'application/json',
};
export async function storeExpense(expenseData) {
/*   const serializedData = JSON.stringify(expenseData);
 */  const headers = {
    // Overwrite Axios's automatically set Content-Type
    "Content-Type": 'application/json',
    "Accept": '*/*',
  }

  const response = await axios.post(
    `${URL}/expenses`,
    { "expense": expenseData, },
    { headers: HEADERS },
  ).then(res => {
    return res
  })
  .catch(error => console.log("error", error));
  const id = response.data.id;
  return id;
};

export async function getExpenses() {

  const response =  await axios.get(`${URL}expenses`, {headers : HEADERS}).then(res => {
    return res
  }).catch(error => console.log("error", error));

  console.log("fetch response", response);
  const expenses = [];

  /* there is a data key in the response, because default in axios */
  for (const key in response.data) {
    const expenseObj = {
      id: response.data[key].id,
      amount: response.data[key].amount,
      date: new Date (response.data[key].date),
      title: response.data[key].title,
    }
    expenses.push(expenseObj);
  };

  return expenses;

};

export async function updateExpense(id, expenseData) {
  return axios.put(`${URL}/expenses/${id}`, expenseData, {headers : HEADERS}).catch(error => console.log("error", error));
};
export async function deleteExpense(id) {
  return axios.delete(`${URL}/expenses/${id}`, {headers : HEADERS}).catch(error => console.log("error", error));
};

/* const postResponse = await axios.post(
    "http://localhost:3000/api/v1/expenses",
    {
      "expense": {
          "title": "1",
          "amount": "99",
          "date": "2023-01-01"
      },
    },
    {
      headers: HEADERS
    },
  ).then(res => {
    console.log("res", res);
    console.log(res.data)
  })
  .catch(error => console.log("error", error));
  console.log("postResponse", postResponse); */

  /* const get = {
    method: "GET",
    headers: HEADERS,
  };
  async function getResponse() {
    const response = await fetch(`${URL}expenses`, get).then(res => {
      return res.json();
    }).catch(error => console.log("error", error));
    console.log("response", response);
  };

    getResponse();

  */
