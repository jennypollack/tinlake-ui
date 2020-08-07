import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import poolsReducer from '../ducks/pools'
import loansReducer from '../ducks/loans'
import investmentsReducer from '../ducks/investments'
import poolReducer from '../ducks/pool'
import authReducer from '../ducks/auth'
import transactionReducer from '../ducks/transactions'
import thunk from 'redux-thunk'
import asyncTransactionReducer from '../ducks/asyncTransactions'

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any
  }
}
const composeEnhancers =
  typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose

const makeStore = () => {
  return createStore(
    combineReducers({
      pools: poolsReducer,
      loans: loansReducer,
      investments: investmentsReducer,
      pool: poolReducer,
      auth: authReducer,
      transactions: transactionReducer,
      asyncTransactions: asyncTransactionReducer, // TODO: asyncTransactions should eventually replace transactions
    }),
    composeEnhancers(applyMiddleware(thunk))
  )
}

export default makeStore
