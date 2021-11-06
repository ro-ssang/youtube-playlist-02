import React from 'react';
import styled from 'styled-components';
import SiteLogo from '../atoms/SiteLogo';
import LoginButton from '../atoms/LoginButton';

const Section = styled.section`
  margin-top: 76px;
  text-align: center;
`;
const SectionTitle = styled.h2`
  font-size: 48px;
  margin-bottom: 1rem;
  font-weight: bold;
`;
const SectionDesc = styled.p`
  max-width: 380px;
  margin: 0px auto 1.875rem;
`;
const ImageContainer = styled.div``;
const Image = styled.img`
  width: 100%;
  max-width: 1680px;
  object-fit: cover;
`;

function LogoutHome() {
  return (
    <Section>
      <SiteLogo isAside={false} />
      <SectionTitle>매일 새로운 음악을 발견해 보세요.</SectionTitle>
      <SectionDesc>플레이리스트 및 인기 아티스트들의 음악을 탐색하거나 검색할수 있습니다.</SectionDesc>
      <LoginButton width="210px" />
      <ImageContainer>
        <Image
          src="	https://music.apple.com/assets/cwc/upsells/listen-now/web/en-us/medium.png"
          alt="Music App Preview Img"
        />
      </ImageContainer>
    </Section>
  );
}

export default LogoutHome;
