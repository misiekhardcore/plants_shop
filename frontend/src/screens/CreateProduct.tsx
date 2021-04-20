import React from "react";
import Input from "../components/Input";
import Select from "../components/Select";
import "./CreateProduct.scss";

export const CreateProduct: React.FC = () => {
  return (
    <div className="createproduct">
      <h2>Create new product</h2>
      <form onSubmit={() => {}}>
        <Input
          name={"name"}
          label={"Name"}
          placeholder={"Enter product name"}
        />
        <Input
          name={"description"}
          label={"Short description"}
          placeholder={"Enter short description"}
        />
        <Input
          name={"longDescription"}
          label={"Description"}
          type="textarea"
          placeholder={"Enter full description"}
        />
        <Input
          name={"price"}
          label={"Price"}
          placeholder={"Enter price"}
          type="number"
          step="0.01"
          min="0.01"
        />
        <Input
          name={"countInStock"}
          label={"Count in stock"}
          placeholder={"Enter stock amount"}
          type="number"
          step="1"
          min="0"
        />
        <Input
          name={"imgURLs"}
          label={"Images "}
          placeholder={"Add images"}
          type="file"
          multiple
          accept=".jpg,.png,.bmp,.webp"
        />
        <Select
          name="szie"
          label="Plant size"
          options={["small", "medium", "big"]}
        />
        <Select
          name="light"
          label="Light level"
          options={["low", "medium", "high"]}
        />
        <Select
          name="watering"
          label="Watering level"
          options={["low", "medium", "high"]}
        />
        <Input
          name={"temperature"}
          label={"Lowest temperature"}
          placeholder={"Enter lower temerature limit"}
          type="number"
          step="5"
          min="-10"
        />
        <button type="submit">Create product</button>
      </form>
    </div>
  );
};
