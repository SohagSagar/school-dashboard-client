import React, { useEffect, useState } from 'react';
import useScore from '../../Hooks/useScore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Loading from '../../SharedComponents/Loading';

const UpdateStudent = ({ updateData, refetch, setUpdateModalStatus }) => {
    // const { _id, name, class: classes, score: updatedScore } = updateData;
    // console.log(_id, name, updatedScore);

    const [_id,setId]=useState('');
    const [name,setName]=useState('');
    const [classes,setClasses]=useState('');
    const [updatedScore,setUpdatedScore]=useState('');

    useEffect(()=>{
        const {_id, name, class: classes, score: updatedScore } = updateData;
        setId(_id)
        setName(name);
        setClasses(classes);
        setUpdatedScore(updatedScore);
        console.log('new');
    },[updateData]);
    console.log(name);

    const [score, setScore] = useState(updatedScore);
    const [result, grade] = useScore(score ? score : updatedScore);

    const { register, reset, handleSubmit, watch, formState: { errors } } = useForm();
    if (!updateData) {
        return <Loading />
    }

    //geting student updated data
    const onSubmit = data => {

        const UpdateStudentData = {
            ...data,
            result,
            grade
        }


        //update data to database
        fetch(`https://peaceful-lowlands-64960.herokuapp.com/student/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(UpdateStudentData)
        })
            .then(res => res.json())
            .then(data => {

                if (data?.modifiedCount) {
                    toast.success('Student Update Successfully!');
                    setUpdateModalStatus(false);
                    refetch();
                    reset();
                }
                else {
                    toast.error('Fail to Update.Try Again')
                }
            });
    }

    return (
        <div>
            <input type="checkbox" id="update-student-modal" className="modal-toggle" />
            <div className="modal modal-middle sm:modal-middle">
                <div className="modal-box">
                    <label for="update-student-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg mb-3">Update Student</h3><hr />    

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* student name  */}
                        <label className="label">
                            <span className="label-text">Student Name<sup >*</sup></span>
                        </label>
                        <input {...register('name', {
                            required: {
                                value: true,
                                message: "Field is required"
                            },
                            minLength: {
                                value: 5,
                                message: "Minimum length should be 5."
                            }
                        })} type="text" placeholder="Type here" className="input input-bordered input-sm w-full max-w-lg" value={name}   />

                        {
                            errors?.name &&
                            <label className="label">
                                {
                                    errors?.name.type === 'required' | errors?.name.type === 'minLength' &&
                                    <span className="label-text-alt text-red-500">{errors?.name?.message}</span>
                                }

                            </label>
                        }




                        {/* student class */}
                        <label className="label">
                            <span className="label-text">Class<sup >*</sup></span>
                        </label>
                        <input {...register('class', {
                            required: {
                                value: true,
                                message: "Field is required"
                            },
                            min: {
                                value: 1,
                                message: "Please input values between 1 & 12"
                            },
                            max: {
                                value: 12,
                                message: "Please input values between 1 & 12"
                            }

                        })} type="number" placeholder="Type here" className="input input-bordered input-sm w-full max-w-lg" defaultValue={classes} />

                        {
                            errors?.class &&
                            <label className="label">
                                {
                                    errors?.class.type === 'required' | errors?.class.type === 'min' | errors?.class.type === 'max' &&
                                    <span className="label-text-alt text-red-500">{errors?.class?.message}</span>
                                }

                            </label>
                        }


                        {/* scores */}
                        <label className="label">
                            <span className="label-text">Score<sup >*</sup></span>
                        </label>

                        <input  {...register('score', {
                            required: {
                                value: true,
                                message: "Field is required"
                            },
                            min: {
                                value: 0,
                                message: "Please input values between 0 & 100"
                            },
                            max: {
                                value: 100,
                                message: "Please input values between 0 & 100"
                            }
                        })} onChange={e => setScore(parseInt(e?.target?.value))} type="number" placeholder="Type here" className="input input-bordered input-sm w-full max-w-lg" defaultValue={updatedScore} />

                        {
                            errors?.score &&
                            <label className="label">
                                {
                                    errors?.score.type === 'required' | errors?.score.type === 'min' | errors?.score.type === 'max' &&
                                    <span className="label-text-alt text-red-500">{errors?.score?.message}</span>
                                }

                            </label>
                        }

                        {/* result   */}
                        <label className="label">
                            <span className="label-text">Result</span>
                        </label>

                        <p placeholder='-' className={result === 'Passed' ? "badge badge-lg badge-success text-white font-semibold" : "hidden" | result === 'Failed' ? "badge badge-lg badge-error text-white font-semibold" : "hidden"}>{result}</p>



                        {/* grade   */}
                        <label className="label">
                            <span className="label-text">Grade</span>
                        </label>
                        <p className={grade === 'Poor' ? " text-red-500 font-semibold ml-1" : "hidden" | grade === 'Average' ? "text-primary font-semibold ml-1" : "hidden" | grade === 'Excellent' ? "text-green-500 font-semibold ml-1" : "hidden"}>{grade}</p><hr className='mt-5' />



                        <div className="modal-action flex justify-start">
                            <button type='submit' className="btn btn-primary text-white font-semibold btn-sm">Confirm</button>
                            <label for="update-student-modal" className="btn btn-outline btn-error text-white font-semibold btn-sm">Close</label>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default UpdateStudent;