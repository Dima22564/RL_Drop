export const errorsHandle = (errors) => {
  const errorsMessages = {}

  for (const error in errors) {
    errorsMessages.error = error[0]
  }

  return errorsMessages
}
