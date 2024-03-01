"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  FormControl,
  Select,
  TextInput,
  Textarea,
} from "@primer/react";

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
  const [formData, setFormData] = useState({
    picture: user.picture,
    name: user.name,
    ensemble: user.ensemble,
    stimmgruppe: user.stimmgruppe,
    personalInfo: user.personalInfo,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, name: e.target.value });
  };

  const handleEnsembleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, ensemble: e.target.value });
  };
  const handleStimmgruppeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({ ...formData, stimmgruppe: e.target.value });
  };

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, personalInfo: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <Box as="form" onSubmit={handleSubmit}>
        <Image
          src={user.picture}
          alt={"Profile Picture"}
          width={200}
          height={200}
        />
        <FormControl sx={{ marginBottom: "10px" }}>
          <FormControl.Label>Name</FormControl.Label>
          <TextInput
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter your text"
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "10px" }}>
          <FormControl.Label>Ensemble</FormControl.Label>
          <Select
            name="ensemble"
            value={formData.ensemble}
            onChange={handleEnsembleChange}
          >
            <Select.Option value="Kammerchor">Kammerchor</Select.Option>
            <Select.Option value="Orchester">Orchester</Select.Option>
          </Select>
        </FormControl>

        <FormControl sx={{ marginBottom: "10px" }}>
          <FormControl.Label>Stimmgruppe</FormControl.Label>
          <Select
            name="stimmgruppe"
            value={formData.stimmgruppe}
            onChange={handleStimmgruppeChange}
            placeholder={"Stimmgruppe"}
            required
          >
            <Select.Option
              value="Sopran"
              disabled={formData.ensemble === "Orchester"}
            >
              Sopran
            </Select.Option>
            <Select.Option
              value="Alt"
              disabled={formData.ensemble === "Orchester"}
            >
              Alt
            </Select.Option>
            <Select.Option
              value="Tenor"
              disabled={formData.ensemble === "Orchester"}
            >
              Tenor
            </Select.Option>
            <Select.Option
              value="Bass"
              disabled={formData.ensemble === "Orchester"}
            >
              Bass
            </Select.Option>
            <Select.Option
              value="Streichinstrumente"
              disabled={formData.ensemble === "Kammerchor"}
            >
              Streichinstrumente
            </Select.Option>
            <Select.Option
              value="Holzblaeser"
              disabled={formData.ensemble === "Kammerchor"}
            >
              Holzbläser
            </Select.Option>
            <Select.Option
              value="Blechblaeser"
              disabled={formData.ensemble === "Kammerchor"}
            >
              Blechbläser
            </Select.Option>
            <Select.Option
              value="Schlaginstrumente"
              disabled={formData.ensemble === "Kammerchor"}
            >
              Schlaginstrumente
            </Select.Option>
            <Select.Option
              value="Tasteninstrumente"
              disabled={formData.ensemble === "Kammerchor"}
            >
              Tasteninstrumente
            </Select.Option>
            <Select.Option value="Andere">Andere</Select.Option>
          </Select>
        </FormControl>
        <FormControl sx={{ marginBottom: "20px" }}>
          <FormControl.Label>Persönliches</FormControl.Label>
          <Textarea
            value={formData.personalInfo}
            onChange={handlePersonalInfoChange}
            placeholder="Text eingeben"
          />
        </FormControl>
        <Button type="submit">Save</Button>
      </Box>
    </div>
  );
};

export default Profile;
