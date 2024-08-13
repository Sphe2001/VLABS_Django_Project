import React from "react";
import { application } from './Application';

interface ListProps{
    props: application
}

const List: React.FC<ListProps> = ({ props }) => {
	return (
		<ul role='list' className='divide-y divide-gray-100'>
			
				<li key={props.id} className='flex justify-between gap-x-6 py-5'>
				<div className="flex items-center"> 
					<img
						src={props.icon}
						alt='Application Image'
						width={50}
						height={50}
						className="mr-2 ml-5" 
					/> 
					<p className='text-sm font-semibold leading-6 text-gray-900'>
						{props.app_name}  {props.vendor} {props.version}
					</p>
                </div>
					
				</li>
			
		</ul>
	);
}

export default List;