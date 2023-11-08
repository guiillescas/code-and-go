export interface FriendshipRequestCardProps {
  requestId: string
  message: string
  name: string
  profilePicture: string | null
  handleResponseFriendship: (
    response: number,
    requesterId: string,
    requestId: string,
    friendshipRequestId: string
  ) => Promise<void>
  friendshipRequestId: string
}
