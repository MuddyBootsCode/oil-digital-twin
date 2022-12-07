import React, { useEffect, useState } from "react";
import { pressureSensorData } from "../utils/mockData";
import { faker } from "@faker-js/faker";

const Sensor = ({ type }) => {
  const [pressureReading, setPressureReading] = useState(0);
  const [temperatureReading, setTemperatureReading] = useState(0);
  const [levelReading, setLevelReading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPressureReading(pressureSensorData(parseInt(faker.random.numeric())));
      setTemperatureReading(faker.datatype.number({ min: 90, max: 95 }));
      setLevelReading(faker.datatype.number({ min: 50, max: 100 }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  if (type === "PRESSURE") {
    return <div> Pressure: {pressureReading}</div>;
  } else if (type === "TEMPERATURE") {
    return <div> Temperature: {temperatureReading}</div>;
  } else if (type === "LEVEL") {
    return <div> Level: {levelReading}</div>;
  } else if (type === "FLOWMETER") {
    return <div>Flow: {temperatureReading}</div>;
  }
};

export default Sensor;
