import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import PropertiesCards from "../../components/PropertiesCard/PropertiesCards";

const Properties = () => {
  const [filter, setFilter] = useState("");
  const { data, isLoading, isError } = useProperties();
  if (isError) {
    <div className="wrapper">
      <span>Error while fetching data</span>
    </div>;
  }
  if (isLoading) {
    <div className="wrapper flexCenter" style={{ height: "60vh" }}>
      <PuffLoader
        height="80"
        width="80"
        radius={1}
        color="#4066ff"
        arial-label="puff-loading"
      />
    </div>;
  }
  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />
        <div className="paddings flexCenter properties">
          {
            // data &&
            //   data.residencies.map((card, i) => (
            //     <PropertiesCards card={card} key={i} />
            //   ))
            data && data.residencies.filter(
              (property) =>
              property.title.toLowerCase().includes(filter.toLocaleLowerCase())|| 
              property.city.toLowerCase().includes(filter.toLocaleLowerCase()) ||
              property.country.toLowerCase().includes(filter.toLocaleLowerCase()) 
            ).map((card, i) => <PropertiesCards card={card} key={i} />)
          }
        </div>
      </div>
    </div>
  );
};

export default Properties;
