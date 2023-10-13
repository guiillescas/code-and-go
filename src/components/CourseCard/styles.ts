import styled from 'styled-components'

export const CourseCardContainer = styled.div`
  .image-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 200px;
    max-height: 230px;

    display: flex;
    align-items: center;
    justify-content: center;

    > img {
      width: 100%;
      height: 100%;
      min-height: 200px;
      max-height: 230px;

      object-fit: cover;

      border-radius: 8px 8px 0 0;
    }
  }

  .content {
    display: flex;
    flex-direction: column;

    margin-top: 1rem;

    > p {
      margin-top: 0.75rem;
      height: 37px;

      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    > button {
      margin-top: 0.75rem;
    }
  }
`
