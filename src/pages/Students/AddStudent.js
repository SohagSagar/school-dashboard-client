import React from 'react';
import { useForm } from 'react-hook-form';

const AddStudent = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    return (
        <div>
            <input type="checkbox" id="add-student-modal" class="modal-toggle" />
            <div class="modal modal-middle sm:modal-middle">
                <div class="modal-box">
                    <label for="add-student-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 class="font-bold text-lg mb-3">Add Student</h3><hr />

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* student name  */}
                        <label class="label">
                            <span class="label-text">Student Name<sup >*</sup></span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-lg" />

                        {/* student class */}
                        <label class="label">
                            <span class="label-text">Class<sup >*</sup></span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-lg" />

                        {/* scores */}
                        <label class="label">
                            <span class="label-text">Score<sup >*</sup></span>
                        </label>
                        <input type="text" placeholder="Type here" class="input input-bordered input-sm w-full max-w-lg" />

                        {/* result   */}
                        <label class="label">
                            <span class="label-text">Result</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input  input-sm w-full max-w-lg" />


                        {/* grade   */}
                        <label class="label">
                            <span class="label-text">Grade</span>
                        </label>
                        <input type="text" placeholder="Type here" class="input  input-sm w-full max-w-lg" />

                        <input type="submit" value="submit" />

                        <div class="modal-action">
                            <label type="submit" for="add-student-modal" class="btn">Yay!</label>
                        </div>
                    </form>


                </div>
            </div>
        </div>
    );
};

export default AddStudent;