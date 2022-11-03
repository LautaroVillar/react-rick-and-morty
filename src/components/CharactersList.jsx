import React, { useEffect, useState } from "react";
import Character from "./Character";


function NavPage({page, setPage}){
    return (
        <header className="d-flex justify-content-between align-items-center">
            <p>Page: {page}</p>
            <button onClick={()=>setPage(page + 1)} className="btn btn-primary btn-sm">
                page {page + 1}
            </button>
        </header>
    )
}

function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await res.json();
      setLoading(false)
      setCharacters(data.results);
    }
    fetchData();
  }, [page]);

  return (
    <div className="container">

        <NavPage page={page} setPage={setPage}/>
        {
            loading ? ( <h1>Loading</h1>) : 
           ( <div className="row">
            {characters.map((character) => {
              return (
                <div className="col-md-4" key={character.id}>
                  <Character character={character} />
                </div>
              );
            })}
          </div>
          )
        }
         <NavPage page={page} setPage={setPage}/>
    </div>
  );
}

export default CharactersList;
