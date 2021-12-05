import React from 'react';
import Image from 'next/image';
import GlideCarousel, {
  GlideSlide,
} from 'components/UI/GlideCarousel/GlideCarousel';
import Container from 'components/UI/Container/Container';
import { styled } from '@mui/material';
import SearchForm from './SearchForm';

const SearchWrapper = styled('div')(({ theme }) => ({
  width: 'calc(100% - 60px)',
  padding: '0 30px 30px',
  borderRadius: 6,
  background: theme.palette.primary.main,
  boxShadow: '0 1px 20px rgba(0, 0, 0, 0.08)',
  position: 'absolute',
  bottom: 81,
  zIndex: 1,
  [theme.breakpoints.between(569, 991)]: {
    width: 414,
    left: 30,
  },
  [theme.breakpoints.down(480)]: {
    width: 'calc(100% - 30px)',
    padding:15,
  },
  '& > div':{
    [theme.breakpoints.up(481)]:{
      marginTop:30
    }
  }
}));
// import SearchTab from './SearchTab';

export default function HomeSearch() {
  return (
    <div className="banner-wrapper">
      <GlideCarousel
        controls={false}
        options={{ gap: 0, autoplay: 5000, animationDuration: 1000 }}
        bullets={true}
        numberOfBullets={3}
      >
        <>
          <GlideSlide>
            <Image
              src="/assets/images/banner/1.jpg"
              alt="Home banner 1"
              layout="fill"
              objectFit="none"
              priority={true}
            />
          </GlideSlide>
          <GlideSlide>
            <Image
              src="/assets/images/banner/2.jpg"
              alt="Home banner 2"
              layout="fill"
              objectFit="cover"
            />
          </GlideSlide>
          <GlideSlide>
            <Image
              src="/assets/images/banner/3.jpg"
              alt="Home banner 3"
              layout="fill"
              objectFit="cover"
            />
          </GlideSlide>
        </>
      </GlideCarousel>
      <Container>
        <SearchWrapper>
          <SearchForm />
        </SearchWrapper>
      </Container>
    </div>
  );
}
