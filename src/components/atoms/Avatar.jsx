import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  margin-right: 15px;
  background: rgb(210, 210, 210);
  object-fit: cover;
`;

function Avatar({ avatarUrl }) {
  return <Image src={avatarUrl} alt="아바타" />;
}

export default Avatar;
