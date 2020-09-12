import Cookies from 'js-cookie'
import Cookie from 'cookie'
export const state = () => ({
  windowSize: 0,
  platform: 'pc'
})

export const mutations = {
  setWindowSize (state, windowsize) {
    state.windowSize = windowsize
  },
  setPlatform (state, platform) {
    state.platform = platform
  }
}

export const actions = {
  setCookiePlatform (ctx, platform) {
    Cookies.set('platform', platform)
  },
  initCookie ({ commit, dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.app.context.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || {}
    const platform = cookies.platform || 'pc'
    dispatch('setCookiePlatform', platform)
    commit('setPlatform', platform)
  }
}

export const getters = {
  getWindowSize: state => state.windowSize,
  getPlatform: state => state.platform
}
