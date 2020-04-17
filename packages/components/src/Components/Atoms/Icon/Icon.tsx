import React from "react";
import PropTypes from "prop-types";

import ESIcon from "@diogobiz/sanar-ui/dist/Components/Atoms/Icon";
import { SANStyled } from "../../../Theme";

export type ISANIconProps = PropTypes.InferProps<typeof ESIcon["propTypes"]>;

const SANIcon: React.FC<ISANIconProps> = SANStyled(ESIcon)``;

export default SANIcon;
