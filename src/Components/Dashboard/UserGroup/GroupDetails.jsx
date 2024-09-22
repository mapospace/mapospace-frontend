import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { clearGroupData, toggleVisibility } from '../../../Store/Slices/GroupDetailsSlice';
import { useDispatch } from 'react-redux';

const GroupDetails = ({ data }) => {
    const dispatch = useDispatch();

    const closeHandler = () => {
        dispatch(clearGroupData()); // Optionally set the group data
        dispatch(toggleVisibility());
    }

    return (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,.5)] text-black flex items-center justify-center">
            <div className="relative bg-white p-4 rounded shadow-lg w-[80vw] flex flex-col">
                <div className='pt-2 pb-4 border-b-2 w-full flex justify-between items-center'>
                    <div className='font-bold text-lg'>
                        Group Details
                    </div>
                    <XMarkIcon className='w-7' onClick={closeHandler} />
                </div>
                <RowData title="Group Id" value={data._id} />
                <RowData title="Group Name" value={data.name} />
                <RowData title="Group Admin" value={data.groupAdmin == null ? "null" : data.groupAdmin.firstName + " " + data.groupAdmin.lastName} />
                <UserData title="User Name" value={data.users} />
            </div>
        </div>
    );
};

export default GroupDetails;


const RowData = ({ title, value, border = true }) => {
    return <div className={`p-3 flex justify-between items-center ${border ? 'border-b-[1px]' : ''}`}>
        <div className='text-md '>
            {title}
        </div>
        <div className='text-md'>
            {value}
        </div>

    </div>
}

const UserData = ({ title, value }) => {
    return <div className='p-3 flex-col justify-between items-center '>
        <div className='text-md '>
            {title}
        </div>

        {value.map((user) => (
            <div>
                <RowData title="ID:" value={user._id} border={false} />
                <RowData title="Business Email:" value={user.businessEmail} border={false} />
                <RowData title="Name:" value={user.firstName + " " + user.lastName} />
            </div>
        ))}


    </div >
}
