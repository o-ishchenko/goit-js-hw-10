function fetchCountry(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,languages,population`)
        .then(response => {
            if (!response.ok) {
            throw Error ('Oops, there is no country with that name')
            }
            return response.json()
        })
}
   

export default { fetchCountry };