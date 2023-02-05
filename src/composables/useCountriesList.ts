import countries_list from 'countries-list'

export const useGetCountriesList = (): any[] => {
    const list = Object.values(countries_list.countries)
    return list
}