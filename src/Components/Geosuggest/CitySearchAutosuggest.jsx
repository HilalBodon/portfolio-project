import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

const CitySearchAutosuggest = ({ handleInputChange }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    handleInputChange({ target: { name: 'location', value: newValue } }); 
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const provider = new OpenStreetMapProvider();
    provider.search({ query: value }).then((results) => {
      setSuggestions(results.map((result) => result.label));
    });
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion}
    </div>
  );

  const inputProps = {
    // placeholder: 'إسم المدينة',
    value,
    onChange: onChange
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  );
};

export default CitySearchAutosuggest;

