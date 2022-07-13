import React from 'react';
import { BsPencil } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';

const StudentRow = ({student,refetch,index}) => {
    const {_id,name,class:classes,score,result,grade}=student;

    //update student informations
    const studentUpdate=(_id)=>{
        console.log(_id);
    }

    //deleting student
    const studentDelete=(_id)=>{
        console.log(_id);
    }
    return (
        <tr>
            <th>{index}</th>
            <td>{name}</td>
            <td>{classes}</td>
            <td>{
                <p placeholder='-' class={result === 'Passed' ? "badge badge-md badge-success text-white font-semibold" : "hidden" | result === 'Failed' ? "badge badge-md badge-error text-white font-semibold" : "hidden"}>{result}</p>
            }</td>
            <td>{score}</td>
            <td>{
                <p class={grade === 'Poor' ? " text-red-500 font-semibold ml-1" : "hidden" | grade === 'Average' ? "text-primary font-semibold ml-1" : "hidden" | grade === 'Excellent' ? "text-green-500 font-semibold ml-1" : "hidden"}>{grade}</p>    
            }</td>
            <td className='flex items-center justify-start '><>
                <BsPencil onClick={()=>studentUpdate(_id)} className='cursor-pointer text-green-500 ' />
                <RiDeleteBin6Line onClick={()=>studentDelete(_id)} className='cursor-pointer text-red-500 ml-3' />
            </></td>
            
        </tr>
    );
};

export default StudentRow;