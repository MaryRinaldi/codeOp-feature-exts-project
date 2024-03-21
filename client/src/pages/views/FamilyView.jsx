import { useUsers } from "../../contexts/UsersContext";

import AdminPersonRow from "../../components/AdminPersonRow";

function filterChildrenByAge(children) {
  return children
    .slice()
    .sort((a, b) => a.dob.replaceAll("-", "") - b.dob.replaceAll("-", ""));
}

const FamilyView = () => {
  const { currentChildren, currentFamily, currentUser } = useUsers();

  if (!currentUser.family)
    return (
      <section className="app-container">
        <div className="p-5 mt-10">
          <h1>Family 404</h1>
          <p className="mt-5 text-xl">
            Family not found. You are currently{" "}
            <span className="font-semibold">not</span> a member of a family. Set
            up a family from the Admin Panel or accept an invitation from
            another user to join their family.
          </p>
        </div>
      </section>
    );

  const { guardians, familyName } = currentFamily;
  const primaries = guardians.filter((guardian) => guardian.isPrimaryGuardian);
  const extendeds = guardians.filter(
    (guardian) => guardian.isExtendedFamilyGuardian
  );
  const thirds = guardians.filter((guardian) => guardian.isThirdPartyGuardian);

  return (
    <section className="app-container">
      <div className="p-5 mt-10">
        <h1>Family {familyName}</h1>
        <div className="grid grid-cols-2 gap-y-10 mt-12">
        <div>
          <h2>Children</h2>
          {currentChildren && (
            <ul className="flex flex-col gap-5 mt-5">
              {filterChildrenByAge(currentChildren).map((child) => (
                <div key={child.id}>
                  <AdminPersonRow person={child} />
                  {child.importantInfo && ( 
                    <div className="bg-gray-100 border border-gray-300 p-2 rounded">
                      <span className="text-sm text-gray-600">(Important: {child.importantInfo})</span>
                        </div>
                  )}
                </div>
              ))}
            </ul>
          )}
        </div>
          <div>
            <h2>Primary Guardians</h2>
            {guardians && primaries.length > 0 && (
              <ul className="flex flex-col gap-5 mt-5">
                {primaries.map((primary) => (
                  <AdminPersonRow key={primary.id} person={primary} />
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2>Extended Family</h2>
            {guardians && extendeds.length > 0 && (
              <ul className="flex flex-col gap-5 mt-5">
                {extendeds.map((primary) => (
                  <AdminPersonRow key={primary.id} person={primary} />
                ))}
              </ul>
            )}
          </div>
          <div>
            <h2>Friends and Neighbors</h2>
            {guardians && thirds.length > 0 && (
              <ul className="flex flex-col gap-5 mt-5">
                {thirds.map((primary) => (
                  <AdminPersonRow key={primary.id} person={primary} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FamilyView;
