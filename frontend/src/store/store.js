import Vue from "vue";
import Vuex from "vuex";
import battles from "./modules/battles";
import battlesDialog from "./modules/battlesDialog";
import militaryLeaders from "./modules/militaryLeaders";
import militaryLeadersDialog from "./modules/militaryLeadersDialog";
import positions from "./modules/positions";
import snackbar from "./modules/snackbar";
import militaryLeaderBattles from "./modules/militaryLeaderBattles";
import deletePositionDialog from "./modules/deletePositionDialog";
import battleModifyDialog from "./modules/battleModifyDialog";
import militaryLeaderModifyDialog from "./modules/militaryLeaderModifyDialog";
import militaryLeaderTableDialog from "./modules/militaryLeaderTableDialog";
import battlesTableDialog from "./modules/battlesTableDialog";
import map from "./modules/map";
import existingPositionDialog from "./modules/existingPositionDialog";
import positionPopup from "./modules/positionPopup";
import battleFilters from "./modules/battleFilters";
import battleDeleteDialog from "./modules/battleDeleteDialog";
import militaryLeaderDeleteDialog from "./modules/militaryLeaderDeleteDialog";
import militaryLeaderFilters from "./modules/militaryLeaderFilters";

import tutorial from "./modules/tutorial";
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        militaryLeaders,
        militaryLeaderTableDialog,
        battleModifyDialog,
        battlesTableDialog,
        battles,
        battleDeleteDialog,
        militaryLeaderDeleteDialog,
        militaryLeaderModifyDialog,
        battlesDialog,
        positions,
        militaryLeadersDialog,
        snackbar,
        militaryLeaderBattles,
        deletePositionDialog,
        map,
        existingPositionDialog,
        positionPopup,
        battleFilters,
        militaryLeaderFilters,
        tutorial,
    },
});
