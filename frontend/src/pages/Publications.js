import React, { useState, useEffect } from "react";
import Publication from "../components/Publication";
//import publications from "../data/publications";
import axios from "../config/@axios";
import CustomBackdrop from "../components/CustomBackdrop";

const Publications = () => {
  const [publications, setPublications] = useState([]);
  const [isError, setIsError] = useState(false);
  const [isLoading,setIsLoading]= useState(true)

  useEffect(() => {
    async function fetchPublications() {

      const publications = await axios.get(`publications`);
      if (!publications) {
        setIsError(true);
        setIsLoading(false)
        return;
      }
      setPublications(publications.data.data);
      setIsLoading(false)

    }
    setTimeout(()=>fetchPublications(),500)
    
  }, []);

  return (
  <div className="container "  >
     {isLoading ? <CustomBackdrop isLoading={isLoading } />:
      <div className="row">
        <div
          className="container text-center mt-5"
          style={{ color: "#665d1e" }}
        >
          <h2 className="featurette-heading" style={{marginTop:"2%", color: "#222831"}}>Publications</h2>
   
        </div>
        <div>
          {publications.map((article) => (
            <Publication
              key={Math.random().toString(36)}
              title={article.title}
              authors={article.authors}
              url={article.url}
              date={article.date}
            ></Publication>
          ))}
        </div>
      </div>
}
    </div>

  
  );
};

export default Publications;