import React, { useState } from 'react';
import useScore from '../../Hooks/useScore';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const UpdateStudent = ({updateData,refetch,setUpdateModalStatus}) => {
    const {_id,name,class:classes,score:updatedScore}=updateData;
    console.log(name,updatedScore);
    const [score, setScore] = useState(updatedScore);
    const [result,grade]=useScore(score)

    const { register,reset, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {

        const UpdateStudentData = {
            ...data,
            result,
            grade
        }
        console.log(UpdateStudentData);

        //update data to database
        fetch(`http://localhost:5000/student/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(UpdateStudentData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
            <input type="checkbox" id="update-student-modal" class="modal-toggle" />
            <div class="modal modal-middle sm:modal-middle">
                <div class="modal-box">
                    <label for="update-student-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="font-bold text-lg mb-3">Add Student</h3><hr />

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* student name  */}
                        <label class="label">
                            <span class="label-text">Student Name<sup >*</sup></span>
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
                        })} type="text" defaultValue={name} placeholder="Type here" class="input input-bordered input-sm w-full max-w-lg" />

                        {
                            errors?.name &&
                            <label class="label">
                                {
                                    errors?.name.type === 'required' | errors?.name.type === 'minLength' &&
                                    <span class="label-text-alt text-red-500">{errors?.name?.message}</span>
                                }

                            </label>
                        }




                        {/* student class */}
                        <label class="label">
                            <span class="label-text">Class<sup >*</sup></span>
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

                        })} type="number" defaultValue={classes} placeholder="Type here" class="input input-bordered input-sm w-full max-w-lg" />

                        {
                            errors?.class &&
                            <label class="label">
                                {
                                    errors?.class.type === 'required' | errors?.class.type === 'min' | errors?.class.type === 'max' &&
                                    <span class="label-text-alt text-red-500">{errors?.class?.message}</span>
                                }

                            </label>
                        }


                        {/* scores */}
                        <label class="label">
                            <span class="label-text">Score<sup >*</sup></span>
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
                        })} onChange={e => setScore(parseInt(e?.target?.value))} defaultValue={updatedScore} type="number" placeholder="Type here" class="input input-bordered input-sm w-full max-w-lg" />

                        {
                            errors?.score &&
                            <label class="label">
                                {
                                    errors?.score.type === 'required' | errors?.score.type === 'min' | errors?.score.type === 'max' &&
                                    <span class="label-text-alt text-red-500">{errors?.score?.message}</span>
                                }

                            </label>
                        }

                        {/* result   */}
                        <label class="label">
                            <span class="label-text">Result</span>
                        </label>

                        <p placeholder='-' class={result === 'Passed' ? "badge badge-lg badge-success text-white font-semibold" : "hidden" | result === 'Failed' ? "badge badge-lg badge-error text-white font-semibold" : "hidden"}>{result}</p>



                        {/* grade   */}
                        <label class="label">
                            <span class="label-text">Grade</span>
                        </label>
                        <p class={grade === 'Poor' ? " text-red-500 font-semibold ml-1" : "hidden" | grade === 'Average' ? "text-primary font-semibold ml-1" : "hidden" | grade === 'Excellent' ? "text-green-500 font-semibold ml-1" : "hidden"}>{grade}</p><hr className='mt-5' />



                        <div class="modal-action flex justify-start">
                            <button type='submit' class="btn btn-primary text-white font-semibold btn-sm">Confirm</button>
                            <label for="update-student-modal" class="btn btn-outline btn-error text-white font-semibold btn-sm">Close</label>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default UpdateStudent;