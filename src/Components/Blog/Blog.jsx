import React from 'react'
import "./Blog.css"
import { Swiper,SwiperSlide } from 'swiper/react'
import profilePic1 from '../../img/profile1.jpg';
import profilePic2 from '../../img/profile2.jpg';
import profilePic3 from '../../img/profile3.jpg';
import profilePic4 from '../../img/profile4.jpg';
import {Pagination} from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css';

const Testimonials = () => {
    const clients=[
        {
            img:profilePic1,
            review:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum nulla soluta qui vitae vel, architecto, incidunt magni earum aliquam, voluptatem tempore? Sunt nulla nesciunt, veritatis ipsam enim quidem aliquid numquam!",
        },

        {
            img:profilePic2,
            review:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum nulla soluta qui vitae vel, architecto, incidunt magni earum aliquam, voluptatem tempore? Sunt nulla nesciunt, veritatis ipsam enim quidem aliquid numquam!'
        },

        {
            img:profilePic3,
            review:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum nulla soluta qui vitae vel, architecto, incidunt magni earum aliquam, voluptatem tempore? Sunt nulla nesciunt, veritatis ipsam enim quidem aliquid numquam!",
        },

        {
            img:profilePic4,
            review:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum nulla soluta qui vitae vel, architecto, incidunt magni earum aliquam, voluptatem tempore? Sunt nulla nesciunt, veritatis ipsam enim quidem aliquid numquam!'
        },


    ];
  return (
<div className="t-wrapper" id='Blog'>
    <div className="t-heading">
        <span>Client always get</span>
        <span>EXception Work</span>
        <span>From me...</span>
    <div className="blur t-blur1" style ={{background:"var(--purple)"}}></div>
    <div className="blur t-blur2" style ={{background:"skyblue"}}></div>
    </div>
    {/* slider */}
    <Swiper 
        modules={[Pagination]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        >
        {clients.map((clients, index)=>{
            return(
                 <SwiperSlide key={index}>
                    <div className="testimonials">
                    <img src={clients.img} alt="image" />
                    <span>{clients.review}</span>
                    </div>
                </SwiperSlide>
            )
        })}
    </Swiper>
</div>
  )
}

export default Testimonials