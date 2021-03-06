import Vue from "vue";
import { battleType, militaryLeaderType } from "../../utils/types";

const PositionsModule = {
    namespaced: true,
    state: {
        militaryLeaderPositions: [],
        battlePositions: [],
        newlyAdded: null,
        recentlyDeleted: null,
        updatedMilitaryLeader: null,
        updatedBattle: null,
        searched: false,
    },

    mutations: {
        setBattlePositions(state, battlePositions) {
            state.battlePositions = battlePositions;
        },
        deleteBattlePosition(state, battlePosition) {
            let index = state.battlePositions.findIndex(
                (bp) => bp.id === battlePosition.id
            );
            state.recentlyDeleted = state.battlePositions[index];
            state.battlePositions.splice(index, 1);
        },
        updateBattlePosition(state, battlePosition) {
            const index = state.battlePositions.findIndex(
                (bp) => bp.id === battlePosition.id
            );
            state.battlePositions[index] = battlePosition;
        },
        updateBattle(state, battle) {
            const index = state.battlePositions.findIndex(
                (mlp) => mlp.battle.id === battle.id
            );
            if (index < 0) return;
            Object.assign(state.battlePositions[index].battle, battle);
            state.updatedBattle = state.battlePositions[index];
        },
        addBattlePosition(state, battlePosition) {
            state.battlePositions.push(battlePosition);
            state.newlyAdded = battlePosition;
        },
        setMilitaryLeaderPositions(state, militaryLeaderPositions) {
            state.militaryLeaderPositions = militaryLeaderPositions;
        },
        deleteMilitaryLeaderPosition(state, militaryLeaderPosition) {
            let index = state.militaryLeaderPositions.findIndex(
                (bp) => bp.id === militaryLeaderPosition.id
            );
            state.recentlyDeleted = state.militaryLeaderPositions[index];
            state.militaryLeaderPositions.splice(index, 1);
        },
        updateMilitaryLeaderPosition(state, militaryLeaderPosition) {
            const index = state.militaryLeaderPositions.findIndex(
                (bp) => bp.id === militaryLeaderPosition.id
            );
            Object.assign(
                state.militaryLeaderPositions[index],
                militaryLeaderPosition
            );
        },
        updateMilitaryLeader(state, militaryLeader) {
            const index = state.militaryLeaderPositions.findIndex(
                (mlp) => mlp.militaryLeader.id === militaryLeader.id
            );
            if (index < 0) return;
            Object.assign(
                state.militaryLeaderPositions[index].militaryLeader,
                militaryLeader
            );
            state.updatedMilitaryLeader = state.militaryLeaderPositions[index];
        },
        addMilitaryLeaderPosition(state, militaryLeaderPosition) {
            state.militaryLeaderPositions.push(militaryLeaderPosition);
            state.newlyAdded = militaryLeaderPosition;
        },
        resetAdded(state) {
            state.newlyAdded = null;
        },
        resetDeleted(state) {
            state.recentlyDeleted = null;
        },
        resetUpdatedMilitaryLeader(state) {
            state.updatedMilitaryLeader = null;
        },
        resetUpdatedBattle(state) {
            state.updatedBattle = null;
        },
        clearAllPositions(state) {
            state.militaryLeaderPositions = [];
            state.battlePositions = [];
            state.recentlyDeleted = null;
        },
        setSearched(state, searched) {
            state.searched = searched;
        },
    },

    actions: {
        async getMilitaryLeaderPositions({ commit }, mapCode) {
            try {
                let { data: militaryLeaderPositions } = await Vue.$axios.get(
                    `/militaryLeaderMapPosition/mapName=${mapCode}`
                );
                commit("setMilitaryLeaderPositions", militaryLeaderPositions);
            } catch (err) {
                console.log(
                    `An error occurred while acquiring leaders: ${err}`
                );
            }
        },
        async getBattlePositions({ commit }, mapCode) {
            try {
                let { data: battlePositions } = await Vue.$axios.get(
                    `/battleMapPosition/mapName=${mapCode}`
                );
                commit("setBattlePositions", battlePositions);
            } catch (err) {
                console.log(
                    `An error occurred while acquiring battles: ${err}`
                );
            }
        },
        async searchPositions({ commit }, { mapCode, searchQuery, battleFilter, filterMilitaryLeaders }) {
            try {
                let {data: militaryLeaderPositions} = await Vue.$axios.get(
                    `/militaryLeaderMapPosition/mapName=${mapCode}`
                );
                militaryLeaderPositions = militaryLeaderPositions.filter(
                    (mlp) =>
                        mlp.militaryLeader.firstName
                            .toLocaleLowerCase()
                            .includes(searchQuery.toLocaleLowerCase()) ||
                        mlp.militaryLeader.lastName
                            .toLocaleLowerCase()
                            .includes(searchQuery.toLocaleLowerCase())
                );

                if (filterMilitaryLeaders)
                    militaryLeaderPositions = militaryLeaderPositions.filter(mlp => {
                        let and = true;
                        if (filterMilitaryLeaders.birthPlace) and = and && filterMilitaryLeaders.birthPlace.includes(mlp.militaryLeader.birthPlace);
                        if (!and) return false;
                        if (filterMilitaryLeaders.militaryRank) and = and && filterMilitaryLeaders.militaryRank.includes(mlp.militaryLeader.militaryRank);
                        if (!and) return false;
                        if (filterMilitaryLeaders.school) and = and && filterMilitaryLeaders.militaryRank.includes(mlp.militaryLeader.school);
                        if (!and) return false;
                        if (filterMilitaryLeaders.dynastyName) and = and && filterMilitaryLeaders.militaryRank.includes(mlp.militaryLeader.dynastyName);
                        if (!and) return false;
                        if (filterMilitaryLeaders.title) and = and && filterMilitaryLeaders.militaryRank.includes(mlp.militaryLeader.title);
                        return and;
                    });
                console.log("FILTERML");
                console.log(militaryLeaderPositions);
                commit("setMilitaryLeaderPositions", militaryLeaderPositions);

                let {data: battlePositions} = await Vue.$axios.get(
                    `/battleMapPosition/mapName=${mapCode}`
                );
                console.log(battlePositions);
                battlePositions = battlePositions.filter((bp) =>
                    bp.battle.name
                        .toLocaleLowerCase()
                        .includes(searchQuery.toLocaleLowerCase())
                );
                if (battleFilter)
                    battlePositions = battlePositions.filter(bp => {
                        let and = true;
                        console.log(bp.battle.place);
                        if (battleFilter.place) and = and && battleFilter.place.includes(bp.battle.place);
                        if (!and) return false;
                        if (battleFilter.warId) and = and && battleFilter.warId.includes(bp.battle.war.id);
                        return and;
                    });
                console.log("ISFILTRIRANO");
                console.log(battlePositions);
                commit("setBattlePositions", battlePositions);
            } catch(err) {
                console.log(err);
            }
        },

        async filterPositions(
            { commit },
            { mapId, militaryLeaderFilters, battleFilters, search }
        ) {
            try {
                const {
                    data,
                } = await Vue.$axios.post(
                    `/militaryLeaderMapPosition/filter/${mapId}`,
                    { filter: militaryLeaderFilters, search }
                );
                console.log("DSA");
                console.log(data);

                commit("setMilitaryLeaderPositions", data);

                const {
                    data: data2,
                } = await Vue.$axios.post(
                    `/battleMapPosition/filter/${mapId}`,
                    { filter: battleFilters, search }
                );
                commit("setBattlePositions", data2);
            } catch (error) {
                console.log(error);
            }
        },

        async updateBattlePosition({ commit }, position) {
            try {
                let { data: updated } = await Vue.$axios.patch(
                    `/battleMapPosition/${position.id}`,
                    position
                );
                commit("updateBattlePosition", updated);
            } catch (err) {
                console.log(err);
            }
        },

        async updateMilitaryLeaderPosition({ commit }, position) {
            try {
                let { data: updated } = await Vue.$axios.patch(
                    `/militaryLeaderMapPosition/${position.id}`,
                    position
                );
                commit("updateMilitaryLeaderPosition", updated);
            } catch (err) {
                console.log(err);
            }
        },
        async addMilitaryLeaderPosition(
            { rootState, commit, dispatch },
            position
        ) {
            try {
                let { data: added } = await Vue.$axios.post(
                    "/militaryLeaderMapPosition",
                    position
                );
                commit("addMilitaryLeaderPosition", added);
                dispatch(
                    "militaryLeaderBattles/additionalMilitaryLeaderBattles",
                    {
                        mapId: rootState.map.mapObj.id,
                        position: added,
                        type: militaryLeaderType,
                    },
                    { root: true }
                );
                commit(
                    "snackbar/openSnackbar",
                    {
                        text:
                            "This military leader was successfully added to the map",
                        color: "primary",
                    },
                    { root: true }
                );
            } catch (err) {
                if (err.response.status === 400) {
                    commit(
                        "snackbar/openSnackbar",
                        {
                            text:
                                "This military leader is already placed on the map",
                            color: "error",
                        },
                        { root: true }
                    );
                } else console.log(err);
            }
        },
        async addBattlePosition({ rootState, commit, dispatch }, position) {
            try {
                let { data: added } = await Vue.$axios.post(
                    "/battleMapPosition",
                    position
                );
                commit("addBattlePosition", added);
                dispatch(
                    "militaryLeaderBattles/additionalMilitaryLeaderBattles",
                    {
                        mapId: rootState.map.mapObj.id,
                        position: added,
                        type: battleType,
                    },
                    { root: true }
                );
                commit(
                    "snackbar/openSnackbar",
                    {
                        text: "This battle was successfully added to the map",
                        color: "primary",
                    },
                    { root: true }
                );
            } catch (err) {
                if (err.response.status === 400) {
                    commit(
                        "snackbar/openSnackbar",
                        {
                            text: "This battle is already placed on the map",
                            color: "error",
                        },
                        { root: true }
                    );
                } else console.log(err);
            }
        },
        async deleteMilitaryLeaderPosition({ commit }, position) {
            try {
                await Vue.$axios.delete(
                    `/militaryLeaderMapPosition/${position.id}`
                );
                commit("deleteMilitaryLeaderPosition", position);
                commit(
                    "snackbar/openSnackbar",
                    {
                        text: "The military leader was successfully deleted",
                        color: "primary",
                    },
                    { root: true }
                );
            } catch (err) {
                console.log(err);
            }
        },
        async deleteBattlePosition({ commit }, position) {
            try {
                await Vue.$axios.delete(`/battleMapPosition/${position.id}`);
                commit("deleteBattlePosition", position);
                commit(
                    "snackbar/openSnackbar",
                    {
                        text: "The battle was successfully deleted",
                        color: "primary",
                    },
                    { root: true }
                );
            } catch (err) {
                console.log(err);
            }
        },
    },
};

export default PositionsModule;
