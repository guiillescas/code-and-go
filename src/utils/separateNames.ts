export function separarNames(name: string): {
  firstName: string
  lastName: string
} {
  const splitedNames = name.split(' ')

  const quantityOfNames = splitedNames.length

  const firstName = splitedNames[0]
  const lastName = quantityOfNames > 1 ? name[name.length - 1] : ''

  return { firstName, lastName }
}
