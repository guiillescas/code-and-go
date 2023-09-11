export interface FriendshipRequestCardProps {
  id: string
  requesterId: string
  message: string
  name: string
  profilePicture: string | null
  handleResponseFriendship: (
    response: number,
    requesterId: string,
    requestId: string,
  ) => Promise<void>
}
