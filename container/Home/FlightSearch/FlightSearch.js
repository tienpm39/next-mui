import React from 'react';
import Router,{ withRouter } from 'next/router';
import {
  TextField,
  Autocomplete,
  Box,
  Typography,
  Button,
  Popover,
  InputAdornment,
  alpha,
  styled,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import DateRangePicker from '@mui/lab/DateRangePicker';
import {
  FaPlaneDeparture,
  FaPlaneArrival,
  FaSearch,
  FaRegCalendarAlt,
  FaUserFriends,
} from 'react-icons/fa';
import InputIncDec from '@/components/UI/InputIncDec/InputIncDec';
import { SearchContext } from 'context/SearchProvider';
import { FLIGHT_RESULT } from 'settings/constant';

const ItemWrapper = styled('div')`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 5px;
  }

  .quantity {
    height: 30px;

    input {
      font-size: 15px;
    }

    button.btn svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const FlightSearch = () => {
  const { t } = useTranslation('common');
  const { state, dispatch } = React.useContext(SearchContext);
  const [flightType, setFlightType] = React.useState('oneway');
  const [datePickerValue, setDatePickerValue] = React.useState(new Date());
  const [searchDate, setSearchDate] = React.useState([new Date(), new Date()]);
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const onChangeWay = (e) => {
    setFlightType(e.target.value);
  };

  const [person, setPerson] = React.useState({
    adult: 1,
    children: 0,
    infrant: 0,
  });

  const handleIncrement = (type) => {
    setPerson({
      ...person,
      [type]: person[type] + 1,
    });
  };

  const handleDecrement = (type) => {
    if (person[type] <= 0) {
      return false;
    }
    setPerson({
      ...person,
      [type]: person[type] - 1,
    });
  };

  const handleOnChange = (e, type) => {
    let currentValue = e.target.value;
    setPerson({
      ...person,
      [type]: currentValue,
    });
  };

  //popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const goToFlightResult = () => {
    let departFrom = '',
      arrivedTo = '',
      dateRange = {};
    dateRange.startDate = searchDate ? searchDate.setStartDate : null;
    dateRange.endDate = searchDate ? searchDate.setEndDate : null;

    let query = {
      setStartDate: searchDate.setStartDate,
      setEndDate: searchDate.setEndDate,
      departFrom,
      arrivedTo,
    };

    for (const key in query) {
      if (query[key] === '' || query[key] === null || query[key] === 0) {
        delete query[key];
      }
    }
    dispatch({
      type: 'UPDATE',
      payload: {
        ...state,
        setStartDate: searchDate.setStartDate,
        setEndDate: searchDate.setEndDate,
        adult: person.adult,
        children: person.children,
        infrant: person.infrant,
        departFrom: keywords.map((keyword) => keyword.code),
        arrivedTo: keywords.map((keyword) => keyword.code),
      },
    });

    Router.push(
      {
        pathname: `${FLIGHT_RESULT}`,
        query: query,
      },
      {
        pathname: `${FLIGHT_RESULT}`,
        query: query,
      },
      { shallow: true }
    );
  };

  return (
    <Box>
      <Box
        className="formTop"
        sx={{
          background: (theme) => alpha(theme.palette.primary.light, 0.15),
          color: (theme) => alpha(theme.palette.primary.contrastText, 1),
        }}
      >
        <label
          htmlFor="twoway"
          className={flightType === 'twoway' ? 'active' : ''}
        >
          {t('returnway')}
        </label>
        <input
          type="radio"
          id="twoway"
          hidden
          value="twoway"
          name="twoway"
          onChange={onChangeWay}
          checked={flightType === 'twoway'}
        />
        <label
          htmlFor="oneway"
          className={flightType === 'oneway' ? 'active' : ''}
        >
          {t('oneway')}
        </label>
        <input
          type="radio"
          id="oneway"
          hidden
          value="oneway"
          name="oneway"
          onChange={onChangeWay}
          checked={flightType === 'oneway'}
        />
      </Box>
      <Box
        className="formBottom"
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.light, 0.15),
        }}
      >
        <Autocomplete
          freeSolo
          disableClearable
          className="depart-input"
          options={keywords}
          autoHighlight
          fullWidth
          getOptionLabel={(option) => option.airportName}
          renderOption={(props, option) => (
            <Box {...props} className="suggest-item">
              <div className="suggest-item-title">
                <Typography>{option.airportName}</Typography>
                <Typography className="suggest-item-cityName">
                  {option.cityName}
                </Typography>
              </div>
              <Typography sx={{ fontWeight: '700', color: '#ff9900' }}>
                {option.code}
              </Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              hiddenLabel
              variant="standard"
              placeholder={t('departFrom')}
              className="line-depart"
              sx={{
                color: (theme) => alpha(theme.palette.primary.contrastText, 1),
              }}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <FaPlaneDeparture color="#ff9900" />
                  </InputAdornment>
                ),
                sx: {
                  color: (theme) =>
                    alpha(theme.palette.primary.contrastText, 1),
                },
              }}
            />
          )}
        />
        <Autocomplete
          className="arrive-input"
          freeSolo
          disableClearable
          options={keywords}
          autoHighlight
          fullWidth
          getOptionLabel={(option) => option.airportName}
          renderOption={(props, option) => (
            <Box {...props} className="suggest-item">
              <div className="suggest-item-title">
                <Typography>{option.airportName}</Typography>
                <Typography className="suggest-item-cityName">
                  {option.cityName}
                </Typography>
              </div>
              <Typography sx={{ fontWeight: '700', color: '#ff9900' }}>
                {option.code}
              </Typography>
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              className="inputRounded line-arrive-input "
              hiddenLabel
              size="large"
              placeholder={t('arrivedTo')}
              variant="standard"
              sx={{
                color: (theme) => alpha(theme.palette.primary.contrastText, 1),
              }}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <FaPlaneArrival color="#ff9900" style={{ marginLeft: 5 }} />
                  </InputAdornment>
                ),
                sx: {
                  color: (theme) =>
                    alpha(theme.palette.primary.contrastText, 1),
                },
              }}
            />
          )}
        />
        <LocalizationProvider dateAdapter={DateAdapter}>
          {flightType === 'oneway' ? (
            <DatePicker
              value={datePickerValue}
              disablePast
              className="dateRangPicker-input"
              sx={{ paddingLeft: { xs: 1 } }}
              inputFormat="DD-MM-YYYY"
              onChange={(newValue) => {
                setDatePickerValue(newValue);
              }}
              OpenPickerButtonProps={{
                disabled: true,
                style: { display: 'none' },
              }}
              open={openDatePicker}
              onOpen={() => setOpenDatePicker(true)}
              onClose={() => setOpenDatePicker(false)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  onClick={(e) => setOpenDatePicker(true)}
                  open={openDatePicker}
                  className="line-single-datepicker"
                  onClose={(e) => setOpenDatePicker(false)}
                  variant="standard"
                  sx={{
                    minWidth: 170,
                    marginTop: { xs: 1, lg: 0 },
                    width: '100%',
                  }}
                  placeholder={t('startDate')}
                  InputProps={{
                    ...params.InputProps,
                    disableUnderline: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaRegCalendarAlt
                          color="#ff9900"
                          style={{ marginLeft: 8 }}
                        />
                      </InputAdornment>
                    ),
                    style: {
                      fontSize: 16,
                    },
                    sx: {
                      color: (theme) =>
                        alpha(theme.palette.primary.contrastText, 1),
                    },
                  }}
                />
              )}
            />
          ) : (
            <DateRangePicker
              startText={null}
              endText={null}
              calendars="1"
              value={searchDate}
              disablePast
              onChange={(newValue) => {
                setSearchDate(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField
                    {...startProps}
                    variant="standard"
                    className="dateRangPicker-input line-datepicker"
                    sx={{ minWidth: 110, marginTop: { xs: 1 } }}
                    InputProps={{
                      ...startProps.InputProps,
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <FaRegCalendarAlt
                            color="#ff9900"
                            style={{ marginLeft: 8 }}
                          />
                        </InputAdornment>
                      ),
                      sx: {
                        color: (theme) =>
                          alpha(theme.palette.primary.contrastText, 1),
                      },
                      style: {
                        fontSize: 16,
                      },
                    }}
                  />
                  <Box sx={{ mx: 1, color: 'gray' }}> - </Box>
                  <TextField
                    {...endProps}
                    variant="standard"
                    className="dateRangPicker-input line-datepicker-return"
                    InputProps={{
                      ...endProps.InputProps,
                      disableUnderline: true,
                      sx: {
                        color: (theme) =>
                          alpha(theme.palette.primary.contrastText, 1),
                      },
                      style: {
                        fontSize: 16,
                      },
                    }}
                  />
                </React.Fragment>
              )}
            />
          )}
        </LocalizationProvider>
        <Button
          aria-describedby={id}
          variant="text"
          onClick={handleClick}
          startIcon={
            <FaUserFriends
              color="#ff9900"
              style={{ paddingLeft: 3, marginLeft: 8 }}
            />
          }
          sx={{
            textTransform: 'none',
            color: (theme) => alpha(theme.palette.primary.contrastText, 1),
          }}
          className="popoverButton"
        >
          <Typography>
            {person.adult > 0 && `${person.adult} ` + t('adult')}
            {person.children > 0 && `, ${person.children} ` + t('children')}
            {person.infrant > 0 && `, ${person.infrant} ` + t('infrant')}
          </Typography>
        </Button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box
            className="popoverContent"
            sx={{
              background: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
            }}
          >
            <ItemWrapper>
              <Typography>{t('adult')}</Typography>
              <InputIncDec
                id="adult"
                increment={() => handleIncrement('adult')}
                decrement={() => handleDecrement('adult')}
                onChange={(e) => handleOnChange(e, 'adult')}
                value={person.adult}
              ></InputIncDec>
            </ItemWrapper>
            <ItemWrapper>
              <Typography>{t('children')}</Typography>
              <InputIncDec
                id="children"
                increment={() => handleIncrement('children')}
                decrement={() => handleDecrement('children')}
                onChange={(e) => handleOnChange(e, 'children')}
                value={person.children}
              ></InputIncDec>
            </ItemWrapper>
            <ItemWrapper>
              <Typography>{t('infrant')}</Typography>
              <InputIncDec
                id="infrant"
                increment={() => handleIncrement('infrant')}
                decrement={() => handleDecrement('infrant')}
                onChange={(e) => handleOnChange(e, 'infrant')}
                value={person.infrant}
              ></InputIncDec>
            </ItemWrapper>
          </Box>
        </Popover>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{ padding: 2 }}
          className="flight-search-button"
          onClick={goToFlightResult}
        >
          <FaSearch color="#fff" />
        </Button>
      </Box>
    </Box>
  );
};

export default withRouter(FlightSearch);

const keywords = [
  {
    cityName: 'Hà Nội',
    airportName: 'Sân bay Nội Bài',
    code: 'HAN',
  },
  {
    cityName: 'Hải Phòng',
    airportName: 'Sân bay Cát Bi',
    code: 'HPH',
  },
  {
    cityName: 'Thành phố Hồ Chí Minh',
    airportName: 'Sân bay Tân Sơn Nhất',
    code: 'SGN',
  },
  {
    cityName: 'Phú Quốc',
    airportName: 'Sân bay Phú Quốc',
    code: 'PQC',
  },
  {
    cityName: 'Nha Trang',
    airportName: 'Sân bay Cam Ranh',
    code: 'CXR',
  },
  {
    cityName: 'Côn Đảo',
    airportName: 'Côn Đảo',
    code: 'VCS',
  },
  {
    cityName: 'Lâm đồng',
    airportName: 'Đà Lạt',
    code: 'DLI',
  },
  {
    cityName: 'Quy Nhơn',
    airportName: 'Quy Nhơn',
    code: 'UIH',
  },
  {
    cityName: 'Đà Nẵng',
    airportName: 'Đà Nẵng',
    code: 'DAD',
  },
  {
    cityName: 'Thừa Thiên Huế',
    airportName: 'Huế',
    code: 'HUI',
  },
  {
    cityName: 'Quảng Bình',
    airportName: 'Đồng Hới',
    code: 'VDH',
  },
  {
    cityName: 'Nghệ an',
    airportName: 'Vinh',
    code: 'VII',
  },
];
