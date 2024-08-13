import { Computer } from "./Computer";
import Link from 'next/link';

interface CompProps {
  props: Computer;
}

const Card: React.FC<CompProps> = ({ props }) => {
  const Bookhref = "/bookings/" + props.id;
  
  
  return (
    <>
      <main className='mx-auto max-w-7xl py-0.1 my-4 sm:px-6 lg:px-2'>
        <div className="shadow-sm p-1 rounded-lg relative">
          <a key={props.id} className={`group ${!props.is_available ? 'cursor-not-allowed' : ''}`}>
            <div className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ${!props.is_available ? 'opacity-50' : ''}`}>
              <img
                src='https://icons.iconarchive.com/icons/vexels/office/256/desktop-icon.png'
                alt='Computer image'
                className="h-full w-full object-cover object-center"
              />
              {!props.is_available && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-2xl">
                  Booked
                </div>
              )}
            </div>
            <h3 className="mt-1 text-lg font-medium text-gray-900 text-center">{props.computer_name}</h3>
          </a>
          <div className="items-center mt-4">
            {props.is_available ? (
              <Link href={Bookhref}>
                <p className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center">
                  Book
                </p>
              </Link>
            ) : (
              <p className="bg-blue-500 opacity-50 text-white font-bold py-2 px-4 rounded text-center cursor-not-allowed">
                Book
              </p>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Card;
