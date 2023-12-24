import React, { useState, useEffect, useRef } from 'react'
import { FaHeart, FaInfoCircle, FaPlay, FaHandPointUp } from "react-icons/fa";
import Hover from './Hover';
import { Link } from 'react-router-dom';
import { convertDuration, makeUrlSlug, generateKey } from "../Utils/Utils";

const Item = (props: any) => {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const item = props.data;
    const setLoader = props.setLoader;
    const loader = props.loader;
    const refreshPage = props.refreshPage;
    // console.log(item);
    let urlSlug = '../details/' + makeUrlSlug(item.title) + '/' + item._id;
    let hoverId = makeUrlSlug(item.title + new Date().getTime());
    return (
        <Link className='detail-link' to={urlSlug} state={{ data: item }} key={generateKey(item._id + "0")} id={hoverId} onClick={() => refreshPage(urlSlug)}>
            <div className="slider-item" key={generateKey(item._id)}>
                <img src={item.thumbnail} alt={item.title} className='fullThumbnail' key={generateKey(item.banner + "23")}></img>
                <div className="thumbnailBx" key={generateKey(item._id + item.title)}>
                    <Hover url={item.stream_file} poster={item.banner} isVideoPlaying={isVideoPlaying} id={hoverId} />
                    {/* <a href="detail" key={generateKey(item._id + "0")}><img src={item.thumbnail} alt={item.title} key={generateKey(item._id + item.thumbnail)}></img></a> */}
                    <div className="thumbData" key={generateKey(item._id + "1")}>
                        <div className='d-flex'>
                            <h6 className="thumbTitle" key={generateKey(item._id + "2")}>{item.title}</h6>
                            <span className="quality" key={generateKey(item._id + "3")}>HD</span>
                        </div>
                        <ul className="subInfo" key={generateKey(item._id + "4")}>
                            <li className="category" key={generateKey(item._id + "5")}>{item.rating}</li>
                            <li className="duration" key={generateKey(item._id + "6")}>{convertDuration(item.duration)}</li>
                        </ul>
                        <p className="thumbDesc" key={generateKey(item._id + "7")}>{item.short_description} </p>
                        <ul className="subInfo" key={generateKey(item._id + "8")}>
                            <li className="genre" key={generateKey(item._id + "9")}>
                                {
                                    item.genre.map((data: any, i: any) => {
                                        if (i < 3) return <span key={generateKey(data.genre)}>{data.genre}</span>
                                    })
                                }
                            </li>
                        </ul>
                        <ul className="thumbnal_actionsUl" key={generateKey(item._id + "11")}>
                            <li key={generateKey(item._id + "12")}><button className="btn default-btn whiteBtn thumbHeart" key={generateKey(item._id + "13")}>
                                {item.type == 'M'
                                    ? <FaHeart key={generateKey(item._id + "22")} className={item.is_fav ? 'my-fav-icon' : 'fav-icon'}></FaHeart>
                                    : <FaHandPointUp key={generateKey(item._id + "22")} className={item.is_vote ? 'my-fav-icon' : 'vote-icon'}></FaHandPointUp>
                                }
                            </button></li>
                            <li key={generateKey(item._id + "14")}>
                                <button className="btn default-btn thumbInfo" key={generateKey(item._id + "15")}><FaInfoCircle key={generateKey(item._id + "20")}></FaInfoCircle></button>
                                <button className="btn default-btn thumbPlay" key={generateKey(item._id + "16")}><FaPlay key={generateKey(item._id + "21")}></FaPlay></button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    )
    // });
};

export default Item;