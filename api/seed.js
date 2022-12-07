const neo4j = require("neo4j-driver");
const { faker } = require("@faker-js/faker");
const locations = require("./locations.js");

const driver = neo4j.driver(
  "bolt://0.0.0.0:7687",
  neo4j.auth.basic("neo4j", "newpassword")
);
const session = driver.session();

// const tryout = async () => {
//   const response = await fetch(
//     "https://di-api.drillinginfo.com/v2/direct-access/tokens",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Basic ZGlyZWN0LWFjY2VzczpkaXJlY3QtYWNjZXNz",
//       },
//     }
//   );
//   const data = await response.json();
//   console.log(data);
// };

// const wellCreation = (wells) => {
//   const createWells = [
//     ...Array(wells)
//       .fill(0)
//       .map((well) => ({ name: "", location: "" })),
//   ];
//   createWells.forEach((well) => {
//     const name = faker.name.fullName();
//     const location = faker.address.nearbyGPSCoordinate(
//       [32.05534427756149, -102.20180259815183],
//       1
//     );
//     const wellNumber = faker.random.numeric(2);
//     well["name"] = `${name} ${wellNumber}`;
//     well["location"] = location;
//   });
//   return createWells;
// };

const getWells = (data) => {
  const wells = [];
  data.features.forEach((item) => {
    if (item.properties.type === "oilWell") {
      wells.push(item);
    }
  });
  return wells;
};

const getBatteries = (data) => {
  const batteries = [];
  data.features.forEach((item) => {
    if (item.properties.type === "battery") {
      batteries.push(item);
    }
  });
  return batteries;
};

const getLeases = (data) => {
  const leases = [];
  data.features.forEach((item) => {
    if (item.properties.type === "lease") {
      leases.push(item);
    }
  });
  return leases;
};

const createLeasesFromJson = async (data) => {
  const leases = getLeases(data);
  for (const lease of leases) {
    const { properties, geometry } = lease;
    const { name } = properties;
    const { coordinates } = geometry;

    await session.run(
      "MERGE (w:Lease:OilLease {id: apoc.create.uuid(), name: $name}) \n" +
        "ON CREATE SET \n" +
        "w.coordinates = [coord IN $coords | point({latitude: coord[1], longitude: coord[0]}) ]",
      {
        name,
        coords: coordinates[0],
      }
    );
  }
};

const createBatteriesFromJson = async (data) => {
  const batteries = getBatteries(data);
  for (const battery of batteries) {
    const { properties, geometry } = battery;
    const { name, lease } = properties;
    const latitude = geometry.coordinates[1];
    const longitude = geometry.coordinates[0];
    await session.run(
      "MATCH (l:Lease {name: $lease}) \n" +
        "CREATE (w:CollectionPoint:Battery {id: apoc.create.uuid(), name: $name, location: point({longitude: toFloat($longitude)," +
        " latitude: toFloat($latitude)})}) \n" +
        "WITH w, l \n" +
        "CREATE (l)<-[:LOCATED_ON]-(w)",
      {
        name,
        longitude,
        latitude,
        lease,
      }
    );
  }
};

const createWellsFromJson = async (data) => {
  const wells = getWells(data);
  for (const well of wells) {
    const { properties, geometry } = well;
    const { name, battery, lease } = properties;
    const latitude = geometry.coordinates[1];
    const longitude = geometry.coordinates[0];
    await session.run(
      "CREATE (w:Producer:OilWell {id: apoc.create.uuid(), name: $name, location: point({longitude: toFloat($longitude)," +
        " latitude: toFloat($latitude)})}) \n" +
        "WITH w \n" +
        "MATCH (b:Battery {name: $battery}) \n" +
        "MATCH (l:Lease {name: $lease}) \n" +
        "CREATE (l)<-[:LOCATED_ON]-(w)-[:COLLECTED_BY]->(b)",
      {
        name,
        longitude,
        latitude,
        battery,
        lease,
      }
    );
  }
};

const getPipelines = (data) => {
  const pipelines = [];
  data.features.forEach((item) => {
    if (item.properties.type === "pipeline") {
      pipelines.push(item);
    }
  });
  return pipelines;
};

