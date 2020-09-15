export const state = () => ({
  faqs: []
})

export const mutations = {
  setFaqs (state, faqs) {
    state.faqs = faqs
  }
}

export const actions = {
  async getFaqs () {

  }
}

export const getters = {
  getFaqs: state => state.faqs
}
