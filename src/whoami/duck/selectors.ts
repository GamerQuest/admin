import { useSelector } from 'react-redux'
import { Store } from './store'

function useSelectors(): Store {
  return useSelector<{ whoami: Store }, Store>(state => state.whoami)
}

export default useSelectors
