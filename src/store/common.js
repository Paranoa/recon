export default {
    namespaced: true,
    state: {
        terminal:""
    },
    mutations: {
        setTerminal (state, value) {
        state.terminal = value;
        }
    }
}