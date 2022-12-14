import React from 'react';
import { Navigate } from 'react-router-dom';
import { tmdbAPI } from '../../config';
import Button from '../button/Button';


const BannerItem = ({item}) => {
    const {poster_path,title,id} = item;
    return (
        <div className='banner h-[400px] page-container mb-2' >
        <div className="relative w-full h-full overflow-hidden rounded-lg">
          <div className="absolute inset-0 rounded-xl overlay bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(48,0,161,0.61)]"></div>
          <img
            src={tmdbAPI.img500(poster_path)}
            alt=""
            className="object-cover object-top w-full h-full rounded-xl"
          />
          <div className="absolute w-full text-white bottom-5 left-5">
            <h2 className="mb-5 text-3xl font-bold">{title}</h2>
            <div className="flex items-center mb-8 gap-x-3">
              <button className="p-2 font-bold border border-white rounded-lg">
                Action
              </button>
              <button className="p-2 font-bold border border-white rounded-lg">
                Adventure
              </button>
              <button className="p-2 font-bold border border-white rounded-lg">
                Drama
              </button>
            </div>
            <Button onClick={()=>Navigate(`/movie/${id}`)} width='' bgColor='primary'>Click more</Button>
          </div>
        </div>
      </div>
    );
};

export default BannerItem;