import { useEffect } from 'react'
import { useFirestoreCollectionData } from 'reactfire'
import useActions from './actions'
import { COLLECTION_REF } from './api'
import { Game } from './store'

function useObservables() {
  const { getFromObservation } = useActions()
  const observableStatus = useFirestoreCollectionData<Game>(COLLECTION_REF)

  useEffect(() => {
    getFromObservation(observableStatus.data)
  }, [observableStatus, getFromObservation])
}

export default useObservables
