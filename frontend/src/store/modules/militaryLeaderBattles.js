import Vue from "vue";
import {battleType} from "../../utils/types";

const militaryLeaderBattles = {
    namespaced: true,

    state: {
        militaryLeaderBattles: [],
        newlyAdded: null,
    },

    mutations: {
        setMilitaryLeaderBattles(state, militaryLeaderBattles) {
            state.militaryLeaderBattles = militaryLeaderBattles;
        },

        deleteMilitaryLeaderBattle(state, militaryLeaderBattle) {
            let index = state.militaryLeaderBattles.findIndex(
                (c) => c.id === militaryLeaderBattle.id
            );
            state.militaryLeaderBattles.splice(index, 1);
        },

        updateMilitaryLeaderBattle(state, updatedMilitaryLeaderBattle) {
            const index = state.militaryLeaderBattles.findIndex(
                (c) => c.id === updatedMilitaryLeaderBattle.id
            );
            Object.assign(state.militaryLeaderBattles[index], updatedMilitaryLeaderBattle);
        },

        addMilitaryLeaderBattle(state, militaryLeaderBattle) {
            state.newlyAdded = militaryLeaderBattle;
            state.militaryLeaderBattles.push(militaryLeaderBattle);
        },
        setAdditionalMilitaryLeaderBattles(state, militaryLeaderBattles) {
            state.newlyAdded = militaryLeaderBattles;
            state.militaryLeaderBattles.push(militaryLeaderBattles);
        }
    },
    actions: {
        async getMilitaryLeaderBattlesByMap({ commit }, mapId) {
            try {
                const { data } = await Vue.$axios.get(`/militaryLeaderBattle/map/${mapId}`);
                commit("setMilitaryLeaderBattles", data);
            } catch (err) {
                console.log(err);
            }
        },
        async additionalMilitaryLeaderBattles({ commit }, {mapId, position, type}) {
            try {
                let res;
                if(type.label === battleType.label)
                    res = await Vue.$axios
                        .get(`/militaryLeaderBattle/additionalBattle/map/${mapId}/battle/${position.battle.id}`);
                else
                    res = await Vue.$axios
                        .get(`/militaryLeaderBattle/additionalMilitaryLeader/map/${mapId}/militaryLeader/${position.militaryLeader.id}`);
                commit('setAdditionalMilitaryLeaderBattles', res.data);
            } catch (err) {
                console.log(err);
            }
        },
        async deleteMilitaryLeaderBattle({ commit }, militaryLeaderBattle) {
            try {
                await Vue.$axios.delete(`/militaryLeaderBattle/${militaryLeaderBattle.id}`);
                commit("deleteMilitaryLeaderBattle", militaryLeaderBattle);
            } catch (error) {
                console.log(error);
            }
        },

        async updateMilitaryLeaderBattle({ commit }, militaryLeaderBattle) {
            try {
                const { data: modified } = await Vue.$axios.patch(
                    `/militaryLeaderBattle/${militaryLeaderBattle.id}`,
                    militaryLeaderBattle
                );

                commit("updateMilitaryLeaderBattle", modified);
            } catch (error) {
                console.log(error);
            }
        },

        async addMilitaryLeaderBattle({ commit }, militaryLeaderBattle) {
            try {
                const { data: added } = await Vue.$axios.post(
                    "/militaryLeaderBattle",
                    militaryLeaderBattle
                );
                commit("addMilitaryLeaderBattle", added);
            } catch (err) {
                if(err.response.status === 400) {
                    commit('snackbar/openSnackbar',
                        {text: 'This military leader is already connected to the battle.', color: 'error'},
                        {root: true})
                } else console.log(err);
            }
        },
    }
};

export default militaryLeaderBattles;
