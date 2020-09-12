export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.getters.getToken) {
    return redirect('/sign-in')
  }
}
