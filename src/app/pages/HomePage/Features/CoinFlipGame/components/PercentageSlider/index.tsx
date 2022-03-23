import React from 'react';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

function PercentageSlider({ marks, ...props }) {
  function valuetext(value) {
    return `${value}%`;
  }

  return (
    <Slider
      defaultValue={0}
      getAriaValueText={valuetext}
      aria-labelledby="discrete-slider-custom"
      step={0.01}
      valueLabelDisplay="auto"
      marks={marks}
      {...props}
    />
  );
}

export default PercentageSlider;
