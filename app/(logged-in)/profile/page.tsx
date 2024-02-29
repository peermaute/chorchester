"use client";

import { useState } from "react";
import Image from "next/image";

type User = {
  picture: string;
  name: string;
  ensemble: string;
  stimmgruppe: string;
  personalInfo: string;
};

const Profile = () => {
  const user: User = {
    picture: "/person.svg",
    name: "John Doe",
    ensemble: "Kammerchor",
    stimmgruppe: "Tenor",
    personalInfo: "John is a great singer.",
  };

  const [editableName, setEditableName] = useState(user.name);
  const [editableEnsemble, setEditableEnsemble] = useState(user.ensemble);
  const [editableStimmgruppe, setEditableStimmgruppe] = useState(
    user.stimmgruppe
  );
  const [editablePersonalInfo, setEditablePersonalInfo] = useState(
    user.personalInfo
  );

  return (
    <div className="flex-row">
      <Image
        src={user.picture}
        alt={"Profile Picture"}
        width={200}
        height={200}
      />
      <div>
        <label>
          Name:
          <input
            type="text"
            value={editableName}
            onChange={(e) => setEditableName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Ensemble:
          <input
            type="text"
            value={editableEnsemble}
            onChange={(e) => setEditableEnsemble(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Stimmgruppe:
          <input
            type="text"
            value={editableStimmgruppe}
            onChange={(e) => setEditableStimmgruppe(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Personal Info:
          <input
            type="text"
            value={editablePersonalInfo}
            onChange={(e) => setEditablePersonalInfo(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};

export default Profile;
