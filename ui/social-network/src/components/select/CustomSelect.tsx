import React, { useState } from 'react';

import Select, { components } from 'react-select';

import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface SelectProps {
  data: {
    label: string,
    value: string
  }[],
  input?: {
    setValue: any,
    value: any
  },
  customOption?: any,
  select?: {
    set: any
  }
}

const customStyles = {
  control: (base: any, state: any) => ({
    ...base,
    minHeight: 'auto', // remove fixed height
    flexWrap: 'wrap',  // allow multi-values to wrap
    alignItems: 'flex-start',
    paddingTop: '5px',
    paddingBottom: '5px',
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: '0 8px',
    flexWrap: 'wrap',  // wrap selected items
  }),
  multiValue: (base: any) => ({
    ...base,
    margin: '2px',
  }),
};

const CustomOption = (props: any) => {
  return (
    <components.Option {...props}>
      <div>
        <div style={{ fontWeight: 'bold' }}>{props.data.label}</div>
        <div style={{ fontSize: '0.8rem', color: '#888' }}>{props.data.description}</div>
      </div>
    </components.Option>
  );
};

export default function CustomSelect(props: SelectProps) {
  return (
    <Select
      closeMenuOnSelect={false}
      styles={{
        ...customStyles,
      }}
      components={{
        Option: props.customOption,
      }}
      isMulti
      options={props.data}
      placeholder={"Search your friends..."}
      inputValue={props.input?.value}
      onChange={(e) => {
        props.select?.set(e.map(option => option.value))
        // alert("value: " + e)
      }}
      onInputChange={(e, actionMeta) => {
        // Only update if it's a valid change
        if (actionMeta.action !== "input-blur" && actionMeta.action !== "menu-close") {
            props.input?.setValue(e);
          }
          console.log("value: ", e, actionMeta);
      }}
    />
  );
}