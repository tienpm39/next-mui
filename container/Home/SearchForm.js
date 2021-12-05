import * as React from 'react';
import { Tabs, Tab, Typography, Box, alpha} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FaTram, FaHotel, FaPlane } from 'react-icons/fa';
import FlightSearch from './FlightSearch/FlightSearch';
import ExpSearch from './ExpSearch/ExpSearch';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ padding: '10px 5px 0px'}}>
        {children}
        </Box>
      )}
    </div>
  );
}

export default function SearchForm() {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation('common');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          aria-label="search form"
          className="search-tab-list"
          sx={{
            background: (theme) => alpha(theme.palette.primary.light, 0.15),
          }}
          TabIndicatorProps={{
            sx: {
              background: 'transparent',
            },
          }}
        >
          <Tab
            label={t('discovery')}
            className="search-tab"
            sx={{
              color: (theme) => alpha(theme.palette.primary.contrastText, 1),
            }}
          />
          <Tab
            label={t('airticket')}
            className="search-tab"
            sx={{
              color: (theme) => alpha(theme.palette.primary.contrastText, 1),
            }}
          />
          <Tab
            label={t('hotel')}
            className="search-tab"
            sx={{
              color: (theme) => alpha(theme.palette.primary.contrastText, 1),
            }}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ExpSearch />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <FlightSearch />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}
