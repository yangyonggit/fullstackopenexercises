const CountrySearchInput = ({search,handleSearch,disableInput}) => {

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <h4>find countries</h4> 
            <input type="text" value={search} 
                        onChange={handleSearch} 
                        placeholder="Search names..." 
                        disabled={disableInput}
            />
        </div>
    );
}

const TooManyResults = () => {
    return (
        <div>
            <h2>Too many matches, specify another filter</h2>
        </div>
    );
}

const ResultsList = ({searchList}) => {
    return (        
    <div>
        {
        searchList.map(country => 
             <div style={{display: 'flex', alignItems: 'center' }} key={country.area}>
             <p>{country.name.common}</p> 
             </div>)
        }
    </div>
    );
}

const DetailResults = ({country}) => {
    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>capital: {country.capital}</p>
            <p>population: {country.population}</p>
            <h2>languages</h2>
            <ul>
                {Object.values(country.languages).map((lang, index) => 
                    <li key={index}>{lang}</li>
                )}
            </ul>
            <img src={country.flags.png} alt="flag" style={{width: '100px'}} />
        </div>
    );

}



const SearchResults = ({searchList}) => {
    const isMoreThenTen = searchList.length > 10;
    const isOne = searchList.length === 1;

    return (
        <div>
            {isMoreThenTen && <TooManyResults />}
            {!isMoreThenTen && !isOne && <ResultsList searchList={searchList} />}
            {isOne && <DetailResults country={searchList[0]} />}
        </div>
    );
}
 
export {CountrySearchInput, SearchResults};