const createPipelinesFromJson = async (data) => {
  const pipelines = getPipelines(data);
  for (const pipeline of pipelines) {
    const { properties, geometry } = pipeline;
    const { name } = properties;
    const { coordinates } = geometry;
    const startLongitude = coordinates[0][0];
    const startLatitude = coordinates[0][1];
    const endLongitude = coordinates[1][0];
    const endLatitude = coordinates[1][1];
    await session.run(
      "CREATE (w:TransmissionRoute:OilPipeline {id: apoc.create.uuid(), name: $name, start: point({longitude: toFloat($startLongitude)," +
        " latitude: toFloat($startLatitude)}), end: point({longitude: toFloat($endLongitude)," +
        " latitude: toFloat($endLatitude)})})",
      {
        name,
        startLatitude,
        startLongitude,
        endLatitude,
        endLongitude,
      }
    );
  }
};

const getPipeLineStation = (data) => {
  const stations = [];
  data.features.forEach((item) => {
    if (item.properties.type === "pipelineStation") {
      stations.push(item);
    }
  });
  return stations;
};

const createPipelineStationsFromJson = async (data) => {
  const stations = getPipeLineStation(data);
  for (const station of stations) {
    const { properties, geometry } = station;
    const { name, pipeLineName } = properties;
    const latitude = geometry.coordinates[1];
    const longitude = geometry.coordinates[0];
    await session.run(
      "CREATE (w:CollectionPoint:PipelineStation {id: apoc.create.uuid(), name: $name, location: point({longitude: toFloat($longitude)," +
        " latitude: toFloat($latitude)})}) \n" +
        "WITH w \n" +
        "MATCH (p:OilPipeline {name: $pipeLineName}) \n" +
        "MATCH (b:Battery) \n" +
        "MERGE (p)<-[:TRANSMITTED_BY]-(w) \n" +
        "MERGE (w)<-[:COLLECTED_BY]-(b)",
      {
        name,
        longitude,
        latitude,
        pipeLineName,
      }
    );
  }
};

const getSWD = (data) => {
  const swd = [];
  data.features.forEach((item) => {
    if (item.properties.type === "SWD") {
      swd.push(item);
    }
  });
  return swd;
};

const createSWDFromJson = async (data) => {
  const swd = getSWD(data);
  for (const station of swd) {
    const { properties, geometry } = station;
    const { name, lease } = properties;
    const latitude = geometry.coordinates[1];
    const longitude = geometry.coordinates[0];
    await session.run(
      "CREATE (w:CollectionPoint:SWD {id: apoc.create.uuid(), name: $name, location: point({longitude: toFloat($longitude)," +
        " latitude: toFloat($latitude)})}) \n" +
        "WITH w \n" +
        "MATCH (l:Lease {name: $lease}) \n" +
        "MATCH (l)<-[:LOCATED_ON]-(b:Battery) \n" +
        "CREATE (l)<-[:LOCATED_ON]-(w) \n" +
        "MERGE (w)<-[:COLLECTED_BY]-(b)",
      {
        name,
        longitude,
        latitude,
        lease,
      }
    );
  }
};

const leaseCreation = (leases) => {
  const createLeases = [
    ...Array(leases)
      .fill(0)
      .map((lease) => ({ name: "", location: "" })),
  ];
  createLeases.forEach((lease) => {
    const name = faker.name.fullName();
    const location = faker.address.nearbyGPSCoordinate([
      32.05534427756149, -102.20180259815183,
    ]);
    lease["name"] = `${name}`;
    lease["location"] = location;
  });
  return createLeases;
};

batteryCreation = (batteries) => {
  const createBatteries = [
    ...Array(batteries)
      .fill(0)
      .map((battery) => ({ name: "", location: "" })),
  ];
  createBatteries.forEach((battery) => {
    const name = faker.name.fullName();
    const location = faker.address.nearbyGPSCoordinate(
      [32.05534427756149, -102.20180259815183],
      2
    );
    const batteryNumber = faker.random.numeric(2);
    battery["name"] = `${name} ${batteryNumber}`;
    battery["location"] = location;
  });
  return createBatteries;
};

const leases = async (leases) => {
  const leaseArray = leaseCreation(leases);
  await session.run(
    "UNWIND $leaseArray AS lease CREATE" +
      "(l:Lease:OilLease {id: apoc.create.uuid(), name: lease.name, location: point({longitude: toFloat(lease.location[1])," +
      " latitude: toFloat(lease.location[0])})})",
    { leaseArray }
  );
};

