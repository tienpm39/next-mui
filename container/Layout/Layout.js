import React from 'react';
import { withRouter } from 'next/router';
import { Box } from '@mui/material';
import Header from './Header/Header';
import LayoutProvider from 'context/LayoutProvider';
import {
  ABOUT_PAGE,
  AFFILIATE_PAGE,
  AGENT_LOGIN_PAGE,
  ALL_DESTINATION,
  BLOG_PAGE,
  CAR_RENTAL_PAGE,
  CHANGE_PASSWORD_PAGE,
  CHINH_SACH_BAO_MAT,
  COMMUNITY,
  CRUISE_PAGE,
  EXPERIENCES,
  FAVORITE_PAGE,
  FLIGHT_RESULT,
  FORGET_PASSWORD_PAGE,
  HELP_CENTER,
  HOTEL_PAGE,
  HUONG_DAN_THANH_TOAN,
  LOGIN_PAGE,
  NEARBY_PAGE,
  PHIEU_QUA_TANG_PAGE,
  QUY_DINH_SU_DUNG,
  RECRUITMENT_PAGE,
  REGISTER_PAGE,
  SIM_WIFI_PAGE,
  TICH_DIEM_DOI_QUA,
  TOUR_DETAIL,
  TRAIN_RESULT,
  VIET_TUY_BUT,
  VISA_PAGE,
} from 'settings/constant';

const Layout = ({ children, router }) => {
  return (
    <Box>
      <LayoutProvider>
        {router.pathname === LOGIN_PAGE ||
        router.pathname === REGISTER_PAGE ||
        router.pathname === CHANGE_PASSWORD_PAGE ||
        router.pathname === AGENT_LOGIN_PAGE ||
        router.pathname === FORGET_PASSWORD_PAGE ? (
          <Box>{children}</Box>
        ) : (
          <>
            <Header />
            <Box>{children}</Box>
            {router.pathname === ABOUT_PAGE ||
            router.pathname === RECRUITMENT_PAGE ||
            router.pathname === PHIEU_QUA_TANG_PAGE ||
            router.pathname === ALL_DESTINATION ||
            router.pathname === EXPERIENCES ||
            router.pathname === COMMUNITY ||
            router.pathname === NEARBY_PAGE ||
            router.pathname === FAVORITE_PAGE ||
            router.pathname === TOUR_DETAIL ||
            router.pathname === HOTEL_PAGE ||
            router.pathname === VISA_PAGE ||
            router.pathname === BLOG_PAGE ||
            router.pathname === CAR_RENTAL_PAGE ||
            router.pathname === CRUISE_PAGE ||
            router.pathname === SIM_WIFI_PAGE ||
            router.pathname === FLIGHT_RESULT ||
            router.pathname === TRAIN_RESULT ||
            router.pathname === HUONG_DAN_THANH_TOAN ||
            router.pathname === QUY_DINH_SU_DUNG ||
            router.pathname === CHINH_SACH_BAO_MAT ||
            router.pathname === HELP_CENTER ||
            router.pathname === VIET_TUY_BUT ||
            router.pathname === TICH_DIEM_DOI_QUA ||
            router.pathname === AFFILIATE_PAGE ? (
              <Box sx={{ height: 33 }} />
            ) : (
              <footer />
            )}
          </>
        )}
      </LayoutProvider>
    </Box>
  );
};

export default withRouter(Layout);
