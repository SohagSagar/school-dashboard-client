import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BsPencil } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import swal from 'sweetalert';
import Loading from '../../SharedComponents/Loading';
import UpdateStudent from './UpdateStudent';

const StudentRow = ({ student, refetch, index }) => {
    console.log('index',index);
    const [updateData, setUpdateData] = useState({});
    const [updateModalStatus, setUpdateModalStatus] = useState(true);
    const { _id, name, class: classes, score, result, grade } = student;



    //update student informations
    const studentUpdate = (_id) => {

        fetch(`https://peaceful-lowlands-64960.herokuapp.com/student/${_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => setUpdateData(data))
            setUpdateModalStatus(true);
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

                    fetch(`https://peaceful-lowlands-64960.herokuapp.com/student/${_id}`, {
                        method: 'DELETE',
                        headers: {
                            'content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {

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
            <td>{classes}th</td>
            <td>{
                <p placeholder='-' className={result === 'Passed' ? "badge badge-md badge-success text-white font-semibold" : "hidden" | result === 'Failed' ? "badge badge-md badge-error text-white font-semibold" : "hidden"}>{result}</p>
            }</td>
            <td>{score}/100</td>
            <td>{
                <p className={grade === 'Poor' ? " text-red-500 font-semibold ml-1" : "hidden" | grade === 'Average' ? "text-primary font-semibold ml-1" : "hidden" | grade === 'Excellent' ? "text-green-500 font-semibold ml-1" : "hidden"}>{grade}</p>
            }</td>
            <td className='flex items-center justify-start mt-2'><>
                <label for="update-student-modal"><BsPencil onClick={() => studentUpdate(_id)} className='cursor-pointer text-green-500 ' /></label>
                <RiDeleteBin6Line onClick={() => studentDelete(_id)} className='cursor-pointer text-red-500 ml-3' />
            </></td>


            {
                updateModalStatus && < UpdateStudent setUpdateModalStatus={setUpdateModalStatus} refetch={refetch} updateData={updateData}></UpdateStudent >
            }

        </tr >
    );
};

export default StudentRow;