const batteries = async (batteries) => {
  const batteryArray = batteryCreation(batteries);
  await session.run(
    "UNWIND $batteryArray AS battery CREATE" +
      "(b:CollectionPoint:Battery {id: apoc.create.uuid(), name: battery.name, location: point({longitude: toFloat(battery.location[1])," +
      " latitude: toFloat(battery.location[0])})})",
    { batteryArray }
  );
};

const basins = async () => {
  await session.run(
    'CREATE (b:Basin {name: "Permian", id: apoc.create.uuid()})' +
      'CREATE (b1:Basin {name: "Midland", id: apoc.create.uuid()})'
  );
};

const wells = async (wells) => {
  const wellArray = wellCreation(wells);
  await session.run(
    "UNWIND $wellArray AS well CREATE" +
      "(w:Producer:OilWell {id: apoc.create.uuid(), name: well.name, location: point({longitude: toFloat(well.location[1])," +
      " latitude: toFloat(well.location[0])})})",
    { wellArray }
  );
};

const wellSensors = async () => {
  await session.run(
    "match(n:Producer:OilWell)\n" +
      'CREATE (s:Sensor:FlowSensor {type: "FLOW_SENSOR", id: apoc.create.uuid()})\n' +
      'CREATE (s1:Sensor:PressureSensor {type: "PRESSURE_SENSOR", id: apoc.create.uuid()})\n' +
      'CREATE (s2:Sensor:PumpOffControl {type: "PUMP_OFF_CONTROL", id: apoc.create.uuid()})\n' +
      "CREATE (n)-[r1:MONITORED_BY]->(s)\n" +
      "CREATE (n)-[r2:MONITORED_BY]->(s1)\n" +
      "CREATE (n)-[r:MONITORED_BY]->(s2)"
  );
};

const addLease = async (leaseId, wellIds) => {
  await session.run(
    "unwind $wellIds as wellId\n" +
      "match(n:Producer:OilWell {id: wellId})\n" +
      "match(l:Lease {id: $leaseId})\n" +
      "CREATE (n)-[r:LOCATED_ON]->(l)",
    { leaseId, wellIds }
  );
};

const allWellIds = async () => {
  const wells = await session.run("match(n:Producer:OilWell) return n");
  return wells.records.map((well) => well._fields[0].properties.id);
};

const allLeaseIds = async () => {
  const leases = await session.run("match(n:Lease) return n");
  return leases.records.map((lease) => lease._fields[0].properties.id);
};

const allBasinIds = async () => {
  const basins = await session.run("match(n:Basin) return n");
  return basins.records.map((basin) => basin._fields[0].properties.id);
};

const allBatteryIds = async () => {
  const batteries = await session.run(
    "match(n:CollectionPoint:Battery) return n"
  );
  return batteries.records.map((battery) => battery._fields[0].properties.id);
};

const addLeaseToWell = async (leaseIds) => {
  const wellIds = await allWellIds();
  for (const lease of leaseIds) {
    const wells = wellIds.slice(0, 10);
    for (let i = 0; i < 10; i++) {
      wellIds.shift();
    }
    await addLease(lease, wells);
  }
};

const addBasinToWell = async (basinIds) => {
  const wellIds = await allWellIds();
  for (const basin of basinIds) {
    const wells = wellIds.slice(0, 25);
    for (let i = 0; i < 25; i++) {
      wellIds.shift();
    }
    await addBasin(basin, wells);
  }
};

const addBattery = async (batteryId, wellIds) => {
  await session.run(
    "unwind $wellIds as wellId\n" +
      "match(n:Producer:OilWell {id: wellId})\n" +
      "match(b:CollectionPoint:Battery {id: $batteryId})\n" +
      "CREATE (n)-[r:COLLECTED_BY]->(b)",
    { batteryId, wellIds }
  );
};

const addBatteryToWell = async (batteryIds) => {
  const wellIds = await allWellIds();
  for (const battery of batteryIds) {
    const wells = wellIds.slice(0, 10);
    for (let i = 0; i < 10; i++) {
      wellIds.shift();
    }
    await addBattery(battery, wells);
  }
};

const addBasin = async (basinId, wellIds) => {
  await session.run(
    "unwind $wellIds as wellId\n" +
      "match(n:Producer:OilWell {id: wellId})\n" +
      "match(b:Basin {id: $basinId})\n" +
      "CREATE (n)-[r:LOCATED_IN]->(b)",
    { basinId, wellIds }
  );
};

