import React, { Fragment } from 'react';
import Image from 'next/image';
import { styled } from '@mui/material';
import PropTypes from 'prop-types';
import Link from 'next/link';

const LogoArea = styled('div')`
  display: flex;
  align-items: center;

  a {
    display: flex;
    align-items: center;
  }

  h3 {
    color: #ff9900;
    text-transform: capitalize;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 0 10px;
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const LogoNext = ({ className, withLink, linkTo, title, src }) => {
  return (
    <LogoArea className={className}>
      {withLink ? (
        <Link href={linkTo}>
          <a>
            {src && (
              <Image src={src} alt="TripFinder." width={20} height={30} />
            )}
            {title && <h3>{title}</h3>}
          </a>
        </Link>
      ) : (
        <Fragment>
          {src && <Image src={src} alt="TripFinder." width={20} height={30} />}
          {title && <h3>{title}</h3>}
        </Fragment>
      )}
    </LogoArea>
  );
};

LogoNext.propTypes = {
  className: PropTypes.string,
  withLink: PropTypes.bool,
  src: PropTypes.string,
  title: PropTypes.string,
  linkTo: PropTypes.string,
};

export default LogoNext;
