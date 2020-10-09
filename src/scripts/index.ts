
import { data } from './modules/data/data';
import { uiData } from './modules/data/ui-data';
import { initState } from "./modules/state-management/immer-state";

const state = {
    data: data,
    uiData: uiData
}

initState(state);