const addConstraints = async () => {
  await session.run(
    "CREATE CONSTRAINT FOR (w:Producer) REQUIRE w.id IS UNIQUE"
  );
  await session.run("CREATE CONSTRAINT FOR (s:Sensor) REQUIRE s.id IS UNIQUE");
  await session.run("CREATE CONSTRAINT FOR (l:Lease) REQUIRE l.id IS UNIQUE");
  await session.run("CREATE CONSTRAINT FOR (b:Basin) REQUIRE b.id IS UNIQUE");
  await session.run(
    "CREATE CONSTRAINT FOR (b:CollectionPoint:Battery) REQUIRE b.id IS UNIQUE"
  );
};

const batteryVesselsAndEquipment = async () => {
  await session.run(
    "MATCH (n:CollectionPoint:Battery)\n" +
      'CREATE (v:Vessel:FreeWaterKnockOut {type: "FREE_WATER_KNOCKOUT", id: apoc.create.uuid()})\n' +
      'CREATE (v1:Vessel:HeaterTreater {type: "HEATER_TREATER", id: apoc.create.uuid()})\n' +
      'CREATE (v2:Vessel:OilTank {type: "OIL_TANK", id: apoc.create.uuid()})\n' +
      'CREATE (v3:Vessel:WaterTank {type: "WATER_TANK", id: apoc.create.uuid()})\n' +
      'CREATE (e:Equipment:GasCompressor {type: "GAS_COMPRESSOR", id: apoc.create.uuid()})\n' +
      'CREATE (e1:Equipment:LACT {type: "LACT", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:CONNECTED_TO]->(v1)\n" +
      "CREATE (v)-[:CONNECTED_TO]->(v3)\n" +
      "CREATE (v)-[:CONNECTED_TO]->(e)\n" +
      "CREATE (v1)-[:CONNECTED_TO]->(v2)\n" +
      "CREATE (v1)-[:CONNECTED_TO]->(v3)\n" +
      "CREATE (n)<-[:LOCATED_AT]-(v)\n" +
      "CREATE (n)<-[:LOCATED_AT]-(v1)\n" +
      "CREATE (n)<-[:LOCATED_AT]-(v2)\n" +
      "CREATE (n)<-[:LOCATED_AT]-(v3)\n" +
      "CREATE (n)<-[:LOCATED_AT]-(e) \n" +
      "CREATE (n)<-[:LOCATED_AT]-(e1)"
  );
};

const addSensorsToVesselsAndEquipment = async () => {
  await session.run(
    "MATCH (v:Vessel:OilTank)\n" +
      'CREATE (s1:Sensor:Temperature {type: "TEMPERATURE", id: apoc.create.uuid()})\n' +
      'CREATE (s2:Sensor:Level {type: "LEVEL", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:MONITORED_BY]->(s1)\n" +
      "CREATE (v)-[:MONITORED_BY]->(s2)"
  );

  await session.run(
    "MATCH (v:Vessel:WaterTank)\n" +
      'CREATE (s:Sensor:Level {type: "LEVEL", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:MONITORED_BY]->(s)"
  );

  await session.run(
    "MATCH (v:Vessel:FreeWaterKnockOut)\n" +
      'CREATE (s:Sensor:Level {type: "LEVEL", id: apoc.create.uuid()})\n' +
      'CREATE (s1:Sensor:Temperature {type: "TEMPERATURE", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:MONITORED_BY]->(s)\n" +
      "CREATE (v)-[:MONITORED_BY]->(s1)"
  );

  await session.run(
    "MATCH (v:Vessel:HeaterTreater)\n" +
      'CREATE (s:Sensor:Level {type: "LEVEL", id: apoc.create.uuid()})\n' +
      'CREATE (s1:Sensor:Temperature {type: "TEMPERATURE", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:MONITORED_BY]->(s)\n" +
      "CREATE (v)-[:MONITORED_BY]->(s1)"
  );

  await session.run(
    "MATCH (e:Equipment:GasCompressor)\n" +
      'CREATE (s:Sensor:Pressure {type: "PRESSURE", id: apoc.create.uuid()})\n' +
      'CREATE (s1:Sensor:Temperature {type: "TEMPERATURE", id: apoc.create.uuid()})\n' +
      "CREATE (e)-[:MONITORED_BY]->(s)\n" +
      "CREATE (e)-[:MONITORED_BY]->(s1)"
  );

  await session.run(
    "MATCH (e:Equipment:LACT)\n" +
      'CREATE (s:Sensor:Pressure {type: "PRESSURE", id: apoc.create.uuid()})\n' +
      'CREATE (s1:Sensor:Temperature {type: "TEMPERATURE", id: apoc.create.uuid()})\n' +
      'CREATE (s2:Sensor:FlowMeter {type: "FLOWMETER", id: apoc.create.uuid()})\n' +
      'CREATE (s3:Model {type: "LACT_MODEL", id: apoc.create.uuid()})\n' +
      "CREATE (e)-[:MONITORED_BY]->(s)\n" +
      "CREATE (e)-[:MONITORED_BY]->(s1)\n" +
      "CREATE (e)-[:MONITORED_BY]->(s2)\n" +
      "CREATE (e)-[:HAS_MODEL]->(s3)"
  );
};

