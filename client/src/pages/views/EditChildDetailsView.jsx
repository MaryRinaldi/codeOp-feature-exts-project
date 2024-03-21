import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditChildDetailsView = () => {
  const { id } = useParams(); 
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [sex, setSex] = useState('');
  const [importantInfo, setImportantInfo] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/children?id=${id}`);
        const child = await response.json();
 
        if (child) {
          setName(child.firstName);
          setGender(child.gender);
          setDob(child.dob);
          setSex(child.sex);
          setPronouns(child.pronouns);
          setImportantInfo(child.importantInfo);
        }

      } catch (error) {
        console.error('Error fetching child details:', error);
        setError(error);

      }
    };
    if (!id) return;
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
      returnToAdminView();
    } catch (error) {
      console.error('Error updating child details:', error);
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const returnToAdminView = () => navigate("/app/admin");

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
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
        </label>
        <label>
          Sex:
          <select
            value={sex}
            onChange={(e) => setSex(e.target.value)}
          >
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
        </label>
        <select
            className="select select-bordered max-w-xs text-lg"
            type="text"
            id="pronouns"
                >
                  <option value="0">He/him</option>
                  <option value="1">She/her</option>
                  <option value="2">They/Them</option>
                </select>
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
        <div className="flex gap-2">
              <button type="submit" className="btn btn-primary ml-5">
                Save
              </button>
              <button
                type="button"
                className="btn btn-ghost ml-5"
                onClick={returnToAdminView}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditChildDetailsView;