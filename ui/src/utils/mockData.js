import { faker } from "@faker-js/faker";

const randomNumber = (low, high) =>
  faker.datatype.number({ min: low, max: high });

const randomData = () => {
  const data = [];
  for (let i = 0; i <= 120; i++) {
    const oilAmount = randomNumber(50, 150);
    const date = faker.date
      .between("2021-01-01T00:00:00.000Z", "2021-12-31T00:00:00.000Z")
      .toLocaleDateString();
    const waterAmount = randomNumber(45, 70);
    const gasAmount = randomNumber(10, 50);
    data.push({ date, amount: oilAmount, type: "oil" });
    data.push({ date, amount: waterAmount, type: "water" });
    data.push({ date, amount: gasAmount, type: "gas" });
  }
  return data.sort((a, b) => new Date(a.date) - new Date(b.date));
};

// takes an array of objects and sorts them into months by production type and sums the production by month
const sortProductionDataByMonth = (data) => {
  const sortedData = {};
  data.forEach((item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString("default", { month: "long" });
    if (!sortedData[month]) {
      sortedData[month] = { oil: 0, water: 0, gas: 0 };
    }
    sortedData[month][item.type] += item.amount;
  });
  return sortedData;
};

// take random data and return two days from each month
const getProductionDataByDay = (data) => {
  const sortedData = {};
  data.forEach((item) => {
    const date = new Date(item.date);
    const month = date.toLocaleString("default", { month: "long" });
    const day = date.getDate();
    if (!sortedData[month]) {
      sortedData[month] = {};
    }
    if (!sortedData[month][day]) {
      sortedData[month][day] = { oil: 0, water: 0, gas: 0 };
    }
    sortedData[month][day][item.type] += item.amount;
  });
  return sortedData;
};

const wellTestData = () => {
  const data = {
    oil: [],
    water: [],
    gas: [],
  };
  for (let i = 1; i <= 12; i++) {
    let date = "";
    if (i < 10) {
      date = faker.date
        .between(`2021-0${i}-01T00:00:00.000Z`, `2021-0${i}-31T00:00:00.000Z`)
        .toLocaleDateString();
    } else {
      date = faker.date
        .between(`2021-${i}-01T00:00:00.000Z`, `2021-${i}-31T00:00:00.000Z`)
        .toLocaleDateString();
    }
    const oilAmount = randomNumber(5, 15);
    const waterAmount = randomNumber(4, 7);
    const gasAmount = randomNumber(15, 50);
    data.oil.push({ date, amount: oilAmount, type: "oil" });
    data.water.push({ date, amount: waterAmount, type: "water" });
    data.gas.push({ date, amount: gasAmount, type: "gas" });
  }
  return {
    ...data,
    oil: data.oil.sort((a, b) => new Date(a.date) - new Date(b.date)),
    water: data.water.sort((a, b) => new Date(a.date) - new Date(b.date)),
    gas: data.gas.sort((a, b) => new Date(a.date) - new Date(b.date)),
  };
};

const pressureSensorData = (adjustment = 0) => {
  let low = 40;
  low += adjustment;
  let high = 50;
  high += adjustment;
  return randomNumber(low, high);
};

// create an array of random numbers between 5 and 30 with a length provided
const randomArray = (len) => {
  const array = [];
  for (let i = 0; i < len; i++) {
    array.push(randomNumber(5, 15));
  }
  return array;
};

// create an array of objects containing keys date and runTime. Create one object for each day in the current month
// formated as "YYYY-MM-DD"
const runTimeData = () => {
  const data = [];
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const daysInMonth = new Date(year, month, 0).getDate();
  for (let i = 1; i <= daysInMonth; i++) {
    let day = i;
    if (i < 10) {
      day = `0${i}`;
    }
    data.push({
      date: `${year}-${month}-${day}`,
      runTime: randomNumber(5, 33),
    });
  }
  return data;
};

export {
  randomData,
  sortProductionDataByMonth,
  getProductionDataByDay,
  wellTestData,
  pressureSensorData,
  randomNumber,
  randomArray,
  runTimeData,
};