const addModelNodes = async () => {
  await session.run(
    "MATCH(v:Vessel:OilTank)\n" +
      'CREATE (m:Model:OilTankModel {type: "OIL_TANK_MODEL", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:MODEL_OF]->(m)"
  );

  await session.run(
    "MATCH(v:Vessel:WaterTank)\n" +
      'CREATE (m:Model:WaterTankModel {type: "WATER_TANK_MODEL", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:MODEL_OF]->(m)"
  );

  await session.run(
    "MATCH(v:Vessel:FreeWaterKnockOut)\n" +
      'CREATE (m:Model:FreeWaterKnockOutModel {type: "FREE_WATER_KNOCK_OUT_MODEL", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:MODEL_OF]->(m)"
  );

  await session.run(
    "MATCH(v:Vessel:HeaterTreater)\n" +
      'CREATE (m:Model:HeaterTreaterModel {type: "HEATER_TREATER_MODEL", id: apoc.create.uuid()})\n' +
      "CREATE (v)-[:MODEL_OF]->(m)"
  );

  await session.run(
    "MATCH(e:Equipment:GasCompressor)\n" +
      'CREATE (m:Model:GasCompressorModel {type: "GAS_COMPRESSOR_MODEL", id: apoc.create.uuid()})\n' +
      "CREATE (e)-[:MODEL_OF]->(m)"
  );
};

const addBatteryToLease = async (batteryIds, leaseIds) => {
  let index = 0;
  for (const battery of batteryIds) {
    await session.run(
      "MATCH (b:Battery {id: $id})\n" +
        "MATCH (l:Lease {id: $leaseId})\n" +
        "CREATE (b)-[:LOCATED_ON]->(l)",
      { id: battery, leaseId: leaseIds[index] }
    );
    index += 1;
  }
};

const addLeaseOperators = async () => {
  const leaseIds = await allLeaseIds();
  for (const leaseId of leaseIds) {
    await session.run(
      "CREATE (o:ServiceProvider:LeaseOperator {id: apoc.create.uuid(), name: $name, type:'LEASE_OPERATOR'}) \n" +
        "WITH o\n" +
        "MATCH (l:OilLease {id: $id})<-[:LOCATED_ON]-(w:OilWell)-[:COLLECTED_BY]->(b:Battery)\n" +
        "WITH o, w, b, l\n" +
        "CREATE (w)-[:SERVICED_BY]->(o)\n" +
        "MERGE (b)-[:SERVICED_BY]->(o)\n" +
        "MERGE (l)-[:SERVICED_BY]->(o)",

      { id: leaseId, name: faker.name.fullName() }
    );
  }
};

const allEquipmentIds = async () => {
  const result = await session.run("MATCH (e:Equipment) RETURN e.id AS id");
  return result.records.map((r) => r.get("id"));
};

const allOilWellIds = async () => {
  const result = await session.run("MATCH (w:OilWell) RETURN w.id AS id");
  return result.records.map((r) => r.get("id"));
};

const addEquipmentServiceProvider = async () => {
  const equipmentIds = await allEquipmentIds();
  for (const equipmentId of equipmentIds) {
    await session.run(
      "CREATE (o:ServiceProvider:EquipmentServiceProvider {id: apoc.create.uuid(), companyName: $name, type:'EQUIPMENT_SERVICE_PROVIDER'}) \n" +
        "WITH o\n" +
        "MATCH (e:Equipment {id: $id})\n" +
        "CREATE (e)-[:SERVICED_BY]->(o)",
      { id: equipmentId, name: faker.company.name() }
    );
  }
};

