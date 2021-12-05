import React from 'react'
import {
  InputAdornment,
  TextField,
  Button,
  Box,
  alpha
} from '@mui/material';
import { MdLocationOn, MdSearch } from 'react-icons/md';
import { useTranslation } from 'next-i18next';

export default function ExpSearch() {
  const { t } = useTranslation('common')
  return (
    <Box sx={{ display: 'flex' }}>
      <TextField
        className="inputRounded"
        hiddenLabel
        fullWidth
        size="large"
        sx={{
          background: (theme) => alpha(theme.palette.primary.light, 0.15),
          color: (theme) => alpha(theme.palette.primary.contrastText, 1),
        }}
        placeholder={t('discovery-placeholder')}
        variant="filled"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <MdLocationOn color="#FF9900" />
            </InputAdornment>
          ),
          sx: {
            color: (theme) => alpha(theme.palette.primary.contrastText, 1),
          },
        }}
      />

      <Button variant="contained" color="secondary" sx={{ borderRadius: 0 }}>
        <MdSearch color="white" />
      </Button>
    </Box>
  );
}
