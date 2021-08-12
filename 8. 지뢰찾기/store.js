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
export const CONFIRM_CELLS = 'CONFIRM_CELLS';

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
        openedCount: 0,
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
            state.openedCount = 0;
            state.result = '';
        },
        [OPEN_CELL] (state, {row, col}) {
            const checked = [];
            
            function checkAround(row, col) {  // 주변 8칸 지뢰인지 검색
                console.log('checkAround Called');
                const checkRowOrColIsUndefined = row < 0 || row >= state.tableData.length || col < 0 || col >= state.tableData[0].length;
                const isAlreadyOpenedOrMarked = ![CODE.NORMAL, CODE.MINE, CODE.CLICKED_MINE].includes(state.tableData[row][col]);
                if (checkRowOrColIsUndefined) return;
                if (isAlreadyOpenedOrMarked) return;
                if (checked.includes(row + '/' + col)) return;

                state.openedCount++;
                
                checked.push(row + '/' + col);

                let around = [];
                for (let i = -1; i < 2; i++) {
                    for (let j = -1; j < 2; j++) {
                        if (i === 0 && j === 0) {
                            continue;
                        }
                        if (state.tableData[row + i] && state.tableData[row + i][col + j]) {
                            around = around.concat({
                                code: state.tableData[row + i][col + j],
                                coordinates: [row + i, col + j]
                            });
                        }
                    }
                }
                const count = around.filter(
                    function(v) {
                        return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v.code);
                    }
                ).length;
                Vue.set(state.tableData[row], col, count);

                if (count === 0 && row > -1) {  // 주변칸에 지뢰가 하나도 없으면
                    around.forEach((n) => {
                        if (state.tableData[n.coordinates[0]][n.coordinates[1]] !== CODE.OPENED) {
                            checkAround(n.coordinates[0], n.coordinates[1]);
                        }
                    })
                }

                return count;
            };

            const count = checkAround(row, col);
            console.log(count);

            if (state.data.row * state.data.col - state.data.mine === state.openedCount) {
                console.log('game over');
                state.halted = true;
                state.result = `${state.timer}초만에 승리하셨습니다.`;
            }

            console.log(`opendCount = ${state.openedCount}`);
        },
        [CLICK_MINE] (state, {row, col}) {
            state.halted = true;
            state.result = '게임 오버';
            Vue.set(state.tableData[row], col, CODE.CLICKED_MINE);
        },
        [FLAG_CELL] (state, {row, col}) {
            if (state.tableData[row][col] === CODE.MINE) {
                Vue.set(state.tableData[row], col, CODE.FLAG_MINE);
            } else {
                Vue.set(state.tableData[row], col, CODE.FLAG);
            }
        },
        [QUESTION_CELL] (state, {row, col}) {
            if (state.tableData[row][col] === CODE.FLAG_MINE) {
                Vue.set(state.tableData[row], col, CODE.QUESTION_MINE);
            } else {
                Vue.set(state.tableData[row], col, CODE.QUESTION);
            }
        },
        [NORMALIZE_CELL] (state, {row, col}) {
            if (state.tableData[row][col] === CODE.QUESTION_MINE) {
                Vue.set(state.tableData[row], col, CODE.MINE);
            } else {
                Vue.set(state.tableData[row], col, CODE.NORMAL);
            }
        },
        [CONFIRM_CELLS] (state, {row, col}) {
            console.log('confirm');

            let flagCount = 0;
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (state.tableData[row + i] && 
                        state.tableData[row + i][col + j] && 
                        [CODE.FLAG, CODE.FLAG_MINE].includes(state.tableData[row + i][col + j])) {

                        flagCount++;
                    }
                }
            }

            if (flagCount !== state.tableData[row][col]) return;

            let around = [];
            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) {
                        continue;
                    }
                    if (state.tableData[row + i] && 
                        state.tableData[row + i][col + j] && 
                        [CODE.NORMAL, CODE.MINE, CODE.CLICKED_MINE].includes(state.tableData[row + i][col + j])) {

                        around = around.concat({
                            code: state.tableData[row + i][col + j],
                            coordinates: [row + i, col + j]});
                    }
                }
            }

            around.forEach((n) => {
                if (n.code === CODE.MINE) {
                    this.commit('CLICK_MINE', {row: n.coordinates[0], col: n.coordinates[1]});
                } else {
                    this.commit('OPEN_CELL', {row: n.coordinates[0], col: n.coordinates[1]});
                }
            })
        },
        [INCREMENT_TIMER] (state) {
            state.timer++;
        },
    },
    actions: {  // $store.dispatch()  // 비동기를 사용할 때, 또는 여러 뮤테이션을 연달아 실행할 때

    },
});