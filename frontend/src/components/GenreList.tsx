import Col from "react-bootstrap/Col";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const GenreList = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 800,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    dots: false,
                    arrows: false,
                }
            }
        ]
    };
    return (
        <>
            <div className="col-sm-12">
                <Slider {...settings}>
                    <div className="slider genreSlider">
                        <div>
                            <button className="btn default-btn"> Drama</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Adventure</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Biography</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Art & Culture</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Science & Tech</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Current History</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Drama</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Adventure</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Biography</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Art & Culture</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Science & Tech</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Current History</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Drama</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Adventure</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Biography</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Art & Culture</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Science & Tech</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Current History</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Drama</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Adventure</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Biography</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Art & Culture</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Science & Tech</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Current History</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Drama</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Adventure</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Biography</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Art & Culture</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Science & Tech</button>
                        </div>

                        <div>
                            <button className="btn default-btn"> Current History</button>
                        </div>
                    </div>
                </Slider>
            </div>
            {/* <Col className="genre-list default-btn">{personName}</Col> */}
        </>
    );
}
export default GenreList;