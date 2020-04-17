import React from "react";
import PropTypes from "prop-types";

import ESModalTabs from "@diogobiz/sanar-ui/dist/Components/Organisms/ModalTabs";

export type ISANModalTabsProps = PropTypes.InferProps<
  typeof ESModalTabs["propTypes"]
>;

const SANModalTabs = props => <ESModalTabs {...props} />;

export default SANModalTabs;
