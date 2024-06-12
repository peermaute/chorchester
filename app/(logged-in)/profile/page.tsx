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
import { useRouter } from "next/navigation";

type User = {
  picture: string;
  name: string;
  ensemble: string;
  stimmgruppe: string;
  personal_info: string;
};

const Profile = () => {
  const router = useRouter();
  const user: User = {
    picture: "/person.svg",
    name: "John Doe",
    ensemble: "Kammerchor",
    stimmgruppe: "Tenor",
    personal_info: "John is a great singer.",
  };
  const [formData, setFormData] = useState({
    picture: user.picture,
    name: user.name,
    ensemble: user.ensemble,
    stimmgruppe: user.stimmgruppe,
    personal_info: user.personal_info,
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
    setFormData({ ...formData, personal_info: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <Box as="form" onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <Image
            src={user.picture}
            alt={"Profile Picture"}
            width={200}
            height={200}
          />
        </div>
        <FormControl sx={{ marginBottom: "10px" }}>
          <FormControl.Label>Name</FormControl.Label>
          <TextInput
            value={formData.name}
            onChange={handleNameChange}
            placeholder="Enter your text"
            sx={{ width: "100%" }}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "10px" }}>
          <FormControl.Label>Ensemble</FormControl.Label>
          <Select
            name="ensemble"
            value={formData.ensemble}
            onChange={handleEnsembleChange}
            sx={{ width: "100%" }}
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
            sx={{ width: "100%" }}
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
            value={formData.personal_info}
            onChange={handlePersonalInfoChange}
            placeholder="Text eingeben"
            sx={{ width: "100%" }}
          />
        </FormControl>
        <div className="flex justify-between">
          <Button onClick={() => router.push("/settings")}>
            Account Settings
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Profile;
