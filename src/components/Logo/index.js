import styled from 'styled-components';

import React from 'react';
import PropTypes from 'prop-types';

const Logo = ({ className }) => {
  return (
    <img className={className} alt="logo_kabum" src="https://static.kabum.com.br/conteudo/temas/001/imagens/topo/logo_kabum_mobile.svg" width="288" height="104" />
  );
}

Logo.propTypes = {
  className: PropTypes.string.isRequired,
};

const LogoKabum = styled(Logo)`
  margin: auto;
  display: block;
  @media screen and (max-width: 500px) {
    margin: 0;
  }
`;

export default LogoKabum;