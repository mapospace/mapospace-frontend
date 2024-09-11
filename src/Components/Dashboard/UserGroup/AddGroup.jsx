import React, { useState, useRef, useEffect } from 'react';

export default function CreateGroupForm () {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const inputRef = useRef(null);

  // Sample data for members
  const allMembers = [
    'Aman Kulshrestha',
    'Prabhutva Singh Bisht',
    'John Doe',
    'Jane Smith',
  ];

 
  const filteredMembers = allMembers.filter(
    (member) =>
      member.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !members.includes(member)
  );

  const addMember = (member) => {
    setMembers([...members, member]);
    setSearchTerm('');
    setDropdownVisible(false);
  };

  const removeMember = (member) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ groupName, groupDescription, members });
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [inputRef]);

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white  rounded-md">
      <h2 className="text-xl font-semibold mb-2 font-poppins">Create Group</h2>
      <p className="mb-4 text-gray-500 font-poppins">Manage your team groups.</p>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 font-poppins" htmlFor="groupName">Group Name</label>
        <input
          type="text"
          id="groupName"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 font-poppins"
          placeholder="Name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 font-poppins" htmlFor="groupDescription">Group Description</label>
        <textarea
          id="groupDescription"
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 font-poppins"
          placeholder="Description.."
        ></textarea>
      </div>

      <div className="mb-4 relative" ref={inputRef}>
        <label className="block text-sm font-medium mb-1 font-poppins" htmlFor="groupMembers">Group Members</label>
        <input
          type="text"
          id="groupMembers"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setDropdownVisible(true)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 font-poppins"
          placeholder="Search for members"
        />
        {dropdownVisible && filteredMembers.length > 0 && (
          <ul className="absolute z-10 w-full border border-t-0 rounded-b-md shadow-md bg-white max-h-32 overflow-y-auto mt-1 font-poppins">
            {filteredMembers.map((member, index) => (
              <li
                key={index}
                onClick={() => addMember(member)}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer font-poppins"
              >
                {member}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 flex flex-wrap gap-2 font-poppins">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-1 bg-gray-100 rounded-full font-poppins"
            >
              <span>{member}</span>
              <button
                type="button"
                onClick={() => removeMember(member)}
                className="ml-2 text-red-500 hover:text-red-700 font-poppins"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 font-poppins">
        <button
          type="button"
          className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 font-poppins"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 font-poppins"
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};


