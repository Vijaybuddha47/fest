import React from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { FaPlay, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const ItemDetail = () => {
    return (
        <>
            <Row className="item-description">
                <h2 className="item-Title">ALBATROSS <span className="quality">HD</span></h2>
                <ul className="item-info">
                    <li className="item-category">TV-PG </li>
                    <li className="item-genre">| <span>ADVENTURE</span> <span>ACTION</span>  <span>FANTASY</span> |</li>
                    <li className="item-duration"> 1hr 20min</li>
                </ul>
                <p className="item-maker">Filmmaker : <span>Sam Raimi</span></p>
                <p className="item-short-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                <Col>
                    <Button className='default-btn'><FaPlay /> Watch Now</Button>
                    <Link className='favoriteLink' to="#"><FaHeart /></Link>
                </Col>
            </Row>
        </>
    )
}
