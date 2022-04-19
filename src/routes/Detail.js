import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail(){
    const {id} = useParams();
    const [detail, setDetail] = useState([]);
    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json()
        setDetail(json.data.movie)
        console.log(json.data.movie)
    };

    useEffect( () => {
       getMovie();
    }, []);

    return (
        <div className={styles.container}>
            <h2 className={styles.back_home}><Link to={"/home"}>|←</Link></h2>
            <img className={styles.back_image} src={detail.background_image}></img>
            <div className={styles.detail_movie}>
                <img className={styles.movie_image} src={detail.large_cover_image} />
                <div className={styles.movie_box}>
                    <h1>{detail.title_long}</h1>
                    <ul>
                    { detail.genres === undefined ? null : detail.genres.map( (item, idx) => {
                        return <li key={idx}> {item} { (idx + 1) === detail.genres.length ? "" : "/ "}</li>
                    })}
                    </ul>
                    <h2>★ {detail.rating}</h2>
                    <h3>{Math.round(detail.runtime / 60)}h {detail.runtime % 60}m ({detail.runtime} min)</h3>

                </div>
            </div>
        </div>
    );
}

export default Detail;