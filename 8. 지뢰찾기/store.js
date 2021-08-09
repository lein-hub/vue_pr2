import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened
};

const plantMine = (row, cell, mine) => {
    console.log(row, cell, mine);
    const candidate = Array(row * cell).fill().map((arr, i) => {
        return i;
    });

    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    const data = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
        data.push(rowData);
    }

    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    console.log(data);
    return data;
}

export default new Vuex.Store({
    state: {  // %store.state  // vue의 data
        tableData: [],
        data: {
            row: 0,
            col: 0,
            mine: 0,
        },
        halted: true,  // 게임이 중단됐는가?
        timer: 0,
        result: '',
    },
    getters: {  // $store.getters  // vue의 computed
        turnMessage(state) {
            return state.turn + '님이 승리하셨습니다.';
        }
    },
    mutations: {  // $store.commit()  // state를 수정할 때 사용한다. 동기적
        [START_GAME] (state, {row, col, mine}) {
            state.data = {
                row,
                col,
                mine,
            };
            state.tableData = plantMine(row, col, mine);
            state.timer = 0;
            state.halted = false; 
        },
        [OPEN_CELL] (state, {row, col}) {
            Vue.set(state.tableData[row], col, CODE.OPENED);
        },
        [CLICK_MINE] (state) {

        },
        [FLAG_CELL] (state, {row, col}) {
            if (state.tableData[row][col] === CODE.MINE) {
                Vue.set(state.tableData[row], col, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], col, CODE.FLAG);
            }
        },
        [QUESTION_CELL] (state, {row, col}) {
            if (state.tableData[row][col] === CODE.MINE) {
                Vue.set(state.tableData[row], col, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], col, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL] (state, {row, col}) {
            if (state.tableData[row][col] === CODE.MINE) {
                Vue.set(state.tableData[row], col, CODE.MINE);
            } else {
                Vue.set(state.tableData[row], col, CODE.NORMAL);
            }
        },
        [INCREMENT_TIMER] (state) {
            state.timer++;
        },
    },
    actions: {  // $store.dispatch()  // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때

    },
});