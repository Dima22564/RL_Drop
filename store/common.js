export const state = () => ({
  windowSize: 0
})

export const mutations = {
  setWindowSize (state, windowsize) {
    state.windowSize = windowsize
  }
}

export const getters = {
  getWindowSize: state => state.windowSize
}
