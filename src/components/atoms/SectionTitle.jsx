import styled from 'styled-components';

const Title = styled.h2`
  font-size: 1.5rem;
`;

function SectionTitle({ children }) {
  return <Title>{children}</Title>;
}

export default SectionTitle;
