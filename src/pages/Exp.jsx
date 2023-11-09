import React, { useState } from "react";

function MajorSelection({ majors, user }) {
  const [selectedMajor, setSelectedMajor] = useState(user.major);

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };

  clg;
  return (
    <div>
      <label htmlFor="majorSelect">Pilih Jurusan:</label>
      <select
        id="majorSelect"
        value={selectedMajor}
        onChange={handleMajorChange}
      >
        {majors.map((major) => (
          <option key={major.id} value={major.name}>
            {major.name}
          </option>
        ))}
      </select>
    </div>
  );
}

const Exp = () => {
  // Data array majors
  const majors = [
    { id: "randomId1", name: "major name1" },
    { id: "randomId2", name: "major name2" },
    { id: "randomId3", name: "major name3" },
  ];

  // Data user
  const user = {
    username: "simple username",
    major: "major name2", // Ini adalah nilai default
    gender: "MALE",
  };

  return (
    <div>
      <h1>Form Pilihan Jurusan</h1>
      <MajorSelection majors={majors} user={user} />
    </div>
  );
};

export default Exp;
