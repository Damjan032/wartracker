import MilitaryLeader from "./MilitaryLeader";
import War from "./War";
import Battle from "./Battle";
import MilitaryLeaderBattle from "./MiltaryLeaderBattle";
import Map from "./Map";
import MilitaryLeaderMapPosition from "./MilitaryLeaderMapPosition";

export default async () => {
  const { id: warId1 } = await War.create({ name: "Krstaški ratovi" });
  const { id: warId2 } = await War.create({ name: "Stogodišnji rat" });
  await War.create({ name: "Husitski ratovi" });
  await War.create({ name: "Trinaestogodišnji rat" });
  await War.create({ name: "Ratovi ruža" });
  await War.create({ name: "Napoleonovi ratovi" });
  await War.create({ name: "Srpsko-turski ratovi" });
  await War.create({ name: "Prvi srpski ustanak" });
  await War.create({ name: "Drugi srpski ustanak" });
  await War.create({ name: "Rusko-turski rat" });
  await War.create({ name: "Prvi balkanski rat" });
  await War.create({ name: "Drugi balkanski rat" });
  await War.create({ name: "Prvi svetski rat" });
  await War.create({ name: "Ruski građanski rat" });
  await War.create({ name: "Grčko-turski rat" });
  await War.create({ name: "Drugi svetski rat" });

  const { id: mapId1 } = await Map.create({ name: "map1" });
  const { id: mapId2 } = await Map.create({ name: "map2" });
  const { id: mapId3 } = await Map.create({ name: "map3" });
  const { id: mapId4 } = await Map.create({ name: "map4" });

  const { id: militaryLeaderId1 } = await MilitaryLeader.create({
    firstName: "tupan",
    lastName: "glupan",
    dateOfBirth: Date.now(),
    birthPlace: "TUtin",
    militaryRank: "debilcina",
    school: "gimnazija",
  });

  const { id: militaryLeaderId2 } = await MilitaryLeader.create({
    firstName: "majmuncina",
    lastName: "glupa",
    dateOfBirth: Date.now(),
    birthPlace: "jebemliga odakle je",
    militaryRank: "peder",
    school: "ftn",
  });

  const { id: battleId1 } = await Battle.create({
    warId: warId1,
    name: "Neka bitka boli me kurac koja",
    date: Date.now(),
    place: "tamo negde",
  });

  const { id: battleId2 } = await Battle.create({
    warId: warId1,
    name: "Jos tamo neka bitka boli me kurac koja",
    date: Date.now(),
    place: "tamo negde",
  });

  const { id: battleId3 } = await Battle.create({
    warId: warId2,
    name: "a;slfjasdf",
    date: Date.now(),
    place: "tamo negde",
  });

  const { id: battleId4 } = await Battle.create({
    warId: warId2,
    name: "adsfadsfd",
    date: Date.now(),
    place: "tamo negde",
  });

  await MilitaryLeaderBattle.create({
    militaryLeaderId: militaryLeaderId1,
    battleId: battleId1,
  });

  await MilitaryLeaderBattle.create({
    militaryLeaderId: militaryLeaderId1,
    battleId: battleId2,
  });

  await MilitaryLeaderBattle.create({
    militaryLeaderId: militaryLeaderId1,
    battleId: battleId3,
  });

  await MilitaryLeaderBattle.create({
    militaryLeaderId: militaryLeaderId2,
    battleId: battleId1,
  });

  await MilitaryLeaderBattle.create({
    militaryLeaderId: militaryLeaderId2,
    battleId: battleId2,
  });

  await MilitaryLeaderMapPosition.create({
    mapId: mapId1,
    militaryLeaderId: militaryLeaderId1,
    lng: 1,
    lat: 1,
  });
  await MilitaryLeaderMapPosition.create({
    mapId: mapId1,
    militaryLeaderId: militaryLeaderId2,
    lng: 1,
    lat: 1,
  });
  await MilitaryLeaderMapPosition.create({
    mapId: mapId2,
    militaryLeaderId: militaryLeaderId1,
    lng: 1,
    lat: 1,
  });
  await MilitaryLeaderMapPosition.create({
    mapId: mapId3,
    militaryLeaderId: militaryLeaderId2,
    lng: 1,
    lat: 1,
  });
};
