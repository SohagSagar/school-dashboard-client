import React, { useState } from 'react';
import '../../Styles/Student.css'
import { AiOutlinePlus } from 'react-icons/ai';
import AddStudent from './AddStudent';
import { useQuery } from 'react-query';
import StudentRow from './StudentRow';
import Loading from '../../SharedComponents/Loading';

const Students = () => {
    const [addModalStatus, setAddModalStatus] = useState(true);
    const [rowCount,setRowCount]=useState()
    const [searchedText, setSearchedText] = useState('');
    const { data: students, isLoading, refetch } = useQuery('students', () => fetch('https://peaceful-lowlands-64960.herokuapp.com/students').then(res => res.json()));




    return (
        <div className='w-full px-2 pt-8'>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold text-xl '>Students</h1>
                <div>
                    <input onChange={e => setSearchedText(e.target.value)} type="text" placeholder="Search by row" className="lg:input lg:input-bordered sm:input-sm " />
                    <label onClick={() => setAddModalStatus(true)} for="add-student-modal" className="btn modal-button text-white ml-3 w-28 btn-primary"><AiOutlinePlus className='mr-1 text-white' />Add</label>
                </div>
            </div>

            <div className="overflow-x-auto mt-5 student-table">
                <table className="table table-compact w-full font-semibold">
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
                        {
                            isLoading ? <Loading /> : <>
                                {
                                    [...students].reverse().filter((val) => {
                                        if (!searchedText) {
                                            return val;
                                        } else if (
                                            val.name.toLowerCase().includes(searchedText.toLowerCase()) ||
                                            val.class.toLowerCase().includes(searchedText.toLowerCase()) ||
                                            val.result.toLowerCase().includes(searchedText.toLowerCase()) ||
                                            val.grade.toLowerCase().includes(searchedText.toLowerCase())
                                        ) {
                                            return val;
                                        }
                                    }).map((student, index) => <StudentRow
                                        key={student.key}
                                        student={student}
                                        refetch={refetch}
                                        index={index+1}
                                        
                                        
                                    ></StudentRow>)
                                }

                            </>
                        }
                        

                    </tbody>

                </table>
                
            </div>
            {
                addModalStatus && <AddStudent refetch={refetch} setAddModalStatus={setAddModalStatus} />
            }
        </div>

    );
};

export default Students;