const createBatteryAlerts = async () => {
  const batteries = await allBatteryIds();
  for (const battery of batteries.slice(1, 2)) {
    await session.run(
      "MATCH (b:Battery {id: $id})<-[:LOCATED_AT]-(v:OilTank)\n" +
        "CREATE (a:Alert:HighLevel {id: apoc.create.uuid(), type: 'HIGH_LEVEL', status: 'ACTIVE'})\n" +
        "CREATE (b)-[:HAS_ALERT]->(a)<-[:HAS_ALERT]-(v)",
      { id: battery }
    );
  }

  for (const battery of batteries.slice(2, 5)) {
    for (let i = 0; i < faker.datatype.number({ min: 1, max: 3 }); i++) {
      await session.run(
        "MATCH (b:Battery {id: $id})<-[:LOCATED_AT]-(v:WaterTank)\n" +
          "CREATE (a:Alert:HighLevel {id: apoc.create.uuid(), type: 'HIGH_LEVEL', status: 'ACTIVE'})\n" +
          "CREATE (b)-[:HAS_ALERT]->(a)<-[:HAS_ALERT]-(v)",
        { id: battery }
      );
    }
  }

  for (const battery of batteries.slice(0, 1)) {
    for (let i = 0; i < faker.datatype.number({ min: 5, max: 10 }); i++) {
      await session.run(
        "MATCH (b:Battery {id: $id})<-[:LOCATED_AT]-(e:LACT)\n" +
          "CREATE (a:Alert:HighLevel {id: apoc.create.uuid(), type: 'BSW', status: 'INACTIVE'})\n" +
          "CREATE (b)-[:HAS_ALERT]->(a)<-[:HAS_ALERT]-(e)",
        { id: battery }
      );
    }
  }
};

// Create a maintenance Record for each piece of equipment and each OilWell that has the properties: id, type, and description
// types being one of "Periodic", "Corrective", "Preventative", "Inspection", "Calibration", "Training", "Other"
// with a date of when the maintenance was performed

const createMaintenanceRecords = async () => {
  const equipmentIds = await allEquipmentIds();
  const types = ["Periodic Maintenance", "Corrective", "Inspection"];
  for (const equipmentId of equipmentIds) {
    for (let i = 0; i < faker.datatype.number({ min: 1, max: 3 }); i++) {
      await session.run(
        "MATCH (e:Equipment {id: $id})\n" +
          "CREATE (m:MaintenanceRecord {id: apoc.create.uuid(), type: $type, description: $description, date: $date, downTime: $downTime})\n" +
          "CREATE (e)-[:HAS_MAINTENANCE_RECORD]->(m)",
        {
          id: equipmentId,
          type: types[faker.datatype.number({ min: 0, max: types.length - 1 })],
          description: faker.lorem.sentence(),
          date: faker.date.past().toLocaleDateString(),
          downTime: faker.datatype.number({ min: 10, max: 30 }),
        }
      );
    }
  }
  const oilWellIds = await allOilWellIds();
  for (const oilWellId of oilWellIds) {
    for (let i = 0; i < faker.datatype.number({ min: 1, max: 3 }); i++) {
      await session.run(
        "MATCH (w:OilWell {id: $id})\n" +
          "CREATE (m:MaintenanceRecord {id: apoc.create.uuid(), type: $type, description: $description, date: $date, downTime: $downTime})\n" +
          "CREATE (w)-[:HAS_MAINTENANCE_RECORD]->(m)",
        {
          id: oilWellId,
          type: types[faker.datatype.number({ min: 0, max: types.length - 1 })],
          description: faker.lorem.sentence(),
          date: faker.date.past().toLocaleDateString(),
          downTime: faker.datatype.number({ min: 10, max: 30 }),
        }
      );
    }
  }
};

try {
  const setup = async () => {
    await createLeasesFromJson(locations);
    await createBatteriesFromJson(locations);
    await createWellsFromJson(locations);
    await createPipelinesFromJson(locations);
    await createPipelineStationsFromJson(locations);
    await createSWDFromJson(locations);
    await batteryVesselsAndEquipment();
    await wellSensors();
    await addSensorsToVesselsAndEquipment();
    await addModelNodes();
    await addLeaseOperators();
    await addEquipmentServiceProvider();
    await createBatteryAlerts();
    await createMaintenanceRecords();
    await session.close();
    await driver.close();
    // tryout();
  };

  setup();
} catch (error) {
  console.log(error);
}
// } finally {
//   // on application exit:
//   const close = async () => {
//     await session.close();
//     await driver.close();
//   };
//   close();
// }
