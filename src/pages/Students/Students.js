import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { RiDeleteBin6Line } from 'react-icons/ri';
import '../../Styles/Student.css'
import { AiOutlinePlus } from 'react-icons/ai';
import AddStudent from './AddStudent';


const Students = () => {
    const [addModalStatus,setAddModalStatus]=useState(true)
    return (

        <div className='w-full px-2 pt-8'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-xl '>Students</h1>
                <div>
                    <input type="text" placeholder="Search" class="lg:input lg:input-bordered sm:input-sm " />
                    <label onClick={()=>setAddModalStatus(true)} for="add-student-modal" class="btn modal-button text-white ml-3 w-28 btn-primary"><AiOutlinePlus className='mr-1 text-white'/>Add</label>
                </div>
            </div>

            <div class="overflow-x-auto mt-5 student-table">
                <table class="table table-compact w-full ">
                    <thead>
                        <tr>
                            <th className='normal-case'>No.</th>
                            <th className='normal-case'>Student Name</th>
                            <th className='normal-case'>Class</th>
                            <th className='normal-case'>Result</th>
                            <th className='normal-case'>Score</th>
                            <th className='normal-case'>Grade</th>
                            <th className='normal-case'>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>1</th>
                            <td>Cy Ganderton</td>
                            <td>Quality Control Specialist</td>
                            <td>Littel, Schaden and Vandervort</td>
                            <td>Canada</td>
                            <td>12/16/2020</td>
                            <td className='flex items-center justify-between '><>
                                <BsPencil className='cursor-pointer text-green-500 ' />
                                <RiDeleteBin6Line className='cursor-pointer text-red-500' />
                            </></td>
                        </tr>




                    </tbody>

                </table>
            </div>
            {
              addModalStatus &&  <AddStudent setAddModalStatus={setAddModalStatus}/>
            }
        </div>

    );
};

export default Students;