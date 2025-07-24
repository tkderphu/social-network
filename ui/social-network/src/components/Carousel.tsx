// Carousel.js
import React from 'react';

const Carousel = ({ id, images }: any) => {
    return (
        <>
            {images && images.length > 0 && (
                <div
                    id={`carouselExampleIndicators-${id}`}
                    className="carousel slide"
                    data-ride="carousel"
                >
                    <ol className="carousel-indicators">
                        <li
                            data-target={`#carouselExampleIndicators-${id}`}
                            data-slide-to={0}
                            className="active"
                        />
                        <li data-target={`#carouselExampleIndicators-${id}`} data-slide-to={1} />
                        <li data-target={`#carouselExampleIndicators-${id}`} data-slide-to={2} />
                    </ol>
                    <div className="carousel-inner">
                        {images.map((url: any) => {
                            return (
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src={url} height={300} />
                                </div>
                            )
                        })}
                    </div>
                    <a
                        className="carousel-control-prev"
                        href={`#carouselExampleIndicators-${id}`}
                        role="button"
                        data-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true" />
                        <span className="sr-only">Previous</span>
                    </a>
                    <a
                        className="carousel-control-next"
                        href={`#carouselExampleIndicators-${id}`}
                        role="button"
                        data-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true" />
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            )}
        </>
    )
};

export default Carousel;
