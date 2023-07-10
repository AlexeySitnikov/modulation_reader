import { ListOfVariables } from './ListOfVariables'

export function ListOfValues({ listOfvariables }) {
  const arrayOfNames = !listOfvariables ? 'no data' : listOfvariables.split(' ')
  return (
    <div>
      {!listOfvariables ? 'no data' : <ListOfVariables arrayOfNames={arrayOfNames} />}
    </div>
  )
}
