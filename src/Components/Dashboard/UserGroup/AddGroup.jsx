import React, { useState, useRef, useEffect } from 'react';
import api from '../../Common/interceptor'; // Adjust the import path as necessary
import Snackbar from "../../Common/snackbar";
import LoadingBar from 'react-top-loading-bar';

export default function CreateGroupForm() {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [groupadminId, setGroupadminId] = useState('');
  const [users, setUsers] = useState([]); // State for users from API
  const [errors, setErrors] = useState({}); // State for validation errors
  const inputRef = useRef(null);
  const loadingBarRef = useRef(null);
  const [snackbar, setSnackbar] = useState({
    isVisible: false,
    message: "",
    type: "",
  });
  const currentPage = 1; 

  const fetchUsers = async () => {
    loadingBarRef.current.continuousStart();
    try {
      const response = await api.get(`/user-mgmt/non-root-users`, {
        params: { page: currentPage, limit: 1000 },
      });

      const { docs } = response.data.data;
      const formattedUsers = docs.map(user => ({
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        verified: user.verified,
        rootUser: user.rootUser,
        active: user.active,
        email: user.email
      }));

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setSnackbar({
        isVisible: true,
        message: "Failed to fetch users.",
        type: "error",
      });
    } finally {
      loadingBarRef.current.complete();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!groupName.trim()) newErrors.groupName = "Group Name is required.";
    if (!groupDescription.trim()) newErrors.groupDescription = "Group Description is required.";
    if (!groupadminId) newErrors.groupadminId = "Group Admin is required.";
    if (members.length === 0) newErrors.members = "At least one member is required.";
    if (!members.some(member => member.id === groupadminId)) newErrors.groupadminId = "Group Admin must be selected from group members.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    loadingBarRef.current.continuousStart();
    
    if (!validate()) return;
    
 
    const memberIds = members.map(member => member.id);
    
  
    const payload = {
      name: groupName,
      userIds: memberIds, 
      groupAdminId: groupadminId,
    };
    
    try {
      const response = await api.post(`user-group/create`, payload);
      console.log("Group created successfully:", response.data);
      
      
      setSnackbar({
        isVisible: true,
        message: "Group created successfully!",
        type: "success",
      });
      
    
      setGroupName('');
      setGroupDescription('');
      setMembers([]);
      setGroupadminId('');
    } catch (error) {
      
    
      setSnackbar({
        isVisible: true,
        message: "Failed to create group.",
        type: "error",
      });
    
    } finally {
      loadingBarRef.current.complete();
    }
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

  const filteredMembers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !members.some(member => member.id === user.id) &&
      user.id !== groupadminId
  );

  const addMember = (user) => {
    setMembers([...members, user]);
    setSearchTerm('');
    setDropdownVisible(false);
  };

  const removeMember = (user) => {
    setMembers(members.filter((m) => m.id !== user.id));
  };

  const handleGroupAdminChange = (e) => {
    const selectedAdminId = e.target.value;
    const selectedAdmin = users.find(user => user.id === selectedAdminId);

    if (selectedAdmin && !members.some(member => member.id === selectedAdminId)) {
      setMembers([...members, selectedAdmin]);
    }

    setGroupadminId(selectedAdminId);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ isVisible: false, message: "", type: "" });
  };

  return (
    <div className="p-6">
      <LoadingBar color="#f11946" ref={loadingBarRef} />
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded-md">
        <h2 className="text-xl font-semibold mb-2 font-poppins">Create Group</h2>
        <p className="mb-4 text-gray-500 font-poppins">Manage your team groups.</p>
        
        

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 font-poppins" htmlFor="groupName">Group Name</label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 font-poppins ${errors.groupName ? 'border-red-500' : ''}`}
              placeholder="Name"
            />
            {errors.groupName && <p className="text-red-500 text-sm font-poppins">{errors.groupName}</p>}
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1 font-poppins" htmlFor="groupadmin">Group Admin</label>
            <select
              id="groupadmin"
              value={groupadminId}
              onChange={handleGroupAdminChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 font-poppins ${errors.groupadminId ? 'border-red-500' : ''}`}
            >
              <option value="">Select Group Admin</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
            </select>
            {errors.groupadminId && <p className="text-red-500 text-sm font-poppins">{errors.groupadminId}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 font-poppins" htmlFor="groupDescription">Group Description</label>
          <textarea
            id="groupDescription"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-200 font-poppins ${errors.groupDescription ? 'border-red-500' : ''}`}
            placeholder="Description.."
          ></textarea>
          {errors.groupDescription && <p className="text-red-500 text-sm font-poppins">{errors.groupDescription}</p>}
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
            <ul className="absolute z-10 w-full bg-white border rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
              {filteredMembers.map((user) => (
                <li
                  key={user.id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 font-poppins"
                  onClick={() => addMember(user)}
                >
                  {user.firstName} {user.lastName}
                </li>
              ))}
            </ul>
          )}
          {errors.members && <p className="text-red-500 text-sm font-poppins">{errors.members}</p>}
   

        <div className="mt-2 flex flex-wrap gap-2 font-poppins">
          {members.map((member, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-1 bg-gray-100 rounded-full font-poppins"
            >
              <span className='font-poppins'>{member.firstName} {member.lastName}</span>
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

      {(
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={handleCloseSnackbar}
        />
        
      )}
    </div>
    
  );

}
