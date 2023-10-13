export interface FormProps {
  studentName: string
}

export interface PossibleFriendsProps {
  id: string
  firstName: string
  lastName: string
  profilePicture: null | string
  visibility: number
}

export interface PossibleFriendsListProps extends PossibleFriendsProps {
  isRequested: boolean
}
