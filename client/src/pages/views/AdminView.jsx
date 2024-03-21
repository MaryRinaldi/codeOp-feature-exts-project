import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

import AddHomeIcon from "@mui/icons-material/AddHome";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AddModeratorIcon from "@mui/icons-material/AddModerator";

import { useUsers } from "../../contexts/UsersContext";
import FormAddFamily from "../../components/FormAddFamily";
import FormAddChild from "../../components/FormAddChild";
import AdminPersonRow from "../../components/AdminPersonRow";
import FormInviteGuardian from "../../components/FormInviteGuardian";

function filterChildrenByAge(children) {
  return children
    .slice()
    .sort((a, b) => a.dob.replaceAll("-", "") - b.dob.replaceAll("-", ""));
}

const AdminView = () => { 
  const navigate = useNavigate();
  const { currentFamily, currentUser, currentChildren } = useUsers();
 
  const { adminFamily } = currentUser;

  const [addFamilyFormIsOpen, setAddFamilyFormIsOpen] = useState(false);
  const [addChildFormIsOpen, setAddChildFormIsOpen] = useState(false);
  const [inviteGuardianFormIsOpen, setInviteGuardianFormIsOpen] =
    useState(false);

    const [childFormData, setChildFormData] = useState({
      firstName: "",
      gender: "",
      dob: new Date().toISOString().substring(0, 10),
      pronouns: "",
      importantInfo: "",
    });
  
    function handleChildFormChange(e) {
      const { name, value } = e.target;
      setChildFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  
    function handleChildFormSubmit(e) {
      e.preventDefault();
      console.log( childFormData);
      navigate(-1);
    }

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Admin Panel</h1>
        <div className="grid grid-cols-3">
          <div>
            {!adminFamily && (
              <div>
                <p className="mt-10 text-xl">
                  You&apos;re currently not an admin user.
                </p>
                {!addFamilyFormIsOpen && (
                  <button
                    className="btn btn-secondary mt-8 text-xl"
                    onClick={() => setAddFamilyFormIsOpen(true)}
                  >
                    <AddHomeIcon /> Add family
                  </button>
                )}
              </div>
            )}
            {adminFamily && (
              <div>
                <p className="mt-10 text-lg">
                  You&apos;re the admin of family{" "}
                  <span className="uppercase tracking-wider font-semibold">
                    {currentFamily.familyName}
                  </span>{" "}
                  (#{currentFamily.id}).
                </p>
                {!inviteGuardianFormIsOpen && !addChildFormIsOpen && (
                  <button
                    className="btn  btn-secondary mt-8 text-xl"
                    onClick={() => setInviteGuardianFormIsOpen(true)}
                  >
                    <AddModeratorIcon />
                    Invite guardian
                  </button>
                )}
              </div>
            )}
            {adminFamily &&
              !addChildFormIsOpen &&
              !inviteGuardianFormIsOpen && (
                <button
                  className="btn  btn-secondary mt-8 text-xl"
                  onClick={() => setAddChildFormIsOpen(true)}
                >
                  <PersonAddAlt1Icon />
                  Add child
                </button>
              )}

            {!adminFamily && addFamilyFormIsOpen && (
              <FormAddFamily handler={setAddFamilyFormIsOpen} />
            )}
            {adminFamily && addChildFormIsOpen && (
              <FormAddChild handler={setAddChildFormIsOpen} />
            )}
            {adminFamily && inviteGuardianFormIsOpen && (
              <FormInviteGuardian handler={setInviteGuardianFormIsOpen} />
            )}
          </div>

          {adminFamily && !currentChildren && (
  <p className="text-lg">You haven&apos;t added any children yet.</p>
)}
{adminFamily && currentChildren && (
  <div>
    <h3>Children:</h3>
    <ul className="flex flex-col gap-5 mt-5">
      {filterChildrenByAge(currentChildren).map((child) => (
        <div key={child.id}>
          <AdminPersonRow person={child} />
          <button className="btn btn-primary mt-5 mb-5">
            <Link to={`/app/edit-child-details/${child.id}`}>Edit</Link>
          </button>
        </div>
      ))}
    </ul>
  </div>
)}

          {adminFamily && currentFamily.guardians && (
            <div>
              <h3>Other Guardians:</h3>
              <ul className="flex flex-col gap-5 mt-5">
                {currentFamily.guardians.map((guardian) =>
                  currentFamily.adminUser === guardian.id ? null : (
                    <AdminPersonRow
                      key={guardian.id}
                      person={guardian}
                      showRemove={true}
                    />
                  )
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminView;
