import { Laboratory } from "./Laboratory";
import React from "react";
import Link from 'next/link';

interface CardProps {
  props: Laboratory;
}

const Card: React.FC<CardProps> = ({ props }) => {
  const href = props.is_available ? `/laboratories/${props.id}` : undefined;
  const borderColor = props.is_available ? "bg-blue-500 shadow-lg shadow-blue-500/50" : "bg-blue-500 shadow-lg shadow-red-500/50";
  const cursorHover = props.is_available ? "cursor-pointer" : "cursor-not-allowed";
  const labNameColor= props.is_available ? "text-blue-500" : "text-red-500";
  const Apphref = "/applications/" + props.id;
  
  return (
    <>
      <main className='mx-auto max-w-7xl  my-4 sm:px-6 lg:px-2'>
        <a key={props.id} href={href} className="group">
          <div className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow-md hover:${borderColor}  border border-transparent transition duration-300 ${cursorHover} relative`}>
            <img
              src='http://www.student-times.co.za/wp-content/uploads/2017/06/Computer-Lab2.jpg'
              alt='Lab Image'
              className="h-full w-full object-cover object-center group-hover:opacity-30"
            />
            {!props.is_available && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-2xl">
                Closed
              </div>
            )}
            <div>
            <h3 className={`mt-1 text-lg font-medium ${labNameColor} text-center`}>{props.building_no}-{props.lab_name}</h3>
            <p className="mt-1 text-sm text-gray-700 text-center">Number of Computers: <b>{props.number_of_pcs}</b></p>
            <Link href={Apphref}>
              <p className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center">
                View Apps
              </p>
            </Link>
          </div>
          </div>
          
        </a>  
      </main>
    </>
  );
}

export default Card;
