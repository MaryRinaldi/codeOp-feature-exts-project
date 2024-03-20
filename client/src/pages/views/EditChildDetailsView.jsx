import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EditChildDetailsView = () => {
  const { id } = useParams(); 
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [sex, setSex] = useState('');
  const [importantInfo, setImportantInfo] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/children?familyAdminGuardian=${id}`);
        const data = await response.json();
        const child = data.find(child => child.id === id);
        if (child) {
          setName(child.firstName);
          setGender(child.gender);
          setDob(child.dob);
          setPronouns(child.pronouns);
          setImportantInfo(child.importantInfo);
        }

      } catch (error) {
        console.error('Error fetching child details:', error);
        setError(error);

      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`/api/children/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: name,
          sex,
          gender,
          dob,
          importantInfo,
          pronouns,
        }),
      });
    } catch (error) {
      console.error('Error updating child details:', error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-5 mt-10 ml-10">
      <h1>Edit Child Details</h1>
      <form onSubmit={handleSubmit} className="form-control mt-5 p-10">
      <div className="grid grid-cols-2">
            <div className="flex flex-col gap-3">
              <div>
        <label  className="label">
          First Name:
            </label>
          <input
            type="text"
            value={name}
            id="first-name"
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-36"
          />
              </div>
     
        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Sex:
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </label>
        <label  className="label">
          Important information:
            </label>
          <input
            type="text"
            value={importantInfo}
            onChange={(e) => setImportantInfo(e.target.value)}
            className="input input-bordered w-36"
          />
        
        <button type="submit"
            className="btn btn-ghost ml-5">Save</button>
</div>
</div>
      </form>
    </div>



  );
};

export default EditChildDetailsView;
