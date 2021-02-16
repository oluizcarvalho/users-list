import styled from 'styled-components';

const Photo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

Photo.Td = styled.td`
    padding: 0px !important;
    width: 70px;
`;

Photo.User = styled.img`
    width: 70px;
    height: 70px;
    border-radius: 2px;
    background-size: cover;
    background-position: center;
    background-color: ${({ theme }) => theme.colors.mainBg};
    background-image: url(${({ PhotoUser }) => PhotoUser});
`;


export default Photo;