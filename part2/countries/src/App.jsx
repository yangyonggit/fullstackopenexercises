import { useState, useEffect} from 'react'
import {getAllCountries} from './CountriesDB'
import {CountrySearchInput, SearchResults} from './CountryComp'


function App() {  
  const [countries, setCountries] = useState([])

  const [search, setSearch] = useState('')

  const [searchList, setSearchList] = useState([])

  const [disableInput, setDisableInput] = useState(true)

  useEffect(() => {
    getAllCountries().then(data => {    
      console.log(`get all countries, there are ${data.length} countries`)
      setCountries(data)
      setDisableInput(false)
    }).catch((error) => {
      console.log(error)  
    })}, [])

  const handleSearch = (event) => {
    // console.log(event.target.value)
    console.log(countries[100])
    const searchStr = event.target.value
    setSearch(searchStr)
    if (searchStr === '') {
      setSearchList([])
    } else {
      const sList = countries.filter(county =>{
        return county.name.common.toLowerCase().includes(searchStr.toLowerCase())
      })
      setSearchList(sList)
      console.log(sList)
    }
  }



  return (    
      <div>
        <CountrySearchInput search={search} handleSearch={handleSearch} disableInput={disableInput}/>
        <SearchResults searchList={searchList} />
      </div>    
  )
}

export default App
