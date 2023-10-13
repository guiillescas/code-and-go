export interface FormProps {
  studentName: string
}

export interface PossibleFriendsProps {
  email: string
  firstName: string
  id: string
  lastName: string
  profilePicture: null | string
  role: string
}

export interface PossibleFriendsListProps extends PossibleFriendsProps {
  isRequested: boolean
}
