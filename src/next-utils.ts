import next from 'next'

const PORT=Number(process.env.PORT) || 3000
export const nextApp=next({
  port:PORT,
  dev:process.env.NODE_ENV !== 'production'
})
export const nextHandler=nextApp.getRequestHandler()