import React from 'react';
import toast from 'react-hot-toast';
import { BsPencil } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import swal from 'sweetalert';

const StudentRow = ({ student, refetch, index }) => {
    const { _id, name, class: classes, score, result, grade } = student;

    //update student informations
    const studentUpdate = (_id) => {
        console.log(_id);
        
    }

    //deleting student
    const studentDelete = (_id) => {
        swal({
            title: `Are you sure to delete ${name}?`,

            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {

                    fetch(`http://localhost:5000/student/${_id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);

                        if (data.deletedCount > 0) {
                            toast.success('Delete Successfully')
                             refetch();
                        }
                        else {
                            toast.error('Fail to delete');
                        }
                    })
                    
                } 
            });
    }
    return (
        <tr>
            <th>{index}</th>
            <td>{name}</td>
            <td>{classes}</td>
            <td>{
                <p placeholder='-' class={result === 'Passed' ? "badge badge-md badge-success text-white font-semibold" : "hidden" | result === 'Failed' ? "badge badge-md badge-error text-white font-semibold" : "hidden"}>{result}</p>
            }</td>
            <td>{score}/100</td>
            <td>{
                <p class={grade === 'Poor' ? " text-red-500 font-semibold ml-1" : "hidden" | grade === 'Average' ? "text-primary font-semibold ml-1" : "hidden" | grade === 'Excellent' ? "text-green-500 font-semibold ml-1" : "hidden"}>{grade}</p>
            }</td>
            <td className='flex items-center justify-start mt-2'><>
                <BsPencil onClick={() => studentUpdate(_id)} className='cursor-pointer text-green-500 ' />
                <RiDeleteBin6Line onClick={() => studentDelete(_id)} className='cursor-pointer text-red-500 ml-3' />
            </></td>

        </tr>
    );
};

export default StudentRow;