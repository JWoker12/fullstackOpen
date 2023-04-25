import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY

const Countries = ({ country, setCountry }) => {
    return country.map((country) => (
        <div key={country.name.official}>
            {country.name.common}{" "}
            <button onClick={() => setCountry([country])}>show</button>
        </div>
    ));
};
const Country = ({ country }) => {
    return (
        <>
            <h1>Name: {country.name.common}</h1>
            <b>Capital:</b>
            <p>{country.capital}</p>
            <b>Population:</b>
            <p>{country.population}</p>
            <b>Languages:</b>
            <ul>
                {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <b>Flag</b>
            <div>
                <img alt={country.name.common} src={country.flags.png}></img>
            </div>
        </>
    );
};

function App() {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((res) => setCountries(res.data));
    }, []);

    const handlerFilterChange = (e) => {
        setFilter(e.target.value);
        setCountry(
            countries.filter((countrie) =>
                countrie.name.common.toLowerCase().match(filter.toLowerCase())
            )
        );
    };

    return (
        <>
            <div>
                <label>Find Countries</label>
                <input onChange={handlerFilterChange} />
            </div>
            <ul>
                {country.length === 1 ? (
                    <Country country={country[0]} />
                ) : (
                    <Countries setCountry={setCountry} country={country} />
                )}
            </ul>
        </>
    );
}

export default App;
