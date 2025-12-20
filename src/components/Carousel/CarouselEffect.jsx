import React from 'react';
import {Carousel} from 'react-responsive-carousel'
import {img} from './img/data'
import'react-responsive-carousel/lib/styles/carousel.min.css';
import classes from './carousel.module.css'

const CarouselEffect = () => {
    return (
        <div>
            <Carousel
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                showIndicators={false}
            >
               {
                img.map((imageItemLink)=>{
                    return(
                        <div>
                            <img src={imageItemLink} />
                        </div>
                    )
                }
               )} 
            </Carousel>
            <div className={classes.hero_img}>

            </div>
            
        </div>
    );
}

export default CarouselEffect;
