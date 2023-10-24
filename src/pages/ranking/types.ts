export interface RankingProgressesProps {
  id: string
  userId: string
  userFullName: string
  points: number
}

export interface RankingProps {
  id: string
  period: {
    initialDateTime: string
    endDateTime: string
  }
  rankingProgresses: RankingProgressesProps[]
}
