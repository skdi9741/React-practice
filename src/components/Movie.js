import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";


const mEnter = (event) => {
    let ele = event.target.closest("div");
    ele.style.transform = "scale(1.1)";
};
const mLeave = (event) => {
    let ele = event.target.closest("div");
    ele.style.transform = "scale(1.0)";
};
const minuteToHour = (runtime) => {
    return Math.round(runtime / 60) + "시간 " + Math.round(runtime % 60) + "분";
}

function Movie({id, coverImg, title, year, runtime, summary, genres}){
    return (
        <div className={styles.movie}  
            onMouseEnter={mEnter}
            onMouseLeave={mLeave}
        >
            <img src={coverImg} alt={title} className={styles.movie__img} />
            <span>
                <h2 className={styles.movie__title}>
                <Link to={`/movie/${id}`}>{title}</Link>
                </h2>
                <h3 className={styles.movie__year}>{year}</h3>
                <h3 className={styles.movie__runtime}>{(typeof runtime === 'undefined' || runtime === 0) ? null : minuteToHour(runtime)}</h3>
                <p>{summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}</p>
                
                <ul className={styles.movie__genres}>
                {genres.map((g) => (
                    <li key={g}>{g}</li>
                ))}
                </ul>
            </span>
        </div>
    );
}
Movie.propTypes = {
    id : PropTypes.number.isRequired,
    coverImg : PropTypes.string.isRequired,
    title : PropTypes.string.isRequired,
    year : PropTypes.number.isRequired,
    runtime : PropTypes.number.isRequired,
    summary : PropTypes.string.isRequired,
    genres : PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;