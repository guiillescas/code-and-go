import styled from 'styled-components'

import Image1 from '../../../public/assets/blue-square-vector-1.png'
import Image3 from '../../../public/assets/blue-vector-2.png'
import Image2 from '../../../public/assets/purple-vector-1.png'

export const LPContainer = styled.div`
  width: 100%;
  min-height: 100vh;

  margin: 0 auto;

  background: ${({ theme }) => theme.colors.white[500]};
  color: ${({ theme }) => theme.colors.neutral[900]} !important;

  main {
    max-width: 1200px;
    margin: 0 auto;

    padding: 2rem 0 10rem;

    > nav {
      z-index: 6;

      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      margin-bottom: 3rem;

      > p {
        font-size: 2rem;
        text-decoration: none;
        color: ${({ theme }) => theme.colors.neutral[900]};

        z-index: 6;
      }

      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;

        z-index: 6;

        button {
          height: 36px;

          border: none;
          border-radius: 4px;

          font-size: 16px;
          font-weight: bold;
          line-height: 20px;

          cursor: pointer;

          transition: opacity 0.2s;

          padding: 0 1rem;

          color: ${({ theme }) => theme.colors.white[500]};

          &.primary {
            background: ${({ theme }) => theme.colors.neutral[900]};

            &:hover {
              opacity: 0.8;
            }
          }
          &.secondary {
            background: transparent;
            color: ${({ theme }) => theme.colors.neutral[900]};

            transition: background-color 0.2s;

            &:hover {
              background: ${({ theme }) => theme.colors.white[500]};
            }
          }
        }
      }
    }

    > section {
      padding: 0 2rem;
    }

    #intro {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 2rem;

      position: relative;

      height: calc(80vh - 2rem - 36px);

      @media (max-width) {
      }

      > div.background {
        position: absolute;

        z-index: 2;

        -webkit-filter: blur(100px);
        -moz-filter: blur(100px);
        -o-filter: blur(100px);
        -ms-filter: blur(100px);
        filter: blur(100px);

        &.one {
          top: -150px;
          left: 580px;

          width: 380px;
          height: 380px;

          background-image: url(${Image1.src});
        }
        &.two {
          top: -120px;
          right: -80px;

          width: 2000px;
          height: 380px;

          background-image: url(${Image1.src});
        }
        &.three {
          top: 200px;
          left: 10%;

          width: 700px;
          height: 280px;

          background-image: url(${Image2.src});
        }
        &.four {
          top: 200px;
          right: 10%;

          width: 500px;
          height: 280px;

          background-image: url(${Image3.src});
        }
      }

      .left {
        z-index: 5;

        > h1 {
          font-size: 3rem;
          max-width: 690px;
        }

        > p {
          max-width: 600px;
          margin-top: 1rem;
          font-size: 1.25rem;
        }

        .button-wrapper {
          margin-top: 1rem;

          display: flex;
          align-items: center;
          justify-content: center;

          button {
            max-width: 200px;
          }
        }
      }

      .right {
        z-index: 6;
      }
    }

    #benefits {
      max-width: 1024px;
      margin: 0 auto;

      > h2 {
        text-align: center;
        font-size: 2.25rem;

        margin-bottom: 2.5rem;
      }

      .item {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1.5rem;

        max-width: 500px;

        &.right {
          justify-content: flex-end;
          margin-left: auto;
        }

        > div {
          > h3 {
            font-size: 1.5rem;
          }

          p {
            margin-top: 1rem;
            font-size: 1.125rem;
          }
        }
      }

      .callback-button-action {
        display: flex;
        align-items: center;
        justify-content: center;

        margin-top: 3rem;

        > button {
          max-width: 300px;
        }
      }
    }
  }
`
