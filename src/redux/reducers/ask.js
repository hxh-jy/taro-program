import {SAVE_TAB} from '../constant'

export default function saveTabInfo(initeState = {},action) {
    let {type,data} = action
    switch (type) {
        case SAVE_TAB:
            return initeState = data
        default:
            return initeState
    }
}