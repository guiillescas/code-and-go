import { keyframes, styled } from 'styles/index'

const skChase = keyframes({
  '100%': {
    transform: 'rotate(360deg)',
  },
})

const dot = keyframes({
  '80%': {
    transform: 'rotate(360deg)',
  },
  '100%': {
    transform: 'rotate(360deg)',
  },
})

const dotBefore = keyframes({
  '0%': {
    transform: 'scale(1)',
  },
  '50%': {
    transform: 'scale(0.4)',
  },
  '100%': {
    transform: 'scale(1)',
  },
})

export const LoadingContainer = styled('div', {
  position: 'relative',

  width: '100%',
  maxWidth: '40px',
  minWidth: '20px',
  height: '100%',
  maxHeight: '40px',
  minHeight: '20px',

  animation: `${skChase} 2s infinite linear both`,

  '.dot': {
    width: '100%',
    height: '100%',
    position: 'absolute',
    left: 0,
    top: 0,
    animation: `${dot} 2s infinite ease-in-out both`,
  },

  '.dot:before': {
    content: '',
    display: 'block',
    width: '25%',
    height: '25%',
    backgroundColor: '$PRIMARY_500',
    borderRadius: '100%',
    animation: `${dotBefore} 2s infinite ease-in-out both`,
  },

  '.dot:nth-child(1)': {
    animationDelay: '-1.1s',
  },
  '.dot:nth-child(2)': {
    animationDelay: '-1s',
  },
  '.dot:nth-child(3)': {
    animationDelay: '-0.9s',
  },
  '.dot:nth-child(4)': {
    animationDelay: '-0.8s',
  },
  '.dot:nth-child(5)': {
    animationDelay: '-0.7s',
  },
  '.dot:nth-child(6)': {
    animationDelay: '-0.6s',
  },
  '.dot:nth-child(1):before': {
    animationDelay: '-1.1s',
  },
  '.dot:nth-child(2):before': {
    animationDelay: '-1s',
  },
  '.dot:nth-child(3):before': {
    animationDelay: '-0.9s',
  },
  '.dot:nth-child(4):before': {
    animationDelay: '-0.8s',
  },
  '.dot:nth-child(5):before': {
    animationDelay: '-0.7s',
  },
  '.dot:nth-child(6):before': {
    animationDelay: '-0.6s',
  },
})
