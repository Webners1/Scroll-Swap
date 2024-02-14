import React from "react";
import { Box } from "../Box";
import { Image } from "../Image";
import { SpinnerProps } from "./types";

const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({ size = 128 }) => {
  return (
    <Box width={size} height={size * 1} position="relative">
      <Image width={size} height={size * 0.9} src="/images/loading.gif" alt="loading-spinner" />
    </Box>
  );
};

export default Spinner;
