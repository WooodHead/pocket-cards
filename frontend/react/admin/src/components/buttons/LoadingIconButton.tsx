import React, { FunctionComponent, MouseEventHandler } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton, { IconButtonPropsColorOverrides } from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';
import type { OverridableStringUnion } from '@mui/types';

export const button: FunctionComponent<LoadingIconButtonProps> = ({ color = 'secondary', ...props }) => {
  return (
    <Box sx={{ m: 0, p: 0, position: 'relative', ...props.sx }} component={props.component}>
      <IconButton
        aria-label="view"
        color={color}
        onClick={props.onClick}
        disabled={props.disabled || props.loading}
        sx={{
          p: 0,
          px: 0.5,
          border: 1,
          borderRadius: 1,
          '&.Mui-disabled': {
            color: props.disabled ? 'grey.700' : 'grey.400',
            backgroundColor: 'grey.400',
          },
          '&:hover': {
            backgroundColor: 'grey.300',
          },
        }}
        disableRipple>
        {props.children}
      </IconButton>
      {props.loading && (
        <CircularProgress
          size={20}
          sx={{
            color: 'grey.700',
            position: 'absolute',
            top: 12.5,
            left: 15,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

interface LoadingIconButtonProps {
  loading?: boolean;
  color?: OverridableStringUnion<
    'inherit' | 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning',
    IconButtonPropsColorOverrides
  >;
  onClick?: MouseEventHandler;
  sx?: SxProps<Theme>;
  disabled?: boolean;
  component?: React.ElementType;
}

export default button;
