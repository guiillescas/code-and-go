export function separateNames(name: string): {
  firstName: string
  lastName: string
} {
  const splitedNames = name.split(' ')

  const quantityOfNames = splitedNames.length

  const firstName = splitedNames[0]
  const lastName = splitedNames.slice(-(quantityOfNames - 1)).join(' ')

  return { firstName, lastName }
}
