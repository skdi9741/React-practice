import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";

function Home(){
    const [loading, setLoading] = useState(true)
    const [movies, setMovies] = useState([])
    const [movieList, setMovieList] = useState([])
    
    const getMovies = async () => {
      const json = await (
        await fetch("https://yts.mx/api/v2/list_movies.json?minimum_rating=8.5&sort_by=year")
      ).json();
      setMovies(json.data.movies);
      setMovieList(json.data.movies);
      setLoading(false);
    };

    const changeGenres = (gr) => {
      let list = [];
      if( gr !== "ALL"){
        list = movies.map((item) => {
          if(item.genres.includes(gr)) return item;
        })
        setMovieList(list);
      }else{
        setMovieList(movies);
      }
    };

    useEffect(() => {
      getMovies();
      
    }, [])

    useEffect(() => {
      changeGenres();
    }, [])

    return (
      <div className={styles.container}>
        {loading ? (
          <div className={styles.loader}>
            <span>Loading...</span>
          </div>
        ) : (
          /*['Crime', 'Drama', 'Mystery', 'Action', 'Documentary', 'Comedy', 'Musical', 'Music', 'Biography', 'Adventure', 'Animation', 'Fantasy', 'Horror', 'War', 'Family'] */
          <div className={styles.sub_container}>
            <nav className={styles.nav}>
              <h1>MOVIE TRAVEL</h1>
              <ul >
                <li onClick={() => changeGenres("ALL")}>ALL</li>
                <li onClick={() => changeGenres("Crime")}>Crime</li>
                <li onClick={() => changeGenres("Comedy")}>Comedy</li>
                <li onClick={() => changeGenres("Action")}>Action</li>
                <li onClick={() => changeGenres("Documentary")}>Documentary</li>
              </ul>
            </nav>
            <div className={styles.movies}>
              {movieList.map( (movie) => (
                movie === undefined ? null :
                <Movie 
                  key={movie.id}
                  id={movie.id}
                  coverImg={movie.medium_cover_image} 
                  title={movie.title} 
                  year={movie.year} 
                  runtime={movie.runtime} 
                  summary={movie.summary} 
                  genres={movie.genres}/>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}
export default Home;
